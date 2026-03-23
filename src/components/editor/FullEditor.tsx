"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { CardTemplate } from "@/types/editor";
import { useFullEditor } from "@/hooks/useFullEditor";
import { useExportCard } from "@/hooks/useExportCard";
import { useShareCard } from "@/hooks/useShareCard";
import EnhancedCanvas from "./EnhancedCanvas";
import FullEditorPanel from "./FullEditorPanel";
import ExportBar from "./ExportBar";
import ExportRenderer from "./ExportRenderer";

export default function FullEditor({
  template,
  backHref = "/",
  backLabel = "Back",
  onBack,
  shareTemplateId,
  shareTemplateSnapshot,
}: {
  template: CardTemplate;
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  shareTemplateId?: number;
  shareTemplateSnapshot?: CardTemplate | null;
}) {
  const {
    customization,
    overrides,
    effectiveTemplate,
    selectedStickerId,
    updateCustomization,
    setBackground,
    setGreetingFont,
    setTextColor,
    setLayout,
    addSticker,
    updateSticker,
    removeSticker,
    setSelectedStickerId,
    resetOverrides,
  } = useFullEditor(template);

  const { exportRef, isExporting, exportAsPng } = useExportCard();
  const { shareCard, isSharing, shareStatus, shareError } = useShareCard();
  const isBusy = isExporting || isSharing;
  const shareFeedback = shareError || shareStatus;
  const shareFeedbackColor = shareError ? "#ffb3b3" : "rgba(255,255,255,.62)";
  const shareOverrides = shareTemplateSnapshot
    ? { ...overrides, templateSnapshot: shareTemplateSnapshot }
    : overrides;
  const resolvedShareTemplateId = shareTemplateId ?? template.id;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #06060e 0%, #0a0a14 50%, #06060e 100%)",
        color: "#fff",
      }}
    >
      {/* Toolbar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 max-[640px]:px-4 max-[640px]:py-3"
        style={{
          background: "rgba(6,6,14,.9)",
          borderBottom: "1px solid rgba(255,255,255,.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2.5 transition-all"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
                padding: "10px 20px",
                color: "rgba(255,255,255,.5)",
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,.3)";
                e.currentTarget.style.color = "#c9a84c";
                e.currentTarget.style.background = "rgba(212,175,55,.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                e.currentTarget.style.color = "rgba(255,255,255,.5)";
                e.currentTarget.style.background = "rgba(255,255,255,.04)";
              }}
            >
              <ArrowLeft size={16} />
              {backLabel}
            </button>
          ) : (
            <Link
              href={backHref}
              className="flex items-center gap-2.5 transition-all"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
                padding: "10px 20px",
                color: "rgba(255,255,255,.5)",
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                fontWeight: 500,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,.3)";
                e.currentTarget.style.color = "#c9a84c";
                e.currentTarget.style.background = "rgba(212,175,55,.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                e.currentTarget.style.color = "rgba(255,255,255,.5)";
                e.currentTarget.style.background = "rgba(255,255,255,.04)";
              }}
            >
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          )}
          <div
            className="hidden sm:block"
            style={{
              width: "1px",
              height: "20px",
              background: "rgba(255,255,255,.1)",
            }}
          />
          <div className="hidden sm:block">
            <div
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "15px",
                color: template.accent,
              }}
            >
              {template.title}
            </div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.2)",
              }}
            >
              {template.subtitle}
            </div>
          </div>
        </div>

        <div className="max-[900px]:hidden">
          <ExportBar
            accent={template.accent}
            isExporting={isBusy}
            onDownload={() => exportAsPng(`eid-card-${template.type}.png`)}
            onShare={() =>
              shareCard({
                templateId: resolvedShareTemplateId,
                title: template.title,
                customization,
                overrides: shareOverrides,
              })
            }
          />
        </div>
      </div>

      {/* Editor body */}
      <div className="max-w-[1440px] mx-auto px-6 py-8 max-[900px]:pb-32 max-[640px]:px-4">
        {shareFeedback && (
          <div className="mb-6" style={{ color: shareFeedbackColor, fontSize: "13px" }}>
            {shareFeedback}
          </div>
        )}
        <div className="flex gap-8 items-start max-[900px]:flex-col max-[900px]:items-center">
          {/* Canvas */}
          <div className="flex-shrink-0 w-full max-w-[440px] max-[900px]:max-w-[360px] max-[480px]:max-w-[320px]">
            <div className="mb-3 text-center">
              <span
                className="text-[9px] tracking-[3px] uppercase"
                style={{ color: "rgba(255,255,255,.2)" }}
              >
                Live Preview
              </span>
            </div>
            <EnhancedCanvas
              template={effectiveTemplate}
              customization={customization}
              overrides={overrides}
              onStickerUpdate={updateSticker}
              onStickerSelect={setSelectedStickerId}
              selectedStickerId={selectedStickerId}
            />
          </div>

          {/* Editor panel */}
          <div className="flex-1 w-full min-w-0 max-w-[560px]">
            <div className="mb-3">
              <span
                className="text-[9px] tracking-[3px] uppercase"
                style={{ color: "rgba(255,255,255,.2)" }}
              >
                Customize
              </span>
            </div>
            <FullEditorPanel
              template={template}
              customization={customization}
              overrides={overrides}
              selectedStickerId={selectedStickerId}
              onCustomizationChange={updateCustomization}
              onBackgroundChange={setBackground}
              onFontChange={setGreetingFont}
              onTextColorChange={setTextColor}
              onLayoutChange={setLayout}
              onAddSticker={addSticker}
              onUpdateSticker={updateSticker}
              onRemoveSticker={removeSticker}
              onSelectSticker={setSelectedStickerId}
              onReset={resetOverrides}
            />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[120] hidden max-[900px]:block">
        <div
          className="mx-auto max-w-[900px] px-4 pt-3"
          style={{
            paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
            background: "linear-gradient(180deg, rgba(6,6,14,0) 0%, rgba(6,6,14,.82) 28%, rgba(6,6,14,.96) 100%)",
            backdropFilter: "blur(14px)",
          }}
        >
          {shareFeedback && (
            <div className="mb-3 px-1 text-[12px]" style={{ color: shareFeedbackColor }}>
              {shareFeedback}
            </div>
          )}
          <ExportBar
            accent={template.accent}
            isExporting={isBusy}
            onDownload={() => exportAsPng(`eid-card-${template.type}.png`)}
            onShare={() =>
              shareCard({
                templateId: resolvedShareTemplateId,
                title: template.title,
                customization,
                overrides: shareOverrides,
              })
            }
            fill
          />
        </div>
      </div>

      {/* Export renderer (offscreen) */}
      <ExportRenderer
        ref={exportRef}
        template={effectiveTemplate}
        customization={customization}
        overrides={overrides}
      />
    </div>
  );
}
