import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Keep-alive endpoint, pinged daily by a Vercel Cron (see vercel.json).
 *
 * Free-tier Supabase projects pause after ~7 days without activity, which
 * would silently break the guide-download form. A daily lightweight read
 * keeps the database active. The response is also useful as a health check.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { error } = await getSupabaseAdmin()
      .from("mappa_featured_photos")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, pinged: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
