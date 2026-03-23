"use client";

import { Trash2, RotateCw, Plus, Minus } from "lucide-react";
import type { Sticker, StickerType } from "@/types/editor";
import { STICKER_CATALOG } from "@/data/stickers";
import { StickerSVG } from "../StickerRenderer";

export default function StickerTab({
  accent,
  stickers,
  selectedId,
  onAdd,
  onUpdate,
  onRemove,
  onSelect,
}: {
  accent: string;
  stickers: Sticker[];
  selectedId: string | null;
  onAdd: (type: StickerType) => void;
  onUpdate: (id: string, partial: Partial<Sticker>) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string | null) => void;
}) {
  const selectedSticker = stickers.find((s) => s.id === selectedId);

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,.35)",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sticker Palette */}
      <div>
        <label style={labelStyle}>Add Stickers</label>
        <div className="grid grid-cols-4 gap-2 max-[560px]:grid-cols-3 max-[420px]:grid-cols-2">
          {STICKER_CATALOG.map((def) => (
            <button
              key={def.type}
              onClick={() => onAdd(def.type)}
              className="cursor-pointer transition-all flex flex-col items-center gap-1"
              title={def.label}
              style={{
                padding: "8px 4px 6px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.02)",
              }}
            >
              <StickerSVG type={def.type} color={accent} size={28} />
              <span
                style={{
                  fontSize: "8px",
                  color: "rgba(255,255,255,.35)",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {def.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Sticker Controls */}
      {selectedSticker && (
        <div>
          <label style={labelStyle}>Selected Sticker</label>
          <div
            className="flex flex-col gap-3"
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(255,255,255,.03)",
              border: `1px solid ${accent}20`,
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,.6)" }}>
                {STICKER_CATALOG.find((s) => s.type === selectedSticker.stickerType)?.label}
              </span>
              <button
                onClick={() => onRemove(selectedSticker.id)}
                className="cursor-pointer transition-colors"
                style={{
                  background: "rgba(255,80,80,.1)",
                  border: "1px solid rgba(255,80,80,.2)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  color: "#ff6060",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Trash2 size={10} />
                Delete
              </button>
            </div>

            {/* Scale */}
            <div>
              <div
                className="flex items-center justify-between mb-1"
                style={{ fontSize: "10px", color: "rgba(255,255,255,.4)" }}
              >
                <span>Scale</span>
                <span>{selectedSticker.scale.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onUpdate(selectedSticker.id, {
                      scale: Math.max(0.3, selectedSticker.scale - 0.1),
                    })
                  }
                  className="cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "6px",
                    padding: "4px",
                    color: "rgba(255,255,255,.5)",
                  }}
                >
                  <Minus size={12} />
                </button>
                <input
                  type="range"
                  min="0.3"
                  max="3"
                  step="0.1"
                  value={selectedSticker.scale}
                  onChange={(e) =>
                    onUpdate(selectedSticker.id, { scale: parseFloat(e.target.value) })
                  }
                  className="flex-1"
                  style={{ accentColor: accent }}
                />
                <button
                  onClick={() =>
                    onUpdate(selectedSticker.id, {
                      scale: Math.min(3, selectedSticker.scale + 0.1),
                    })
                  }
                  className="cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "6px",
                    padding: "4px",
                    color: "rgba(255,255,255,.5)",
                  }}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Rotation */}
            <div>
              <div
                className="flex items-center justify-between mb-1"
                style={{ fontSize: "10px", color: "rgba(255,255,255,.4)" }}
              >
                <span>Rotation</span>
                <span className="flex items-center gap-1">
                  {selectedSticker.rotation}°
                  <button
                    onClick={() => onUpdate(selectedSticker.id, { rotation: 0 })}
                    className="cursor-pointer"
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,.3)",
                      padding: "2px",
                    }}
                    title="Reset rotation"
                  >
                    <RotateCw size={10} />
                  </button>
                </span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={selectedSticker.rotation}
                onChange={(e) =>
                  onUpdate(selectedSticker.id, { rotation: parseInt(e.target.value) })
                }
                className="w-full"
                style={{ accentColor: accent }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Placed Stickers List */}
      {stickers.length > 0 && (
        <div>
          <label style={labelStyle}>Placed ({stickers.length})</label>
          <div className="flex flex-col gap-1">
            {stickers.map((sticker, i) => (
              <button
                key={sticker.id}
                onClick={() => onSelect(sticker.id)}
                className="flex items-center gap-3 cursor-pointer transition-all w-full text-left"
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border:
                    selectedId === sticker.id
                      ? `1px solid ${accent}40`
                      : "1px solid rgba(255,255,255,.04)",
                  background:
                    selectedId === sticker.id
                      ? `${accent}08`
                      : "rgba(255,255,255,.02)",
                }}
              >
                <StickerSVG type={sticker.stickerType} color={accent} size={20} />
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", flex: 1 }}>
                  {STICKER_CATALOG.find((s) => s.type === sticker.stickerType)?.label}
                </span>
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,.2)" }}>#{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {stickers.length === 0 && (
        <div
          className="text-center py-6"
          style={{ fontSize: "11px", color: "rgba(255,255,255,.25)" }}
        >
          Tap a sticker above to add it to your card.
          <br />
          Drag to reposition.
        </div>
      )}
    </div>
  );
}
