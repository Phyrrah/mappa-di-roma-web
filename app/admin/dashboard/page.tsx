import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getFeaturedPhotos } from "@/lib/supabase";
import SurveyDashboard from "@/components/SurveyDashboard";
import AdminPhotoManager from "@/components/AdminPhotoManager";
import AdminNavbar from "@/components/AdminNavbar";

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
        {/* Photo management */}
        <section>
          <div className="mb-6">
            <div className="text-terracotta text-xs font-medium uppercase tracking-widest mb-1">Homepage</div>
            <h2 className="font-serif text-2xl font-bold text-brown-dark">Featured Instagram Photos</h2>
          </div>
          <AdminPhotoManager initialPhotos={photos} />
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
      </div>
    </div>
  );
}
