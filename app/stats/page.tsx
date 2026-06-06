import type { Metadata } from "next";
import Link from "next/link";
import SurveyDashboard from "@/components/SurveyDashboard";

export const metadata: Metadata = {
  title: "Survey Data — MappaRoma",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Minimal nav */}
      <nav className="bg-cream/95 backdrop-blur-sm border-b border-cream-dark px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-grotesk text-xl text-brown-dark"
            style={{ fontWeight: 800 }}
          >
            mappa<span className="text-saffron">roma</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-brown-light">
            <span className="font-mono-mappa text-xs uppercase tracking-widest text-brown-light/50">
              Survey Data
            </span>
            <Link
              href="/"
              className="hover:text-terracotta transition-colors"
            >
              ← Homepage
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <div className="text-terracotta text-xs font-medium uppercase tracking-widest mb-2">
            Research
          </div>
          <h1 className="font-serif text-3xl font-bold text-brown-dark mb-2">
            Survey Data Dashboard
          </h1>
          <p className="text-brown-light text-sm">
            490 responses from international students in Rome — Spring 2026
          </p>
        </div>
        <SurveyDashboard />
      </div>
    </div>
  );
}
