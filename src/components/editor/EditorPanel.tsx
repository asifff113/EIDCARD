"use client";

import { useState } from "react";
import { Type, CreditCard, RotateCw, ScrollText, Palette } from "lucide-react";
import type { CardCustomization, CardTemplate, Sticker, StickerType } from "@/types/editor";
import TextTab from "./TextTab";
import PaymentTab from "./PaymentTab";
import PaperTab from "./PaperTab";
import SpinTab from "./SpinTab";
import StyleTab from "./StyleTab";
import StickerTab from "./tabs/StickerTab";

type TabKey = "text" | "style" | "paper" | "payment" | "stickers" | "spin";

interface TabDef {
  key: TabKey;
  label: string;
  icon: typeof Type;
}

const ALL_TABS: TabDef[] = [
  { key: "text", label: "Cover", icon: Type },
  { key: "style", label: "Style", icon: Palette },
  { key: "stickers", label: "Stickers", icon: Palette },
  { key: "paper", label: "Paper", icon: ScrollText },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "spin", label: "Spin", icon: RotateCw },
];

function getTabsForPage(
  activeEditPage: string | undefined,
  enableInsideEditor: boolean
): TabDef[] {
  if (!activeEditPage || !enableInsideEditor) {
    // Fallback to legacy behavior (show relevant tabs)
    return enableInsideEditor
      ? ALL_TABS
      : ALL_TABS.filter((t) => t.key !== "paper");
  }

  switch (activeEditPage) {
    case "cover":
      return ALL_TABS.filter((t) => t.key === "text" || t.key === "style" || t.key === "stickers");
    case "paper":
    case "note":
      return ALL_TABS.filter((t) => t.key === "paper");
    case "payment":
    case "eidi":
      return ALL_TABS.filter((t) => t.key === "payment");
    case "spin":
      return ALL_TABS.filter((t) => t.key === "spin");
    default:
      return ALL_TABS;
  }
}

export default function EditorPanel({
  customization,
  accent,
  template,
  onChange,
  enableInsideEditor = false,
  activeEditPage,
  stickers,
  selectedStickerId,
  onAddSticker,
  onUpdateSticker,
  onRemoveSticker,
  onSelectSticker,
  onResetCoverTextPosition,
}: {
  customization: CardCustomization;
  accent: string;
  template: CardTemplate;
  onChange: (partial: Partial<CardCustomization>) => void;
  enableInsideEditor?: boolean;
  activeEditPage?: string;
  stickers: Sticker[];
  selectedStickerId: string | null;
  onAddSticker: (type: StickerType) => void;
  onUpdateSticker: (id: string, partial: Partial<Sticker>) => void;
  onRemoveSticker: (id: string) => void;
  onSelectSticker: (id: string | null) => void;
  onResetCoverTextPosition: () => void;
}) {
  const tabs = getTabsForPage(activeEditPage, enableInsideEditor);
  const [tab, setTab] = useState<TabKey>(tabs[0]?.key ?? "text");

  // Reset tab when page context changes such that the current tab is no longer visible
  const validTab = tabs.some((t) => t.key === tab) ? tab : (tabs[0]?.key ?? "text");
  if (validTab !== tab) {
    // This is safe because it's conditional and runs during render, not in an effect
    setTab(validTab);
  }

  const activeTab = tab;
  const useMobileGrid = tabs.length > 2;

  return (
    <div className="flex flex-col h-full" style={{
      background: "rgba(255,255,255,.02)",
      border: "1px solid rgba(255,255,255,.06)",
      borderRadius: "16px",
    }}>
      {/* Tabs */}
      {tabs.length > 1 && (
        <div
          className={useMobileGrid ? "border-b grid grid-cols-2 min-[521px]:flex" : "flex border-b"}
          style={{ borderColor: "rgba(255,255,255,.06)" }}
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`${useMobileGrid ? "min-[521px]:flex-1" : "flex-1"} flex items-center justify-center gap-2 py-3.5 transition-all cursor-pointer max-[520px]:min-h-[52px]`}
              style={{
                background: activeTab === key ? "rgba(255,255,255,.04)" : "transparent",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: activeTab === key ? `2px solid ${accent}` : "2px solid transparent",
                borderRadius: 0,
                color: activeTab === key ? accent : "rgba(255,255,255,.3)",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5 max-[640px]:p-4">
        {activeTab === "text" ? (
          <TextTab
            customization={customization}
            accent={accent}
            onChange={onChange}
            onResetCoverTextPosition={onResetCoverTextPosition}
          />
        ) : activeTab === "style" ? (
          <StyleTab customization={customization} accent={accent} template={template} onChange={onChange} />
        ) : activeTab === "paper" ? (
          <PaperTab customization={customization} accent={accent} onChange={onChange} />
        ) : activeTab === "stickers" ? (
          <StickerTab
            accent={accent}
            stickers={stickers}
            selectedId={selectedStickerId}
            onAdd={onAddSticker}
            onUpdate={onUpdateSticker}
            onRemove={onRemoveSticker}
            onSelect={onSelectSticker}
          />
        ) : activeTab === "spin" ? (
          <SpinTab customization={customization} accent={accent} onChange={onChange} />
        ) : (
          <PaymentTab customization={customization} accent={accent} onChange={onChange} />
        )}
      </div>
    </div>
  );
}
