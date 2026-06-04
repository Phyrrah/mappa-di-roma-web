import Image from "next/image";

export default function GuideSection() {
  const features = [
    {
      title: "Hand-illustrated Maps",
      desc: "Beautiful hand-drawn maps of each Roman neighborhood, curated for cultural exploration.",
    },
    {
      title: "Art & Culture Focus",
      desc: "From MAXXI to hidden galleries — every cultural space that matters to the curious visitor.",
    },
    {
      title: "Local Addresses",
      desc: "Favorite gelaterie, enoteca, and bookshops — the real Rome, beyond tourist trails.",
    },
    {
      title: "Ideal for Scrapbooking",
      desc: "A blank canvas to fill with your own notes, drawings, and memories — make Rome yours.",
    },
  ];

  return (
    <section id="guide" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-terracotta font-medium text-sm uppercase tracking-widest mb-4">
            The Guide
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            Rome, neighborhood by neighborhood
          </h2>
          <p className="text-brown-light max-w-2xl mx-auto leading-relaxed">
            A beautifully illustrated guide covering Rome&apos;s key cultural neighborhoods.
            Free to download, free to customize, and designed to become your personal cultural compass.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image preview */}
          <div className="relative group">
            <div className="absolute -inset-3 bg-terracotta/20 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/example.jpeg"
                alt="Example page from the MappaRoma booklet showing Foro Romano"
                width={600}
                height={420}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Features + CTA */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-cream-dark rounded-xl p-4">
                  <div className="font-semibold text-brown-dark text-sm mb-1">{f.title}</div>
                  <div className="text-brown-light text-xs leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-terracotta/10 border border-terracotta/20 rounded-2xl p-6">
              <div className="font-serif text-xl font-semibold text-brown-dark mb-2">
                Download the full Booklet
              </div>
              <p className="text-brown-light text-sm mb-4">
                48 pages of illustrated maps, cultural recommendations, and local addresses —
                covering Rome&apos;s most vibrant neighborhoods.
              </p>
              <a
                href="https://github.com/Phyrrah/mapparoma-web/releases/download/v1.0/Booklet.pdf"
                className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download free — PDF (75 MB)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
