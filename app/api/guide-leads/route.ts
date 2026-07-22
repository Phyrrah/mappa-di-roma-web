import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { EMAIL_RE, TERMS_VERSION, VISITOR_TYPE_VALUES } from "@/lib/guide";

/** Public — records one guide download request. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const pseudo = typeof body.pseudo === "string" ? body.pseudo.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const visitorType = typeof body.visitorType === "string" ? body.visitorType : "";
  const newsletter = body.newsletter === true;
  const terms = body.terms === true;

  if (pseudo.length < 2 || pseudo.length > 40) {
    return NextResponse.json(
      { error: "Please enter a nickname between 2 and 40 characters." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!VISITOR_TYPE_VALUES.includes(visitorType)) {
    return NextResponse.json(
      { error: "Please tell us how long you are staying in Rome." },
      { status: 400 }
    );
  }
  if (!terms) {
    return NextResponse.json(
      { error: "You must accept the terms of use to download the guide." },
      { status: 400 }
    );
  }

  const { error } = await getSupabaseAdmin().from("mappa_guide_leads").insert({
    pseudo,
    email,
    visitor_type: visitorType,
    newsletter,
    terms_version: TERMS_VERSION,
  });

  if (error) {
    console.error("guide-leads insert failed:", error.message);
    return NextResponse.json(
      { error: "We could not register your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

/** Admin — the 10 most recent submissions. */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("mappa_guide_leads")
    .select("id, created_at, pseudo, email, visitor_type, newsletter, terms_version")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { count } = await getSupabaseAdmin()
    .from("mappa_guide_leads")
    .select("id", { count: "exact", head: true });

  const { count: newsletterCount } = await getSupabaseAdmin()
    .from("mappa_guide_leads")
    .select("id", { count: "exact", head: true })
    .eq("newsletter", true);

  return NextResponse.json({
    leads: data ?? [],
    total: count ?? 0,
    newsletterTotal: newsletterCount ?? 0,
  });
}
