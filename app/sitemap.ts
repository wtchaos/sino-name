import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import publicPaths from "@/lib/public-paths.json";
import contentUpdates from "@/lib/content-updates.json";

export default function sitemap(): MetadataRoute.Sitemap {
  // Record actual content revisions; never substitute the build or request date.
  const updates: Record<string, string> = contentUpdates;
  return publicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    ...(updates[path || "/"] ? { lastModified: updates[path || "/"] } : {}),
  }));
}
