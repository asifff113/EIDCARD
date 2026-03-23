"use client";

import { useRef } from "react";
import type { CardTemplate, CardCustomization, EditorOverrides, PositionOffset, Sticker } from "@/types/editor";
import CardPreviewCanvas from "./CardPreviewCanvas";
import StickerLayer from "./StickerLayer";

export default function EnhancedCanvas({
  template,
  customization,
  overrides,
  onStickerUpdate,
  onStickerSelect,
  selectedStickerId,
  interactive = true,
  enableTextDrag = false,
  onCoverTextOffsetChange,
  canvasSize = "preview",
}: {
  template: CardTemplate;
  customization: CardCustomization;
  overrides: EditorOverrides;
  onStickerUpdate: (id: string, partial: Partial<Sticker>) => void;
  onStickerSelect: (id: string | null) => void;
  selectedStickerId: string | null;
  interactive?: boolean;
  enableTextDrag?: boolean;
  onCoverTextOffsetChange?: (offset: PositionOffset) => void;
  canvasSize?: "preview" | "export" | "framed";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundImage =
    overrides.background?.type === "image" ? overrides.background.value : null;

  const canvasTemplate = backgroundImage
    ? { ...template, bg: "transparent", starsCount: 0, showFrame: false }
    : template;

  return (
    <div ref={containerRef} className="relative" style={{ aspectRatio: "5/7" }}>
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            borderRadius: "16px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <CardPreviewCanvas
        template={canvasTemplate}
        customization={customization}
        size={canvasSize}
        greetingFontOverride={overrides.greetingFont}
        coverTextOffset={overrides.coverTextOffset}
        interactiveText={enableTextDrag}
        onCoverTextOffsetChange={onCoverTextOffsetChange}
      />
      <StickerLayer
        stickers={overrides.stickers}
        accentColor={template.textColor ?? template.accent}
        interactive={interactive}
        onUpdate={onStickerUpdate}
        onSelect={onStickerSelect}
        selectedId={selectedStickerId}
      />
    </div>
  );
}
