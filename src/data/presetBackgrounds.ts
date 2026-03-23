export interface PresetBackground {
  id: string;
  label: string;
  category: "dark" | "light" | "warm" | "cool";
  value: string;
}

export const PRESET_BACKGROUNDS: PresetBackground[] = [
  // Dark
  { id: "midnight", label: "Midnight", category: "dark",
    value: "linear-gradient(180deg, #0a0a2e 0%, #141448 50%, #08081e 100%)" },
  { id: "deep-purple", label: "Deep Purple", category: "dark",
    value: "linear-gradient(180deg, #241028 0%, #3a1844 48%, #180814 100%)" },
  { id: "noir", label: "Noir", category: "dark",
    value: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #080808 100%)" },
  { id: "cosmic", label: "Cosmic", category: "dark",
    value: "linear-gradient(145deg, #060010 0%, #10002a 50%, #040018 100%)" },

  // Warm
  { id: "sunset", label: "Sunset", category: "warm",
    value: "linear-gradient(180deg, #f8c44a 0%, #e8823a 28%, #c04430 62%, #3a1028 100%)" },
  { id: "amber-glow", label: "Amber Glow", category: "warm",
    value: "radial-gradient(circle at 50% 34%, rgba(255,208,111,.24) 0%, transparent 40%), linear-gradient(180deg, #3d1b05 0%, #6d3208 38%, #2b1203 100%)" },
  { id: "rose-blush", label: "Rose Blush", category: "warm",
    value: "radial-gradient(circle at 50% 18%, rgba(255,237,217,.5) 0%, transparent 20%), linear-gradient(180deg, #f6d7cf 0%, #f5e8dc 52%, #e7c0b8 100%)" },
  { id: "desert", label: "Desert Sand", category: "warm",
    value: "linear-gradient(145deg, #100800 0%, #201000 50%, #080400 100%)" },

  // Cool
  { id: "ocean", label: "Ocean", category: "cool",
    value: "radial-gradient(circle at 50% 24%, rgba(120,220,255,.14) 0%, transparent 20%), linear-gradient(180deg, #08182e 0%, #0c2e4e 40%, #061828 100%)" },
  { id: "emerald", label: "Emerald", category: "cool",
    value: "radial-gradient(circle at 50% 18%, rgba(130,255,225,.18) 0%, transparent 18%), linear-gradient(180deg, #082e2e 0%, #0c443f 40%, #061d24 100%)" },
  { id: "teal-night", label: "Teal Night", category: "cool",
    value: "radial-gradient(circle at 50% 8%, rgba(77,255,237,.24) 0%, transparent 20%), linear-gradient(180deg, #19bdc9 0%, #0f6f99 42%, #081b5b 100%)" },
  { id: "jade", label: "Jade", category: "cool",
    value: "radial-gradient(circle at 50% 16%, rgba(140,240,200,.16) 0%, transparent 20%), linear-gradient(180deg, #0c3028 0%, #1a5040 40%, #082820 100%)" },

  // Light
  { id: "ivory", label: "Ivory", category: "light",
    value: "radial-gradient(circle at 50% 18%, rgba(255,255,255,.32) 0%, transparent 20%), linear-gradient(180deg, #fffdf8 0%, #f8f0e1 56%, #f1e5d2 100%)" },
  { id: "pearl", label: "Pearl", category: "light",
    value: "linear-gradient(90deg, #fbf7ef 0%, #f6efdf 48%, #e7d8b6 48%, #dfcea8 100%)" },
  { id: "dawn", label: "Dawn", category: "light",
    value: "radial-gradient(circle at 50% 20%, rgba(255,242,224,.32) 0%, transparent 20%), linear-gradient(180deg, #f7f1df 0%, #dbe9f7 52%, #eef6ff 100%)" },
  { id: "lavender", label: "Lavender", category: "light",
    value: "radial-gradient(circle at 50% 18%, rgba(255,247,238,.22) 0%, transparent 22%), linear-gradient(180deg, #f3d2df 0%, #d9bde8 42%, #b89ed8 100%)" },
];
