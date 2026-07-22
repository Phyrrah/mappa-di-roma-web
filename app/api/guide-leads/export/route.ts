import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { GuideLead, visitorTypeLabel } from "@/lib/guide";

/** Escapes a value for a semicolon-separated CSV cell. */
function cell(value: string | boolean): string {
  const s = typeof value === "boolean" ? (value ? "yes" : "no") : value;
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: string[][]): string {
  // BOM so Excel opens UTF-8 accents correctly on a double-click.
  return "﻿" + rows.map((r) => r.join(";")).join("\r\n");
}

function filename(base: string): string {
  return `mapparoma-${base}-${new Date().toISOString().slice(0, 10)}.csv`;
}

/**
 * Admin — CSV export.
 *   ?scope=all         every submission, newest first
 *   ?scope=newsletter  newsletter subscribers only, one row per email
 */
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scope = req.nextUrl.searchParams.get("scope") === "newsletter" ? "newsletter" : "all";

  let query = getSupabaseAdmin()
    .from("mappa_guide_leads")
    .select("id, created_at, pseudo, email, visitor_type, newsletter, terms_version")
    .order("created_at", { ascending: false });

  if (scope === "newsletter") {
    query = query.eq("newsletter", true);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let leads = (data ?? []) as GuideLead[];

  let rows: string[][];
  if (scope === "newsletter") {
    // One row per address: a person who downloaded twice must not be mailed twice.
    const seen = new Set<string>();
    leads = leads.filter((l) => {
      if (seen.has(l.email)) return false;
      seen.add(l.email);
      return true;
    });
    rows = [
      ["Email", "Nickname", "Visitor type", "Subscribed on"],
      ...leads.map((l) => [
        cell(l.email),
        cell(l.pseudo),
        cell(visitorTypeLabel(l.visitor_type)),
        cell(l.created_at.slice(0, 10)),
      ]),
    ];
  } else {
    rows = [
      ["Date", "Time (UTC)", "Nickname", "Email", "Visitor type", "Newsletter", "Terms version"],
      ...leads.map((l) => [
        cell(l.created_at.slice(0, 10)),
        cell(l.created_at.slice(11, 19)),
        cell(l.pseudo),
        cell(l.email),
        cell(visitorTypeLabel(l.visitor_type)),
        cell(l.newsletter),
        cell(l.terms_version),
      ]),
    ];
  }

  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename(
        scope === "newsletter" ? "newsletter" : "guide-downloads"
      )}"`,
      "Cache-Control": "no-store",
    },
  });
}
