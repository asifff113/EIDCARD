"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCardEditor } from "@/hooks/useCardEditor";
import { useExportCard } from "@/hooks/useExportCard";
import TemplatePicker from "@/components/editor/TemplatePicker";
import CardPreviewCanvas from "@/components/editor/CardPreviewCanvas";
import EditorPanel from "@/components/editor/EditorPanel";
import ExportBar from "@/components/editor/ExportBar";
import ExportRenderer from "@/components/editor/ExportRenderer";

export default function CreatePage() {
  const { step, selectedTemplate, customization, selectTemplate, updateCustomization, goBack } = useCardEditor();
  const { exportRef, isExporting, exportAsPng, shareAsImage } = useExportCard();

  return (
    <div className="min-h-screen" style={{ background: "#02020a", color: "#fff", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(201,168,76,.04), transparent)",
      }} />

      {/* Nav */}
      <nav className="sticky top-0 z-[200] flex items-center justify-between px-[60px] h-16 max-[640px]:px-5"
        style={{ background: "rgba(2,2,10,.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <a href="/" className="no-underline flex items-center gap-3" style={{ fontFamily: "var(--font-italiana), 'Italiana', serif", fontSize: "20px", color: "#c9a84c" }}>
          Eid Cards
        </a>
        <div className="flex gap-8 max-[640px]:hidden">
          {[
            { label: "Royal", href: "/" },
            { label: "Museum", href: "/gallery" },
            { label: "Cinematic", href: "/cinematic" },
            { label: "Cards", href: "/cards" },
            { label: "Create", href: "/create" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="text-[10px] tracking-[3px] uppercase no-underline transition-colors hover:text-[#c9a84c]"
              style={{ color: l.href === "/create" ? "#c9a84c" : "rgba(255,255,255,.3)" }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="max-[640px]:hidden">
          {step === "edit" && selectedTemplate && (
            <ExportBar
              accent={selectedTemplate.accent}
              isExporting={isExporting}
              onDownload={() => exportAsPng(`eid-card-${selectedTemplate.type}.png`)}
              onShare={() => shareAsImage(selectedTemplate.title)}
            />
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-[1]">
        <AnimatePresence mode="wait">
          {step === "pick" ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
            >
              <TemplatePicker onSelect={selectTemplate} />
            </motion.div>
          ) : selectedTemplate ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-[1400px] mx-auto px-10 py-10 max-[640px]:px-5">
                {/* Back button */}
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 mb-8 cursor-pointer transition-colors hover:text-[#c9a84c]"
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,.4)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to templates
                </button>

                {/* Editor Layout */}
                <div className="flex gap-10 items-start max-[900px]:flex-col max-[900px]:items-center">
                  {/* Preview */}
                  <div className="flex-shrink-0 w-full max-w-[400px]">
                    <div className="mb-4 text-center">
                      <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>Live Preview</span>
                    </div>
                    <CardPreviewCanvas template={selectedTemplate} customization={customization} />
                    <div className="mt-4 text-center">
                      <div className="text-[14px] font-medium" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: selectedTemplate.accent }}>
                        {selectedTemplate.title}
                      </div>
                      <div className="text-[9px] tracking-[2px] uppercase mt-1" style={{ color: "rgba(255,255,255,.2)" }}>
                        {selectedTemplate.subtitle}
                      </div>
                    </div>

                    {/* Mobile export */}
                    <div className="hidden max-[900px]:flex justify-center mt-6">
                      <ExportBar
                        accent={selectedTemplate.accent}
                        isExporting={isExporting}
                        onDownload={() => exportAsPng(`eid-card-${selectedTemplate.type}.png`)}
                        onShare={() => shareAsImage(selectedTemplate.title)}
                      />
                    </div>
                  </div>

                  {/* Editor Panel */}
                  <div className="flex-1 w-full min-w-0 max-w-[500px]">
                    <div className="mb-4">
                      <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>Customize</span>
                    </div>
                    <EditorPanel
                      customization={customization}
                      accent={selectedTemplate.accent}
                      onChange={updateCustomization}
                    />
                  </div>
                </div>
              </div>

              {/* Hidden export renderer */}
              <ExportRenderer
                ref={exportRef}
                template={selectedTemplate}
                customization={customization}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative z-[1] text-center py-10 border-t" style={{ borderColor: "rgba(255,255,255,.04)" }}>
        <p className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.15)" }}>
          Eid Mubarak · Create & Share Beautiful Greetings
        </p>
      </footer>
    </div>
  );
}
