"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, FileText, Gift, Image, Pencil, RotateCw, X } from "lucide-react";
import type {
  CardCustomization,
  CardTemplate,
  EditorOverrides,
  PositionOffset,
  Sticker,
  StickerType,
} from "@/types/editor";
import { createEditorOverrides, isOpeningNoteTemplate } from "@/types/editor";
import { useExportCard } from "@/hooks/useExportCard";
import { useShareCard } from "@/hooks/useShareCard";
import EnhancedCanvas from "@/components/editor/EnhancedCanvas";
import EditorPanel from "@/components/editor/EditorPanel";
import ExportBar from "@/components/editor/ExportBar";
import ExportRenderer from "@/components/editor/ExportRenderer";
import OpeningNotePreview from "@/components/editor/OpeningNotePreview";

type EditPage = "cover" | "note" | "eidi" | "spin" | null;

const PAGE_CONFIG = [
  { key: "cover" as const, label: "Cover Page", desc: "Design, text & stickers", icon: Image },
  { key: "note" as const, label: "Message Page", desc: "Paper theme & content", icon: FileText },
  { key: "eidi" as const, label: "Eidi Page", desc: "Payment methods & QR", icon: Gift },
  { key: "spin" as const, label: "Spin Page", desc: "Reward wheel for recipients", icon: RotateCw },
];

const COVER_CUSTOMIZATION_FIELDS: (keyof CardCustomization)[] = [
  "greeting",
  "greetingAr",
  "recipientName",
  "personalMessage",
  "senderName",
  "year",
  "bgOverride",
  "fontPairing",
  "layoutOverride",
  "customGradient",
  "overrideStars",
  "starsCount",
  "overrideFrame",
  "overrideGlow",
];

const NOTE_CUSTOMIZATION_FIELDS: (keyof CardCustomization)[] = [
  "paperTitle",
  "paperMessage",
  "paperClosing",
  "senderName",
  "year",
  "paperFont",
  "paperTheme",
  "paperDecoration",
  "paperAlignment",
  "paperShowSeal",
  "paperBgOverride",
  "paperCustomGradient",
  "paperTextColor",
  "paperBorderStyle",
  "paperSealLetter",
  "paperSealColor",
  "paperHeadingSize",
  "paperBodySize",
  "paperLineSpacing",
  "paperShowHeader",
  "paperOpacity",
];

const EIDI_CUSTOMIZATION_FIELDS: (keyof CardCustomization)[] = [
  "paymentMethod",
  "paymentNumber",
  "paymentRevealLabel",
  "showQR",
  "paymentMethods",
];

const SPIN_CUSTOMIZATION_FIELDS: (keyof CardCustomization)[] = [
  "spinPageEnabled",
  "spinMaxAmount",
];

function cloneCustomization(customization: CardCustomization): CardCustomization {
  return {
    ...customization,
    customGradient: { ...customization.customGradient },
    paperCustomGradient: { ...customization.paperCustomGradient },
    paymentMethods: customization.paymentMethods.map((entry) => ({ ...entry })),
  };
}

function cloneOverrides(overrides?: Partial<EditorOverrides> | null): EditorOverrides {
  const next = createEditorOverrides(overrides);

  return {
    ...next,
    background: next.background ? { ...next.background } : null,
    stickers: next.stickers.map((sticker) => ({ ...sticker })),
    coverTextOffset: { ...next.coverTextOffset },
    templateSnapshot: next.templateSnapshot ? { ...next.templateSnapshot } : null,
  };
}

function pickCustomizationFields(
  customization: CardCustomization,
  fields: (keyof CardCustomization)[],
): Partial<CardCustomization> {
  const next: Partial<CardCustomization> = {};

  fields.forEach((field) => {
    (next as Record<string, unknown>)[field] = customization[field];
  });

  return next;
}

export default function TemplateExperienceEditor({
  template,
  customization,
  onCustomizationChange,
  onBack,
  backLabel = "Back",
  shareTemplateId,
  shareTemplateSnapshot,
  initialOverrides,
  restoreBaselineCustomization,
  restoreBaselineOverrides,
  onSave,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  onCustomizationChange: (partial: Partial<CardCustomization>) => void;
  onBack: () => void;
  backLabel?: string;
  shareTemplateId?: number;
  shareTemplateSnapshot?: CardTemplate | null;
  initialOverrides?: Partial<EditorOverrides>;
  restoreBaselineCustomization?: CardCustomization | null;
  restoreBaselineOverrides?: Partial<EditorOverrides> | null;
  onSave?: (payload: {
    customization: CardCustomization;
    overrides: EditorOverrides;
    previewPage: "note" | "eidi" | "spin";
  }) => void;
}) {
  const { exportRef, isExporting, exportAsPng } = useExportCard();
  const { shareCard, isSharing, shareStatus, shareError } = useShareCard();
  const hasOpeningNote = isOpeningNoteTemplate(template);
  const initialEditorOverrides = cloneOverrides(initialOverrides);
  const isBusy = isExporting || isSharing;
  const shareFeedback = shareError || shareStatus;
  const shareFeedbackColor = shareError ? "#ffb3b3" : "rgba(255,255,255,.62)";
  const [editPage, setEditPage] = useState<EditPage>(null);
  const [showPageSelector, setShowPageSelector] = useState(false);
  const [overrides, setOverrides] = useState(initialEditorOverrides);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [savedCustomization, setSavedCustomization] = useState<CardCustomization>(() =>
    cloneCustomization(restoreBaselineCustomization ?? customization),
  );
  const [savedOverrides, setSavedOverrides] = useState<EditorOverrides>(() =>
    cloneOverrides(restoreBaselineOverrides ?? initialEditorOverrides),
  );
  const isEditorContextVisible = showPageSelector || editPage !== null;
  const hasEidiPage = (customization.paymentMethods ?? []).length > 0;
  const shareOverrides = shareTemplateSnapshot
    ? { ...overrides, templateSnapshot: shareTemplateSnapshot }
    : overrides;
  const actionRowMaxWidth = hasOpeningNote ? "420px" : "400px";
  const baselineCustomization = savedCustomization;
  const baselineOverrides = savedOverrides;
  const hasSpinPage = customization.spinPageEnabled;

  function handleCoverTextOffsetChange(offset: PositionOffset) {
    setOverrides((current) => ({ ...current, coverTextOffset: offset }));
  }

  function handleResetCoverTextPosition() {
    setOverrides((current) => ({
      ...current,
      coverTextOffset: { ...initialEditorOverrides.coverTextOffset },
    }));
  }

  function handleAddSticker(stickerType: StickerType) {
    const sticker: Sticker = {
      id: crypto.randomUUID(),
      stickerType,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
    };

    setOverrides((current) => ({
      ...current,
      stickers: [...current.stickers, sticker],
    }));
    setSelectedStickerId(sticker.id);
  }

  function handleUpdateSticker(id: string, partial: Partial<Sticker>) {
    setOverrides((current) => ({
      ...current,
      stickers: current.stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...partial } : sticker,
      ),
    }));
  }

  function handleRemoveSticker(id: string) {
    setOverrides((current) => ({
      ...current,
      stickers: current.stickers.filter((sticker) => sticker.id !== id),
    }));
    setSelectedStickerId((current) => (current === id ? null : current));
  }

  function handleEditClick() {
    if (hasOpeningNote) {
      setShowPageSelector(true);
      return;
    }

    setEditPage("cover");
  }

  function handlePageSelect(page: EditPage) {
    setEditPage(page);
    setShowPageSelector(false);
  }

  function handleCloseEditor() {
    setEditPage(null);
    setShowPageSelector(false);
  }

  function handleEidiClick() {
    setEditPage("eidi");
    setShowPageSelector(false);
  }

  function handleRestorePage() {
    if (!editPage) {
      return;
    }

    if (editPage === "cover") {
      onCustomizationChange(
        pickCustomizationFields(baselineCustomization, COVER_CUSTOMIZATION_FIELDS),
      );
      setOverrides((current) => ({
        ...current,
        stickers: baselineOverrides.stickers,
        coverTextOffset: { ...baselineOverrides.coverTextOffset },
      }));
      setSelectedStickerId(null);
      return;
    }

    if (editPage === "note") {
      onCustomizationChange(
        pickCustomizationFields(baselineCustomization, NOTE_CUSTOMIZATION_FIELDS),
      );
      return;
    }

    if (editPage === "spin") {
      onCustomizationChange(
        pickCustomizationFields(baselineCustomization, SPIN_CUSTOMIZATION_FIELDS),
      );
      return;
    }

    onCustomizationChange(
      pickCustomizationFields(baselineCustomization, EIDI_CUSTOMIZATION_FIELDS),
    );
  }

  function handleSave() {
    const nextCustomization = cloneCustomization(customization);
    const nextOverrides = cloneOverrides(overrides);

    setSavedCustomization(nextCustomization);
    setSavedOverrides(nextOverrides);

    if (onSave) {
      onSave({
        customization: nextCustomization,
        overrides: nextOverrides,
        previewPage: editPage === "spin" ? "spin" : editPage === "eidi" ? "eidi" : "note",
      });
    }
  }

  const editorTabFilter =
    editPage === "note"
      ? "paper"
      : editPage === "eidi"
        ? "payment"
        : editPage === "spin"
          ? "spin"
          : "cover";

  return (
    <section
      className="relative z-1 min-h-screen"
      style={{ background: "linear-gradient(180deg, rgba(2,2,10,0) 0%, rgba(2,2,10,.88) 12%, #02020a 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto px-10 py-12 max-[900px]:pb-32 max-[640px]:px-4">
        <div className="flex items-center justify-between gap-4 mb-8 max-[900px]:flex-col max-[900px]:items-start">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 cursor-pointer transition-all"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "12px",
              padding: "12px 22px",
              color: "rgba(255,255,255,.5)",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontWeight: 500,
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
        </div>

        {shareFeedback && (
          <div className="mb-6" style={{ color: shareFeedbackColor, fontSize: "13px" }}>
            {shareFeedback}
          </div>
        )}

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className={`flex gap-6 max-[900px]:flex-col max-[900px]:items-center ${
            isEditorContextVisible
              ? "min-[901px]:items-start min-[901px]:justify-center"
              : "min-[901px]:items-start min-[901px]:justify-center"
          }`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="relative w-full min-[901px]:flex-shrink-0"
            style={{ maxWidth: hasOpeningNote ? "520px" : "420px" }}
          >
            <div className="mb-2">
              <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>
                Live Preview
              </span>
            </div>
            <div
              className="mx-auto mb-4 hidden min-[901px]:flex w-full items-center justify-start gap-2 flex-wrap"
              style={{ maxWidth: actionRowMaxWidth }}
            >
              {editPage === null && !showPageSelector && (
                <>
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={handleEditClick}
                    className="edit-fab"
                    style={{
                      background: template.accent,
                      boxShadow: `0 4px 20px ${template.accent}40, 0 0 40px ${template.accent}20`,
                    }}
                  >
                    <Pencil size={16} />
                    <span>Edit</span>
                  </motion.button>
                  {hasOpeningNote && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={handleEidiClick}
                      className="edit-fab"
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: `1px solid ${template.accent}40`,
                        color: template.accent,
                        boxShadow: "none",
                      }}
                    >
                      <Gift size={16} />
                      <span>{hasEidiPage ? "Edit Eidi" : "Add Eidi"}</span>
                    </motion.button>
                  )}
                  {hasOpeningNote && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => handlePageSelect("spin")}
                      className="edit-fab"
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: `1px solid ${template.accent}40`,
                        color: template.accent,
                        boxShadow: "none",
                      }}
                    >
                      <RotateCw size={16} />
                      <span>{hasSpinPage ? "Edit Spin" : "Add Spin"}</span>
                    </motion.button>
                  )}
                </>
              )}
              <ExportBar
                accent={template.accent}
                isExporting={isBusy}
                onDownload={() => exportAsPng(`eid-card-${template.type}.png`)}
                onShare={() =>
                  shareCard({
                    templateId: shareTemplateId ?? template.id,
                    title: template.title,
                    customization,
                    overrides: shareOverrides,
                  })
                }
              />
            </div>
            {editPage === null && !showPageSelector && (
              <div
                className="mx-auto mb-4 flex w-full min-[901px]:hidden items-center justify-start gap-2 flex-wrap"
                style={{ maxWidth: actionRowMaxWidth }}
              >
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={handleEditClick}
                  className="edit-fab"
                  style={{
                    background: template.accent,
                    boxShadow: `0 4px 20px ${template.accent}40, 0 0 40px ${template.accent}20`,
                  }}
                >
                  <Pencil size={16} />
                  <span>Edit</span>
                </motion.button>
                {hasOpeningNote && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={handleEidiClick}
                    className="edit-fab"
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: `1px solid ${template.accent}40`,
                      color: template.accent,
                      boxShadow: "none",
                    }}
                  >
                    <Gift size={16} />
                    <span>{hasEidiPage ? "Edit Eidi" : "Add Eidi"}</span>
                  </motion.button>
                )}
                {hasOpeningNote && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => handlePageSelect("spin")}
                    className="edit-fab"
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: `1px solid ${template.accent}40`,
                      color: template.accent,
                      boxShadow: "none",
                    }}
                  >
                    <RotateCw size={16} />
                    <span>{hasSpinPage ? "Edit Spin" : "Add Spin"}</span>
                  </motion.button>
                )}
              </div>
            )}
            {hasOpeningNote ? (
              <OpeningNotePreview
                template={template}
                customization={customization}
                overrides={overrides}
                onStickerUpdate={handleUpdateSticker}
                onStickerSelect={setSelectedStickerId}
                selectedStickerId={selectedStickerId}
                interactiveCover={editPage === "cover"}
                onCoverTextOffsetChange={handleCoverTextOffsetChange}
                activeEditPage={editPage}
              />
            ) : (
              <div className="mx-auto" style={{ maxWidth: "400px" }}>
                <EnhancedCanvas
                  template={template}
                  customization={customization}
                  overrides={overrides}
                  onStickerUpdate={handleUpdateSticker}
                  onStickerSelect={setSelectedStickerId}
                  selectedStickerId={selectedStickerId}
                  interactive={editPage === "cover"}
                  enableTextDrag={editPage === "cover"}
                  onCoverTextOffsetChange={handleCoverTextOffsetChange}
                />
              </div>
            )}
            <div className="mt-4 text-center">
              <div
                className="text-[14px] font-medium"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: template.accent }}
              >
                {template.title}
              </div>
              <div className="text-[9px] tracking-[2px] uppercase mt-1" style={{ color: "rgba(255,255,255,.2)" }}>
                {template.subtitle}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showPageSelector && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-[400px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>
                    What would you like to edit?
                  </span>
                  <button
                    onClick={handleCloseEditor}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,.3)",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {PAGE_CONFIG.map(({ key, label, desc, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => handlePageSelect(key)}
                      className="edit-page-card"
                      style={{ borderColor: "rgba(255,255,255,.06)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${template.accent}40`;
                        e.currentTarget.style.background = "rgba(255,255,255,.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
                        e.currentTarget.style.background = "rgba(255,255,255,.02)";
                      }}
                    >
                      <div className="edit-page-card-icon" style={{ background: `${template.accent}15`, color: template.accent }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="edit-page-card-title">{label}</div>
                        <div className="edit-page-card-desc">{desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {editPage !== null && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.25 }}
                className="flex-1 w-full min-w-0 max-w-[560px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>
                    Editing: {PAGE_CONFIG.find((page) => page.key === editPage)?.label}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <button
                      onClick={handleRestorePage}
                      className="cursor-pointer transition-all"
                      style={{
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "rgba(255,255,255,.45)",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                      }}
                    >
                      Restore
                    </button>
                    <button
                      onClick={handleCloseEditor}
                      className="cursor-pointer transition-all"
                      style={{
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "rgba(255,255,255,.45)",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                      }}
                    >
                      Done
                    </button>
                    <button
                      onClick={handleSave}
                      className="cursor-pointer transition-all"
                      style={{
                        background: `${template.accent}18`,
                        border: `1px solid ${template.accent}50`,
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: template.accent,
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <EditorPanel
                  template={template}
                  customization={customization}
                  accent={template.accent}
                  onChange={onCustomizationChange}
                  enableInsideEditor={hasOpeningNote}
                  activeEditPage={editorTabFilter}
                  stickers={overrides.stickers}
                  selectedStickerId={selectedStickerId}
                  onAddSticker={handleAddSticker}
                  onUpdateSticker={handleUpdateSticker}
                  onRemoveSticker={handleRemoveSticker}
                  onSelectSticker={setSelectedStickerId}
                  onResetCoverTextPosition={handleResetCoverTextPosition}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-140 hidden max-[900px]:block">
        <div
          className="mx-auto max-w-[900px] px-4 pt-3"
          style={{
            paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
            background: "linear-gradient(180deg, rgba(2,2,10,0) 0%, rgba(2,2,10,.82) 28%, rgba(2,2,10,.96) 100%)",
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
                templateId: shareTemplateId ?? template.id,
                title: template.title,
                customization,
                overrides: shareOverrides,
              })
            }
            fill
          />
        </div>
      </div>

      <ExportRenderer
        ref={exportRef}
        template={template}
        customization={customization}
        overrides={shareOverrides}
      />
    </section>
  );
}
