"use client";

import { forwardRef } from "react";
import type { CardTemplate, CardCustomization } from "@/types/editor";
import CardPreviewCanvas from "./CardPreviewCanvas";

const ExportRenderer = forwardRef<HTMLDivElement, { template: CardTemplate; customization: CardCustomization }>(
  function ExportRenderer({ template, customization }, ref) {
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
        <CardPreviewCanvas template={template} customization={customization} size="export" />
      </div>
    );
  }
);

export default ExportRenderer;
