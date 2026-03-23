export type CardArtworkType =
  | "mosque-gold"
  | "crescent-night"
  | "lantern-warm"
  | "mandala-purple"
  | "kaaba-sacred"
  | "calligraphy-teal"
  | "bloom-rose"
  | "aurora-cyan"
  | "zellige-blue"
  | "palm-green"
  | "cosmic-violet"
  | "desert-amber"
  | "crescent-bloom"
  | "royal-lantern"
  | "moonlit-skyline"
  | "crescent-imperial"
  | "emerald-palace"
  | "crescent-frame"
  | "amber-lantern"
  | "lantern-cascade"
  | "lantern-moon"
  | "star-medallion"
  | "crescent-gate"
  | "rose-lantern-blush"
  | "crescent-mandala"
  | "moon-mosque-halo"
  | "ramadan-arch"
  | "floral-crescent-dawn"
  | "papercut-arch"
  | "cloud-crescent"
  | "ivory-lantern"
  | "aurora-glass"
  | "twilight-minaret"
  | "golden-dome-garden"
  | "sapphire-crescent"
  | "rose-gold-filigree"
  | "midnight-lantern-trail"
  | "jade-arch-paradise"
  | "sunset-silhouette"
  | "diamond-star-burst"
  | "ocean-crescent-pearl"
  | "ruby-mandala-glow"
  | "festive-mandala-crescent"
  | "lantern-mandala-crescent";

export type CardLayout =
  | "classic-center"
  | "crescent-bloom"
  | "royal-split"
  | "skyline-bottom"
  | "calligraphy-stack"
  | "crescent-emblem";

export type TemplateExperience = "standard" | "opening-note";

export type PaymentMethod = "bkash" | "nagad" | "rocket" | "card" | null;

export interface PaymentEntry {
  id: string;
  method: PaymentMethod;
  number: string;
}

export type PaperTheme =
  | "parchment"
  | "linen"
  | "pressed-floral"
  | "ledger"
  | "marble"
  | "moonlit-vellum"
  | "illumined-manuscript"
  | "watercolor-garden"
  | "rosewater-letter"
  | "tea-stained-notebook"
  | "celadon-silk"
  | "inkwash-rice-paper"
  | "pearl-engraving"
  | "indigo-constellation"
  | "mosaic-border"
  | "palace-embossed"
  | "starlit-manuscript";

export type PaperDecoration = "mandala" | "botanical" | "lined" | "minimal" | "ornate" | "geometric" | "islamic-arch" | "none";

export type PaperBorderStyle = "classic" | "double" | "golden" | "dotted" | "none";

export type PaperFont = "classic" | "elegant" | "formal" | "modern" | "handwritten" | "arabic-accent";

export type PaperAlignment = "left" | "center" | "right";

export type FontPairing = "classic" | "elegant" | "modern" | "calligraphic" | "bold";

export type GradientDirection = "to bottom" | "to right" | "to bottom right" | "to bottom left";

export interface CustomGradient {
  color1: string;
  color2: string;
  direction: GradientDirection;
}

export type GreetingFont =
  | "italiana"
  | "cormorant"
  | "playfair"
  | "amiri"
  | "libre"
  | "dmSans";

export interface BackgroundOverride {
  type: "gradient" | "image";
  value: string;
}

export type StickerType =
  | "crescent-1"
  | "crescent-2"
  | "star-4"
  | "star-6"
  | "star-8"
  | "lantern-1"
  | "lantern-2"
  | "mosque-silhouette"
  | "mandala-small"
  | "floral-corner"
  | "sparkle"
  | "cloud";

export interface Sticker {
  id: string;
  stickerType: StickerType;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface PositionOffset {
  x: number;
  y: number;
}

export interface EditorOverrides {
  background: BackgroundOverride | null;
  greetingFont: GreetingFont | null;
  textColor: string | null;
  layout: CardLayout | null;
  stickers: Sticker[];
  coverTextOffset: PositionOffset;
  templateSnapshot?: CardTemplate | null;
}

export const DEFAULT_EDITOR_OVERRIDES: EditorOverrides = {
  background: null,
  greetingFont: null,
  textColor: null,
  layout: null,
  stickers: [],
  coverTextOffset: { x: 0, y: 0 },
  templateSnapshot: null,
};

export function createEditorOverrides(
  initialOverrides?: Partial<EditorOverrides> | null,
): EditorOverrides {
  return {
    ...DEFAULT_EDITOR_OVERRIDES,
    ...initialOverrides,
    background: initialOverrides?.background ?? DEFAULT_EDITOR_OVERRIDES.background,
    greetingFont: initialOverrides?.greetingFont ?? DEFAULT_EDITOR_OVERRIDES.greetingFont,
    textColor: initialOverrides?.textColor ?? DEFAULT_EDITOR_OVERRIDES.textColor,
    layout: initialOverrides?.layout ?? DEFAULT_EDITOR_OVERRIDES.layout,
    stickers: initialOverrides?.stickers ?? DEFAULT_EDITOR_OVERRIDES.stickers,
    coverTextOffset: {
      ...DEFAULT_EDITOR_OVERRIDES.coverTextOffset,
      ...initialOverrides?.coverTextOffset,
    },
    templateSnapshot: initialOverrides?.templateSnapshot ?? DEFAULT_EDITOR_OVERRIDES.templateSnapshot,
  };
}

export interface CardTemplate {
  id: number;
  title: string;
  ar: string;
  subtitle: string;
  bg: string;
  accent: string;
  accent2: string;
  glow: string;
  type: CardArtworkType;
  layout?: CardLayout;
  textColor?: string;
  starsCount?: number;
  showFrame?: boolean;
  experience?: TemplateExperience;
}

export function getTemplateExperience(
  template?: Pick<CardTemplate, "experience"> | null,
): TemplateExperience {
  if (!template) {
    return "standard";
  }

  return template.experience ?? "opening-note";
}

export function isOpeningNoteTemplate(
  template?: Pick<CardTemplate, "experience"> | null,
): boolean {
  return getTemplateExperience(template) === "opening-note";
}

export interface CardCustomization {
  greeting: string;
  greetingAr: string;
  recipientName: string;
  personalMessage: string;
  senderName: string;
  year: string;
  paperTitle: string;
  paperMessage: string;
  paperClosing: string;
  paperFont: PaperFont;
  paperTheme: PaperTheme;
  paperDecoration: PaperDecoration;
  paperAlignment: PaperAlignment;
  paperShowSeal: boolean;
  paperBgOverride: string | null;
  paperCustomGradient: CustomGradient;
  paperTextColor: string | null;
  paperBorderStyle: PaperBorderStyle;
  paperSealLetter: string;
  paperSealColor: string | null;
  paperHeadingSize: number;
  paperBodySize: number;
  paperLineSpacing: number;
  paperShowHeader: boolean;
  paperOpacity: number;
  paymentMethod: PaymentMethod;
  paymentNumber: string;
  paymentRevealLabel: string;
  showQR: boolean;
  paymentMethods: PaymentEntry[];
  spinPageEnabled: boolean;
  spinMaxAmount: number;
  bgOverride: string | null;
  fontPairing: FontPairing | null;
  layoutOverride: CardLayout | null;
  customGradient: CustomGradient;
  overrideStars: boolean | null;
  starsCount: number;
  overrideFrame: boolean | null;
  overrideGlow: boolean | null;
}

export const DEFAULT_CUSTOMIZATION: CardCustomization = {
  greeting: "Eid Mubarak",
  greetingAr: "\u0639\u064a\u062f \u0645\u0628\u0627\u0631\u0643",
  recipientName: "",
  personalMessage: "",
  senderName: "",
  year: "1446 Hijri",
  paperTitle: "A note for Eid",
  paperMessage:
    "May this Eid bring ease to your heart, barakah to your home, and joy to every dua. I tucked this little page inside the card so you can keep the blessing a little longer.",
  paperClosing: "With love and duas,",
  paperFont: "classic",
  paperTheme: "parchment",
  paperDecoration: "mandala",
  paperAlignment: "left",
  paperShowSeal: true,
  paperBgOverride: null,
  paperCustomGradient: { color1: "#fbf5e7", color2: "#efd6a8", direction: "to bottom" },
  paperTextColor: null,
  paperBorderStyle: "classic",
  paperSealLetter: "E",
  paperSealColor: null,
  paperHeadingSize: 100,
  paperBodySize: 100,
  paperLineSpacing: 100,
  paperShowHeader: true,
  paperOpacity: 100,
  paymentMethod: null,
  paymentNumber: "",
  paymentRevealLabel: "Tap to reveal Eidi",
  showQR: false,
  paymentMethods: [],
  spinPageEnabled: false,
  spinMaxAmount: 20,
  bgOverride: null,
  fontPairing: null,
  layoutOverride: null,
  customGradient: { color1: "#1a1a2e", color2: "#16213e", direction: "to bottom" },
  overrideStars: null,
  starsCount: 40,
  overrideFrame: null,
  overrideGlow: null,
};

export function createInitialCustomization(
  template?: Pick<CardTemplate, "ar" | "experience"> | null,
): CardCustomization {
  const hasOpeningNote = isOpeningNoteTemplate(template);

  return {
    ...DEFAULT_CUSTOMIZATION,
    greetingAr: template?.ar || DEFAULT_CUSTOMIZATION.greetingAr,
    paperTheme: hasOpeningNote ? "parchment" : DEFAULT_CUSTOMIZATION.paperTheme,
    paperDecoration: hasOpeningNote ? "mandala" : DEFAULT_CUSTOMIZATION.paperDecoration,
  };
}
