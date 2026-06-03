import { createClient } from "@supabase/supabase-js";

export type FeaturedPhoto = {
  id: string;
  position: number;
  image_url: string;
  instagram_url: string;
  caption: string;
  updated_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getFeaturedPhotos(): Promise<FeaturedPhoto[]> {
  const { data, error } = await supabase
    .from("mappa_featured_photos")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
  return data ?? [];
}
