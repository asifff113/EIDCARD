"use client";

import { useState } from "react";
import { FileText, Gift, RotateCw } from "lucide-react";
import { isOpeningNoteTemplate } from "@/types/editor";
import type { CardCustomization, CardTemplate, EditorOverrides } from "@/types/editor";
import EnhancedCanvas from "@/components/editor/EnhancedCanvas";
import EidiPage from "@/components/editor/EidiPage";
import InsidePaperCanvas from "@/components/editor/InsidePaperCanvas";
import SpinPrizePage from "@/components/editor/SpinPrizePage";

export default function SharedCardView({
  template,
  customization,
  overrides,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  overrides: EditorOverrides;
}) {
  const isOpeningNote = isOpeningNoteTemplate(template);
  const hasEidi = (customization.paymentMethods ?? []).length > 0;
  const hasSpin = customization.spinPageEnabled;
  const pageOptions = [
    { key: "note" as const, label: "Note", icon: FileText },
    ...(hasEidi ? [{ key: "eidi" as const, label: "Eidi", icon: Gift }] : []),
    ...(hasSpin ? [{ key: "spin" as const, label: "Spin", icon: RotateCw }] : []),
  ];
  const [activePage, setActivePage] = useState<(typeof pageOptions)[number]["key"]>("note");
  const currentPage = pageOptions.some((page) => page.key === activePage) ? activePage : "note";

  return (
    <section className="relative z-[1] px-6 py-14 max-[640px]:px-4 max-[640px]:py-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 text-center">
          <div
            className="inline-flex rounded-[999px] border px-4 py-2 text-[10px] tracking-[3px] uppercase"
            style={{
              borderColor: "rgba(212,175,55,.22)",
              background: "rgba(0,0,0,.25)",
              color: "rgba(212,175,55,.72)",
            }}
          >
            Shared Card
          </div>
          <h1
            className="mt-5"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(36px, 6vw, 62px)",
              lineHeight: 0.98,
              color: "#f4e6bf",
            }}
          >
            {template.title}
          </h1>
          <p
            className="mx-auto mt-4 max-w-[620px]"
            style={{
              fontSize: "14px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,.58)",
            }}
          >
            This link shows the final published version only. Editing stays private to the original creator.
          </p>
        </div>

        {isOpeningNote ? (
          <div className="grid items-start gap-6 min-[920px]:grid-cols-[minmax(260px,320px)_minmax(0,1fr)]">
            <div className="mx-auto w-full max-w-[320px]">
              <EnhancedCanvas
                template={template}
                customization={customization}
                overrides={overrides}
                onStickerUpdate={() => {}}
                onStickerSelect={() => {}}
                selectedStickerId={null}
                interactive={false}
              />
            </div>
            <div className="mx-auto w-full max-w-[720px]">
              {pageOptions.length > 1 && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {pageOptions.map(({ key, label, icon: Icon }) => {
                    const active = currentPage === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActivePage(key)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 14px",
                          borderRadius: "999px",
                          border: `1px solid ${active ? `${template.accent}45` : "rgba(255,255,255,.08)"}`,
                          background: active ? `${template.accent}14` : "rgba(255,255,255,.03)",
                          color: active ? template.accent : "rgba(255,255,255,.48)",
                          fontSize: "11px",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        <Icon size={14} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
              {currentPage === "note" ? (
                <InsidePaperCanvas
                  template={template}
                  customization={customization}
                  interactive={false}
                />
              ) : currentPage === "eidi" ? (
                <EidiPage
                  template={template}
                  customization={customization}
                />
              ) : (
                <SpinPrizePage
                  template={template}
                  customization={customization}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[460px]">
            <EnhancedCanvas
              template={template}
              customization={customization}
              overrides={overrides}
              onStickerUpdate={() => {}}
              onStickerSelect={() => {}}
              selectedStickerId={null}
              interactive={false}
            />
          </div>
        )}
      </div>
    </section>
  );
}
