import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Ozotec EV: book, finance or lease in three taps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// shortcut: the share-image font has no ₹ glyph, so "Rs" is used here; bundle a TTF with ₹ if the brand wants the symbol.
export default async function OG() {
  const bike = await readFile(path.join(process.cwd(), "public/ozotec/cut/flio-neo.png"));
  const src = `data:image/png;base64,${bike.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg,#01163b 0%,#000814 100%)", color: "white", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 620, gap: 24 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#ff6a6a" }}>OZOTEC EV · COIMBATORE</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1 }}>Book, finance or lease in three taps.</div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,.7)" }}>21 battery options · 40 to 240 km · from Rs 51,500</div>
        </div>
        <img src={src} width={440} height={590} style={{ objectFit: "contain" }} alt="" />
      </div>
    ),
    size,
  );
}
