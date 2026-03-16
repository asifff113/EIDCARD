"use client";

import type { CardCustomization } from "@/types/editor";

export default function TextTab({
  customization,
  accent,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "8px",
    color: "#e0e0e0",
    padding: "10px 14px",
    fontSize: "13px",
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
    </div>
  );
}
