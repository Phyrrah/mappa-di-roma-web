import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import GuideSection from "@/components/GuideSection";
import ContestsSection from "@/components/ContestsSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import { getFeaturedPhotos } from "@/lib/supabase";

export const revalidate = 60;

export default async function HomePage() {
  const photos = await getFeaturedPhotos();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectSection />
        <GuideSection />
        <ContestsSection />
        <InstagramSection photos={photos} />
      </main>
      <Footer />
    </>
  );
}
