import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naples-electrical.vercel.app";
  const now = new Date();

  const serviceUrls: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...serviceUrls,
  ];
}
