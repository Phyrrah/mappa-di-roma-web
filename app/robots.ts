import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/stats", "/design"],
      },
    ],
    sitemap: "https://mapparoma.vercel.app/sitemap.xml",
  };
}
