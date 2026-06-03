import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mappa-di-roma.vercel.app"),
  title: "Mappa di Roma — Your Cultural Guide to Rome",
  description:
    "Discover Rome's hidden art scene, cultural events, and local gems. A community-driven guide for international students and curious visitors.",
  openGraph: {
    title: "Mappa di Roma",
    description: "Your cultural guide to Rome's art scene — for international students and curious visitors.",
    images: ["/example.jpeg"],
  },
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
