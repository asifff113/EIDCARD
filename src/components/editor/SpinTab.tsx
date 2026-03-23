"use client";

import { RotateCw } from "lucide-react";
import type { CardCustomization } from "@/types/editor";

function clampSpinAmount(value: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.max(1, Math.min(100000, Math.round(value)));
}

export default function SpinTab({
  customization,
  accent,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const presets = [10, 20, 50, 100];
  const enabled = customization.spinPageEnabled;
  const maxAmount = clampSpinAmount(customization.spinMaxAmount);

  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "8px",
    color: "#e0e0e0",
    padding: "10px 14px",
    fontSize: "15px",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
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
      <div
        style={{
          padding: "18px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,.06)",
          background: "rgba(255,255,255,.02)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: `${accent}14`,
              color: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RotateCw size={18} />
          </div>
          <div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,.82)", fontWeight: 600 }}>
              Spin reward page
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", marginTop: "2px" }}>
              Recipients on the shared link can spin for a random amount.
            </div>
          </div>
        </div>

        <button
          onClick={() => onChange({ spinPageEnabled: !enabled })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            background: enabled ? `${accent}15` : "rgba(255,255,255,.04)",
            border: `1px solid ${enabled ? `${accent}40` : "rgba(255,255,255,.08)"}`,
            borderRadius: "10px",
            color: enabled ? accent : "rgba(255,255,255,.45)",
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
              background: enabled ? accent : "rgba(255,255,255,.15)",
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
                left: enabled ? "18px" : "2px",
                transition: "left .2s",
              }}
            />
          </div>
          {enabled ? "Spin page enabled for shared viewers" : "Enable a spin page for shared viewers"}
        </button>
      </div>

      <div
        style={{
          padding: "18px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,.06)",
          background: "rgba(255,255,255,.02)",
          opacity: enabled ? 1 : 0.72,
        }}
      >
        <label style={labelStyle}>Maximum reward amount</label>
        <div className="grid grid-cols-4 gap-2 mb-3 max-[480px]:grid-cols-2">
          {presets.map((preset) => {
            const active = maxAmount === preset;
            return (
              <button
                key={preset}
                onClick={() => onChange({ spinMaxAmount: preset })}
                style={{
                  padding: "10px 0",
                  borderRadius: "10px",
                  border: active ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.08)",
                  background: active ? `${accent}15` : "rgba(255,255,255,.03)",
                  color: active ? accent : "rgba(255,255,255,.42)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                }}
              >
                {preset}
              </button>
            );
          })}
        </div>
        <input
          type="number"
          min={1}
          max={100000}
          value={maxAmount}
          style={inputStyle}
          onChange={(event) => onChange({ spinMaxAmount: clampSpinAmount(Number(event.target.value)) })}
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
        />
        <div style={{ marginTop: "8px", fontSize: "11px", color: "rgba(255,255,255,.28)", lineHeight: 1.7 }}>
          Recipients will land on a number between 1 and {maxAmount}. You can use quick presets or type any custom max.
        </div>
      </div>
    </div>
  );
}
