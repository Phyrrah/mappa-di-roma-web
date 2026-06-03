import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getFeaturedPhotos } from "@/lib/supabase";
import SurveyDashboard from "@/components/SurveyDashboard";
import AdminPhotoManager from "@/components/AdminPhotoManager";
import AdminNavbar from "@/components/AdminNavbar";

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
    color: "bg-terracotta",
    items: [
      "Development of small-scale events",
      "Joint events with partners",
      "Long-term maintenance strategy",
    ],
  },
];

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin");
  }

  const photos = await getFeaturedPhotos();

  return (
    <div className="min-h-screen bg-cream">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Project overview: Partners & Timeline */}
        <section>
          <div className="mb-6">
            <div className="text-terracotta text-xs font-medium uppercase tracking-widest mb-1">Strategy</div>
            <h2 className="font-serif text-2xl font-bold text-brown-dark">Project Roadmap</h2>
          </div>

          {/* Partner types */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-cream-dark rounded-xl p-6">
              <div className="text-terracotta text-xs font-bold uppercase tracking-widest mb-2">Type-A Partners</div>
              <h3 className="font-serif text-lg font-semibold text-brown-dark mb-2">Distribution Network</h3>
              <p className="text-brown-light text-sm leading-relaxed">
                ESN Roma, Erasmus Roma Association and student organizations — they promote
                the guide to their audience and open doors to cultural venues.
              </p>
            </div>
            <div className="bg-white border border-cream-dark rounded-xl p-6">
              <div className="text-sage-dark text-xs font-bold uppercase tracking-widest mb-2">Type-B Partners</div>
              <h3 className="font-serif text-lg font-semibold text-brown-dark mb-2">Cultural Venues</h3>
              <p className="text-brown-light text-sm leading-relaxed">
                Museums, galleries, cultural landmarks, and live venues — they provide exclusive
                rewards and host joint events, gaining targeted visibility with an engaged audience.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid md:grid-cols-3 gap-4">
            {phases.map((phase) => (
              <div key={phase.number} className="bg-white border border-cream-dark rounded-xl p-6">
                <div className={`inline-block ${phase.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                  Phase {phase.number}
                </div>
                <h3 className="font-serif text-lg font-semibold text-brown-dark mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brown-light">
                      <span className="text-terracotta mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Survey dashboard */}
        <section>
          <div className="mb-6">
            <div className="text-terracotta text-xs font-medium uppercase tracking-widest mb-1">Research</div>
            <h2 className="font-serif text-2xl font-bold text-brown-dark">Survey Data Dashboard</h2>
            <p className="text-brown-light text-sm mt-1">
              490 responses from international students in Rome — Spring 2026
            </p>
          </div>
          <SurveyDashboard />
        </section>

        {/* Photo management */}
        <section>
          <div className="mb-6">
            <div className="text-terracotta text-xs font-medium uppercase tracking-widest mb-1">Homepage</div>
            <h2 className="font-serif text-2xl font-bold text-brown-dark">Featured Instagram Photos</h2>
          </div>
          <AdminPhotoManager initialPhotos={photos} />
        </section>
      </div>
    </div>
  );
}
