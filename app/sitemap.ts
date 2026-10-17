import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until real content revision dates are maintained.
  return ["", "/create", "/methodology", "/chinese-name-seal", "/chinese-zodiac", "/privacy", "/faq", "/chinese-name-examples", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
