"use client";

import { forwardRef } from "react";
import type { CardTemplate, CardCustomization, EditorOverrides } from "@/types/editor";
import CardPreviewCanvas from "./CardPreviewCanvas";
import StickerLayer from "./StickerLayer";

interface ExportRendererProps {
  template: CardTemplate;
  customization: CardCustomization;
  overrides?: EditorOverrides;
  backgroundImage?: string | null;
}

const ExportRenderer = forwardRef<HTMLDivElement, ExportRendererProps>(
  function ExportRenderer({ template, customization, overrides, backgroundImage }, ref) {
    const exportTemplate = backgroundImage
      ? { ...template, bg: "transparent", starsCount: 0, showFrame: false }
      : template;

    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 1080,
          height: 1512,
          zIndex: -1,
        }}
      >
        <div style={{ position: "relative", width: 1080, height: 1512 }}>
          {backgroundImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <CardPreviewCanvas
            template={exportTemplate}
            customization={customization}
            size="export"
            greetingFontOverride={overrides?.greetingFont}
            coverTextOffset={overrides?.coverTextOffset}
          />
          {overrides && overrides.stickers.length > 0 && (
            <StickerLayer
              stickers={overrides.stickers}
              accentColor={template.textColor ?? template.accent}
              interactive={false}
              onUpdate={() => {}}
              onSelect={() => {}}
              selectedId={null}
            />
          )}
        </div>
      </div>
    );
  }
);

export default ExportRenderer;
