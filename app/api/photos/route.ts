import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabase
    .from("mappa_featured_photos")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const photos = await req.json();

  if (!Array.isArray(photos) || photos.length !== 3) {
    return NextResponse.json({ error: "Expected 3 photos" }, { status: 400 });
  }

  const updates = photos.map((p: { position: number; image_url: string; instagram_url: string; caption: string }) => ({
    position: p.position,
    image_url: p.image_url || "",
    instagram_url: p.instagram_url || "https://www.instagram.com/mappadiroma/",
    caption: p.caption || "",
    updated_at: new Date().toISOString(),
  }));

  // The table is publicly readable but writable only by the service role,
  // so the anon key cannot overwrite the homepage.
  const { error } = await getSupabaseAdmin()
    .from("mappa_featured_photos")
    .upsert(updates, { onConflict: "position" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
