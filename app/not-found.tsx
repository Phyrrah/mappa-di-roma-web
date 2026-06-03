import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-serif text-8xl font-bold text-terracotta/20 mb-4">404</div>
        <h1 className="font-serif text-3xl font-bold text-brown-dark mb-4">
          Lost in Rome?
        </h1>
        <p className="text-brown-light mb-8 max-w-md mx-auto">
          This page doesn&apos;t exist — but Rome&apos;s hidden gems are waiting for you.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors"
        >
          Back to the map
        </Link>
      </div>
    </div>
  );
}
