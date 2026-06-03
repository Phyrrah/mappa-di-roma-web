"use client";
import { useState } from "react";
import Image from "next/image";
import { FeaturedPhoto } from "@/lib/supabase";

const INSTAGRAM_URL = "https://www.instagram.com/pierrebrancart/";

export default function AdminPhotoManager({ initialPhotos }: { initialPhotos: FeaturedPhoto[] }) {
  const [photos, setPhotos] = useState<FeaturedPhoto[]>(
    initialPhotos.length === 3
      ? initialPhotos
      : [1, 2, 3].map((pos) => ({
          id: `new-${pos}`,
          position: pos,
          image_url: "",
          instagram_url: INSTAGRAM_URL,
          caption: "",
          updated_at: new Date().toISOString(),
        }))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const update = (index: number, field: keyof FeaturedPhoto, value: string) => {
    setPhotos((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/photos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photos.map((p) => ({
        position: p.position,
        image_url: p.image_url,
        instagram_url: p.instagram_url,
        caption: p.caption,
      }))),
    });

    if (res.ok) {
      setSaved(true);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-brown-dark">Instagram Featured Photos</h3>
          <p className="text-brown-light text-sm mt-1">
            Select 3 photos to display on the homepage. Paste a direct image URL and the Instagram post URL.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sage-dark text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved!
            </span>
          )}
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-terracotta hover:bg-terracotta-dark disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <div key={photo.position} className="bg-white border border-cream-dark rounded-2xl overflow-hidden">
            {/* Preview */}
            <div className="aspect-square bg-cream-dark relative">
              {photo.image_url ? (
                <Image
                  src={photo.image_url}
                  alt={`Photo ${photo.position}`}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => update(i, "image_url", "")}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-brown-light/40">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">No image yet</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-terracotta text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {photo.position}
              </div>
            </div>

            {/* Fields */}
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs text-brown-light font-medium block mb-1">Image URL</label>
                <input
                  type="url"
                  value={photo.image_url}
                  onChange={(e) => update(i, "image_url", e.target.value)}
                  className="w-full border border-cream-dark rounded-lg px-3 py-2 text-xs text-brown focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div>
                <label className="text-xs text-brown-light font-medium block mb-1">Instagram post URL</label>
                <input
                  type="url"
                  value={photo.instagram_url}
                  onChange={(e) => update(i, "instagram_url", e.target.value)}
                  className="w-full border border-cream-dark rounded-lg px-3 py-2 text-xs text-brown focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="https://www.instagram.com/p/..."
                />
              </div>
              <div>
                <label className="text-xs text-brown-light font-medium block mb-1">Caption (optional)</label>
                <input
                  type="text"
                  value={photo.caption}
                  onChange={(e) => update(i, "caption", e.target.value)}
                  className="w-full border border-cream-dark rounded-lg px-3 py-2 text-xs text-brown focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="Photo caption…"
                  maxLength={150}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-cream rounded-xl p-4 text-xs text-brown-light">
        <strong>Tip:</strong> To get an image URL from Instagram, open the post in a new tab, right-click the photo → &ldquo;Open image in new tab&rdquo;, then copy the URL from your browser.
      </div>
    </div>
  );
}
