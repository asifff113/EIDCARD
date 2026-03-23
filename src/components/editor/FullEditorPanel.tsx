"use client";

import { useState } from "react";
import { Palette, Type, Sparkles, CreditCard } from "lucide-react";
import type { CardTemplate, CardCustomization, EditorOverrides, CardLayout, GreetingFont, BackgroundOverride, Sticker, StickerType } from "@/types/editor";
import TextTab from "./TextTab";
import PaymentTab from "./PaymentTab";
import DesignTab from "./tabs/DesignTab";
import StickerTab from "./tabs/StickerTab";

type TabKey = "design" | "text" | "stickers" | "payment";

export default function FullEditorPanel({
  template,
  customization,
  overrides,
  selectedStickerId,
  onCustomizationChange,
  onBackgroundChange,
  onFontChange,
  onTextColorChange,
  onLayoutChange,
  onAddSticker,
  onUpdateSticker,
  onRemoveSticker,
  onSelectSticker,
  onReset,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  overrides: EditorOverrides;
  selectedStickerId: string | null;
  onCustomizationChange: (partial: Partial<CardCustomization>) => void;
  onBackgroundChange: (bg: BackgroundOverride | null) => void;
  onFontChange: (font: GreetingFont | null) => void;
  onTextColorChange: (color: string | null) => void;
  onLayoutChange: (layout: CardLayout | null) => void;
  onAddSticker: (type: StickerType) => void;
  onUpdateSticker: (id: string, partial: Partial<Sticker>) => void;
  onRemoveSticker: (id: string) => void;
  onSelectSticker: (id: string | null) => void;
  onReset: () => void;
}) {
  const [tab, setTab] = useState<TabKey>("design");
  const accent = template.accent;

  const tabs: Array<{ key: TabKey; label: string; icon: typeof Palette }> = [
    { key: "design", label: "Design", icon: Palette },
    { key: "text", label: "Text", icon: Type },
    { key: "stickers", label: "Stickers", icon: Sparkles },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,.02)",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: "16px",
      }}
    >
      {/* Tabs */}
      <div className="grid grid-cols-2 border-b min-[521px]:flex" style={{ borderColor: "rgba(255,255,255,.06)" }}>
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex items-center justify-center gap-1.5 py-3.5 transition-all cursor-pointer min-[521px]:flex-1 max-[520px]:min-h-[52px]"
            style={{
              background: tab === key ? "rgba(255,255,255,.04)" : "transparent",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: tab === key ? `2px solid ${accent}` : "2px solid transparent",
              borderRadius: 0,
              color: tab === key ? accent : "rgba(255,255,255,.3)",
              fontSize: "10px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5 max-[640px]:p-4">
        {tab === "design" && (
          <DesignTab
            accent={accent}
            currentBackground={overrides.background}
            currentFont={overrides.greetingFont}
            currentTextColor={overrides.textColor}
            currentLayout={overrides.layout}
            templateLayout={template.layout}
            onBackgroundChange={onBackgroundChange}
            onFontChange={onFontChange}
            onTextColorChange={onTextColorChange}
            onLayoutChange={onLayoutChange}
            onReset={onReset}
          />
        )}
        {tab === "text" && (
          <TextTab customization={customization} accent={accent} onChange={onCustomizationChange} />
        )}
        {tab === "stickers" && (
          <StickerTab
            accent={accent}
            stickers={overrides.stickers}
            selectedId={selectedStickerId}
            onAdd={onAddSticker}
            onUpdate={onUpdateSticker}
            onRemove={onRemoveSticker}
            onSelect={onSelectSticker}
          />
        )}
        {tab === "payment" && (
          <PaymentTab customization={customization} accent={accent} onChange={onCustomizationChange} />
        )}
      </div>
    </div>
  );
}
