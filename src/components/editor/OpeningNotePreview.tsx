"use client";

import { useState } from "react";
import { RotateCcw, Gift, RotateCw } from "lucide-react";
import type { CardCustomization, CardTemplate, EditorOverrides, PositionOffset, Sticker } from "@/types/editor";
import EnhancedCanvas from "@/components/editor/EnhancedCanvas";
import InsidePaperCanvas from "@/components/editor/InsidePaperCanvas";
import EidiPage from "@/components/editor/EidiPage";
import SpinPrizePage from "@/components/editor/SpinPrizePage";

type CardPage = "cover" | "note" | "eidi" | "spin";

const PAGE_LABELS: Record<CardPage, string> = {
  cover: "Cover Page",
  note: "Inside Note",
  eidi: "Eidi Page",
  spin: "Spin Page",
};

const PAGES: CardPage[] = ["cover", "note", "eidi", "spin"];

export default function OpeningNotePreview({
  template,
  customization,
  overrides,
  onStickerUpdate,
  onStickerSelect,
  selectedStickerId,
  interactiveCover = false,
  onCoverTextOffsetChange,
  activeEditPage,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  overrides: EditorOverrides;
  onStickerUpdate: (id: string, partial: Partial<Sticker>) => void;
  onStickerSelect: (id: string | null) => void;
  selectedStickerId: string | null;
  interactiveCover?: boolean;
  onCoverTextOffsetChange: (offset: PositionOffset) => void;
  activeEditPage?: CardPage | null;
}) {
  const [page, setPage] = useState<CardPage>("cover");
  const hasEidi = (customization.paymentMethods ?? []).length > 0;
  const hasSpin = customization.spinPageEnabled;
  const availablePages = PAGES.filter((candidate) => {
    if (candidate === "eidi") {
      return hasEidi;
    }

    if (candidate === "spin") {
      return hasSpin;
    }

    return true;
  });
  const currentPage = activeEditPage ?? (availablePages.includes(page) ? page : "cover");
  const currentIdx = Math.max(availablePages.indexOf(currentPage), 0);
  const nextPage = availablePages[(currentIdx + 1) % availablePages.length] ?? "cover";

  function goNext() {
    const nextIdx = (currentIdx + 1) % availablePages.length;
    setPage(availablePages[nextIdx]);
  }

  function goTo(target: CardPage) {
    setPage(target);
  }

  return (
    <div className="w-full" key={template.id}>
      {/* Card Container */}
      <div className="mx-auto" style={{ maxWidth: "420px" }}>
        {/* Active page */}
        <div className="card-flip-container">
          <div
            className="card-flip-inner"
              style={{
              transform:
                currentPage === "cover"
                  ? "rotateY(0deg)"
                  : currentPage === "note"
                  ? "rotateY(180deg)"
                  : "rotateY(360deg)",
            }}
          >
            {/* Front: Cover */}
            <div
              className="card-flip-face card-flip-front"
              style={{ visibility: currentPage === "cover" ? "visible" : "hidden" }}
            >
              <EnhancedCanvas
                template={template}
                customization={customization}
                overrides={overrides}
                onStickerUpdate={onStickerUpdate}
                onStickerSelect={onStickerSelect}
                selectedStickerId={selectedStickerId}
                interactive={interactiveCover && currentPage === "cover"}
                enableTextDrag={interactiveCover && currentPage === "cover"}
                onCoverTextOffsetChange={onCoverTextOffsetChange}
              />
            </div>

            {/* Back: Note */}
            <div
              className="card-flip-face card-flip-back"
              style={{ visibility: currentPage === "note" ? "visible" : "hidden" }}
            >
              <InsidePaperCanvas template={template} customization={customization} interactive />
            </div>
          </div>

          {/* Show Eidi page as a separate element when active */}
          {currentPage === "eidi" && (
            <div
              className="absolute inset-0 z-20"
              style={{
                animation: "eidiReveal .4s ease-out",
              }}
            >
              <EidiPage template={template} customization={customization} />
            </div>
          )}
          {currentPage === "spin" && (
            <div
              className="absolute inset-0 z-20"
              style={{
                animation: "eidiReveal .4s ease-out",
              }}
            >
              <SpinPrizePage template={template} customization={customization} />
            </div>
          )}

          {/* Flip Button */}
          <button
            onClick={goNext}
            className="card-flip-btn"
            style={{
              borderColor: `${template.accent}50`,
              color: template.accent,
            }}
            title={
              currentPage === "cover"
                ? "Open card"
                : `Show ${PAGE_LABELS[nextPage].toLowerCase()}`
            }
          >
            {currentPage === "eidi" ? (
              <Gift size={18} />
            ) : currentPage === "spin" ? (
              <RotateCw size={18} />
            ) : (
              <RotateCcw size={18} className={currentPage === "note" ? "card-flip-icon--flipped" : ""} />
            )}
            <span>
              {currentPage === "cover"
                ? "Open"
                : PAGE_LABELS[nextPage].replace(" Page", "")}
            </span>
          </button>
        </div>

        {/* Page Indicator */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {availablePages.map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className="card-flip-dot"
              style={{
                background: currentPage === p ? template.accent : "rgba(255,255,255,.15)",
                boxShadow: currentPage === p ? `0 0 10px ${template.accent}40` : "none",
              }}
              title={PAGE_LABELS[p]}
            />
          ))}
        </div>
        <div
          className="mt-2 text-center text-[9px] tracking-[2px] uppercase"
          style={{ color: "rgba(255,255,255,.3)", fontFamily: "var(--font-dm-sans)" }}
        >
          {PAGE_LABELS[currentPage]}
        </div>
      </div>
    </div>
  );
}
