import Image from "next/image";
import Link from "next/link";
import GuideDownloadButton from "./GuideDownloadButton";

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 flex items-center bg-gradient-to-br from-cream via-cream to-cream-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
            Rome, 2026 — Student Cultural Project
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-brown-dark leading-tight">
            Your personal <br />
            <span className="text-terracotta italic">map of Rome</span>
          </h1>

          <p className="text-lg text-brown-light leading-relaxed max-w-lg">
            A community-driven guide to Rome&apos;s hidden art scene, cultural micro-events,
            and local gems — designed for international students and curious visitors.
            Perfect for scrapbooking your own Roman adventure.
          </p>

          <div className="flex flex-wrap gap-4">
            <GuideDownloadButton className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download the Booklet
            </GuideDownloadButton>
            <Link
              href="#project"
              className="inline-flex items-center gap-2 border-2 border-brown/30 text-brown px-6 py-3 rounded-full font-medium hover:border-terracotta hover:text-terracotta transition-colors"
            >
              Discover the project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 pt-4 border-t border-cream-dark">
            <div>
              <div className="font-serif text-3xl font-bold text-terracotta">490</div>
              <div className="text-xs text-brown-light mt-1">survey responses</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-crimson">62%</div>
              <div className="text-xs text-brown-light mt-1">want a platform</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-terracotta">40k</div>
              <div className="text-xs text-brown-light mt-1">intl. students in Rome</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="absolute -inset-4 bg-terracotta/10 rounded-3xl rotate-2" />
          <div className="absolute -inset-4 bg-crimson/15 rounded-3xl -rotate-1" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/example.jpeg"
              alt="MappaRoma illustrated scrapbook guide — hand-drawn cultural map of Foro Romano neighborhood in Rome with local addresses, walking routes, and personal souvenirs"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-terracotta text-white rounded-2xl px-4 py-3 shadow-lg">
            <div className="font-serif text-lg font-bold">Foro Romano</div>
            <div className="text-xs opacity-80">Illustrated neighborhood guide</div>
          </div>
        </div>
      </div>
    </section>
  );
}
