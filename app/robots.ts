import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Search discovery rules preserve the same API restriction as the wildcard.
      // Search and model-training policies are separate; no training policy is changed here.
      { userAgent: ["OAI-SearchBot", "PerplexityBot"], allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
