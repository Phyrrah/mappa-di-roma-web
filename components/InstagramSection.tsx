import { FeaturedPhoto } from "@/lib/supabase";
import Image from "next/image";

const INSTAGRAM_URL = "https://www.instagram.com/mappadiroma/";

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function PhotoCard({ photo }: { photo: FeaturedPhoto }) {
  const hasImage = photo.image_url && photo.image_url.trim() !== "";
  return (
    <a
      href={photo.instagram_url || INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative rounded-2xl overflow-hidden aspect-square bg-cream-dark hover:shadow-xl transition-shadow"
    >
      {hasImage ? (
        <Image
          src={photo.image_url}
          alt={photo.caption || "MappaRoma Instagram photo"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cream to-cream-dark gap-3">
          <InstagramIcon className="w-10 h-10 text-terracotta/40" />
          <span className="text-xs text-brown-light/50">Photo coming soon</span>
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/30 transition-colors flex items-end p-4">
        {photo.caption && (
          <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
            {photo.caption}
          </p>
        )}
      </div>
      {/* Instagram icon badge */}
      <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <InstagramIcon className="w-4 h-4 text-terracotta" />
      </div>
    </a>
  );
}

export default function InstagramSection({ photos }: { photos: FeaturedPhoto[] }) {
  return (
    <section id="instagram" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="text-terracotta font-medium text-sm uppercase tracking-widest mb-3">
              Follow the adventure
            </div>
            <h2 className="font-serif text-4xl font-bold text-brown-dark">
              @mappadiroma on Instagram
            </h2>
            <p className="text-brown-light mt-2">
              User-generated maps, event discoveries, and behind-the-scenes from Rome.
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gradient-to-r from-terracotta to-rose-mappa text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-terracotta/30 transition-all whitespace-nowrap"
          >
            <InstagramIcon />
            Follow us
          </a>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-brown-light text-sm mb-4">
            Share your own Roman discoveries with <strong className="text-brown">#mappadiroma</strong>
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-terracotta text-terracotta px-6 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta hover:text-white transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            See all posts on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
