import { ImageResponse } from "next/og";

export const alt = "SinoName — Chinese names, digital name seals, and zodiac stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#ffffff", color: "#241d1e", width: "100%", height: "100%", display: "flex", padding: "64px", alignItems: "center", justifyContent: "space-between", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 710 }}>
        <div style={{ fontSize: 28, color: "#942735", marginBottom: 40 }}>SinoName</div>
        <div style={{ fontSize: 70, lineHeight: 1.05, fontWeight: 700 }}>A Chinese name that feels like you.</div>
        <div style={{ fontSize: 27, color: "#625558", marginTop: 36 }}>Name meanings · Digital seals · Zodiac stories</div>
        <div style={{ fontSize: 22, color: "#625558", marginTop: 28 }}>Discover Chinese culture, one name at a time.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 250, height: 250, border: "5px solid #942735", borderRadius: 125 }}>
        <svg width="190" height="190" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#942735" strokeWidth="5" />
          <path d="M19 34h62M19 66h62M35 10v80M65 10v80M35 50h30M50 34v32" stroke="#942735" strokeWidth="5" />
        </svg>
      </div>
    </div>,
    size,
  );
}
