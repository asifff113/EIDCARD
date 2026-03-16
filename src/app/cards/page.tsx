"use client";

import { useState, useEffect } from "react";
import { TEMPLATES } from "@/data/templates";
import type { CardTemplate } from "@/types/editor";

type EidCard = CardTemplate;
const CARDS = TEMPLATES;

import { OrnamentFrame, GlowLayer, StarsLayer } from "@/components/cards/artwork/Layers";
import { CardArtwork as CardArtworkBase } from "@/components/cards/artwork/CardArtwork";

/* Re-export CardArtwork under same name for local use */
function CardArtwork({ type, accent, accent2 }: { type: string; accent: string; accent2: string }) {
  return <CardArtworkBase type={type} accent={accent} accent2={accent2} />;
}

/* ═══════════════════════════════════════════════════
   CARD COMPONENT — full layered card
   ═══════════════════════════════════════════════════ */
function CardTemplate({ card, onClick }: { card: EidCard; onClick: () => void }) {
  const italiana = "var(--font-italiana), 'Italiana', serif";
  const amiri = "var(--font-amiri), 'Amiri', serif";
  const cormorant = "var(--font-cormorant), 'Cormorant Garamond', serif";

  return (
    <div
      className="group relative cursor-pointer"
      style={{ animationDelay: `${(card.id - 1) * 0.06}s`, animationName: "fadeUp", animationDuration: ".6s", animationTimingFunction: "ease", animationFillMode: "both" }}
      onClick={onClick}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
        style={{
          aspectRatio: "5/7",
          borderRadius: "12px",
          background: card.bg,
          boxShadow: `0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.04)`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute -inset-1 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]"
          style={{ background: `${card.accent}15`, boxShadow: `0 0 40px ${card.glow}` }}
        />

        {/* Layer 1: Stars */}
        <StarsLayer accent={card.accent} count={30} />

        {/* Layer 2: Glow */}
        <GlowLayer glow={card.glow} />

        {/* Layer 3: Main artwork */}
        <CardArtwork type={card.type} accent={card.accent} accent2={card.accent2} />

        {/* Layer 4: Ornament frame */}
        <OrnamentFrame accent={card.accent} />

        {/* Layer 5: Text content */}
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center p-8">
          <div className="text-[8px] tracking-[4px] uppercase mb-3 opacity-60" style={{ color: card.accent }}>{card.subtitle}</div>
          <div className="leading-[.88] mb-2" style={{ fontFamily: italiana, fontSize: "clamp(28px, 4vw, 42px)", color: card.accent, textShadow: `0 0 40px ${card.glow}` }}>
            Eid<br />Mubarak
          </div>
          <div className="mb-3 opacity-70" style={{ fontFamily: amiri, fontSize: "clamp(14px, 2vw, 20px)", direction: "rtl", color: card.accent }}>
            {card.ar}
          </div>
          <div className="w-8 h-px opacity-30 mb-2" style={{ background: card.accent }} />
          <div className="text-[7px] tracking-[3px] uppercase opacity-30 italic" style={{ fontFamily: cormorant, color: card.accent }}>
            1446 Hijri
          </div>
        </div>
      </div>

      {/* Label below */}
      <div className="mt-4 text-center">
        <div className="text-[13px] font-medium" style={{ fontFamily: cormorant, color: "rgba(255,255,255,.7)" }}>{card.title}</div>
        <div className="text-[9px] tracking-[2px] uppercase mt-1" style={{ color: "rgba(255,255,255,.25)" }}>{card.subtitle}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FULL CARD PREVIEW (modal)
   ═══════════════════════════════════════════════════ */
function CardPreviewModal({ card, onClose }: { card: EidCard; onClose: () => void }) {
  const italiana = "var(--font-italiana), 'Italiana', serif";
  const amiri = "var(--font-amiri), 'Amiri', serif";
  const cormorant = "var(--font-cormorant), 'Cormorant Garamond', serif";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-5"
      style={{ background: "rgba(0,0,0,.96)", backdropFilter: "blur(30px)", animation: "fadeIn .3s ease both" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ animation: "slideUp .4s cubic-bezier(.34,1.4,.64,1) both" }} className="flex flex-col items-center gap-6">
        {/* Large card */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "min(380px, 85vw)",
            aspectRatio: "5/7",
            borderRadius: "16px",
            background: card.bg,
            boxShadow: `0 0 40px ${card.glow}, 0 60px 120px rgba(0,0,0,.8), 0 0 0 1px ${card.accent}20`,
          }}
        >
          <StarsLayer accent={card.accent} count={50} />
          <GlowLayer glow={card.glow} />
          <CardArtwork type={card.type} accent={card.accent} accent2={card.accent2} />
          <OrnamentFrame accent={card.accent} />

          <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center p-10">
            <div className="text-[10px] tracking-[5px] uppercase mb-5 opacity-60" style={{ color: card.accent }}>{card.subtitle}</div>
            <div className="leading-[.88] mb-3" style={{ fontFamily: italiana, fontSize: "clamp(44px, 8vw, 64px)", color: card.accent, textShadow: `0 0 60px ${card.glow}` }}>
              Eid<br />Mubarak
            </div>
            <div className="mb-4 opacity-75" style={{ fontFamily: amiri, fontSize: "clamp(20px, 4vw, 30px)", direction: "rtl", color: card.accent }}>
              {card.ar}
            </div>
            <div className="w-12 h-px opacity-35 mb-3" style={{ background: card.accent }} />
            <div className="text-[9px] tracking-[3px] uppercase opacity-35 italic" style={{ fontFamily: cormorant, color: card.accent }}>
              1446 Hijri · Eid Al-Fitr
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="text-center mr-4">
            <div className="text-[18px] font-bold" style={{ fontFamily: cormorant, color: card.accent }}>{card.title}</div>
            <div className="text-[9px] tracking-[2px] uppercase mt-1" style={{ color: "rgba(255,255,255,.3)" }}>{card.subtitle} · Card #{String(card.id).padStart(2, "0")}</div>
          </div>
          <button
            className="py-2.5 px-5 text-[10px] tracking-[2px] uppercase cursor-pointer transition-all"
            style={{ background: "rgba(255,255,255,.06)", border: "none", borderRadius: "4px", color: "rgba(255,255,255,.5)", fontFamily: "var(--font-dm-sans)" }}
            onClick={onClose}
          >Close</button>
          <button
            className="py-2.5 px-5 text-[10px] tracking-[2px] uppercase cursor-pointer transition-all hover:brightness-110"
            style={{ background: card.accent, border: "none", borderRadius: "4px", color: "#000", fontFamily: "var(--font-dm-sans)" }}
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({ title: "Eid Mubarak!", text: card.title, url: window.location.href });
              } else {
                await navigator.clipboard.writeText(window.location.href);
              }
            }}
          >Share</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function CardsPage() {
  const [preview, setPreview] = useState<EidCard | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setPreview(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (preview) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  return (
    <div className="min-h-screen" style={{ background: "#02020a", color: "#fff", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(201,168,76,.04), transparent)"
      }} />

      {/* Nav */}
      <nav className="sticky top-0 z-[200] flex items-center justify-between px-[60px] h-16 max-[640px]:px-5"
        style={{ background: "rgba(2,2,10,.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <a href="/cards" className="no-underline flex items-center gap-3" style={{ fontFamily: "var(--font-italiana), 'Italiana', serif", fontSize: "20px", color: "#c9a84c" }}>
          Eid Cards
        </a>
        <div className="flex gap-8 max-[640px]:hidden">
          {[{ label: "Royal", href: "/" }, { label: "Museum", href: "/gallery" }, { label: "Cinematic", href: "/cinematic" }, { label: "Cards", href: "/cards" }].map((l) => (
            <a key={l.label} href={l.href} className="text-[10px] tracking-[3px] uppercase no-underline transition-colors hover:text-[#c9a84c]" style={{ color: "rgba(255,255,255,.3)" }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="text-[10px] tracking-[2px] uppercase max-[640px]:hidden" style={{ color: "rgba(255,255,255,.15)" }}>
          {CARDS.length} Templates
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-[1] text-center pt-24 pb-16 px-5">
        <div className="text-[10px] tracking-[6px] uppercase mb-5 py-2 px-6 inline-block"
          style={{ color: "rgba(201,168,76,.5)", background: "rgba(0,0,0,.3)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,168,76,.2)", borderRadius: "40px" }}>
          ✦ &nbsp;Eid Card Collection&nbsp; ✦
        </div>
        <h1 className="leading-[.88] mb-3" style={{ fontFamily: "var(--font-italiana), 'Italiana', serif", fontSize: "clamp(48px, 8vw, 90px)", color: "#c9a84c", textShadow: "0 0 60px rgba(201,168,76,.2)" }}>
          Beautiful Cards
        </h1>
        <p className="text-[12px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>
          Choose a design · Customize · Share with loved ones
        </p>
        <div className="flex items-center gap-4 justify-center mt-8">
          <div className="h-px w-16" style={{ background: "rgba(201,168,76,.2)" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#c9a84c", opacity: 0.4 }} />
          <div className="h-px w-16" style={{ background: "linear-gradient(270deg, rgba(201,168,76,.2), transparent)" }} />
        </div>
      </header>

      {/* Card Grid */}
      <div className="relative z-[1] max-w-[1400px] mx-auto px-10 pb-24 grid grid-cols-4 gap-8 max-[1100px]:grid-cols-3 max-[750px]:grid-cols-2 max-[450px]:grid-cols-1">
        {CARDS.map((card) => (
          <CardTemplate key={card.id} card={card} onClick={() => setPreview(card)} />
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-[1] text-center py-10 border-t" style={{ borderColor: "rgba(255,255,255,.04)" }}>
        <p className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,.15)" }}>
          Eid Mubarak Collection · 1446 AH · Crafted with love
        </p>
      </footer>

      {/* Preview modal */}
      {preview && <CardPreviewModal card={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
