export default function ProjectSection() {
  const phases = [
    {
      number: "01",
      title: "Development & Launch",
      color: "bg-terracotta",
      items: [
        "Finalization of the Guide prototype",
        "Social media launch for partners",
        "Pitching to Type-A & B partners",
      ],
    },
    {
      number: "02",
      title: "Community Engagement",
      color: "bg-sage",
      items: [
        "Full social media launch with partners",
        "First curated content & contests",
        "Reaching minimal audience threshold",
      ],
    },
    {
      number: "03",
      title: "Community Development",
      color: "bg-rose-mappa",
      items: [
        "Development of small-scale events",
        "Joint events with partners",
        "Long-term maintenance strategy",
      ],
    },
  ];

  return (
    <section id="project" className="py-24 bg-brown-dark text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="text-terracotta-light font-medium text-sm uppercase tracking-widest mb-4">
              The Project
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Bridging the gap between students and Rome&apos;s cultural scene
            </h2>
          </div>
          <div className="flex flex-col justify-center space-y-4 text-white/70 leading-relaxed">
            <p>
              <strong className="text-white">Mappa di Roma</strong> enhances the visibility of
              Rome&apos;s art and cultural events through user-generated content, designed for
              short and medium-term visitors — Erasmus students, exchange programs, and tourists.
            </p>
            <p>
              It bridges the gap between short-term cultural micro-events and a new audience,
              by offering a free illustrated guide and a community-driven social media presence
              that amplifies visibility and engagement.
            </p>
            <p className="text-sm">
              A project by <span className="text-white">Rome Business School</span> students —
              Claudia Ciardiello, Pierre Brancart, Giulia Mologni, Adriane Bordin, Anaya Ambalal &amp; Tamar Kiphiani.
            </p>
          </div>
        </div>

        {/* Two types of partners */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-terracotta-light text-sm font-medium uppercase tracking-widest mb-3">Type-A Partners</div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Distribution Network</h3>
            <p className="text-white/70 leading-relaxed">
              ESN Roma, Erasmus Roma Association and student organizations — they promote
              the guide to their audience and open doors to cultural venues.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-sage-light text-sm font-medium uppercase tracking-widest mb-3">Type-B Partners</div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Cultural Venues</h3>
            <p className="text-white/70 leading-relaxed">
              Museums, galleries, cultural landmarks, and live venues — they provide exclusive
              rewards and host joint events, gaining targeted visibility with an engaged audience.
            </p>
          </div>
        </div>

        {/* Timeline phases */}
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div key={phase.number} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className={`inline-block ${phase.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}>
                Phase {phase.number}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-terracotta-light mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
