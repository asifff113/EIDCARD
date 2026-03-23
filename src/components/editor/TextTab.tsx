"use client";

import type { CardCustomization } from "@/types/editor";

export default function TextTab({
  customization,
  accent,
  onChange,
  onResetCoverTextPosition,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
  onResetCoverTextPosition?: () => void;
}) {
  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "8px",
    color: "#e0e0e0",
    padding: "10px 14px",
    fontSize: "16px",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
    transition: "border-color .2s",
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,.35)",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label style={labelStyle}>Greeting</label>
        <input
          style={inputStyle}
          value={customization.greeting}
          onChange={(e) => onChange({ greeting: e.target.value })}
          maxLength={30}
          placeholder="Eid Mubarak"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div>
        <label style={labelStyle}>Arabic Greeting</label>
        <input
          style={{ ...inputStyle, direction: "rtl", fontFamily: "var(--font-amiri), 'Amiri', serif", fontSize: "16px" }}
          value={customization.greetingAr}
          onChange={(e) => onChange({ greetingAr: e.target.value })}
          maxLength={50}
          placeholder="\u0639\u064a\u062f \u0645\u0628\u0627\u0631\u0643"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div>
        <label style={labelStyle}>To (Recipient)</label>
        <input
          style={inputStyle}
          value={customization.recipientName}
          onChange={(e) => onChange({ recipientName: e.target.value })}
          maxLength={40}
          placeholder="Dear Brother Ahmad..."
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div>
        <label style={labelStyle}>Personal Message</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={customization.personalMessage}
          onChange={(e) => onChange({ personalMessage: e.target.value })}
          maxLength={120}
          placeholder="Wishing you a blessed Eid filled with joy..."
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
        <div className="text-right mt-1" style={{ fontSize: "9px", color: "rgba(255,255,255,.2)" }}>
          {customization.personalMessage.length}/120
        </div>
      </div>

      <div>
        <label style={labelStyle}>From (Sender)</label>
        <input
          style={inputStyle}
          value={customization.senderName}
          onChange={(e) => onChange({ senderName: e.target.value })}
          maxLength={30}
          placeholder="With love, Fatima"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div>
        <label style={labelStyle}>Year</label>
        <input
          style={inputStyle}
          value={customization.year}
          onChange={(e) => onChange({ year: e.target.value })}
          maxLength={20}
          placeholder="1446 Hijri"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div
        style={{
          padding: "12px 14px",
          borderRadius: "10px",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div style={labelStyle}>Cover Text Position</div>
        <p
          style={{
            fontSize: "12px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,.5)",
            margin: 0,
          }}
        >
          Drag the cover text directly on the preview to place it where you want.
        </p>
        {onResetCoverTextPosition && (
          <button
            onClick={onResetCoverTextPosition}
            style={{
              marginTop: "10px",
              border: `1px solid ${accent}30`,
              background: `${accent}12`,
              color: accent,
              borderRadius: "999px",
              padding: "8px 12px",
              fontSize: "10px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            Reset Text Position
          </button>
        )}
      </div>
    </div>
  );
}
