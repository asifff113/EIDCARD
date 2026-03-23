"use client";

import { useRef } from "react";
import { Upload, RotateCcw, Check } from "lucide-react";
import type { CardLayout, GreetingFont, BackgroundOverride } from "@/types/editor";
import { PRESET_BACKGROUNDS } from "@/data/presetBackgrounds";
import { FONT_OPTIONS } from "@/data/fontOptions";

const TEXT_COLOR_PRESETS = [
  { label: "White", value: "#ffffff" },
  { label: "Cream", value: "#fff8ef" },
  { label: "Gold", value: "#f5d576" },
  { label: "Silver", value: "#c8d0e0" },
  { label: "Rose", value: "#ffd0e0" },
  { label: "Midnight", value: "#1a1a3e" },
  { label: "Charcoal", value: "#2a2a2a" },
  { label: "Amber", value: "#e8a060" },
];

const LAYOUT_OPTIONS: { id: CardLayout; label: string; lines: string[] }[] = [
  { id: "classic-center", label: "Classic", lines: ["center"] },
  { id: "crescent-bloom", label: "Bloom", lines: ["right"] },
  { id: "royal-split", label: "Royal", lines: ["split"] },
  { id: "skyline-bottom", label: "Skyline", lines: ["bottom"] },
  { id: "calligraphy-stack", label: "Stack", lines: ["stack"] },
  { id: "crescent-emblem", label: "Emblem", lines: ["emblem"] },
];

function LayoutThumbnail({ layout, isActive, accent }: { layout: string; isActive: boolean; accent: string }) {
  return (
    <svg width="100%" viewBox="0 0 50 70" fill="none" style={{ display: "block" }}>
      <rect x="0.5" y="0.5" width="49" height="69" rx="3" stroke={isActive ? accent : "rgba(255,255,255,.12)"} strokeWidth="1" fill="rgba(255,255,255,.02)" />
      {layout === "center" && (
        <>
          <rect x="15" y="22" width="20" height="2" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="11" y="28" width="28" height="4" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="17" y="36" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
          <rect x="14" y="42" width="22" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
        </>
      )}
      {layout === "right" && (
        <>
          <rect x="24" y="18" width="20" height="3" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="20" y="25" width="24" height="6" rx="1" fill="currentColor" opacity="0.7" style={{ transform: "rotate(-4deg)", transformOrigin: "32px 28px" }} />
          <rect x="26" y="38" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
          <rect x="28" y="44" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
        </>
      )}
      {layout === "split" && (
        <>
          <rect x="25" y="0.5" width="0.5" height="69" fill="currentColor" opacity="0.1" />
          <rect x="28" y="22" width="16" height="2" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="28" y="28" width="18" height="5" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="28" y="38" width="14" height="2" rx="1" fill="currentColor" opacity="0.4" />
          <rect x="28" y="44" width="10" height="3" rx="1" fill="currentColor" opacity="0.3" />
        </>
      )}
      {layout === "bottom" && (
        <>
          <rect x="15" y="42" width="20" height="2" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="11" y="48" width="28" height="4" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="17" y="56" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
          <rect x="14" y="61" width="22" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
        </>
      )}
      {layout === "stack" && (
        <>
          <rect x="12" y="20" width="26" height="5" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="14" y="30" width="22" height="4" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="20" y="39" width="10" height="0.8" rx="0.4" fill="currentColor" opacity="0.2" />
          <rect x="16" y="44" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
          <rect x="18" y="50" width="14" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
        </>
      )}
      {layout === "emblem" && (
        <>
          <circle cx="30" cy="30" r="12" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.15" />
          <rect x="22" y="32" width="16" height="2" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="20" y="26" width="20" height="5" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="24" y="38" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
        </>
      )}
    </svg>
  );
}

export default function DesignTab({
  accent,
  currentBackground,
  currentFont,
  currentTextColor,
  currentLayout,
  templateLayout,
  onBackgroundChange,
  onFontChange,
  onTextColorChange,
  onLayoutChange,
  onReset,
}: {
  accent: string;
  currentBackground: { type: "gradient" | "image"; value: string } | null;
  currentFont: GreetingFont | null;
  currentTextColor: string | null;
  currentLayout: CardLayout | null;
  templateLayout: CardLayout | undefined;
  onBackgroundChange: (bg: BackgroundOverride | null) => void;
  onFontChange: (font: GreetingFont | null) => void;
  onTextColorChange: (color: string | null) => void;
  onLayoutChange: (layout: CardLayout | null) => void;
  onReset: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,.35)",
    marginBottom: "8px",
    display: "block",
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 2048;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        const resized = canvas.toDataURL("image/jpeg", 0.85);
        onBackgroundChange({ type: "image", value: resized });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const activeLayout = currentLayout ?? templateLayout ?? "classic-center";

  return (
    <div className="flex flex-col gap-7">
      {/* Reset button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 self-start cursor-pointer transition-colors"
        style={{
          background: "none",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "20px",
          padding: "6px 14px",
          color: "rgba(255,255,255,.4)",
          fontSize: "10px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        <RotateCcw size={11} />
        Reset All
      </button>

      {/* Background */}
      <div>
        <label style={labelStyle}>Background</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onBackgroundChange(null)}
            className="cursor-pointer transition-all"
            title="Default"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: !currentBackground ? `2px solid ${accent}` : "2px solid rgba(255,255,255,.1)",
              background: "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
              fontSize: "9px",
              color: "rgba(255,255,255,.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Auto
          </button>
          {PRESET_BACKGROUNDS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onBackgroundChange({ type: "gradient", value: preset.value })}
              className="cursor-pointer transition-all"
              title={preset.label}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border:
                  currentBackground?.type === "gradient" && currentBackground.value === preset.value
                    ? `2px solid ${accent}`
                    : "2px solid rgba(255,255,255,.1)",
                background: preset.value,
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 cursor-pointer transition-colors"
            style={{
              background: "rgba(255,255,255,.04)",
              border: currentBackground?.type === "image" ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.08)",
              borderRadius: "8px",
              padding: "8px 14px",
              color: "rgba(255,255,255,.5)",
              fontSize: "11px",
            }}
          >
            <Upload size={12} />
            Upload Image
          </button>
          {currentBackground?.type === "image" && (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: `2px solid ${accent}`,
                backgroundImage: `url(${currentBackground.value})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </div>
      </div>

      {/* Font Picker */}
      <div>
        <label style={labelStyle}>Greeting Font</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFontChange(null)}
            className="cursor-pointer transition-all"
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              border: !currentFont ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.1)",
              background: !currentFont ? `${accent}18` : "rgba(255,255,255,.04)",
              color: !currentFont ? accent : "rgba(255,255,255,.4)",
              fontSize: "12px",
            }}
          >
            Default
          </button>
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              onClick={() => onFontChange(font.id)}
              className="cursor-pointer transition-all"
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: currentFont === font.id ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.1)",
                background: currentFont === font.id ? `${accent}18` : "rgba(255,255,255,.04)",
                color: currentFont === font.id ? accent : "rgba(255,255,255,.5)",
                fontSize: "13px",
                fontFamily: font.cssVariable,
              }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label style={labelStyle}>Text Color</label>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => onTextColorChange(null)}
            className="cursor-pointer transition-all"
            title="Default"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: !currentTextColor ? `2px solid ${accent}` : "2px solid rgba(255,255,255,.15)",
              background: "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
              fontSize: "7px",
              color: "rgba(255,255,255,.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Auto
          </button>
          {TEXT_COLOR_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onTextColorChange(preset.value)}
              className="cursor-pointer transition-all relative"
              title={preset.label}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border:
                  currentTextColor === preset.value
                    ? `2px solid ${accent}`
                    : "2px solid rgba(255,255,255,.15)",
                background: preset.value,
              }}
            >
              {currentTextColor === preset.value && (
                <Check
                  size={14}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: preset.value === "#ffffff" || preset.value === "#fff8ef" || preset.value === "#ffd0e0" || preset.value === "#c8d0e0"
                      ? "#333"
                      : "#fff",
                  }}
                />
              )}
            </button>
          ))}
          <div className="relative">
            <input
              type="color"
              value={currentTextColor || "#ffffff"}
              onChange={(e) => onTextColorChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              style={{ width: "32px", height: "32px" }}
            />
            <div
              className="flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px dashed rgba(255,255,255,.2)",
                background: currentTextColor && !TEXT_COLOR_PRESETS.find(p => p.value === currentTextColor) ? currentTextColor : "rgba(255,255,255,.04)",
                fontSize: "9px",
                color: "rgba(255,255,255,.3)",
                cursor: "pointer",
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>

      {/* Layout Switcher */}
      <div>
        <label style={labelStyle}>Layout</label>
        <div className="grid grid-cols-3 gap-2 max-[520px]:grid-cols-2">
          {LAYOUT_OPTIONS.map(({ id, label, lines }) => (
            <button
              key={id}
              onClick={() => onLayoutChange(id === (templateLayout ?? "classic-center") ? null : id)}
              className="cursor-pointer transition-all flex flex-col items-center gap-1"
              style={{
                padding: "8px 4px 6px",
                borderRadius: "10px",
                border: activeLayout === id ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.08)",
                background: activeLayout === id ? `${accent}10` : "rgba(255,255,255,.02)",
                color: activeLayout === id ? accent : "rgba(255,255,255,.35)",
              }}
            >
              <div style={{ width: "42px" }}>
                <LayoutThumbnail layout={lines[0]} isActive={activeLayout === id} accent={accent} />
              </div>
              <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
