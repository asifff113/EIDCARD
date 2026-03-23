"use client";

import { motion } from "framer-motion";
import type { CardTemplate } from "@/types/editor";
import { TEMPLATES } from "@/data/templates";
import { StarsLayer, GlowLayer, OrnamentFrame } from "@/components/cards/artwork/Layers";
import { CardArtwork } from "@/components/cards/artwork/CardArtwork";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

export default function TemplatePicker({ onSelect }: { onSelect: (t: CardTemplate) => void }) {
  return (
    <div className="max-w-[1400px] mx-auto px-10 pb-24 max-[640px]:px-4">
      {/* Header */}
      <header className="text-center pt-20 pb-14 max-[640px]:pt-14 max-[640px]:pb-10">
        <div className="text-[10px] tracking-[6px] uppercase mb-5 py-2 px-6 inline-block"
          style={{ color: "rgba(201,168,76,.5)", background: "rgba(0,0,0,.3)", border: "1px solid rgba(201,168,76,.2)", borderRadius: "40px" }}>
          Step 1 of 2
        </div>
        <h1 className="leading-[.9] mb-3" style={{ fontFamily: "var(--font-italiana), 'Italiana', serif", fontSize: "clamp(40px, 7vw, 72px)", color: "#c9a84c", textShadow: "0 0 60px rgba(201,168,76,.2)" }}>
          Choose Your Card
        </h1>
        <p className="text-[12px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>
          Select a template to personalize
        </p>
      </header>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 gap-8 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[760px]:grid-cols-1 max-[640px]:gap-6"
      >
        {TEMPLATES.map((t) => (
          (() => {
            const textColor = t.textColor ?? t.accent;
            const starsCount = t.starsCount ?? 20;
            const showFrame = t.showFrame ?? true;
            const isRightLayout = t.layout === "crescent-bloom" || t.layout === "royal-split";
            const isBottomLayout = t.layout === "skyline-bottom";
            const isCalligraphyLayout = t.layout === "calligraphy-stack";
            const isEmblemLayout = t.layout === "crescent-emblem";
            const greetingFont =
              t.layout === "crescent-bloom"
                ? "var(--font-cormorant), 'Cormorant Garamond', serif"
                : t.layout === "royal-split"
                  ? "var(--font-dm-sans), 'DM Sans', sans-serif"
                  : "var(--font-italiana), 'Italiana', serif";

            return (
              <motion.div
                key={t.id}
                variants={item}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(t)}
                className="cursor-pointer group"
              >
                <div
                  className="relative overflow-hidden transition-shadow duration-500"
                  style={{
                    aspectRatio: "5/7",
                    borderRadius: "12px",
                    background: t.bg,
                    boxShadow: `0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.04)`,
                  }}
                >
                  <div className="absolute -inset-1 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]"
                    style={{ boxShadow: `0 0 40px ${t.glow}` }} />
                  {starsCount > 0 && <StarsLayer accent={t.accent} count={starsCount} />}
                  <GlowLayer glow={t.glow} />
                  <CardArtwork type={t.type} accent={t.accent} accent2={t.accent2} />
                  {showFrame && <OrnamentFrame accent={t.accent} />}
                  {isEmblemLayout ? (
                    <div
                      className="absolute z-[5] text-center"
                      style={{
                        left: "58.5%",
                        top: "55.5%",
                        transform: "translate(-50%, -50%)",
                        width: "32%",
                        color: textColor,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                          fontSize: "clamp(20px, 3.3vw, 30px)",
                          fontStyle: "italic",
                          lineHeight: 0.8,
                          color: textColor,
                          textShadow: `0 10px 24px ${t.glow}`,
                        }}
                      >
                        Eid
                      </div>
                      <div
                        className="mt-1"
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontSize: "clamp(8px, 1vw, 10px)",
                          fontWeight: 600,
                          letterSpacing: "2.4px",
                          color: textColor,
                        }}
                      >
                        Mubarak
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`absolute inset-0 z-[5] flex p-6 ${isRightLayout ? "items-start justify-end text-right" : isBottomLayout ? "items-end justify-center text-center" : "items-center justify-center text-center"}`}
                      style={{ color: textColor }}
                    >
                      <div style={{ width: isRightLayout ? "52%" : isBottomLayout ? "74%" : "100%" }}>
                        {isCalligraphyLayout ? (
                          <>
                            <div
                              className="leading-[.92]"
                              style={{
                                fontFamily: "var(--font-amiri), 'Amiri', serif",
                                fontSize: "clamp(22px, 3.5vw, 34px)",
                                direction: "rtl",
                                color: textColor,
                                textShadow: `0 0 36px ${t.glow}`,
                              }}
                            >
                              {t.ar}
                            </div>
                            <div
                              className="mt-3 leading-[.95]"
                              style={{
                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                fontSize: "clamp(18px, 3vw, 28px)",
                                color: textColor,
                                textShadow: `0 0 28px ${t.glow}`,
                              }}
                            >
                              Eid
                              <br />
                              Mubarak
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-[8px] tracking-[4px] uppercase mb-3 opacity-60" style={{ color: textColor }}>
                              {t.subtitle}
                            </div>
                            <div
                              className="leading-[.88] mb-2"
                              style={{
                                fontFamily: greetingFont,
                                fontSize: t.layout === "royal-split" ? "clamp(22px, 3.5vw, 34px)" : "clamp(24px, 3.5vw, 36px)",
                                color: textColor,
                                textShadow: `0 0 40px ${t.glow}`,
                                fontStyle: t.layout === "crescent-bloom" ? "italic" : "normal",
                                fontWeight: t.layout === "royal-split" ? 600 : 400,
                              }}
                            >
                              Eid
                              <br />
                              Mubarak
                            </div>
                            <div
                              className="opacity-70"
                              style={{
                                fontFamily: "var(--font-amiri), 'Amiri', serif",
                                fontSize: "clamp(12px, 1.5vw, 16px)",
                                direction: "rtl",
                                color: textColor,
                              }}
                            >
                              {t.layout === "royal-split" ? "" : t.ar}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <div className="text-[13px] font-medium" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "rgba(255,255,255,.7)" }}>{t.title}</div>
                  <div className="text-[9px] tracking-[2px] uppercase mt-1" style={{ color: "rgba(255,255,255,.25)" }}>{t.subtitle}</div>
                </div>
              </motion.div>
            );
          })()
        ))}
      </motion.div>
    </div>
  );
}
