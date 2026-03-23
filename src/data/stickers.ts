import type { StickerType } from "@/types/editor";

export interface StickerDefinition {
  type: StickerType;
  label: string;
  category: "celestial" | "architectural" | "floral" | "geometric";
}

export const STICKER_CATALOG: StickerDefinition[] = [
  { type: "crescent-1", label: "Crescent Moon", category: "celestial" },
  { type: "crescent-2", label: "Thin Crescent", category: "celestial" },
  { type: "star-4", label: "4-Point Star", category: "celestial" },
  { type: "star-6", label: "6-Point Star", category: "celestial" },
  { type: "star-8", label: "8-Point Star", category: "geometric" },
  { type: "lantern-1", label: "Lantern", category: "architectural" },
  { type: "lantern-2", label: "Ornate Lantern", category: "architectural" },
  { type: "mosque-silhouette", label: "Mosque", category: "architectural" },
  { type: "mandala-small", label: "Mandala", category: "geometric" },
  { type: "floral-corner", label: "Floral Corner", category: "floral" },
  { type: "sparkle", label: "Sparkle", category: "celestial" },
  { type: "cloud", label: "Cloud", category: "celestial" },
];
