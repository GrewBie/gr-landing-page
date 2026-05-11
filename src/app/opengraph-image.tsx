import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Grewbie DemoAgent — AI Sales Demo Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "999px",
            padding: "8px 18px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <span style={{ color: "#10b981", fontSize: "14px", fontWeight: 600 }}>
            Grewbie Technologies Pvt Ltd
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "62px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          Your AI that runs{" "}
          <span style={{ color: "#10b981" }}>every sales demo.</span>
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "22px",
            color: "#71717a",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "44px",
          }}
        >
          DemoAgent joins Meet, Zoom & Teams autonomously — record once, scale to infinity.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Google Meet", "Zoom", "Microsoft Teams"].map((p) => (
            <div
              key={p}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#a1a1aa",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            right: "60px",
            color: "#3f3f46",
            fontSize: "16px",
          }}
        >
          grewbie.com
        </div>
      </div>
    ),
    size
  );
}
