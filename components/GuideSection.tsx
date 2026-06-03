import Image from "next/image";

export default function GuideSection() {
  const features = [
    {
      icon: "🗺️",
      title: "Hand-illustrated Maps",
      desc: "Beautiful hand-drawn maps of each Roman neighborhood, curated for cultural exploration.",
    },
    {
      icon: "🎨",
      title: "Art & Culture Focus",
      desc: "From MAXXI to hidden galleries — every cultural space that matters to the curious visitor.",
    },
    {
      icon: "🍕",
      title: "Local Addresses",
      desc: "Favorite gelaterie, enoteca, and bookshops — the real Rome, beyond tourist trails.",
    },
    {
      icon: "✨",
      title: "Customizable",
      desc: "A neutral, free-access folio you can make your own — add your own discoveries.",
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

        {/* Two example spreads */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="relative group">
            <div className="absolute -inset-3 bg-terracotta/20 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/example.jpeg"
                alt="Example page from the Mappa di Roma booklet showing Foro Romano"
                width={600}
                height={420}
                className="w-full h-auto"
              />
              <div className="absolute bottom-3 left-3 bg-terracotta text-white text-xs font-medium px-3 py-1 rounded-full">
                Foro Romano
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-3 bg-sage/20 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/example-trastevere.jpeg"
                alt="Example page from the Mappa di Roma booklet showing Trastevere"
                width={600}
                height={420}
                className="w-full h-auto"
              />
              <div className="absolute bottom-3 left-3 bg-sage-dark text-white text-xs font-medium px-3 py-1 rounded-full">
                Trastevere
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((f) => (
            <div key={f.title} className="bg-cream-dark rounded-xl p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-semibold text-brown-dark text-sm mb-1">{f.title}</div>
              <div className="text-brown-light text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="bg-terracotta/10 border border-terracotta/20 rounded-2xl p-8 text-center">
          <div className="font-serif text-2xl font-semibold text-brown-dark mb-2">
            Download the full Booklet
          </div>
          <p className="text-brown-light text-sm mb-5 max-w-lg mx-auto">
            48 pages of illustrated maps, cultural recommendations, and local addresses —
            covering Rome&apos;s most vibrant neighborhoods.
          </p>
          <a
            href="https://github.com/Phyrrah/mappa-di-roma-web/releases/download/v1.0/Booklet.pdf"
            className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20"
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
    </section>
  );
}
