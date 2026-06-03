import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Partnerships",
  description:
    "Partner with Mappa di Roma — join as a distribution partner (Type-A) or cultural venue (Type-B). Launch your own illustrated cultural guide in your city. Contact us for collaboration opportunities.",
  alternates: {
    canonical: "https://mappa-di-roma-web.vercel.app/contact",
  },
};

const EMAIL = "bpierre@student.romebusinessschool.com";

export default function ContactPage() {
  const partnerTypes = [
    {
      type: "Type-A Partner",
      subtitle: "Distribution & Visibility",
      color: "terracotta",
      description:
        "You are a student organization, university network, or community platform that can help distribute the guide to your audience.",
      examples: "ESN, Erasmus associations, university groups, student media...",
      subject: "Type-A Partnership — Distribution",
    },
    {
      type: "Type-B Partner",
      subtitle: "Cultural Venues & Events",
      color: "sage",
      description:
        "You are a cultural venue, gallery, museum, or event organizer that wants to reach an engaged international audience.",
      examples: "Galleries, museums, live venues, bookshops, cultural spaces...",
      subject: "Type-B Partnership — Cultural Venue",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="bg-cream/95 backdrop-blur-sm border-b border-cream-dark px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold text-brown-dark tracking-wide">
            Mappa di Roma
          </Link>
          <Link href="/" className="text-sm text-brown-light hover:text-terracotta transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-terracotta font-medium text-sm uppercase tracking-widest mb-4">
            Get in touch
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            Become a partner
          </h1>
          <p className="text-brown-light max-w-xl mx-auto leading-relaxed">
            Whether you want to help distribute the guide in Rome or launch your own
            local version in another city, we&apos;d love to hear from you.
          </p>
        </div>

        {/* Partner types */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {partnerTypes.map((p) => (
            <div
              key={p.type}
              className={`bg-white rounded-2xl p-8 border border-cream-dark hover:shadow-lg transition-shadow`}
            >
              <div className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                p.color === "terracotta"
                  ? "bg-terracotta/10 text-terracotta"
                  : "bg-sage/10 text-sage-dark"
              }`}>
                {p.type}
              </div>
              <h3 className="font-serif text-xl font-bold text-brown-dark mb-3">{p.subtitle}</h3>
              <p className="text-brown-light text-sm leading-relaxed mb-4">{p.description}</p>
              <p className="text-brown-light/60 text-xs italic mb-6">{p.examples}</p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(p.subject)}`}
                className={`inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  p.color === "terracotta"
                    ? "bg-terracotta hover:bg-terracotta-dark"
                    : "bg-sage hover:bg-sage-dark"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact us
              </a>
            </div>
          ))}
        </div>

        {/* Launch your own guide */}
        <div className="bg-brown-dark rounded-2xl p-10 text-white text-center mb-16">
          <div className="text-terracotta-light text-xs font-medium uppercase tracking-widest mb-3">
            Scalability
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4">
            Launch your own local guide
          </h2>
          <p className="text-white/60 max-w-lg mx-auto leading-relaxed mb-6">
            The Mappa di Roma model is designed to be replicated in any student-heavy
            or touristic city. If you&apos;re based in Bologna, Florence, Milan, Barcelona,
            Berlin, Amsterdam, Paris, or anywhere else — we can help you get started.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["Bologna", "Firenze", "Milan", "Barcelona", "Berlin", "Amsterdam", "Paris", "Your city?"].map((city) => (
              <span
                key={city}
                className={`text-xs px-3 py-1.5 rounded-full ${
                  city === "Your city?"
                    ? "bg-terracotta text-white font-medium"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {city}
              </span>
            ))}
          </div>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Launch a local guide — [Your City]")}&body=${encodeURIComponent("Hi,\n\nI'm interested in launching a local version of Mappa di Roma in my city.\n\nCity: \nUniversity/Organization: \n\nLooking forward to hearing from you!")}`}
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get in touch — tell us your city
          </a>
        </div>

        {/* Direct contact */}
        <div className="text-center">
          <p className="text-brown-light text-sm mb-2">For any other inquiry, reach us directly at:</p>
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-terracotta hover:text-terracotta-dark transition-colors"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
