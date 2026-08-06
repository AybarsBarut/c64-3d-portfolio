import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://aybarsbarut.com.tr/sitemap.xml",
    host: "https://aybarsbarut.com.tr",
  };
}
