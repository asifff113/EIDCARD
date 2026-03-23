"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import type {
  CardCustomization,
  PaperAlignment,
  PaperBorderStyle,
  PaperDecoration,
  PaperFont,
  PaperTheme,
  GradientDirection,
} from "@/types/editor";

const PAPER_THEMES: { value: PaperTheme; label: string; swatch: string; desc: string }[] = [
  {
    value: "parchment",
    label: "Parchment",
    swatch: "radial-gradient(circle at 18% 24%, rgba(226,184,99,.28) 0%, transparent 28%), linear-gradient(135deg, #fbf4e2 0%, #ead2a4 100%)",
    desc: "Warm aged paper with gilded wash",
  },
  {
    value: "linen",
    label: "Linen Letter",
    swatch: "repeating-linear-gradient(0deg, rgba(186,166,132,.12) 0, rgba(186,166,132,.12) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(186,166,132,.08) 0, rgba(186,166,132,.08) 1px, transparent 1px, transparent 8px), linear-gradient(135deg, #faf7ef 0%, #e7dfcf 100%)",
    desc: "Cotton stationery with woven texture",
  },
  {
    value: "pressed-floral",
    label: "Pressed Floral",
    swatch: "radial-gradient(circle at 22% 26%, rgba(233,183,180,.38) 0%, transparent 18%), radial-gradient(circle at 80% 72%, rgba(186,208,162,.34) 0%, transparent 20%), linear-gradient(135deg, #fff8f1 0%, #f2ddd3 100%)",
    desc: "Soft floral keepsake sheet",
  },
  {
    value: "ledger",
    label: "Ledger Page",
    swatch: "repeating-linear-gradient(180deg, transparent 0, transparent 11px, rgba(104,126,171,.2) 11px, rgba(104,126,171,.2) 12px), linear-gradient(135deg, #fcfaf4 0%, #efe7d5 100%)",
    desc: "Ruled page with note-writing lines",
  },
  {
    value: "marble",
    label: "Marbled Ink",
    swatch: "radial-gradient(circle at 20% 24%, rgba(119,148,112,.28) 0%, transparent 16%), radial-gradient(circle at 68% 42%, rgba(205,178,120,.22) 0%, transparent 18%), linear-gradient(135deg, #f8f5ef 0%, #dbe2d1 100%)",
    desc: "Ink-marble swirls like a luxury insert",
  },
  {
    value: "moonlit-vellum",
    label: "Moonlit Vellum",
    swatch: "radial-gradient(circle at 72% 24%, rgba(255,245,199,.26) 0%, transparent 16%), linear-gradient(135deg, #12253d 0%, #21324f 100%)",
    desc: "Dark vellum manuscript with lunar glow",
  },
  {
    value: "illumined-manuscript",
    label: "Illumined",
    swatch: "radial-gradient(circle at 18% 22%, rgba(255,224,151,.34) 0%, transparent 20%), radial-gradient(circle at 82% 76%, rgba(196,152,78,.22) 0%, transparent 18%), linear-gradient(135deg, #fdf8e8 0%, #f0dfb3 100%)",
    desc: "Gilded folio with manuscript ornament",
  },
  {
    value: "watercolor-garden",
    label: "Watercolor Garden",
    swatch: "radial-gradient(circle at 20% 30%, rgba(250,184,160,.32) 0%, transparent 18%), radial-gradient(circle at 72% 28%, rgba(171,208,239,.28) 0%, transparent 20%), radial-gradient(circle at 78% 76%, rgba(186,215,160,.26) 0%, transparent 18%), linear-gradient(135deg, #fffaf4 0%, #e9eef5 100%)",
    desc: "Paint-washed page with garden softness",
  },
  {
    value: "rosewater-letter",
    label: "Rosewater Letter",
    swatch: "radial-gradient(circle at 18% 24%, rgba(235,180,185,.34) 0%, transparent 18%), radial-gradient(circle at 78% 76%, rgba(228,198,168,.22) 0%, transparent 20%), linear-gradient(135deg, #fffaf7 0%, #f1dbdd 100%)",
    desc: "Blush stationery with perfumed bloom",
  },
  {
    value: "tea-stained-notebook",
    label: "Tea-Stained Notebook",
    swatch: "radial-gradient(circle at 22% 20%, rgba(173,120,58,.18) 0%, transparent 20%), radial-gradient(circle at 76% 78%, rgba(128,88,46,.14) 0%, transparent 22%), repeating-linear-gradient(180deg, transparent 0, transparent 11px, rgba(116,114,109,.14) 11px, rgba(116,114,109,.14) 12px), linear-gradient(135deg, #fbf6ea 0%, #ead7b8 100%)",
    desc: "Sepia notebook page with tea-worn edges",
  },
  {
    value: "celadon-silk",
    label: "Celadon Silk",
    swatch: "repeating-linear-gradient(0deg, rgba(126,154,138,.08) 0, rgba(126,154,138,.08) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(126,154,138,.06) 0, rgba(126,154,138,.06) 1px, transparent 1px, transparent 8px), linear-gradient(135deg, #f7faf4 0%, #d4e2d0 100%)",
    desc: "Silken paper with jade-woven grain",
  },
  {
    value: "inkwash-rice-paper",
    label: "Ink Wash Rice",
    swatch: "radial-gradient(circle at 26% 28%, rgba(56,56,56,.14) 0%, transparent 18%), radial-gradient(circle at 74% 74%, rgba(92,92,92,.12) 0%, transparent 20%), linear-gradient(135deg, #fbfaf6 0%, #e4ddd0 100%)",
    desc: "Rice paper brushed with soft ink clouds",
  },
  {
    value: "pearl-engraving",
    label: "Pearl Engraving",
    swatch: "radial-gradient(circle at 50% 18%, rgba(255,255,255,.88) 0%, transparent 18%), radial-gradient(circle at 18% 78%, rgba(222,219,214,.36) 0%, transparent 18%), linear-gradient(135deg, #fffefd 0%, #e8e5de 100%)",
    desc: "Formal pearl stock with engraved detail",
  },
  {
    value: "indigo-constellation",
    label: "Indigo Constellation",
    swatch: "radial-gradient(circle at 72% 22%, rgba(236,243,255,.18) 0%, transparent 18%), radial-gradient(circle at 24% 74%, rgba(173,203,255,.12) 0%, transparent 18%), linear-gradient(135deg, #0c1630 0%, #1f2d54 100%)",
    desc: "Night paper mapped with celestial lines",
  },
  {
    value: "mosaic-border",
    label: "Mosaic Border",
    swatch: "repeating-linear-gradient(45deg, rgba(118,153,133,.1) 0, rgba(118,153,133,.1) 6px, transparent 6px, transparent 12px), linear-gradient(135deg, #f8f4eb 0%, #e3efe7 100%)",
    desc: "Architectural border with geometric rhythm",
  },
  {
    value: "palace-embossed",
    label: "Palace Embossed",
    swatch: "radial-gradient(circle at 50% 24%, rgba(255,255,255,.78) 0%, transparent 18%), repeating-radial-gradient(circle at 50% 50%, rgba(201,170,116,.12) 0, rgba(201,170,116,.12) 8px, transparent 8px, transparent 22px), linear-gradient(135deg, #fffdfa 0%, #ece3d3 100%)",
    desc: "Ivory invitation sheet with pressed ornament",
  },
  {
    value: "starlit-manuscript",
    label: "Starlit Manuscript",
    swatch: "radial-gradient(circle at 76% 24%, rgba(255,230,162,.28) 0%, transparent 16%), radial-gradient(circle at 24% 72%, rgba(255,214,120,.12) 0%, transparent 20%), linear-gradient(135deg, #101830 0%, #1e2c4f 100%)",
    desc: "Deep night stationery with gold sparks",
  },
];

const EXTRA_BG_GRADIENTS: { label: string; value: string }[] = [
  { label: "Rose Cream", value: "linear-gradient(180deg, #fff0f3 0%, #ffd6e0 100%)" },
  { label: "Ocean Mist", value: "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 52%, #80deea 100%)" },
  { label: "Lavender", value: "linear-gradient(180deg, #f3e8ff 0%, #ddd6fe 52%, #c4b5fd 100%)" },
  { label: "Sage Green", value: "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 52%, #a7f3d0 100%)" },
  { label: "Warm Sand", value: "linear-gradient(180deg, #fef3c7 0%, #fde68a 52%, #fcd34d 100%)" },
  { label: "Deep Teal", value: "linear-gradient(180deg, #0d3b44 0%, #155e6e 52%, #1a7a8a 100%)" },
  { label: "Dusty Rose", value: "linear-gradient(180deg, #4a2032 0%, #6b3049 52%, #8b4162 100%)" },
  { label: "Slate Blue", value: "linear-gradient(180deg, #1e293b 0%, #334155 52%, #475569 100%)" },
  { label: "Ivory Gold", value: "linear-gradient(135deg, #fdfcf5 0%, #f5edd6 50%, #e8d5a0 100%)" },
  { label: "Night Plum", value: "linear-gradient(180deg, #1a0525 0%, #2d0a3e 52%, #4a1168 100%)" },
];

const EXTRA_BG_SOLIDS: { label: string; value: string }[] = [
  { label: "Pure White", value: "#ffffff" },
  { label: "Cream", value: "#faf5eb" },
  { label: "Blush", value: "#fff1f2" },
  { label: "Ice Blue", value: "#f0f9ff" },
  { label: "Mint", value: "#f0fdf4" },
  { label: "Charcoal", value: "#1f2937" },
  { label: "Deep Navy", value: "#0f172a" },
  { label: "Espresso", value: "#3b1f0b" },
];

const PAPER_FONTS: { value: PaperFont; label: string; preview: string }[] = [
  { value: "classic", label: "Classic", preview: "var(--font-libre), 'Libre Baskerville', serif" },
  { value: "elegant", label: "Elegant", preview: "var(--font-cormorant), 'Cormorant Garamond', serif" },
  { value: "formal", label: "Formal", preview: "var(--font-playfair), 'Playfair Display', serif" },
  { value: "modern", label: "Modern", preview: "var(--font-dm-sans), 'DM Sans', sans-serif" },
  { value: "handwritten", label: "Handwritten", preview: "var(--font-italiana), 'Italiana', serif" },
  { value: "arabic-accent", label: "Arabic Accent", preview: "var(--font-amiri), 'Amiri', serif" },
];

const PAPER_DECORATIONS: { value: PaperDecoration; label: string }[] = [
  { value: "mandala", label: "Mandala" },
  { value: "botanical", label: "Botanical" },
  { value: "lined", label: "Lined" },
  { value: "minimal", label: "Minimal" },
  { value: "ornate", label: "Ornate" },
  { value: "geometric", label: "Geometric" },
  { value: "islamic-arch", label: "Islamic Arch" },
  { value: "none", label: "None" },
];

const PAPER_ALIGNMENTS: { value: PaperAlignment; label: string }[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const BORDER_STYLES: { value: PaperBorderStyle; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "double", label: "Double" },
  { value: "golden", label: "Golden" },
  { value: "dotted", label: "Dotted" },
  { value: "none", label: "None" },
];

const GRADIENT_DIRECTIONS: { value: GradientDirection; label: string; icon: string }[] = [
  { value: "to bottom", label: "Down", icon: "↓" },
  { value: "to right", label: "Right", icon: "→" },
  { value: "to bottom right", label: "Diagonal", icon: "↘" },
  { value: "to bottom left", label: "Reverse", icon: "↙" },
];

const SEAL_LETTERS = ["E", "A", "M", "S", "F", "H", "N", "R"];

type PaperSectionKey =
  | "theme"
  | "backgrounds"
  | "gradient"
  | "textColor"
  | "typography"
  | "decoration"
  | "layout"
  | "seal";

export default function PaperTab({
  customization,
  accent,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const [openSections, setOpenSections] = useState<Record<PaperSectionKey, boolean>>({
    theme: false,
    backgrounds: false,
    gradient: false,
    textColor: false,
    typography: false,
    decoration: false,
    layout: false,
    seal: false,
  });

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

  const chipStyle = (active: boolean) => ({
    padding: "9px 12px",
    borderRadius: "999px",
    border: `1px solid ${active ? accent : "rgba(255,255,255,.08)"}`,
    background: active ? `${accent}14` : "rgba(255,255,255,.03)",
    color: active ? accent : "rgba(255,255,255,.55)",
    fontSize: "11px",
    cursor: "pointer",
    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
    transition: "all .2s",
  });

  const sectionDivider = (
    <div style={{ height: "1px", background: "rgba(255,255,255,.06)", margin: "4px 0" }} />
  );

  const renderSection = (key: PaperSectionKey, title: string, children: ReactNode) => (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: "14px",
        background: "rgba(255,255,255,.02)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpenSections((current) => ({ ...current, [key]: !current[key] }))}
        style={{
          width: "100%",
          padding: "14px 16px",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: openSections[key] ? accent : "rgba(255,255,255,.55)",
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          }}
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: openSections[key] ? accent : "rgba(255,255,255,.3)",
            transform: openSections[key] ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s ease, color .2s ease",
          }}
        />
      </button>
      {openSections[key] && (
        <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* ── Text Content ── */}
      <div>
        <label style={labelStyle}>Paper Heading</label>
        <input
          style={inputStyle}
          value={customization.paperTitle}
          onChange={(e) => onChange({ paperTitle: e.target.value.slice(0, 50) })}
          placeholder="A note for Eid"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div>
        <label style={labelStyle}>Paper Message</label>
        <textarea
          style={{ ...inputStyle, minHeight: "140px", resize: "vertical", lineHeight: 1.7 }}
          value={customization.paperMessage}
          onChange={(e) => onChange({ paperMessage: e.target.value.slice(0, 420) })}
          placeholder="Write anything you want inside the card..."
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
        <div className="text-right mt-1" style={{ fontSize: "9px", color: "rgba(255,255,255,.2)" }}>
          {customization.paperMessage.length}/420
        </div>
      </div>

      <div>
        <label style={labelStyle}>Closing Line</label>
        <input
          style={inputStyle}
          value={customization.paperClosing}
          onChange={(e) => onChange({ paperClosing: e.target.value.slice(0, 40) })}
          placeholder="With love and duas,"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      <div>
        <label style={labelStyle}>Your Name</label>
        <input
          style={inputStyle}
          value={customization.senderName}
          onChange={(e) => onChange({ senderName: e.target.value.slice(0, 30) })}
          placeholder="Your name"
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
      </div>

      {sectionDivider}

      {/* ── Paper Theme Presets ── */}
      {renderSection("theme", "Paper Theme", (
        <div className="grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
          {PAPER_THEMES.map((theme) => {
            const active = !customization.paperBgOverride && customization.paperTheme === theme.value;
            return (
              <button
                key={theme.value}
                onClick={() => onChange({ paperTheme: theme.value, paperBgOverride: null })}
                style={{
                  borderRadius: "12px",
                  border: `1px solid ${active ? accent : "rgba(255,255,255,.08)"}`,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "rgba(255,255,255,.03)",
                  textAlign: "left",
                  boxShadow: active ? `0 0 0 1px ${accent}20, 0 12px 30px rgba(0,0,0,.14)` : "none",
                }}
              >
                <div style={{ height: "60px", background: theme.swatch, borderBottom: "1px solid rgba(255,255,255,.04)" }} />
                <div style={{ padding: "8px 10px 4px", color: active ? accent : "rgba(255,255,255,.75)", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {theme.label}
                </div>
                <div style={{ padding: "0 10px 10px", color: "rgba(255,255,255,.3)", fontSize: "9px", lineHeight: 1.45 }}>
                  {theme.desc}
                </div>
              </button>
            );
          })}
        </div>
      ))}

{renderSection("backgrounds", "Extra Backgrounds", (
  <>
    <div>
      <label style={labelStyle}>Gradients</label>
      <div className="grid grid-cols-5 gap-2 max-[560px]:grid-cols-4 max-[420px]:grid-cols-3">
        {EXTRA_BG_GRADIENTS.map((g) => {
          const active = customization.paperBgOverride === g.value;
          return (
            <button
              key={g.value}
              title={g.label}
              onClick={() => onChange({ paperBgOverride: g.value })}
              className="cursor-pointer"
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "10px",
                background: g.value,
                border: `2px solid ${active ? accent : "rgba(255,255,255,.08)"}`,
                boxShadow: active ? `0 0 0 1px ${accent}40` : "none",
                transition: "all .2s",
              }}
            />
          );
        })}
      </div>
    </div>

    <div>
      <label style={labelStyle}>Solids</label>
      <div className="flex flex-wrap gap-2">
        {EXTRA_BG_SOLIDS.map((s) => {
          const active = customization.paperBgOverride === s.value;
          return (
            <button
              key={s.value}
              title={s.label}
              onClick={() => onChange({ paperBgOverride: s.value })}
              className="cursor-pointer"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: s.value,
                border: `2px solid ${active ? accent : "rgba(255,255,255,.12)"}`,
                boxShadow: active ? `0 0 0 2px ${accent}50` : "none",
                transition: "all .2s",
              }}
            />
          );
        })}
      </div>
    </div>
  </>
))}

{renderSection("gradient", "Custom Paper Gradient", (
  <>
    <div className="flex items-center gap-3 mb-3">
      <div className="flex flex-col items-center gap-1">
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,.25)" }}>Color 1</span>
        <input
          type="color"
          value={customization.paperCustomGradient.color1}
          onChange={(e) =>
            onChange({
              paperCustomGradient: { ...customization.paperCustomGradient, color1: e.target.value },
            })
          }
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,.12)",
            cursor: "pointer",
            background: "none",
            padding: 0,
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,.25)" }}>Color 2</span>
        <input
          type="color"
          value={customization.paperCustomGradient.color2}
          onChange={(e) =>
            onChange({
              paperCustomGradient: { ...customization.paperCustomGradient, color2: e.target.value },
            })
          }
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,.12)",
            cursor: "pointer",
            background: "none",
            padding: 0,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          height: "40px",
          borderRadius: "8px",
          background: `linear-gradient(${customization.paperCustomGradient.direction}, ${customization.paperCustomGradient.color1}, ${customization.paperCustomGradient.color2})`,
          border: "1px solid rgba(255,255,255,.12)",
        }}
      />
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {GRADIENT_DIRECTIONS.map((d) => {
        const active = customization.paperCustomGradient.direction === d.value;
        return (
          <button
            key={d.value}
            onClick={() =>
              onChange({
                paperCustomGradient: { ...customization.paperCustomGradient, direction: d.value },
              })
            }
            style={{ ...chipStyle(active), padding: "6px 10px", fontSize: "12px" }}
          >
            {d.icon} {d.label}
          </button>
        );
      })}
    </div>
    <button
      onClick={() =>
        onChange({
          paperBgOverride: `linear-gradient(${customization.paperCustomGradient.direction}, ${customization.paperCustomGradient.color1}, ${customization.paperCustomGradient.color2})`,
        })
      }
      style={{
        width: "100%",
        padding: "9px",
        borderRadius: "8px",
        border: `1px solid ${accent}40`,
        background: `${accent}15`,
        color: accent,
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        transition: "all .2s",
      }}
    >
      Apply Custom Gradient
    </button>
    {customization.paperBgOverride && (
      <button
        onClick={() => onChange({ paperBgOverride: null })}
        className="flex items-center justify-center gap-2 cursor-pointer"
        style={{
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.03)",
          color: "rgba(255,255,255,.45)",
          fontSize: "10px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        <RotateCcw size={12} />
        Reset to Theme Background
      </button>
    )}
  </>
))}

{renderSection("textColor", "Text Color", (
  <div className="flex items-center gap-3">
    <input
      type="color"
      value={customization.paperTextColor || "#3b2a19"}
      onChange={(e) => onChange({ paperTextColor: e.target.value })}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,.12)",
        cursor: "pointer",
        background: "none",
        padding: 0,
      }}
    />
    <div className="flex flex-wrap gap-2">
      {[
        { label: "Dark", color: "#3b2a19" },
        { label: "Black", color: "#111111" },
        { label: "White", color: "#f8f8f8" },
        { label: "Gold", color: "#b8860b" },
        { label: "Navy", color: "#1e3a5f" },
      ].map((c) => (
        <button
          key={c.color}
          title={c.label}
          onClick={() => onChange({ paperTextColor: c.color })}
          className="cursor-pointer"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: c.color,
            border: `2px solid ${customization.paperTextColor === c.color ? accent : "rgba(255,255,255,.15)"}`,
            transition: "all .2s",
          }}
        />
      ))}
    </div>
    {customization.paperTextColor && (
      <button
        onClick={() => onChange({ paperTextColor: null })}
        className="cursor-pointer"
        style={{ ...chipStyle(false), padding: "6px 8px", fontSize: "9px" }}
      >
        Reset
      </button>
    )}
  </div>
))}

{renderSection("typography", "Typography & Sizing", (
  <>
    <div>
      <label style={labelStyle}>Typography</label>
      <div className="grid grid-cols-3 gap-2 max-[520px]:grid-cols-2">
        {PAPER_FONTS.map((font) => {
          const active = customization.paperFont === font.value;
          return (
            <button
              key={font.value}
              onClick={() => onChange({ paperFont: font.value })}
              className="cursor-pointer"
              style={{
                padding: "10px 8px",
                borderRadius: "10px",
                border: `1px solid ${active ? accent : "rgba(255,255,255,.08)"}`,
                background: active ? `${accent}12` : "rgba(255,255,255,.03)",
                textAlign: "center",
                transition: "all .2s",
              }}
            >
              <div
                style={{
                  fontFamily: font.preview,
                  fontSize: "14px",
                  color: active ? accent : "rgba(255,255,255,.6)",
                  marginBottom: "2px",
                }}
              >
                Aa
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: active ? `${accent}90` : "rgba(255,255,255,.3)",
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                }}
              >
                {font.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {sectionDivider}

    <div>
      <label style={labelStyle}>Heading Size ? {customization.paperHeadingSize}%</label>
      <input
        type="range"
        min={60}
        max={150}
        step={5}
        value={customization.paperHeadingSize}
        onChange={(e) => onChange({ paperHeadingSize: Number(e.target.value) })}
        style={{ width: "100%", accentColor: accent }}
      />
    </div>

    <div>
      <label style={labelStyle}>Body Size ? {customization.paperBodySize}%</label>
      <input
        type="range"
        min={70}
        max={140}
        step={5}
        value={customization.paperBodySize}
        onChange={(e) => onChange({ paperBodySize: Number(e.target.value) })}
        style={{ width: "100%", accentColor: accent }}
      />
    </div>

    <div>
      <label style={labelStyle}>Line Spacing ? {customization.paperLineSpacing}%</label>
      <input
        type="range"
        min={60}
        max={160}
        step={5}
        value={customization.paperLineSpacing}
        onChange={(e) => onChange({ paperLineSpacing: Number(e.target.value) })}
        style={{ width: "100%", accentColor: accent }}
      />
    </div>
  </>
))}

{renderSection("decoration", "Decoration & Border", (
  <>
    <div>
      <label style={labelStyle}>Decoration Style</label>
      <div className="flex flex-wrap gap-2">
        {PAPER_DECORATIONS.map((decoration) => {
          const active = customization.paperDecoration === decoration.value;
          return (
            <button key={decoration.value} onClick={() => onChange({ paperDecoration: decoration.value })} style={chipStyle(active)}>
              {decoration.label}
            </button>
          );
        })}
      </div>
    </div>

    <div>
      <label style={labelStyle}>Border Style</label>
      <div className="flex flex-wrap gap-2">
        {BORDER_STYLES.map((b) => {
          const active = customization.paperBorderStyle === b.value;
          return (
            <button key={b.value} onClick={() => onChange({ paperBorderStyle: b.value })} style={chipStyle(active)}>
              {b.label}
            </button>
          );
        })}
      </div>
    </div>

    <div>
      <label style={labelStyle}>Decoration Opacity ? {customization.paperOpacity}%</label>
      <input
        type="range"
        min={20}
        max={100}
        step={5}
        value={customization.paperOpacity}
        onChange={(e) => onChange({ paperOpacity: Number(e.target.value) })}
        style={{ width: "100%", accentColor: accent }}
      />
    </div>
  </>
))}

{renderSection("layout", "Alignment & Header", (
  <>
    <div>
      <label style={labelStyle}>Text Alignment</label>
      <div className="flex gap-2">
        {PAPER_ALIGNMENTS.map((alignment) => {
          const active = customization.paperAlignment === alignment.value;
          return (
            <button key={alignment.value} onClick={() => onChange({ paperAlignment: alignment.value })} style={{ ...chipStyle(active), flex: 1 }}>
              {alignment.label}
            </button>
          );
        })}
      </div>
    </div>

    <ToggleRow
      accent={accent}
      label="Show Header Bar"
      checked={customization.paperShowHeader}
      onToggle={(v) => onChange({ paperShowHeader: v })}
    />
  </>
))}

{renderSection("seal", "Wax Seal", (
  <>
    <ToggleRow
      accent={accent}
      label={customization.paperShowSeal ? "Wax seal visible" : "Wax seal hidden"}
      checked={customization.paperShowSeal}
      onToggle={(v) => onChange({ paperShowSeal: v })}
    />

    {customization.paperShowSeal && (
      <>
        <div>
          <label style={labelStyle}>Seal Letter</label>
          <div className="flex flex-wrap gap-2">
            {SEAL_LETTERS.map((letter) => {
              const active = customization.paperSealLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => onChange({ paperSealLetter: letter })}
                  style={{
                    ...chipStyle(active),
                    width: "36px",
                    height: "36px",
                    padding: 0,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "16px",
                  }}
                >
                  {letter}
                </button>
              );
            })}
            <input
              style={{
                ...inputStyle,
                width: "36px",
                height: "36px",
                padding: "0",
                textAlign: "center",
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "16px",
              }}
              value={SEAL_LETTERS.includes(customization.paperSealLetter) ? "" : customization.paperSealLetter}
              onChange={(e) => {
                const value = e.target.value.slice(-1);
                if (value) onChange({ paperSealLetter: value });
              }}
              maxLength={1}
              placeholder="?"
              title="Custom letter"
              onFocus={(e) => (e.target.style.borderColor = accent)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Seal Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customization.paperSealColor || accent}
              onChange={(e) => onChange({ paperSealColor: e.target.value })}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,.12)",
                cursor: "pointer",
                background: "none",
                padding: 0,
              }}
            />
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Classic Red", color: "#8b2500" },
                { label: "Gold", color: "#b8860b" },
                { label: "Emerald", color: "#065f46" },
                { label: "Royal Blue", color: "#1e3a8a" },
                { label: "Burgundy", color: "#6b0f1a" },
              ].map((c) => (
                <button
                  key={c.color}
                  title={c.label}
                  onClick={() => onChange({ paperSealColor: c.color })}
                  className="cursor-pointer"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 30%, ${c.color}cc, ${c.color})`,
                    border: `2px solid ${customization.paperSealColor === c.color ? accent : "rgba(255,255,255,.15)"}`,
                    transition: "all .2s",
                  }}
                />
              ))}
            </div>
            {customization.paperSealColor && (
              <button
                onClick={() => onChange({ paperSealColor: null })}
                className="cursor-pointer"
                style={{ ...chipStyle(false), padding: "6px 8px", fontSize: "9px" }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </>
    )}
  </>
))}
    </div>
  );
}

function ToggleRow({
  accent,
  label,
  checked,
  onToggle,
}: {
  accent: string;
  label: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onToggle(!checked)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        background: checked ? `${accent}15` : "rgba(255,255,255,.04)",
        border: `1px solid ${checked ? accent + "40" : "rgba(255,255,255,.08)"}`,
        borderRadius: "8px",
        color: checked ? accent : "rgba(255,255,255,.4)",
        cursor: "pointer",
        width: "100%",
        fontSize: "12px",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        transition: "all .2s",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "20px",
          borderRadius: "10px",
          background: checked ? accent : "rgba(255,255,255,.15)",
          position: "relative",
          transition: "background .2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: "2px",
            left: checked ? "18px" : "2px",
            transition: "left .2s",
          }}
        />
      </div>
      {label}
    </button>
  );
}
