import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// shortcut: drawn monogram until Ozotec supplies a square app icon of their emblem.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#01163b" }}>
        <div style={{ width: 340, height: 340, borderRadius: 999, border: "44px solid #e03b3b", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 70, height: 150, background: "#ffffff", transform: "skewX(-18deg)", borderRadius: 12 }} />
        </div>
      </div>
    ),
    size,
  );
}
