import type { GreetingFont } from "@/types/editor";

export interface FontOption {
  id: GreetingFont;
  label: string;
  cssVariable: string;
  exportFont: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: "italiana", label: "Italiana",
    cssVariable: "var(--font-italiana), 'Italiana', serif",
    exportFont: "'Italiana', serif" },
  { id: "cormorant", label: "Cormorant",
    cssVariable: "var(--font-cormorant), 'Cormorant Garamond', serif",
    exportFont: "'Cormorant Garamond', serif" },
  { id: "playfair", label: "Playfair",
    cssVariable: "var(--font-playfair), 'Playfair Display', serif",
    exportFont: "'Playfair Display', serif" },
  { id: "amiri", label: "Amiri",
    cssVariable: "var(--font-amiri), 'Amiri', serif",
    exportFont: "'Amiri', serif" },
  { id: "libre", label: "Libre Baskerville",
    cssVariable: "var(--font-libre), 'Libre Baskerville', serif",
    exportFont: "'Libre Baskerville', serif" },
  { id: "dmSans", label: "DM Sans",
    cssVariable: "var(--font-dm-sans), 'DM Sans', sans-serif",
    exportFont: "'DM Sans', sans-serif" },
];
