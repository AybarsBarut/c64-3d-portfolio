import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aybarsbarut.com.tr/",
      lastModified: new Date("2026-08-06T12:45:00+03:00"),
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://aybarsbarut.com.tr/opengraph-image.png"],
    },
  ];
}
