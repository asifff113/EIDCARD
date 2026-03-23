"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Plus, RotateCcw } from "lucide-react";
import type {
  CardCustomization,
  CardTemplate,
  CardLayout,
  FontPairing,
  GradientDirection,
} from "@/types/editor";

const PRESET_GRADIENTS: { label: string; value: string }[] = [
  { label: "Warm Sunset", value: "linear-gradient(180deg, #ff6b35 0%, #f7c948 100%)" },
  { label: "Cool Ocean", value: "linear-gradient(180deg, #0077b6 0%, #00b4d8 100%)" },
  { label: "Midnight Sky", value: "linear-gradient(180deg, #0d1b2a 0%, #1b2838 60%, #2c3e50 100%)" },
  { label: "Emerald Forest", value: "linear-gradient(180deg, #064e3b 0%, #059669 100%)" },
  { label: "Royal Purple", value: "linear-gradient(180deg, #2d1b69 0%, #7c3aed 100%)" },
  { label: "Desert Gold", value: "linear-gradient(180deg, #92400e 0%, #d97706 60%, #fbbf24 100%)" },
  { label: "Rose Garden", value: "linear-gradient(180deg, #831843 0%, #ec4899 100%)" },
  { label: "Arctic Aurora", value: "linear-gradient(180deg, #0c4a6e 0%, #06b6d4 50%, #a78bfa 100%)" },
  { label: "Twilight Sage", value: "linear-gradient(135deg, #1a2a1a 0%, #2d4a3e 100%)" },
  { label: "Crimson Dusk", value: "linear-gradient(180deg, #450a0a 0%, #991b1b 100%)" },
  { label: "Silver Mist", value: "linear-gradient(180deg, #374151 0%, #9ca3af 100%)" },
  { label: "Sapphire Night", value: "linear-gradient(180deg, #1e1b4b 0%, #3730a3 100%)" },
];

const PRESET_SOLIDS: { label: string; value: string }[] = [
  { label: "Deep Navy", value: "#0f172a" },
  { label: "Emerald", value: "#065f46" },
  { label: "Burgundy", value: "#7f1d1d" },
  { label: "Gold", value: "#92400e" },
  { label: "Midnight", value: "#020617" },
  { label: "Slate", value: "#334155" },
  { label: "Indigo", value: "#312e81" },
  { label: "Forest", value: "#14532d" },
  { label: "Charcoal", value: "#1c1917" },
  { label: "Plum", value: "#581c87" },
];

const FONT_PAIRINGS: { value: FontPairing; label: string; previewFont: string }[] = [
  { value: "classic", label: "Classic", previewFont: "var(--font-italiana), 'Italiana', serif" },
  { value: "elegant", label: "Elegant", previewFont: "var(--font-cormorant), 'Cormorant Garamond', serif" },
  { value: "modern", label: "Modern", previewFont: "var(--font-dm-sans), 'DM Sans', sans-serif" },
  { value: "calligraphic", label: "Calligraphic", previewFont: "var(--font-amiri), 'Amiri', serif" },
  { value: "bold", label: "Bold", previewFont: "var(--font-playfair), 'Playfair Display', serif" },
];

const LAYOUT_OPTIONS: { value: CardLayout; label: string; desc: string }[] = [
  { value: "classic-center", label: "Classic", desc: "Centered" },
  { value: "crescent-bloom", label: "Bloom", desc: "Right italic" },
  { value: "royal-split", label: "Royal", desc: "Bold split" },
  { value: "skyline-bottom", label: "Skyline", desc: "Bottom stack" },
  { value: "calligraphy-stack", label: "Arabic", desc: "Arabic-first" },
  { value: "crescent-emblem", label: "Emblem", desc: "Center emblem" },
];

const GRADIENT_DIRECTIONS: { value: GradientDirection; label: string }[] = [
  { value: "to bottom", label: "Down" },
  { value: "to right", label: "Right" },
  { value: "to bottom right", label: "Diagonal" },
  { value: "to bottom left", label: "Reverse" },
];

type StyleSectionKey = "background" | "font" | "layout" | "effects";

export default function StyleTab({
  customization,
  accent,
  template,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  template: CardTemplate;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const [openSections, setOpenSections] = useState<Record<StyleSectionKey, boolean>>({
    background: false,
    font: false,
    layout: false,
    effects: false,
  });
  const [showCustomGradient, setShowCustomGradient] = useState(false);

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,.35)",
    marginBottom: "8px",
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

  const activeLayout = customization.layoutOverride ?? template.layout ?? "classic-center";
  const currentCustomGradient = `linear-gradient(${customization.customGradient.direction}, ${customization.customGradient.color1}, ${customization.customGradient.color2})`;
  const isCustomGradientApplied = customization.bgOverride === currentCustomGradient;

  const renderSection = (key: StyleSectionKey, title: string, children: ReactNode) => (
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
      {renderSection(
        "background",
        "Background",
        <>
          <div>
            <label style={labelStyle}>Gradients</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_GRADIENTS.map((gradient) => {
                const active = customization.bgOverride === gradient.value;
                return (
                  <button
                    key={gradient.value}
                    type="button"
                    title={gradient.label}
                    onClick={() => onChange({ bgOverride: gradient.value })}
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "12px",
                      background: gradient.value,
                      border: `2px solid ${active ? accent : "rgba(255,255,255,.08)"}`,
                      boxShadow: active ? `0 0 0 1px ${accent}40` : "none",
                      cursor: "pointer",
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
              {PRESET_SOLIDS.map((solid) => {
                const active = customization.bgOverride === solid.value;
                return (
                  <button
                    key={solid.value}
                    type="button"
                    title={solid.label}
                    onClick={() => onChange({ bgOverride: solid.value })}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: solid.value,
                      border: `2px solid ${active ? accent : "rgba(255,255,255,.12)"}`,
                      boxShadow: active ? `0 0 0 2px ${accent}40` : "none",
                      cursor: "pointer",
                      transition: "all .2s",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: "12px",
              background: "rgba(255,255,255,.02)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setShowCustomGradient((current) => !current)}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "999px",
                    border: `1px solid ${showCustomGradient ? accent : "rgba(255,255,255,.12)"}`,
                    background: showCustomGradient ? `${accent}15` : "rgba(255,255,255,.03)",
                    color: showCustomGradient ? accent : "rgba(255,255,255,.45)",
                    display: "grid",
                    placeItems: "center",
                    transition: "all .2s",
                  }}
                >
                  <Plus
                    size={14}
                    style={{
                      transform: showCustomGradient ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform .2s ease",
                    }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: showCustomGradient ? accent : "rgba(255,255,255,.55)",
                      fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                    }}
                  >
                    Custom Gradient
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,.28)", marginTop: "2px" }}>
                    Add your own two-color background
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "28px",
                  borderRadius: "999px",
                  border: `1px solid ${isCustomGradientApplied ? accent : "rgba(255,255,255,.08)"}`,
                  background: currentCustomGradient,
                }}
              />
            </button>

            {showCustomGradient && (
              <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,.25)" }}>Color 1</span>
                    <input
                      type="color"
                      value={customization.customGradient.color1}
                      onChange={(event) =>
                        onChange({
                          customGradient: {
                            ...customization.customGradient,
                            color1: event.target.value,
                          },
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
                      value={customization.customGradient.color2}
                      onChange={(event) =>
                        onChange({
                          customGradient: {
                            ...customization.customGradient,
                            color2: event.target.value,
                          },
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
                      borderRadius: "10px",
                      background: currentCustomGradient,
                      border: "1px solid rgba(255,255,255,.12)",
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {GRADIENT_DIRECTIONS.map((direction) => {
                    const active = customization.customGradient.direction === direction.value;
                    return (
                      <button
                        key={direction.value}
                        type="button"
                        onClick={() =>
                          onChange({
                            customGradient: {
                              ...customization.customGradient,
                              direction: direction.value,
                            },
                          })
                        }
                        style={chipStyle(active)}
                      >
                        {direction.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => onChange({ bgOverride: currentCustomGradient })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "10px",
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
              </div>
            )}
          </div>

          {customization.bgOverride && (
            <button
              type="button"
              onClick={() => onChange({ bgOverride: null })}
              className="flex items-center justify-center gap-2"
              style={{
                padding: "9px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.03)",
                color: "rgba(255,255,255,.45)",
                fontSize: "10px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              <RotateCcw size={12} />
              Reset Background
            </button>
          )}
        </>,
      )}

      {renderSection(
        "font",
        "Font Style",
        <>
          <div className="flex flex-wrap gap-2">
            {FONT_PAIRINGS.map((pairing) => {
              const active = customization.fontPairing === pairing.value;
              return (
                <button
                  key={pairing.value}
                  type="button"
                  onClick={() => onChange({ fontPairing: active ? null : pairing.value })}
                  style={{
                    ...chipStyle(active),
                    fontFamily: pairing.previewFont,
                    fontSize: "13px",
                  }}
                >
                  {pairing.label}
                </button>
              );
            })}
          </div>
          {customization.fontPairing && (
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,.25)" }}>
              Tap the active style again to return to the template default.
            </div>
          )}
        </>,
      )}

      {renderSection(
        "layout",
        "Text Layout",
        <div className="grid grid-cols-3 gap-2 max-[520px]:grid-cols-2">
          {LAYOUT_OPTIONS.map((layout) => {
            const active = activeLayout === layout.value;
            return (
              <button
                key={layout.value}
                type="button"
                onClick={() =>
                  onChange({
                    layoutOverride:
                      layout.value === (template.layout ?? "classic-center") ? null : layout.value,
                  })
                }
                style={{
                  padding: "12px 8px",
                  borderRadius: "10px",
                  border: `1px solid ${active ? accent : "rgba(255,255,255,.08)"}`,
                  background: active ? `${accent}12` : "rgba(255,255,255,.03)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: active ? accent : "rgba(255,255,255,.6)",
                    fontWeight: 500,
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  }}
                >
                  {layout.label}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: active ? `${accent}90` : "rgba(255,255,255,.25)",
                    marginTop: "2px",
                  }}
                >
                  {layout.desc}
                </div>
              </button>
            );
          })}
        </div>,
      )}

      {renderSection(
        "effects",
        "Effects",
        <div className="flex flex-col gap-3">
          <ToggleRow
            accent={accent}
            label="Stars"
            checked={customization.overrideStars ?? (template.starsCount ?? 40) > 0}
            onToggle={(value) => onChange({ overrideStars: value })}
          />

          {(customization.overrideStars ?? (template.starsCount ?? 40) > 0) && (
            <div className="flex items-center gap-3 pl-1">
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,.25)", minWidth: "30px" }}>
                {customization.starsCount}
              </span>
              <input
                type="range"
                min={10}
                max={80}
                step={10}
                value={customization.starsCount}
                onChange={(event) => onChange({ starsCount: Number(event.target.value) })}
                style={{ flex: 1, accentColor: accent }}
              />
            </div>
          )}

          <ToggleRow
            accent={accent}
            label="Ornament Frame"
            checked={customization.overrideFrame ?? template.showFrame ?? true}
            onToggle={(value) => onChange({ overrideFrame: value })}
          />

          <ToggleRow
            accent={accent}
            label="Glow Effect"
            checked={customization.overrideGlow ?? true}
            onToggle={(value) => onChange({ overrideGlow: value })}
          />
        </div>,
      )}
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
      type="button"
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
