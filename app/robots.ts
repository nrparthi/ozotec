import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://www.ozotecev.com/sitemap.xml" };
}

export const dynamic = "force-static";
