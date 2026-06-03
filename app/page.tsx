import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import ProjectSection from "@/components/ProjectSection";
import GuideSection from "@/components/GuideSection";
import ContestsSection from "@/components/ContestsSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import { getFeaturedPhotos } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mappa di Roma — Free Illustrated Cultural Guide to Rome",
  description:
    "Download the free illustrated scrapbook guide to Rome's art scene. Hand-drawn neighborhood maps, cultural events, local addresses — for Erasmus students, exchange programs, and curious visitors. Join the community.",
  alternates: {
    canonical: "https://mappa-di-roma-web.vercel.app",
  },
};

export default async function HomePage() {
  const photos = await getFeaturedPhotos();

  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <GuideSection />
        <ContestsSection />
        <InstagramSection photos={photos} />
        <ProjectSection />
      </main>
      <Footer />
    </>
  );
}
