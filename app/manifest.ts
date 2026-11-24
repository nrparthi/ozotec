import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ozotec EV",
    short_name: "Ozotec",
    description: "Book, finance or lease an Ozotec electric scooter or MUV.",
    start_url: "/",
    display: "standalone",
    background_color: "#000814",
    theme_color: "#01163b",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" }],
    shortcuts: [
      { name: "Book a test ride", url: "/book?mode=test" },
      { name: "Lease plans", url: "/lease" },
    ],
  };
}
