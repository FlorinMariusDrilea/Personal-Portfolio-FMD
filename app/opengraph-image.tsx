import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#a1a1aa",
            fontSize: "28px",
            letterSpacing: "4px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background: "#10b981",
            }}
          />
          AVAILABLE FOR NEW OPPORTUNITIES
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-2px",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: "36px", color: "#ef4444" }}>
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717a",
            fontSize: "26px",
          }}
        >
          <span>{profile.location}</span>
          <span>github.com/FlorinMariusDrilea</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
