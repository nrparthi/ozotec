import type { MetadataRoute } from "next";
import { MODELS } from "@/lib/data";

// shortcut: domain hard-coded to the current site; move to an env var when deploying elsewhere.
const BASE = "https://www.ozotecev.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/book", "/compare", "/lease", "/finance", "/dealers", "/about", "/support", ...MODELS.map((m) => `/models/${m.id}`)];
  return pages.map((p) => ({ url: BASE + p, lastModified: new Date() }));
}

export const dynamic = "force-static";
