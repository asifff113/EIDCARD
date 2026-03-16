export interface CardTemplate {
  id: number;
  title: string;
  ar: string;
  subtitle: string;
  bg: string;
  accent: string;
  accent2: string;
  glow: string;
  type:
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
    | "desert-amber";
}

export interface CardCustomization {
  greeting: string;
  greetingAr: string;
  recipientName: string;
  personalMessage: string;
  senderName: string;
  year: string;
  paymentMethod: "bkash" | "nagad" | null;
  paymentNumber: string;
  showQR: boolean;
}

export const DEFAULT_CUSTOMIZATION: CardCustomization = {
  greeting: "Eid Mubarak",
  greetingAr: "\u0639\u064a\u062f \u0645\u0628\u0627\u0631\u0643",
  recipientName: "",
  personalMessage: "",
  senderName: "",
  year: "1446 Hijri",
  paymentMethod: null,
  paymentNumber: "",
  showQR: false,
};
