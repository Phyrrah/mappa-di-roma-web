export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mappa di Roma",
    url: "https://mappa-di-roma-web.vercel.app",
    logo: "https://mappa-di-roma-web.vercel.app/example.jpeg",
    description:
      "Community-driven cultural guide to Rome for international students — illustrated neighborhood maps, local addresses, and art events.",
    sameAs: ["https://www.instagram.com/pierrebrancart/"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "bpierre@student.romebusinessschool.com",
      contactType: "partnerships",
    },
    foundingDate: "2026",
    founder: [
      { "@type": "Person", name: "Claudia Ciardiello" },
      { "@type": "Person", name: "Pierre Brancart" },
      { "@type": "Person", name: "Giulia Mologni" },
      { "@type": "Person", name: "Adriane Bordin" },
      { "@type": "Person", name: "Anaya Ambalal" },
      { "@type": "Person", name: "Tamar Kiphiani" },
    ],
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "Rome Business School",
      url: "https://www.romebusinessschool.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mappa di Roma",
    url: "https://mappa-di-roma-web.vercel.app",
    description:
      "Free illustrated cultural guide to Rome — hand-drawn neighborhood maps, art galleries, cultural events, and local addresses for Erasmus students and visitors.",
    inLanguage: ["en", "fr", "it"],
    about: {
      "@type": "City",
      name: "Rome",
      alternateName: "Roma",
      containedInPlace: {
        "@type": "Country",
        name: "Italy",
      },
    },
  };

  const bookletSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Mappa di Roma — Illustrated Cultural Guide to Rome",
    description:
      "48-page hand-illustrated scrapbook guide covering Rome's cultural neighborhoods with maps, local addresses, and personal recommendations. Free PDF download.",
    url: "https://github.com/Phyrrah/mappa-di-roma-web/releases/download/v1.0/Booklet.pdf",
    author: { "@type": "Person", name: "Pierre Brancart" },
    publisher: { "@type": "Organization", name: "Mappa di Roma" },
    datePublished: "2026",
    inLanguage: "fr",
    numberOfPages: 48,
    genre: ["Travel guide", "Cultural guide", "Scrapbook"],
    about: {
      "@type": "City",
      name: "Rome",
    },
    isAccessibleForFree: true,
    audience: {
      "@type": "Audience",
      audienceType: "International students, Erasmus students, tourists, visitors",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mappa-di-roma-web.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact & Partnerships",
        item: "https://mappa-di-roma-web.vercel.app/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookletSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
