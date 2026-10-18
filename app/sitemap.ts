import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import publicPaths from "@/lib/public-paths.json";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until real content revision dates are maintained.
  return publicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
