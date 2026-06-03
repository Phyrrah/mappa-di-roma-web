const contests = [
  {
    title: "Roma si mette in scena",
    subtitle: "Cinema & the City",
    description:
      "Explore iconic filming locations across Rome — from Roman Holiday to La Grande Bellezza. Create your own cinematic tour.",
    tags: ["Cinema", "Itinerary", "Cinecittà"],
    color: "from-terracotta/20 to-rose-mappa/20",
    accent: "text-terracotta",
  },
  {
    title: "The Great Rivalry",
    subtitle: "Art History Clash",
    description:
      "Bernini vs Borromini, Caravaggio vs Baglione, Baroque vs Classical. Discover Rome through its greatest artistic rivalries.",
    tags: ["Art history", "Architecture", "Baroque"],
    color: "from-sage/20 to-sage/10",
    accent: "text-sage-dark",
  },
  {
    title: "Women of Rome",
    subtitle: "Hidden Herstories",
    description:
      "Lucrezia Borgia, Messalina, Agrippina — Rome's remarkable women and the spaces they shaped. An alternative tour of the city.",
    tags: ["History", "Culture", "Women"],
    color: "from-rose-mappa/30 to-cream-dark",
    accent: "text-brown",
  },
  {
    title: "Art Galleries of Rome",
    subtitle: "Contemporary Scene",
    description:
      "From Via Margutta to experimental spaces in San Lorenzo — explore Rome's contemporary gallery circuit beyond the museums.",
    tags: ["Contemporary art", "Galleries", "Local"],
    color: "from-terracotta/10 to-sage/10",
    accent: "text-terracotta",
  },
];

export default function ContestsSection() {
  return (
    <section id="community" className="py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-terracotta font-medium text-sm uppercase tracking-widest mb-4">
            Community Contests
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            Create your own map of Rome
          </h2>
          <p className="text-brown-light max-w-2xl mx-auto leading-relaxed">
            Each month, a new theme is proposed. Participants create and share their
            personal map — the best entry is featured and wins exclusive partner rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contests.map((contest) => (
            <div
              key={contest.title}
              className={`bg-gradient-to-br ${contest.color} rounded-2xl p-8 border border-white/50`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`text-xs font-medium uppercase tracking-widest ${contest.accent} mb-1`}>
                    {contest.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brown-dark">
                    {contest.title}
                  </h3>
                </div>
                <div className="text-3xl">✦</div>
              </div>
              <p className="text-brown-light leading-relaxed mb-4">{contest.description}</p>
              <div className="flex flex-wrap gap-2">
                {contest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/60 text-brown text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-brown-dark rounded-2xl p-10 text-white text-center">
          <h3 className="font-serif text-2xl font-bold mb-8">How it works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Get the guide", desc: "Download the free Mappa di Roma booklet and explore your chosen neighborhood." },
              { step: "2", title: "Create your map", desc: "Build your own thematic itinerary — digitally with Google My Maps or on paper." },
              { step: "3", title: "Share & win", desc: "Submit your map on Instagram. The best entry wins exclusive partner rewards." },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <div className="font-serif text-lg font-semibold">{item.title}</div>
                <div className="text-white/60 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
