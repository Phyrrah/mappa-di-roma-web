export default function ProjectSection() {
  return (
    <section id="project" className="py-24 bg-brown-dark text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
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
              <strong className="text-white">MappaRoma</strong> enhances the visibility of
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
      </div>
    </section>
  );
}
