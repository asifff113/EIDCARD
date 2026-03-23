"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import { CardArtwork } from "@/components/cards/artwork/CardArtwork";
import { GlowLayer, OrnamentFrame, StarsLayer } from "@/components/cards/artwork/Layers";
import Navbar from "@/components/layout/Navbar";
import EidiPage from "@/components/editor/EidiPage";
import InsidePaperCanvas from "@/components/editor/InsidePaperCanvas";
import TemplateExperienceEditor from "@/components/editor/TemplateExperienceEditor";
import { useShareCard } from "@/hooks/useShareCard";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { TEMPLATES } from "@/data/templates";
import { createEditorOverrides, createInitialCustomization } from "@/types/editor";
import type { CardArtworkType, CardCustomization, CardTemplate, EditorOverrides } from "@/types/editor";

interface Artwork {
  id: number;
  room: number;
  title: string;
  ar: string;
  tag: string;
  size: "tall" | "med" | "sq" | "wide";
  verse: string;
  accent: string;
  accent2: string;
  glow: string;
  bg: string;
  desc: string;
  frame: "dark" | "gold" | "green";
  type: CardArtworkType;
  stars: number;
  textColor?: string;
}

type SavedMuseumCard = {
  customization: CardCustomization;
  overrides: EditorOverrides;
};

function getBaseTemplateForArtwork(art: Artwork): CardTemplate {
  return TEMPLATES.find((template) => template.type === art.type) ?? TEMPLATES[0];
}

function artworkToTemplate(art: Artwork): CardTemplate {
  const baseTemplate = getBaseTemplateForArtwork(art);

  return {
    ...baseTemplate,
    id: 5000 + art.id,
    title: art.title,
    subtitle: art.tag,
    ar: art.ar,
    bg: art.bg,
    accent: art.accent,
    accent2: art.accent2,
    glow: art.glow,
    type: art.type,
    textColor: art.textColor ?? baseTemplate.textColor ?? art.accent,
    starsCount: art.stars,
    showFrame: true,
  };
}

function getMuseumInitialOverrides(art: Artwork): Partial<EditorOverrides> {
  const baseTemplate = getBaseTemplateForArtwork(art);
  const defaultOffsetByLayout = {
    "classic-center": { x: 0, y: -2 },
    "crescent-bloom": { x: 0, y: -8 },
    "royal-split": { x: 0, y: -10 },
    "skyline-bottom": { x: 0, y: art.size === "wide" ? -16 : art.size === "sq" ? -18 : -22 },
    "calligraphy-stack": { x: 0, y: -12 },
    "crescent-emblem": { x: 0, y: -6 },
  } satisfies Record<NonNullable<CardTemplate["layout"]>, { x: number; y: number }>;

  return {
    coverTextOffset: baseTemplate.layout
      ? defaultOffsetByLayout[baseTemplate.layout]
      : { x: 0, y: -10 },
  };
}

function getInitialMuseumCardState(art: Artwork): SavedMuseumCard {
  const template = artworkToTemplate(art);

  return {
    customization: createInitialCustomization(template),
    overrides: createEditorOverrides(getMuseumInitialOverrides(art)),
  };
}

const ARTWORKS: Artwork[] = [
  {
    id: 1,
    room: 1,
    title: "Golden Mosque at Dawn",
    ar: "\u0627\u0644\u0645\u0633\u062C\u062F \u0627\u0644\u0630\u0647\u0628\u064A",
    tag: "Sacred Architecture",
    size: "tall",
    verse: "Peace be upon this blessed morning",
    accent: "#c9a84c",
    accent2: "#f0d080",
    glow: "rgba(201,168,76,.3)",
    bg: "linear-gradient(160deg,#0e0c20,#1a1030,#281800)",
    desc: "The golden minarets pierce the pre-dawn sky as the call to Fajr prayer echoes across rooftops. This is the morning of Eid \u2014 the most sacred of dawns.",
    frame: "dark",
    type: "golden-dome-garden",
    stars: 14,
    textColor: "#e7cb7d",
  },
  {
    id: 2,
    room: 1,
    title: "Cosmic Blessing",
    ar: "\u0627\u0644\u0628\u0631\u0643\u0629 \u0627\u0644\u0643\u0648\u0646\u064A\u0629",
    tag: "Celestial",
    size: "med",
    verse: "Written in the stars",
    accent: "#c084fc",
    accent2: "#e0b0ff",
    glow: "rgba(192,132,252,.28)",
    bg: "linear-gradient(145deg,#060010,#100028,#040018)",
    desc: "The universe itself pauses to celebrate. Nebulae bloom across the holy night sky, each star a witness to the blessings of Eid.",
    frame: "dark",
    type: "diamond-star-burst",
    stars: 26,
    textColor: "#dcafff",
  },
  {
    id: 3,
    room: 1,
    title: "Crescent & Morning Star",
    ar: "\u0627\u0644\u0647\u0644\u0627\u0644 \u0648\u0646\u062C\u0645 \u0627\u0644\u0635\u0628\u062D",
    tag: "Classic",
    size: "sq",
    verse: "Guide me to your light",
    accent: "#e8e0ff",
    accent2: "#b9d5ff",
    glow: "rgba(232,224,255,.24)",
    bg: "linear-gradient(145deg,#020408,#040816,#020406)",
    desc: "The eternal symbols of faith \u2014 crescent and star \u2014 observed by generations of believers across fourteen centuries of Eid mornings.",
    frame: "dark",
    type: "sapphire-crescent",
    stars: 18,
    textColor: "#d9e8ff",
  },
  {
    id: 4,
    room: 1,
    title: "Lantern Procession",
    ar: "\u0645\u0648\u0643\u0628 \u0627\u0644\u0641\u0648\u0627\u0646\u064A\u0633",
    tag: "Festive",
    size: "wide",
    verse: "Light upon light",
    accent: "#ff9f43",
    accent2: "#ffd39a",
    glow: "rgba(255,159,67,.26)",
    bg: "linear-gradient(145deg,#0e0800,#1e1000,#080400)",
    desc: "A procession of Ramadan lanterns swaying in the night breeze, their warm glow painting every face in gold on the eve of Eid.",
    frame: "gold",
    type: "midnight-lantern-trail",
    stars: 18,
    textColor: "#ffca75",
  },
  {
    id: 5,
    room: 1,
    title: "Aurora Prayer",
    ar: "\u0635\u0644\u0627\u0629 \u0627\u0644\u0634\u0641\u0642",
    tag: "Celestial",
    size: "tall",
    verse: "Colours of the sacred sky",
    accent: "#22d3ee",
    accent2: "#dffcff",
    glow: "rgba(34,211,238,.22)",
    bg: "linear-gradient(145deg,#000818,#001530,#000410)",
    desc: "Northern lights shimmer above the horizon as families rise for the Eid prayer, the sky itself draped in heavenly colours.",
    frame: "dark",
    type: "aurora-glass",
    stars: 18,
    textColor: "#e4fbff",
  },
  {
    id: 6,
    room: 1,
    title: "Kaaba at Night",
    ar: "\u0627\u0644\u0643\u0639\u0628\u0629 \u0641\u064A \u0627\u0644\u0644\u064A\u0644",
    tag: "Holy",
    size: "med",
    verse: "Heart of the world",
    accent: "#d4a030",
    accent2: "#f0c850",
    glow: "rgba(212,160,48,.26)",
    bg: "linear-gradient(160deg,#040406,#0a0a0e,#030305)",
    desc: "The Kaaba \u2014 black draped in golden Quranic calligraphy \u2014 stands as the spiritual axis of 1.8 billion hearts. On Eid, they turn as one.",
    frame: "gold",
    type: "kaaba-sacred",
    stars: 10,
    textColor: "#efcf82",
  },
  {
    id: 19,
    room: 1,
    title: "Twilight Pearl Minaret",
    ar: "\u0639\u064a\u062f \u0633\u0639\u064a\u062f",
    tag: "Sacred Skyline",
    size: "tall",
    verse: "Pearl light over the prayer line",
    accent: "#f0dd9b",
    accent2: "#c1e4ff",
    glow: "rgba(193,228,255,.24)",
    bg: "linear-gradient(180deg,#101b39 0%,#1a3768 42%,#0a1730 100%)",
    desc: "A marble-white minaret catches the last of the evening glow while the sky deepens into cobalt. The composition feels ceremonial, balancing stone stillness with lunar light.",
    frame: "dark",
    type: "twilight-minaret",
    stars: 14,
    textColor: "#f6efc9",
  },
  {
    id: 20,
    room: 1,
    title: "Sapphire Dome Halo",
    ar: "\u0627\u0644\u0642\u0628\u0629 \u0627\u0644\u0632\u0631\u0642\u0627\u0621",
    tag: "Moonlight Architecture",
    size: "wide",
    verse: "Blue domes beneath a patient moon",
    accent: "#f7dea0",
    accent2: "#8ad5ff",
    glow: "rgba(138,213,255,.24)",
    bg: "linear-gradient(180deg,#10254e 0%,#204777 44%,#0d1f3f 100%)",
    desc: "A halo of blue light crowns the domes and arches, turning the skyline into a devotional silhouette. It is architecture translated into atmosphere rather than monument.",
    frame: "dark",
    type: "moon-mosque-halo",
    stars: 12,
    textColor: "#edf7ff",
  },
  {
    id: 25,
    room: 1,
    title: "Nocturne Crescent Gate",
    ar: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0647\u0644\u0627\u0644",
    tag: "Sacred Threshold",
    size: "med",
    verse: "Enter with peace and gratitude",
    accent: "#f6d978",
    accent2: "#8dfbe2",
    glow: "rgba(141,251,226,.22)",
    bg: "linear-gradient(180deg,#08272a 0%,#12373a 44%,#061517 100%)",
    desc: "A crescent gate opens into shadow and lantern hush, suggesting the quiet moment before a festival courtyard fills with voices. The geometry is restrained, but the invitation is unmistakable.",
    frame: "green",
    type: "crescent-gate",
    stars: 10,
    textColor: "#f7dd8f",
  },
  {
    id: 26,
    room: 1,
    title: "Ocean Pearl Crescent",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u0644\u0624\u0644\u0624",
    tag: "Celestial Tide",
    size: "sq",
    verse: "A crescent lifted by the sea",
    accent: "#8dcff3",
    accent2: "#f2e8b8",
    glow: "rgba(141,207,243,.22)",
    bg: "linear-gradient(180deg,#08182e 0%,#0c2e4e 40%,#061828 100%)",
    desc: "The crescent glows like a polished pearl over a dark tidal horizon. Its palette leans maritime, giving the piece a softer celestial rhythm than the skyline works around it.",
    frame: "dark",
    type: "ocean-crescent-pearl",
    stars: 16,
    textColor: "#d6f3ff",
  },
  {
    id: 27,
    room: 1,
    title: "Golden Garden Dome",
    ar: "\u0642\u0628\u0629 \u0627\u0644\u062C\u0646\u0629",
    tag: "Garden Architecture",
    size: "wide",
    verse: "Domes over the lantern grove",
    accent: "#f0c96e",
    accent2: "#a8e8c0",
    glow: "rgba(168,232,192,.24)",
    bg: "linear-gradient(180deg,#0a2a18 0%,#164a2e 40%,#0a1f14 100%)",
    desc: "An illuminated dome emerges from deep garden greens, carrying the quiet grandeur of a lantern-lit sanctuary. The composition reads as landscape and architecture at the same time.",
    frame: "green",
    type: "golden-dome-garden",
    stars: 12,
    textColor: "#f5d98a",
  },
  {
    id: 33,
    room: 1,
    title: "Amethyst Celestial Gate",
    ar: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0633\u0645\u0627\u0621",
    tag: "Celestial Portal",
    size: "tall",
    verse: "A gate woven from starlight",
    accent: "#d4a0ff",
    accent2: "#f0d8ff",
    glow: "rgba(212,160,255,.26)",
    bg: "linear-gradient(180deg,#1a0832 0%,#2e1250 44%,#0e0420 100%)",
    desc: "Amethyst and violet gradients form a celestial threshold, as though the night sky itself had crystallised into an archway. The piece feels both ancient and interstellar.",
    frame: "dark",
    type: "crescent-gate",
    stars: 20,
    textColor: "#e8c8ff",
  },
  {
    id: 34,
    room: 1,
    title: "Coral Sunrise Minaret",
    ar: "\u0645\u0646\u0627\u0631\u0629 \u0627\u0644\u0641\u062C\u0631",
    tag: "Dawn Architecture",
    size: "med",
    verse: "First light on the prayer tower",
    accent: "#ffe0c0",
    accent2: "#fff4e0",
    glow: "rgba(255,224,192,.24)",
    bg: "linear-gradient(180deg,#ff8a65 0%,#d45040 38%,#6a1828 100%)",
    desc: "The minaret catches the first coral blush of a Fajr sunrise, its silhouette burning against a sky that shifts from peach to crimson. Architecture as devotional sunrise.",
    frame: "gold",
    type: "twilight-minaret",
    stars: 6,
    textColor: "#fff0d8",
  },
  {
    id: 35,
    room: 1,
    title: "Obsidian Imperial Crescent",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u0633\u0644\u0637\u0627\u0646",
    tag: "Royal Night",
    size: "sq",
    verse: "Authority draped in darkness",
    accent: "#d4b060",
    accent2: "#f0d890",
    glow: "rgba(212,176,96,.3)",
    bg: "linear-gradient(180deg,#050508 0%,#0e0e18 42%,#040406 100%)",
    desc: "Against near-total darkness, a gold crescent commands the composition with imperial stillness. The restraint is the statement — luxury reduced to a single luminous arc.",
    frame: "dark",
    type: "crescent-imperial",
    stars: 12,
    textColor: "#e8cc78",
  },
  {
    id: 7,
    room: 2,
    title: "Bismillah",
    ar: "\u0628\u0633\u0645 \u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u062D\u0645\u0646 \u0627\u0644\u0631\u062D\u064A\u0645",
    tag: "Calligraphy",
    size: "med",
    verse: "In the name of Allah, the Most Gracious",
    accent: "#e8c070",
    accent2: "#fff0cb",
    glow: "rgba(232,192,112,.22)",
    bg: "linear-gradient(145deg,#080010,#120018,#040008)",
    desc: "The most beautiful opening in the Arabic language \u2014 Bismillah \u2014 rendered in flowing gold calligraphy by masters of the art.",
    frame: "gold",
    type: "calligraphy-teal",
    stars: 10,
    textColor: "#f6db9d",
  },
  {
    id: 8,
    room: 2,
    title: "Sacred Mandala",
    ar: "\u0627\u0644\u0645\u0646\u062F\u0627\u0644\u0627 \u0627\u0644\u0645\u0642\u062F\u0633\u0629",
    tag: "Islamic Geometry",
    size: "tall",
    verse: "In perfect harmony",
    accent: "#a855f7",
    accent2: "#f1c9ff",
    glow: "rgba(168,85,247,.24)",
    bg: "linear-gradient(145deg,#0c0820,#180f38,#0a0618)",
    desc: "Infinite geometric patterns spiral inward toward the divine centre \u2014 the sacred mandala of Islamic art at its most transcendent.",
    frame: "dark",
    type: "crescent-mandala",
    stars: 14,
    textColor: "#efc8ff",
  },
  {
    id: 9,
    room: 2,
    title: "Moroccan Zellige",
    ar: "\u0627\u0644\u0632\u0644\u064A\u062C \u0627\u0644\u0645\u063A\u0631\u0628\u064A",
    tag: "Geometric Art",
    size: "sq",
    verse: "Beauty in every pattern",
    accent: "#60b4ff",
    accent2: "#b7e1ff",
    glow: "rgba(96,180,255,.2)",
    bg: "linear-gradient(145deg,#040c16,#081828,#020810)",
    desc: "Inspired by centuries of Moroccan zellige tilework \u2014 intricate interlocking diamonds and stars that have adorned holy spaces across the Islamic world.",
    frame: "dark",
    type: "zellige-blue",
    stars: 10,
    textColor: "#cfe9ff",
  },
  {
    id: 10,
    room: 2,
    title: "Taqabbal Allahu",
    ar: "\u062A\u0642\u0628\u0644 \u0627\u0644\u0644\u0647 \u0645\u0646\u0627 \u0648\u0645\u0646\u0643\u0645",
    tag: "Calligraphy",
    size: "wide",
    verse: "May Allah accept from us and from you",
    accent: "#26d0ce",
    accent2: "#bff8ea",
    glow: "rgba(38,208,206,.2)",
    bg: "linear-gradient(145deg,#001012,#002020,#000810)",
    desc: "The traditional Eid greeting exchanged between Muslims \u2014 rendered in flowing teal calligraphy \u2014 carries the warmth of a thousand generations.",
    frame: "dark",
    type: "jade-arch-paradise",
    stars: 14,
    textColor: "#cffff3",
  },
  {
    id: 11,
    room: 2,
    title: "Date Palm Eden",
    ar: "\u0646\u062E\u0644\u0629 \u0627\u0644\u062C\u0646\u0629",
    tag: "Nature",
    size: "med",
    verse: "Sweet as Eid itself",
    accent: "#86efac",
    accent2: "#d4ffe2",
    glow: "rgba(134,239,172,.18)",
    bg: "linear-gradient(145deg,#030e00,#071a00,#020a00)",
    desc: "The date palm \u2014 provider of the sweetest Iftar, symbol of generosity and abundance \u2014 stands tall on Eid morning, its fruits the first taste of celebration.",
    frame: "green",
    type: "palm-green",
    stars: 8,
    textColor: "#e2ffe6",
  },
  {
    id: 12,
    room: 2,
    title: "Prayer Beads",
    ar: "\u0645\u0633\u0628\u062D\u0629 \u0627\u0644\u0630\u0643\u0631",
    tag: "Devotional",
    size: "sq",
    verse: "Subhanallah \u00b7 Alhamdulillah \u00b7 Allahu Akbar",
    accent: "#e8a060",
    accent2: "#ffd6b2",
    glow: "rgba(232,160,96,.18)",
    bg: "linear-gradient(145deg,#100800,#201000,#080400)",
    desc: "Ninety-nine amber beads worn smooth by decades of remembrance \u2014 each one a name of Allah, each one a prayer on the morning of Eid.",
    frame: "gold",
    type: "rose-gold-filigree",
    stars: 8,
    textColor: "#ffd6af",
  },
  {
    id: 21,
    room: 2,
    title: "Celadon Arch Prayer",
    ar: "\u0639\u064a\u062f \u0645\u0628\u0627\u0631\u0643",
    tag: "Calligraphic Garden",
    size: "med",
    verse: "Mercy written in green light",
    accent: "#f1d58a",
    accent2: "#c9f6da",
    glow: "rgba(201,246,218,.22)",
    bg: "linear-gradient(180deg,#0b2f28 0%,#165446 42%,#0a1f1a 100%)",
    desc: "This arch composition pairs deep celadon tones with a soft gold script field. The result feels like a prayer niche opening onto a moonlit garden court.",
    frame: "green",
    type: "jade-arch-paradise",
    stars: 10,
    textColor: "#eef9dc",
  },
  {
    id: 22,
    room: 2,
    title: "Sunlit Zellige Court",
    ar: "\u0628\u0627\u062D\u0629 \u0627\u0644\u0632\u0644\u064A\u062C",
    tag: "Mosaic Study",
    size: "sq",
    verse: "Every tile remembers the sun",
    accent: "#5aa9f5",
    accent2: "#fff1c4",
    glow: "rgba(90,169,245,.18)",
    bg: "linear-gradient(180deg,#f7f3ea 0%,#ece4d2 54%,#ddc8a6 100%)",
    desc: "A pale stone field gives way to blue mosaic geometry, as if a courtyard floor were catching noon light after prayer. The mood is crisp, warm, and mathematically calm.",
    frame: "gold",
    type: "zellige-blue",
    stars: 0,
    textColor: "#2a5770",
  },
  {
    id: 28,
    room: 2,
    title: "Moonlit Silk Frame",
    ar: "\u0625\u0637\u0627\u0631 \u0627\u0644\u0642\u0645\u0631",
    tag: "Geometric Ornament",
    size: "med",
    verse: "Silver threads around the moon",
    accent: "#f5d576",
    accent2: "#d4fff5",
    glow: "rgba(212,255,245,.2)",
    bg: "linear-gradient(180deg,#06242b 0%,#0c3b45 40%,#07161f 100%)",
    desc: "The crescent becomes a frame rather than an emblem, suspended in a field of cool silk-toned light. It feels closer to jewelry and manuscript ornament than to landscape.",
    frame: "dark",
    type: "crescent-frame",
    stars: 10,
    textColor: "#e6f8f2",
  },
  {
    id: 29,
    room: 2,
    title: "Ruby Medallion Night",
    ar: "\u0627\u0644\u0645\u064A\u062F\u0627\u0644\u064A\u0648\u0646 \u0627\u0644\u064A\u0627\u0642\u0648\u062A\u064A",
    tag: "Rosette Geometry",
    size: "tall",
    verse: "Velvet geometry in bloom",
    accent: "#ff9cb4",
    accent2: "#ffd4de",
    glow: "rgba(255,156,180,.24)",
    bg: "linear-gradient(180deg,#2a0b1e 0%,#4b1630 42%,#190811 100%)",
    desc: "A ruby rosette opens from the center like an illuminated manuscript seal pressed into velvet. The palette is lush, but the structure stays rigorously geometric.",
    frame: "gold",
    type: "ruby-mandala-glow",
    stars: 8,
    textColor: "#ffe3ea",
  },
  {
    id: 30,
    room: 2,
    title: "Auric Arch Script",
    ar: "\u0645\u062E\u0637\u0648\u0637\u0629 \u0630\u0647\u0628\u064A\u0629",
    tag: "Illuminated Calligraphy",
    size: "wide",
    verse: "A greeting cast in manuscript gold",
    accent: "#f4cc78",
    accent2: "#fff0c4",
    glow: "rgba(244,204,120,.24)",
    bg: "linear-gradient(180deg,#091527 0%,#122137 42%,#0a1422 100%)",
    desc: "This work treats the Eid greeting as a manuscript frontispiece, framed by an arch and a hush of gold. It belongs equally to the traditions of calligraphy and ceremonial design.",
    frame: "gold",
    type: "ramadan-arch",
    stars: 8,
    textColor: "#fff3c8",
  },
  {
    id: 36,
    room: 2,
    title: "Lavender Mandala Serenity",
    ar: "\u0627\u0644\u0633\u0643\u064A\u0646\u0629 \u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A\u0629",
    tag: "Meditative Geometry",
    size: "tall",
    verse: "Stillness at the centre of pattern",
    accent: "#c098e0",
    accent2: "#e0c8f0",
    glow: "rgba(192,152,224,.22)",
    bg: "linear-gradient(180deg,#f0e8f8 0%,#d8c8e8 50%,#c0a8d8 100%)",
    desc: "A mandala unfolds in muted lavender tones, each ring a step closer to geometric peace. The light palette gives the sacred geometry a meditative warmth rarely seen in this tradition.",
    frame: "gold",
    type: "crescent-mandala",
    stars: 0,
    textColor: "#6a4888",
  },
  {
    id: 37,
    room: 2,
    title: "Copper Manuscript Arch",
    ar: "\u0639\u0642\u062F \u0627\u0644\u0646\u062D\u0627\u0633",
    tag: "Bronze Calligraphy",
    size: "med",
    verse: "Written in warm metal light",
    accent: "#dca068",
    accent2: "#f0c898",
    glow: "rgba(220,160,104,.28)",
    bg: "linear-gradient(180deg,#1a1008 0%,#2a1c10 42%,#100a04 100%)",
    desc: "The arch frames its script in tones of aged copper and warm umber, evoking the illuminated manuscripts of the medieval Islamic world. Each stroke carries the weight of tradition.",
    frame: "dark",
    type: "ramadan-arch",
    stars: 8,
    textColor: "#f0c890",
  },
  {
    id: 38,
    room: 2,
    title: "Indigo Star Navigator",
    ar: "\u0646\u062C\u0645 \u0627\u0644\u0645\u0644\u0627\u062D",
    tag: "Sacred Geometry",
    size: "sq",
    verse: "Every star a compass point of faith",
    accent: "#7090ff",
    accent2: "#a0c0ff",
    glow: "rgba(112,144,255,.26)",
    bg: "linear-gradient(180deg,#080818 0%,#10184a 44%,#060810 100%)",
    desc: "An eight-pointed star radiates from deep indigo like a navigator's compass set to prayer. The geometry is precise, but the atmosphere is vast and oceanic.",
    frame: "dark",
    type: "star-medallion",
    stars: 18,
    textColor: "#90b0ff",
  },
  {
    id: 14,
    room: 3,
    title: "Moonlit Masjid",
    ar: "\u0627\u0644\u0645\u0633\u062C\u062F \u0627\u0644\u0645\u0646\u064A\u0631",
    tag: "Sacred Skyline",
    size: "wide",
    verse: "Lanterns meet the sea of night",
    accent: "#f2c06b",
    accent2: "#7cf1ff",
    glow: "rgba(124,241,255,.26)",
    bg: "linear-gradient(180deg,#0f9ab6 0%,#0d6b8a 40%,#0a2347 100%)",
    desc: "Minarets rise from a luminous turquoise horizon while lamps drift like blessings across the night. It is an Eid skyline made of waterlight, prayer, and gold.",
    frame: "dark",
    type: "moonlit-skyline",
    stars: 12,
    textColor: "#f8fbff",
  },
  {
    id: 15,
    room: 3,
    title: "Cloud Crescent Reverie",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u063A\u064A\u0645",
    tag: "Dreamscape",
    size: "sq",
    verse: "Soft skies for a gentle Eid",
    accent: "#f7d596",
    accent2: "#fff5d4",
    glow: "rgba(255,213,150,.18)",
    bg: "linear-gradient(180deg,#f2d4df 0%,#d9c2ea 44%,#b89cd7 100%)",
    desc: "The crescent drifts through cloud banks tinted rose and lilac, turning the Eid night into a dreamscape. It is devotional imagery with the weight of a lullaby.",
    frame: "gold",
    type: "cloud-crescent",
    stars: 6,
    textColor: "#fff8f2",
  },
  {
    id: 16,
    room: 3,
    title: "Papercut Sunset Arch",
    ar: "\u0642\u0648\u0633 \u0627\u0644\u063A\u0631\u0648\u0628",
    tag: "Paper Craft",
    size: "tall",
    verse: "Layer upon layer of light",
    accent: "#ffe3a8",
    accent2: "#fff4d0",
    glow: "rgba(255,227,168,.18)",
    bg: "linear-gradient(180deg,#f8ba56 0%,#de7a2e 24%,#9a2830 70%,#5d1621 100%)",
    desc: "This layered arch reads like a handmade theatre set at golden hour. Each paper-cut plane steps deeper into the sunset, pulling the eye toward a quiet Eid oasis.",
    frame: "gold",
    type: "papercut-arch",
    stars: 0,
    textColor: "#fff4d7",
  },
  {
    id: 17,
    room: 3,
    title: "Ivory Lantern Filigree",
    ar: "\u0627\u0644\u0641\u0627\u0646\u0648\u0633 \u0627\u0644\u0639\u0627\u062C\u064A",
    tag: "Festive Craft",
    size: "med",
    verse: "An invitation written in gold",
    accent: "#c79a4b",
    accent2: "#fff3ca",
    glow: "rgba(255,232,191,.16)",
    bg: "linear-gradient(180deg,#fffdf7 0%,#f6efdf 54%,#ead9b6 100%)",
    desc: "An ivory field, softened like silk stationery, is pierced by lantern filigree and gilded tracery. The result feels less like a poster and more like a ceremonial invitation.",
    frame: "gold",
    type: "ivory-lantern",
    stars: 0,
    textColor: "#b78042",
  },
  {
    id: 18,
    room: 3,
    title: "Emerald Reflection Gate",
    ar: "\u0628\u0627\u0628 \u0627\u0644\u062C\u0646\u0629",
    tag: "Garden Light",
    size: "med",
    verse: "Reflections of paradise",
    accent: "#f0d278",
    accent2: "#74f1cf",
    glow: "rgba(116,241,207,.24)",
    bg: "linear-gradient(180deg,#0b2d2d 0%,#115047 40%,#081d24 100%)",
    desc: "An emerald gate opens onto mirrored light and deep garden shadow. Its architectural calm is lifted by luminous accents that echo the stillness of an Eid evening courtyard.",
    frame: "green",
    type: "emerald-palace",
    stars: 10,
    textColor: "#f7e29a",
  },
  {
    id: 23,
    room: 3,
    title: "Rosewater Garden Crescent",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u062D\u062F\u064A\u0642\u0629",
    tag: "Floral Reverie",
    size: "tall",
    verse: "Petals keep the lantern company",
    accent: "#fff1c8",
    accent2: "#f8d29c",
    glow: "rgba(255,241,200,.18)",
    bg: "linear-gradient(180deg,#f3d7d8 0%,#ecc8d7 46%,#d9aab8 100%)",
    desc: "The crescent rests among rosewater tones and quiet botanical detail, turning the card into a ceremonial bouquet. Its softness is deliberate rather than delicate.",
    frame: "gold",
    type: "floral-crescent-dawn",
    stars: 0,
    textColor: "#fffaf1",
  },
  {
    id: 24,
    room: 3,
    title: "Velvet Lantern Cascade",
    ar: "\u0634\u0644\u0627\u0644 \u0627\u0644\u0641\u0648\u0627\u0646\u064A\u0633",
    tag: "Festival Glow",
    size: "wide",
    verse: "Ruby light for the evening crowd",
    accent: "#ffd07d",
    accent2: "#ffc0cf",
    glow: "rgba(255,208,125,.22)",
    bg: "linear-gradient(180deg,#2a102d 0%,#4a1a3d 42%,#190814 100%)",
    desc: "A cascade of lanterns slips through velvet maroon shadow, giving the scene the density of a night procession. It carries the drama of celebration without losing the elegance of the gallery setting.",
    frame: "gold",
    type: "lantern-cascade",
    stars: 12,
    textColor: "#ffe7b3",
  },
  {
    id: 31,
    room: 3,
    title: "Ivory Palace Split",
    ar: "\u0642\u0627\u0639\u0629 \u0627\u0644\u0642\u0635\u0631",
    tag: "Ceremonial Lantern",
    size: "tall",
    verse: "Light arranged for the guests",
    accent: "#c49455",
    accent2: "#fff1c9",
    glow: "rgba(255,220,170,.18)",
    bg: "linear-gradient(90deg,#fdf8ee 0%,#f7efdd 48%,#ebddb9 48%,#ddc999 100%)",
    desc: "A split ivory interior suggests draped halls, polished stone, and the formal warmth of an Eid reception. It has the poise of invitation design translated into gallery scale.",
    frame: "gold",
    type: "royal-lantern",
    stars: 0,
    textColor: "#6d4d21",
  },
  {
    id: 32,
    room: 3,
    title: "Starlit Lantern Trail",
    ar: "\u062F\u0631\u0628 \u0627\u0644\u0641\u0648\u0627\u0646\u064A\u0633",
    tag: "Night Procession",
    size: "wide",
    verse: "Lanterns leading the celebration home",
    accent: "#f0c56e",
    accent2: "#ffe4a8",
    glow: "rgba(240,197,110,.24)",
    bg: "linear-gradient(180deg,#0a0a2e 0%,#141448 38%,#08081e 100%)",
    desc: "A path of lantern light recedes into a dark indigo field, creating the sense of movement through a festival night. The work feels cinematic without losing its ornamental discipline.",
    frame: "gold",
    type: "midnight-lantern-trail",
    stars: 14,
    textColor: "#ffe8b8",
  },
  {
    id: 39,
    room: 3,
    title: "Peach Blossom Crescent",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u0623\u0632\u0647\u0627\u0631",
    tag: "Spring Festival",
    size: "tall",
    verse: "Petals fall like whispered blessings",
    accent: "#c87850",
    accent2: "#ffd8c0",
    glow: "rgba(255,200,170,.18)",
    bg: "linear-gradient(180deg,#fde8d8 0%,#f8c8b8 48%,#e8a8a0 100%)",
    desc: "A crescent moon rests among soft peach blossoms, its warmth suggesting spring mornings and family gatherings. The composition breathes with the gentle optimism of an Eid garden.",
    frame: "gold",
    type: "floral-crescent-dawn",
    stars: 0,
    textColor: "#9a5840",
  },
  {
    id: 40,
    room: 3,
    title: "Burgundy Lantern Gala",
    ar: "\u062D\u0641\u0644 \u0627\u0644\u0641\u0648\u0627\u0646\u064A\u0633",
    tag: "Festive Drama",
    size: "wide",
    verse: "Deep red glow for the evening feast",
    accent: "#ffb080",
    accent2: "#ffd8c0",
    glow: "rgba(255,176,128,.24)",
    bg: "linear-gradient(180deg,#3a0818 0%,#5a1028 42%,#280610 100%)",
    desc: "Lanterns cascade through a burgundy atmosphere rich enough to taste. The colour palette evokes damask tablecloths and henna nights — celebration at its most theatrical.",
    frame: "gold",
    type: "lantern-cascade",
    stars: 10,
    textColor: "#ffc8a0",
  },
  {
    id: 41,
    room: 3,
    title: "Teal Aegean Skyline",
    ar: "\u0623\u0641\u0642 \u0627\u0644\u0628\u062D\u0631",
    tag: "Coastal Sacred",
    size: "med",
    verse: "Where the sea meets the minaret",
    accent: "#80e8d8",
    accent2: "#c0fff0",
    glow: "rgba(128,232,216,.24)",
    bg: "linear-gradient(180deg,#064040 0%,#0a6058 40%,#042828 100%)",
    desc: "A mosque skyline rises from teal depths, as if built on an underwater reef of devotion. The colour is somewhere between Aegean sea glass and celadon glaze.",
    frame: "green",
    type: "moonlit-skyline",
    stars: 14,
    textColor: "#b0f8e8",
  },
  {
    id: 42,
    room: 3,
    title: "Sunset Oasis Silhouette",
    ar: "\u0648\u0627\u062D\u0629 \u0627\u0644\u063A\u0631\u0648\u0628",
    tag: "Golden Hour",
    size: "sq",
    verse: "Palms and prayer at the amber edge",
    accent: "#ffe8b0",
    accent2: "#fff4d8",
    glow: "rgba(255,232,176,.2)",
    bg: "linear-gradient(180deg,#f8d040 0%,#e88028 24%,#b84030 58%,#4a1820 100%)",
    desc: "A desert oasis silhouette burns against a four-tone sunset, each band of colour a different temperature of the day's final prayer. The horizon line feels infinite.",
    frame: "gold",
    type: "sunset-silhouette",
    stars: 0,
    textColor: "#fff4d0",
  },
  {
    id: 43,
    room: 1,
    title: "Silver Mist Crescent",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u0641\u0636\u0627\u0621",
    tag: "Morning Haze",
    size: "med",
    verse: "Soft light through morning clouds",
    accent: "#607888",
    accent2: "#c0d8e8",
    glow: "rgba(160,200,232,.2)",
    bg: "linear-gradient(180deg,#e8eef4 0%,#c8d4e0 52%,#a8b8c8 100%)",
    desc: "A silver crescent rises through morning mist, its soft glow diffused by low-hanging clouds. The palette evokes the quiet peace of dawn.",
    frame: "gold",
    type: "cloud-crescent",
    stars: 6,
    textColor: "#405868",
  },
  {
    id: 44,
    room: 1,
    title: "Cobalt Night Arch",
    ar: "\u0642\u0648\u0633 \u0627\u0644\u0644\u064a\u0644 \u0627\u0644\u0643\u0628\u0627\u0644\u062a",
    tag: "Steel Elegance",
    size: "tall",
    verse: "A midnight arch in cobalt blue",
    accent: "#8090c0",
    accent2: "#b0c8e8",
    glow: "rgba(128,144,192,.24)",
    bg: "linear-gradient(180deg,#0a1028 0%,#142040 42%,#080818 100%)",
    desc: "An arch of cobalt blue rises against the night sky, its geometric precision softened by a gentle glow. The composition balances strength with serenity.",
    frame: "dark",
    type: "ramadan-arch",
    stars: 10,
    textColor: "#a0b0d8",
  },
  {
    id: 45,
    room: 1,
    title: "Terracotta Dawn Gate",
    ar: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u062c\u0631",
    tag: "Earthen Warmth",
    size: "med",
    verse: "Earth tones greet the morning sun",
    accent: "#a06040",
    accent2: "#e8c0a0",
    glow: "rgba(232,192,160,.22)",
    bg: "linear-gradient(180deg,#f8d8c0 0%,#e8b898 48%,#c89070 100%)",
    desc: "A gate of warm terracotta catches the first light of dawn, its earthy tones radiating the warmth of the desert sun.",
    frame: "gold",
    type: "crescent-gate",
    stars: 0,
    textColor: "#704830",
  },
  {
    id: 46,
    room: 1,
    title: "Jade Lotus Bloom",
    ar: "\u0644\u0648\u062a\u0633 \u0627\u0644\u064a\u0627\u0633\u0645\u064a\u0646",
    tag: "Sacred Water Flower",
    size: "wide",
    verse: "A sacred flower rises from still waters",
    accent: "#80d0a0",
    accent2: "#c0f0d8",
    glow: "rgba(128,208,160,.24)",
    bg: "linear-gradient(180deg,#082820 0%,#104038 42%,#061818 100%)",
    desc: "A jade lotus blooms in a tranquil garden pool, its petals catching the moonlight. The composition evokes the serenity of sacred waters.",
    frame: "green",
    type: "emerald-palace",
    stars: 12,
    textColor: "#90e0b0",
  },
  {
    id: 47,
    room: 1,
    title: "Opal Crescent Dream",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u0623\u0648\u0628\u0627\u0644",
    tag: "Iridescent Moon",
    size: "tall",
    verse: "Moonlight shifts like opal fire",
    accent: "#a080c0",
    accent2: "#d8c8f0",
    glow: "rgba(192,160,224,.22)",
    bg: "linear-gradient(180deg,#f0e8f8 0%,#d8c8e8 50%,#c0a8d8 100%)",
    desc: "An opalescent crescent floats through a dreamlike sky, its colors shifting like the precious stone caught in moonlight.",
    frame: "gold",
    type: "crescent-bloom",
    stars: 8,
    textColor: "#7858a0",
  },
  {
    id: 48,
    room: 2,
    title: "Mahogany Lantern Hall",
    ar: "\u0642\u0627\u0639\u0629 \u0627\u0644\u0645\u0627\u0647\u0648\u063a\u0627\u0646\u064a",
    tag: "Rich Wood Tone",
    size: "wide",
    verse: "Warm wood and gentle light",
    accent: "#c87850",
    accent2: "#e8b080",
    glow: "rgba(200,160,120,.24)",
    bg: "linear-gradient(180deg,#1a0a08 0%,#2a1810 42%,#100808 100%)",
    desc: "A hall of mahogany wood glows with lantern light, its rich tones creating an atmosphere of warmth and hospitality.",
    frame: "gold",
    type: "lantern-cascade",
    stars: 10,
    textColor: "#d8a070",
  },
  {
    id: 49,
    room: 2,
    title: "Sage Garden Reflection",
    ar: "\u062d\u062f\u064a\u0642\u0629 \u0627\u0644\u0645\u0631\u0645\u0648\u0633\u0629",
    tag: "Peaceful Green",
    size: "med",
    verse: "Still waters mirror peaceful green",
    accent: "#607860",
    accent2: "#a0d0a0",
    glow: "rgba(160,200,160,.18)",
    bg: "linear-gradient(180deg,#e0f0e0 0%,#c0dcc0 52%,#98b898 100%)",
    desc: "A sage green garden reflects in still water, its muted tones bringing a sense of calm and contemplation.",
    frame: "green",
    type: "jade-arch-paradise",
    stars: 0,
    textColor: "#506050",
  },
  {
    id: 50,
    room: 2,
    title: "Midnight Ruby Star",
    ar: "\u0646\u062c\u0645 \u064a\u0627\u0642\u0648\u062a \u0627\u0644\u0644\u064a\u0644",
    tag: "Deep Red Burst",
    size: "sq",
    verse: "A ruby star pierces the dark",
    accent: "#ff6080",
    accent2: "#ff90a8",
    glow: "rgba(255,96,128,.28)",
    bg: "linear-gradient(180deg,#180810 0%,#281020 42%,#100410 100%)",
    desc: "A brilliant ruby star bursts from the midnight sky, its deep red glow cutting through the darkness like a precious gemstone.",
    frame: "dark",
    type: "diamond-star-burst",
    stars: 16,
    textColor: "#ff80a0",
  },
  {
    id: 51,
    room: 2,
    title: "Pearl Shell Horizon",
    ar: "\u0623\u0641\u0642 \u0627\u0644\u0644\u0624\u0644\u0624",
    tag: "Nacre Glow",
    size: "wide",
    verse: "Nacre light on the water's edge",
    accent: "#a09080",
    accent2: "#e8e0d0",
    glow: "rgba(240,224,208,.18)",
    bg: "linear-gradient(180deg,#f8f4f0 0%,#e8e0d8 52%,#d8d0c0 100%)",
    desc: "A pearl shell horizon glows with nacre light, its soft iridescence reflected in calm waters.",
    frame: "gold",
    type: "ivory-lantern",
    stars: 0,
    textColor: "#807060",
  },
  {
    id: 52,
    room: 2,
    title: "Turquoise Prayer Arch",
    ar: "\u0642\u0648\u0633 \u0627\u0644\u0641\u064a\u0631\u0627\u0646\u0633",
    tag: "Faience Glory",
    size: "tall",
    verse: "Blue tiles pray to the sky",
    accent: "#60d0c0",
    accent2: "#a0f0e8",
    glow: "rgba(96,208,192,.24)",
    bg: "linear-gradient(180deg,#083838 0%,#105858 42%,#042828 100%)",
    desc: "A turquoise arch rises like a prayer, its faience tiles catching the light in a celebration of blue.",
    frame: "green",
    type: "moonlit-skyline",
    stars: 12,
    textColor: "#70e0d0",
  },
  {
    id: 53,
    room: 2,
    title: "Violet Dusk Crescent",
    ar: "\u0647\u0644\u0627\u0644 \u0627\u0644\u0639\u0635\u0627\u0631",
    tag: "Twilight Purple",
    size: "sq",
    verse: "Purple twilight holds the crescent",
    accent: "#b080e0",
    accent2: "#d8b8f0",
    glow: "rgba(176,128,224,.24)",
    bg: "linear-gradient(180deg,#1a1030 0%,#2a1848 44%,#100820 100%)",
    desc: "A violet dusk envelopes a golden crescent, the purple sky creating a dramatic backdrop for the moon.",
    frame: "dark",
    type: "crescent-imperial",
    stars: 14,
    textColor: "#c8a0f0",
  },
  {
    id: 54,
    room: 3,
    title: "Copper Lantern Glow",
    ar: "\u0641\u0627\u0646\u0648\u0633 \u0627\u0644\u0646\u062d\u0627\u0633",
    tag: "Metallic Warmth",
    size: "wide",
    verse: "Copper light for cold nights",
    accent: "#d89060",
    accent2: "#f0b890",
    glow: "rgba(216,144,96,.26)",
    bg: "linear-gradient(180deg,#2a1810 0%,#3a2820 44%,#181010 100%)",
    desc: "Copper lanterns glow with metallic warmth, their amber light pushing back the evening chill.",
    frame: "gold",
    type: "amber-lantern",
    stars: 8,
    textColor: "#e8a070",
  },
  {
    id: 55,
    room: 3,
    title: "Frost Crystal Frame",
    ar: "\u0625\u0637\u0627\u0631 \u0627\u0644\u0628\u0644\u0648\u0631",
    tag: "Ice Palace",
    size: "med",
    verse: "Crystal ice frames the night",
    accent: "#5080a0",
    accent2: "#b0d8f0",
    glow: "rgba(160,200,232,.2)",
    bg: "linear-gradient(180deg,#d8f0f8 0%,#b0d8e8 50%,#88c0d8 100%)",
    desc: "A frost crystal frame encloses a winter scene, the icy blue palette evoking a palace of frozen light.",
    frame: "gold",
    type: "crescent-frame",
    stars: 0,
    textColor: "#406878",
  },
  {
    id: 56,
    room: 3,
    title: "Saffron Garden Dawn",
    ar: "\u062d\u062f\u064a\u0642\u0629 \u0627\u0644\u0632\u0639\u0641\u0631\u0627\u0646",
    tag: "Golden Spice",
    size: "wide",
    verse: "Saffron colors the morning garden",
    accent: "#a07030",
    accent2: "#e8c878",
    glow: "rgba(240,200,120,.22)",
    bg: "linear-gradient(180deg,#f8e8c8 0%,#e8d090 48%,#d0a050 100%)",
    desc: "A saffron garden awakens to the morning light, its golden spice colors warming the dawn air.",
    frame: "gold",
    type: "golden-dome-garden",
    stars: 0,
    textColor: "#906020",
  },
  {
    id: 57,
    room: 3,
    title: "Slate Blue Mosque",
    ar: "\u0645\u0633\u062c\u062f \u0627\u0644\u0627\u0631\u062f\u0648\u0632",
    tag: "Stone Architecture",
    size: "tall",
    verse: "Stone minarets touch the slate sky",
    accent: "#8090a8",
    accent2: "#b0c0d8",
    glow: "rgba(128,144,168,.22)",
    bg: "linear-gradient(180deg,#1a2030 0%,#283848 42%,#101828 100%)",
    desc: "A mosque of slate blue stone rises against a matching sky, its quiet dignity speaking of centuries past.",
    frame: "dark",
    type: "moon-mosque-halo",
    stars: 10,
    textColor: "#90a0b8",
  },
  {
    id: 58,
    room: 3,
    title: "Coral Reef Lantern",
    ar: "\u0641\u0627\u0646\u0648\u0633 \u0627\u0644\u0634\u0639\u0628 \u0627\u0644\u0645\u0631\u062c\u0627\u0646\u064a",
    tag: "Ocean Garden",
    size: "wide",
    verse: "Coral gardens beneath the waves",
    accent: "#ff8070",
    accent2: "#ffb0a0",
    glow: "rgba(255,128,112,.24)",
    bg: "linear-gradient(180deg,#2a1818 0%,#402828 44%,#180808 100%)",
    desc: "Coral reef lanterns glow beneath the ocean surface, their warm colors creating an underwater garden of light.",
    frame: "gold",
    type: "lantern-cascade",
    stars: 12,
    textColor: "#ff9080",
  },
  {
    id: 59,
    room: 1,
    title: "Mystic Violet Veil",
    ar: "\u062d\u0644\u064a\u0629 \u0627\u0644\u0628\u0646\u0641\u0633\u062c\u064a\u0629",
    tag: "Enchanted Twilight",
    size: "tall",
    verse: "A violet mystery unfolds at dusk",
    accent: "#b088ff",
    accent2: "#d8c0ff",
    glow: "rgba(176,136,255,.24)",
    bg: "linear-gradient(180deg,#1a0a28 0%,#2a1840 44%,#100820 100%)",
    desc: "A mystic violet veil descends at twilight, its enchanted colors transforming the night into something magical.",
    frame: "dark",
    type: "crescent-imperial",
    stars: 16,
    textColor: "#c8a8ff",
  },
  {
    id: 60,
    room: 1,
    title: "Golden Wheat Field",
    ar: "\u062d\u0642\u0644 \u0627\u0644\u0642\u0645\u062d",
    tag: "Harvest Moon",
    size: "wide",
    verse: "Golden waves under the harvest moon",
    accent: "#907020",
    accent2: "#e8d080",
    glow: "rgba(240,208,128,.2)",
    bg: "linear-gradient(180deg,#f8e8a0 0%,#d8c060 48%,#b09040 100%)",
    desc: "Golden wheat fields sway in the evening breeze, their harvest colors catching the light of a full moon.",
    frame: "gold",
    type: "golden-dome-garden",
    stars: 0,
    textColor: "#705818",
  },
  {
    id: 61,
    room: 1,
    title: "Arctic Aurora Sky",
    ar: "\u0633\u0645\u0627\u0621 \u0627\u0644\u0634\u0641\u0642 \u0627\u0644\u0642\u0637\u0628\u064a",
    tag: "Northern Lights",
    size: "tall",
    verse: "Dancing lights in the frozen sky",
    accent: "#60e0b0",
    accent2: "#a0ffe0",
    glow: "rgba(96,224,176,.22)",
    bg: "linear-gradient(180deg,#0a1828 0%,#142840 42%,#081820 100%)",
    desc: "The northern lights dance across an arctic sky, ribbons of green and pink weaving through stars.",
    frame: "dark",
    type: "aurora-glass",
    stars: 20,
    textColor: "#70f0c0",
  },
  {
    id: 62,
    room: 1,
    title: "Rose Gold Palace",
    ar: "\u0642\u0635\u0631 \u0627\u0644\u0630\u0647\u0628 \u0627\u0644\u0648\u0631\u062f\u064a",
    tag: "Blush Elegance",
    size: "med",
    verse: "A palace draped in rose gold silk",
    accent: "#a87860",
    accent2: "#e8c8b0",
    glow: "rgba(232,200,176,.18)",
    bg: "linear-gradient(180deg,#f8e8e0 0%,#e8d0c0 52%,#d0b0a0 100%)",
    desc: "A rose gold palace gleams in soft light, its elegant walls reflecting the blush of sunset.",
    frame: "gold",
    type: "rose-lantern-blush",
    stars: 0,
    textColor: "#806048",
  },
  {
    id: 63,
    room: 1,
    title: "Midnight Navy Star",
    ar: "\u0646\u062c\u0645 \u0627\u0644\u0644\u064a\u0644 \u0627\u0644\u0643\u062d\u0644\u064a",
    tag: "Deep Sea Cosmos",
    size: "sq",
    verse: "Stars emerge from the navy deep",
    accent: "#6080c0",
    accent2: "#90a8e0",
    glow: "rgba(96,128,192,.24)",
    bg: "linear-gradient(180deg,#050a18 0%,#0a1428 42%,#040810 100%)",
    desc: "A navy sky deepens into cosmic darkness as stars burst forth like distant lanterns at sea.",
    frame: "dark",
    type: "diamond-star-burst",
    stars: 18,
    textColor: "#8090d0",
  },
  {
    id: 64,
    room: 1,
    title: "Desert Rose Sunset",
    ar: "\u0648\u0631\u062f \u0627\u0644\u0635\u062d\u0631\u0627\u0621",
    tag: "Sahara Bloom",
    size: "wide",
    verse: "Roses bloom in the desert sand",
    accent: "#ffb080",
    accent2: "#ffd8c0",
    glow: "rgba(255,176,128,.22)",
    bg: "linear-gradient(180deg,#f8a060 0%,#d86040 38%,#a03020 100%)",
    desc: "A desert rose blooms against a fiery sunset, the sand catching fire with each passing moment.",
    frame: "gold",
    type: "sunset-silhouette",
    stars: 0,
    textColor: "#ffc8a0",
  },
  {
    id: 65,
    room: 2,
    title: "Emerald City Glow",
    ar: "\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0632\u064f\u0645\u0631\u062f",
    tag: "Jewel of the East",
    size: "wide",
    verse: "An emerald jewel lights the night",
    accent: "#50d090",
    accent2: "#90f0c0",
    glow: "rgba(80,208,144,.22)",
    bg: "linear-gradient(180deg,#082820 0%,#104038 42%,#061820 100())",
    desc: "An emerald city glows in the darkness, its towers rising like precious stones from the earth.",
    frame: "green",
    type: "emerald-palace",
    stars: 14,
    textColor: "#60e0a0",
  },
  {
    id: 66,
    room: 2,
    title: "Antique Gold Frame",
    ar: "\u0625\u0637\u0627\u0631 \u0627\u0644\u0630\u0647\u0628 \u0627\u0644\u0639\u0645\u064a\u0642",
    tag: "Vintage Treasure",
    size: "med",
    verse: "A frame of ancient gold",
    accent: "#806018",
    accent2: "#d8b860",
    glow: "rgba(216,184,96,.2)",
    bg: "linear-gradient(180deg,#f0d8a0 0%,#c8a040 48%,#907020 100%)",
    desc: "An antique gold frame holds a moment in time, its vintage patina speaking of centuries past.",
    frame: "gold",
    type: "crescent-frame",
    stars: 0,
    textColor: "#907020",
  },
  {
    id: 67,
    room: 2,
    title: "Winter Frost Gate",
    ar: "\u0628\u0648\u0627\u0628\u0629 \u0635\u0641\u062d \u0627\u0644\u0634\u062a\u0627\u0621",
    tag: "Ice Kingdom",
    size: "med",
    verse: "Ice crystals form a royal entrance",
    accent: "#4080a0",
    accent2: "#90c8e8",
    glow: "rgba(128,176,232,.18)",
    bg: "linear-gradient(180deg,#c8e8f8 0%,#98c8e0 50%,#68a8c8 100%)",
    desc: "A winter frost gate stands frozen in time, ice crystals forming patterns of impossible beauty.",
    frame: "gold",
    type: "crescent-gate",
    stars: 0,
    textColor: "#306878",
  },
  {
    id: 68,
    room: 2,
    title: "Tangerine Dream",
    ar: "\u062d\u0644\u0645 \u0627\u0644\u064a\u0627\u0633\u0645\u064a\u0646",
    tag: "Citrus Sunset",
    size: "tall",
    verse: "Citrus colors paint the evening",
    accent: "#ffb060",
    accent2: "#ffd8a0",
    glow: "rgba(255,176,96,.24)",
    bg: "linear-gradient(180deg,#ff9040 0%,#e86020 42%,#c04010 100())",
    desc: "A tangerine dream unfolds at sunset, the sky burning with citrus colors that warm the soul.",
    frame: "gold",
    type: "papercut-arch",
    stars: 0,
    textColor: "#ffc880",
  },
  {
    id: 69,
    room: 2,
    title: "Moonstone Glow",
    ar: "\u0628\u0631\u0627\u0642 \u0627\u0644\u0642\u0645\u0631",
    tag: "Selenite Light",
    size: "sq",
    verse: "Moonstone glows with inner light",
    accent: "#7878a0",
    accent2: "#c8c8e8",
    glow: "rgba(200,200,232,.16)",
    bg: "linear-gradient(180deg,#e8e8f0 0%,#c8c8d8 52%,#a8a8c0 100())",
    desc: "A moonstone glows with ethereal light, its selenite surface catching every available ray.",
    frame: "gold",
    type: "ivory-lantern",
    stars: 0,
    textColor: "#585878",
  },
  {
    id: 70,
    room: 2,
    title: "Neon Peacock Feather",
    ar: "\u0631\u064a\u0634 \u0637\u0627\u0648\u0633 \u0627\u0644\u0646\u064a\u0648\u0646",
    tag: "Iridescent Pride",
    size: "tall",
    verse: "A feather shimmers with impossible colors",
    accent: "#00c896",
    accent2: "#60ffe0",
    glow: "rgba(0,200,150,.24)",
    bg: "linear-gradient(180deg,#0a1020 0%,#141830 42%,#080818 100())",
    desc: "A neon peacock feather displays impossible colors, each eye catching light in a different hue.",
    frame: "dark",
    type: "crescent-mandala",
    stars: 12,
    textColor: "#40e8b8",
  },
  {
    id: 71,
    room: 3,
    title: "Caramel Dunes",
    ar: "\u062a\u0644\u0627\u0644 \u0627\u0644\u0643\u0631\u0627\u0645\u064a\u0644",
    tag: "Sandy Horizons",
    size: "wide",
    verse: "Caramel waves roll to the horizon",
    accent: "#805828",
    accent2: "#d8b080",
    glow: "rgba(216,176,128,.2)",
    bg: "linear-gradient(180deg,#f0d8a8 0%,#d0a060 48%,#a07030 100())",
    desc: "Caramel dunes stretch to infinity, their smooth curves catching the golden light of day.",
    frame: "gold",
    type: "desert-amber",
    stars: 0,
    textColor: "#906030",
  },
  {
    id: 72,
    room: 3,
    title: "Sapphire Palace Gate",
    ar: "\u0628\u0648\u0627\u0628\u0629 \u0642\u0635\u0631 \u0627\u0644\u064a\u0627\u0642\u0648\u062a",
    tag: "Royal Blue Entry",
    size: "tall",
    verse: "A sapphire gate to royal chambers",
    accent: "#5080e0",
    accent2: "#90b0ff",
    glow: "rgba(80,128,224,.24)",
    bg: "linear-gradient(180deg,#081830 0%,#102850 42%,#041020 100())",
    desc: "A sapphire palace gate stands in royal blue, its precious color marking the entrance to greatness.",
    frame: "dark",
    type: "crescent-gate",
    stars: 10,
    textColor: "#7090f0",
  },
  {
    id: 73,
    room: 3,
    title: "Marigold Festival",
    ar: "\u0639\u064a\u062f \u0627\u0644\u0622\u0647\u0646",
    tag: "Marigold Celebration",
    size: "wide",
    verse: "Marigolds paint the festival gold",
    accent: "#ff9000",
    accent2: "#ffb840",
    glow: "rgba(255,144,0,.24)",
    bg: "linear-gradient(180deg,#f8c040 0%,#e89020 42%,#c06000 100())",
    desc: "Marigolds bloom in celebration, their golden petals creating rivers of light through the festival.",
    frame: "gold",
    type: "lantern-cascade",
    stars: 8,
    textColor: "#ffa020",
  },
  {
    id: 74,
    room: 3,
    title: "Periwinkle Dreams",
    ar: "\u062d\u0644\u0645 \u0627\u0644\u0643\u0644\u0628\u0627\u0646\u064a\u062b\u0627",
    tag: "Soft Lavender Sky",
    size: "tall",
    verse: "Periwinkle clouds drift through twilight",
    accent: "#7860a0",
    accent2: "#b8a0d8",
    glow: "rgba(176,160,216,.18)",
    bg: "linear-gradient(180deg,#e0d8f0 0%,#c0b0d8 52%,#a088c0 100())",
    desc: "Periwinkle dreams float through a lavender sky, soft colors bringing peace to the evening.",
    frame: "gold",
    type: "cloud-crescent",
    stars: 0,
    textColor: "#584878",
  },
  {
    id: 75,
    room: 3,
    title: "Ebony & Ivory",
    ar: "\u0627\u0644\u0627\u0628\u0646\u0648\u0633 \u0648\u0627\u0644\u0639\u0627\u062c",
    tag: "Classic Contrast",
    size: "wide",
    verse: "Dark and light in perfect balance",
    accent: "#d8c8a0",
    accent2: "#f0e8d0",
    glow: "rgba(216,200,160,.18)",
    bg: "linear-gradient(180deg,#181008 0%,#282010 42%,#100808 100())",
    desc: "Ebony and ivory meet in classic contrast, a timeless pairing of dark and light.",
    frame: "gold",
    type: "royal-lantern",
    stars: 0,
    textColor: "#c8b080",
  },
  {
    id: 76,
    room: 3,
    title: "Rainbow Crescent Arc",
    ar: "\u0642\u0648\u0633 \u0627\u0644\u0642\u0632\u062d \u0627\u0644\u0645\u062a\u0643\u062f\u0651\u062f",
    tag: "Prismatic Light",
    size: "tall",
    verse: "Colors arc across the night sky",
    accent: "#ff80c0",
    accent2: "#ffff80",
    glow: "rgba(255,128,192,.2)",
    bg: "linear-gradient(180deg,#100820 0%,#181030 42%,#080818 100())",
    desc: "A rainbow crescent arcs across the sky, prismatic light weaving colors into the darkness.",
    frame: "dark",
    type: "crescent-bloom",
    stars: 14,
    textColor: "#ffb0e0",
  },
  {
    id: 77,
    room: 3,
    title: "Brass Lantern Street",
    ar: "\u0634\u0627\u0631\u0639 \u0641\u0627\u0646\u0648\u0633 \u0627\u0644\u0646\u062d\u0627\u0633",
    tag: "Old World Glow",
    size: "wide",
    verse: "Brass lanterns light the ancient path",
    accent: "#c8a040",
    accent2: "#e8c878",
    glow: "rgba(200,160,64,.24)",
    bg: "linear-gradient(180deg,#1a1408 0%,#2a2010 42%,#100808 100())",
    desc: "Brass lanterns line an ancient street, their warm glow calling travelers home.",
    frame: "gold",
    type: "midnight-lantern-trail",
    stars: 10,
    textColor: "#d8b060",
  },
  {
    id: 78,
    room: 3,
    title: "Fairy Wing Crescent",
    ar: "\u062c\u0646\u0627\u062d \u0627\u0644\u062c\u0646\u064a \u0627\u0644\u0635\u063a\u064a\u0631",
    tag: "Delicate Magic",
    size: "tall",
    verse: "Wings of light cradle the moon",
    accent: "#a080a0",
    accent2: "#e8c8e8",
    glow: "rgba(224,192,224,.18)",
    bg: "linear-gradient(180deg,#f8e8f8 0%,#e8d0e8 52%,#d0b0d0 100())",
    desc: "Fairy wing crescents float through a dreamlike sky, delicate magic lighting the night.",
    frame: "gold",
    type: "floral-crescent-dawn",
    stars: 8,
    textColor: "#785878",
  },
];

const FRAMES = {
  dark: { outer: "#1a120a", inner: "#2a1e10", mat: "#f5f0e8", strip: "#3a2810" },
  gold: { outer: "#5a3c08", inner: "#8a6020", mat: "#f8f4ec", strip: "#c9a040" },
  green: { outer: "#1a2a14", inner: "#2a4020", mat: "#f0f5ee", strip: "#4a7030" },
};

function MuseumArtworkScene({ art, mode = "card" }: { art: Artwork; mode?: "card" | "lightbox" }) {
  const isLightbox = mode === "lightbox";
  const textColor = art.textColor ?? art.accent;
  const titleSize = isLightbox
    ? "52px"
    : art.size === "wide"
      ? "clamp(18px, 2.3vw, 25px)"
      : art.size === "sq"
        ? "clamp(20px, 2.6vw, 28px)"
        : "clamp(22px, 2.9vw, 32px)";
  const arabicSize = isLightbox
    ? "28px"
    : art.size === "wide"
      ? "clamp(11px, 1.4vw, 15px)"
      : "clamp(12px, 1.8vw, 17px)";
  const textTop = isLightbox ? "67%" : art.size === "wide" ? "66%" : art.size === "sq" ? "65%" : "68%";
  const stars = isLightbox ? art.stars + 8 : art.stars;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: art.bg,
      }}
    >
      {stars > 0 && <StarsLayer accent={art.accent} count={stars} />}
      <GlowLayer glow={art.glow} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(180deg, rgba(7,6,10,.08) 0%, transparent 26%, transparent 58%, rgba(7,6,10,.28) 100%)",
        }}
      />
      <CardArtwork type={art.type} accent={art.accent} accent2={art.accent2} />

      <div
        style={{
          position: "absolute",
          inset: isLightbox ? "18px" : "10px",
          border: `1px solid ${textColor}22`,
          pointerEvents: "none",
          zIndex: 4,
        }}
      />
      <div style={{ opacity: isLightbox ? 0.5 : 0.34 }}>
        <OrnamentFrame accent={textColor} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: textTop,
          transform: "translate(-50%, -50%)",
          width: isLightbox ? "72%" : art.size === "wide" ? "62%" : "74%",
          textAlign: "center",
          zIndex: 5,
          color: textColor,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
            fontSize: titleSize,
            fontStyle: "italic",
            color: textColor,
            textShadow: `0 0 ${isLightbox ? "42px" : "22px"} ${art.glow}`,
            lineHeight: 0.92,
          }}
        >
          Eid
          <br />
          Mubarak
        </div>
        <div
          style={{
            width: isLightbox ? "92px" : "40px",
            height: "1px",
            background: textColor,
            opacity: 0.22,
            margin: isLightbox ? "16px auto 14px" : "8px auto 7px",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-amiri), 'Amiri', serif",
            fontSize: arabicSize,
            direction: "rtl",
            color: textColor,
            opacity: 0.74,
            lineHeight: 1.28,
          }}
        >
          {art.ar}
        </div>
      </div>
    </div>
  );
}

function MuseumFramedArtwork({
  art,
  mode = "card",
  content,
}: {
  art: Artwork;
  mode?: "card" | "lightbox";
  content?: ReactNode;
}) {
  const f = FRAMES[art.frame];
  const isLightbox = mode === "lightbox";
  const lightboxAspectBySize = {
    tall: "0.78 / 1",
    med: "0.9 / 1",
    sq: "1 / 1",
    wide: "1.18 / 1",
  } as const;

  return (
    <div
      className="frame-shadow"
      style={
        isLightbox
          ? {
              width: "auto",
              height: "100%",
              maxWidth: "100%",
              aspectRatio: lightboxAspectBySize[art.size],
            }
          : undefined
      }
    >
      <div
        className="frame-outer"
        style={{
          background: f.outer,
          outline: `1px solid ${f.strip}20`,
          height: isLightbox ? "100%" : undefined,
          padding: isLightbox ? "10px" : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "3px",
            border: `1px solid ${f.strip}40`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <div
          className="frame-inner-border"
          style={{
            background: f.inner,
            height: isLightbox ? "100%" : undefined,
          }}
        >
          <div
            className="mat"
            style={{
              background: f.mat,
              height: isLightbox ? "100%" : undefined,
              padding: isLightbox ? "16px 16px 20px" : undefined,
            }}
          >
            <div
              className="art-piece"
              style={
                isLightbox
                  ? {
                      height: "100%",
                    }
                  : undefined
              }
            >
              <div
                className="art-canvas"
                style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
              >
                {content ?? <MuseumArtworkScene art={art} mode={mode} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtworkCard({ art, onClick }: { art: Artwork; onClick: () => void }) {
  return (
    <div
      className={`artwork ${art.size}`}
      style={{ animationDelay: `${(art.id - 1) * 0.1}s` }}
      onClick={onClick}
    >
      <div className="wire">
        <svg width="120" height="24" viewBox="0 0 120 24">
          <path d="M10,2 Q60,24 110,2" fill="none" stroke="#8a7050" strokeWidth="1.2" opacity=".5" />
          <circle cx="10" cy="2" r="3" fill="#6a5030" opacity=".6" />
          <circle cx="110" cy="2" r="3" fill="#6a5030" opacity=".6" />
        </svg>
      </div>

      <MuseumFramedArtwork art={art} />

      <div className="plaque">
        <div className="plaque-line" />
        <div className="plaque-title">{art.title}</div>
        <div className="plaque-ar">{art.ar}</div>
        <div className="plaque-meta">{`${art.tag} \u00b7 No. ${String(art.id).padStart(2, "0")}`}</div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const router = useRouter();
  const authEnabled = isSupabaseConfigured();
  const supabase = useMemo(() => (authEnabled ? createClient() : null), [authEnabled]);
  const { shareCard, isSharing, shareStatus, shareError, clearShareFeedback } = useShareCard();
  const [lightbox, setLightbox] = useState<Artwork | null>(null);
  const [lightboxPreviewPage, setLightboxPreviewPage] = useState<"note" | "eidi">("note");
  const [isSignedIn, setIsSignedIn] = useState(!authEnabled);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [editingBaseline, setEditingBaseline] = useState<SavedMuseumCard | null>(null);
  const [savedMuseumCards, setSavedMuseumCards] = useState<Record<number, SavedMuseumCard>>({});
  const [editingCustomization, setEditingCustomization] = useState<CardCustomization>(
    createInitialCustomization(null),
  );
  const room1 = ARTWORKS.filter((a) => a.room === 1);
  const room2 = ARTWORKS.filter((a) => a.room === 2);
  const room3 = ARTWORKS.filter((a) => a.room === 3);
  const lightboxTemplate = lightbox ? artworkToTemplate(lightbox) : null;
  const lightboxSavedCard = lightbox ? savedMuseumCards[lightbox.id] : null;
  const lightboxCustomization = lightboxTemplate
    ? createInitialCustomization(lightboxTemplate)
    : null;

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setIsSignedIn(Boolean(data.user));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session?.user));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  function handleCustomize(art: Artwork) {
    if (authEnabled && !isSignedIn) {
      router.push("/signup");
      return;
    }

    const savedCard = savedMuseumCards[art.id] ?? getInitialMuseumCardState(art);
    setLightbox(null);
    setEditingBaseline(savedCard);
    setEditingCustomization(savedCard.customization);
    setEditingArtwork(art);
  }

  const openLightbox = useCallback((art: Artwork) => {
    clearShareFeedback();
    setLightboxPreviewPage("note");
    setLightbox(art);
  }, [clearShareFeedback]);

  const closeLightbox = useCallback(() => {
    clearShareFeedback();
    setLightbox(null);
  }, [clearShareFeedback]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeLightbox]);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  if (editingArtwork) {
    const editableTemplate = artworkToTemplate(editingArtwork);
    const baseTemplate = getBaseTemplateForArtwork(editingArtwork);

    return (
      <TemplateExperienceEditor
        key={editingArtwork.id}
        template={editableTemplate}
        customization={editingCustomization}
        onCustomizationChange={(partial) =>
          setEditingCustomization((current) => ({ ...current, ...partial }))
        }
        onBack={() => {
          setEditingArtwork(null);
          setEditingBaseline(null);
          setEditingCustomization(createInitialCustomization(null));
        }}
        backLabel="Back to museum"
        shareTemplateId={baseTemplate.id}
        shareTemplateSnapshot={editableTemplate}
        initialOverrides={editingBaseline?.overrides ?? getMuseumInitialOverrides(editingArtwork)}
        restoreBaselineCustomization={editingBaseline?.customization}
        restoreBaselineOverrides={editingBaseline?.overrides}
        onSave={({ customization, overrides }) => {
          const savedCard = {
            customization,
            overrides: createEditorOverrides(overrides),
          };
          setSavedMuseumCards((current) => ({
            ...current,
            [editingArtwork.id]: savedCard,
          }));
          setEditingArtwork(null);
          setEditingBaseline(null);
          setEditingCustomization(createInitialCustomization(null));
          setLightboxPreviewPage("note");
          setLightbox(editingArtwork);
        }}
      />
    );
  }

  return (
    <div className="gallery-page min-h-screen">
      <Navbar templateCount={TEMPLATES.length} active="museum" />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 30% 20%, rgba(255,240,180,.12), transparent),
            radial-gradient(ellipse 50% 35% at 70% 60%, rgba(255,240,180,.12), transparent),
            radial-gradient(ellipse 40% 30% at 50% 85%, rgba(255,240,180,.06), transparent)
          `,
        }}
      />

      <div className="gallery-info">
        <div>
          <div style={{ fontFamily: "var(--font-libre), 'Libre Baskerville', serif", fontSize: "20px", fontStyle: "italic" }}>
            The Eid Collection
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#5a5040", textTransform: "uppercase", marginTop: "4px" }}>
            {"Permanent Exhibition \u00b7 Islamic Art & Calligraphy"}
          </div>
        </div>
        <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#5a5040", textTransform: "uppercase", maxWidth: "400px", lineHeight: 1.6 }}>
          {`A curated collection of ${ARTWORKS.length} Eid greeting artworks spanning calligraphy, geometry, sacred architecture, and festival ornament.`}
        </div>
        <div style={{ fontFamily: "var(--font-libre), 'Libre Baskerville', serif", fontSize: "40px", color: "rgba(0,0,0,.08)", fontStyle: "italic" }}>
          {ARTWORKS.length}
        </div>
      </div>

      <div id="gallery-room-1" className="gallery-room">
        <div
          className="flex items-center gap-4 mb-12"
          style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "#5a5040" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
          {"Gallery I - Sacred Architecture & Celestial"}
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
        </div>
        <div className="wall">
          {room1.map((art) => (
            <ArtworkCard key={art.id} art={art} onClick={() => openLightbox(art)} />
          ))}
        </div>
      </div>

      <div className="room-div">
        <div style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>
          {"\u00b7 \u00b7 \u00b7 Gallery Passage \u00b7 \u00b7 \u00b7"}
        </div>
      </div>

      <div className="gallery-room" style={{ background: "#e8e2d8" }}>
        <div
          className="flex items-center gap-4 mb-12"
          style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "#5a5040" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
          {"Gallery II - Calligraphy & Geometric Art"}
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
        </div>
        <div className="wall">
          {room2.map((art) => (
            <ArtworkCard key={art.id} art={art} onClick={() => openLightbox(art)} />
          ))}
        </div>
      </div>

      <div className="room-div">
        <div style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>
          {"\u00b7 \u00b7 \u00b7 Lantern Court \u00b7 \u00b7 \u00b7"}
        </div>
      </div>

      <div className="gallery-room" style={{ background: "#eee7dc" }}>
        <div
          className="flex items-center gap-4 mb-12"
          style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "#5a5040" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
          {"Gallery III - Festive Ornament & Garden Light"}
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
        </div>
        <div className="wall">
          {room3.map((art) => (
            <ArtworkCard key={art.id} art={art} onClick={() => openLightbox(art)} />
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lbg" onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}>
          <div
            className="lbox"
            style={{ boxShadow: `0 0 30px ${lightbox.accent}40, 0 60px 180px rgba(0,0,0,.9), 0 0 0 1px ${lightbox.accent}15` }}
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div className="lb-art">
                <MuseumFramedArtwork art={lightbox} mode="lightbox" />
              </div>
            </div>
            <div className="lb-info">
              <div className="lb-note-stage">
                <div
                  style={{
                    fontFamily: "var(--font-jost), 'Jost', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: `${lightbox.accent}80`,
                    display: "none",
                  }}
                >
                  Inside Note · 1446 AH
                </div>
                <div className="lb-note-preview">
                  <div className={`lb-preview-flip ${lightboxPreviewPage === "eidi" ? "is-eidi" : ""}`}>
                    <div className="lb-preview-face lb-preview-face--note">
                      {lightboxTemplate && lightboxCustomization && (
                        <div className="lb-note-wrap">
                          <InsidePaperCanvas
                            template={lightboxTemplate}
                            customization={lightboxCustomization}
                            interactive={false}
                          />
                        </div>
                      )}
                    </div>
                    <div className="lb-preview-face lb-preview-face--eidi">
                      {lightboxTemplate && lightboxCustomization && (
                        <div className="lb-eidi-wrap">
                          <EidiPage
                            template={lightboxTemplate}
                            customization={lightboxCustomization}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {(shareStatus || shareError) && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "58px",
                      transform: "translateX(-50%)",
                      width: "calc(100% - 56px)",
                      textAlign: "center",
                      fontSize: "11px",
                      color: shareError ? "#ffb3b3" : "rgba(212,168,76,.78)",
                    }}
                  >
                    {shareError || shareStatus}
                  </div>
                )}
                <div className="lb-actions">
                <button
                  className="lbbtn primary"
                  onClick={() => handleCustomize(lightbox)}
                >
                  {authEnabled && !isSignedIn ? "Sign Up To Edit" : "Customize Card"}
                </button>
                  <button className="lbbtn ghost" onClick={closeLightbox}>Close</button>
                <button
                  className="lbbtn ghost"
                  disabled={isSharing}
                  onClick={async () => {
                    if (!lightboxSavedCard) {
                      if (navigator.share) {
                        await navigator.share({
                          title: "Eid Mubarak!",
                          text: lightbox.desc.slice(0, 100),
                          url: window.location.href,
                        });
                      } else {
                        await navigator.clipboard.writeText(window.location.href);
                      }
                      return;
                    }

                    const baseTemplate = getBaseTemplateForArtwork(lightbox);
                    const sharedOverrides = createEditorOverrides({
                      ...lightboxSavedCard.overrides,
                      templateSnapshot: artworkToTemplate(lightbox),
                    });

                    await shareCard({
                      templateId: baseTemplate.id,
                      title: lightbox.title,
                      customization: lightboxSavedCard.customization,
                      overrides: sharedOverrides,
                    });
                  }}
                >
                  {isSharing ? "Sharing" : "Share"}
                </button>
                </div>
              </div>
            </div>
            <button
              className={`lb-mid-toggle ${lightboxPreviewPage === "eidi" ? "is-active" : ""}`}
              onClick={() =>
                setLightboxPreviewPage((current) => (current === "note" ? "eidi" : "note"))
              }
              title={lightboxPreviewPage === "eidi" ? "Show note page" : "Show Eidi page"}
            >
              <Gift size={18} />
              <span>{lightboxPreviewPage === "eidi" ? "Note" : "Eidi"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
