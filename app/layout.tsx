import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://mapparoma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MappaRoma — Cultural Guide to Rome for International Students",
    template: "%s | MappaRoma",
  },
  description:
    "Free illustrated scrapbook guide to Rome's art, culture, and hidden gems. Hand-drawn neighborhood maps, local addresses, and community-driven events — designed for Erasmus students, exchange programs, and curious visitors in Rome.",
  keywords: [
    "Rome cultural guide",
    "MappaRoma",
    "Rome art guide",
    "Erasmus Rome",
    "international students Rome",
    "Rome neighborhoods guide",
    "Rome scrapbook",
    "Rome illustrated map",
    "cultural events Rome",
    "free Rome guide",
    "Rome hidden gems",
    "Rome galleries",
    "Rome art scene",
    "study abroad Rome",
    "Rome travel journal",
    "Rome scrapbooking",
    "guida culturale Roma",
    "art galleries Rome",
    "Rome museum guide",
    "Rome student guide",
    "Trastevere guide",
    "Foro Romano guide",
    "Rome booklet",
    "community cultural guide",
    "Rome local tips",
    "Rome Business School",
  ],
  authors: [{ name: "MappaRoma Team — Rome Business School" }],
  creator: "MappaRoma",
  publisher: "MappaRoma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["it_IT", "fr_FR"],
    url: siteUrl,
    siteName: "MappaRoma",
    title: "MappaRoma — Free Cultural Guide to Rome",
    description:
      "Discover Rome's hidden art scene with hand-illustrated neighborhood maps, local addresses, and community contests. Free illustrated guide for Erasmus students and visitors.",
    images: [
      {
        url: "/example.jpeg",
        width: 1200,
        height: 850,
        alt: "MappaRoma — hand-illustrated guide page showing Foro Romano neighborhood with map, addresses, and travel notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MappaRoma — Free Cultural Guide to Rome",
    description:
      "Hand-illustrated neighborhood maps, cultural events, and local gems for international students in Rome. Download free.",
    images: ["/example.jpeg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "R3eB-DqvtAXUedMvLtG1UYu1GsVEPlkJHGLZXsVbK0A",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
