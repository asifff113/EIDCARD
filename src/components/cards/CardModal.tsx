"use client";

import type { EidCard } from "@/data/cards";
import { useEffect } from "react";

function cornSVG(a: string, s = 34) {
  const mk = (p: string) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><path d="${p}" stroke="${a}" stroke-width="1.4" fill="none"/></svg>`;
  return {
    tl: mk(`M0,0 L${s},0 L${s},5.5 M0,0 L0,${s} L5.5,${s}`),
    tr: mk(`M${s},0 L0,0 L0,5.5 M${s},0 L${s},${s} L${s - 5.5},${s}`),
    bl: mk(`M0,${s} L${s},${s} L${s},${s - 5.5} M0,${s} L0,0 L5.5,0`),
    br: mk(`M${s},${s} L0,${s} L0,${s - 5.5} M${s},${s} L${s},0 L${s - 5.5},0`),
  };
}

export default function CardModal({
  card,
  onClose,
}: {
  card: EidCard | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (card) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [card]);

  if (!card) return null;

  const cn = cornSVG(card.accent);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Eid Mubarak!",
        text: card.desc.slice(0, 100),
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(0,0,0,.96)] backdrop-blur-[28px] flex items-center justify-center p-5 animate-[fadeIn_.3s_ease_both]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-[min(540px,96vw)] rounded-[2rem] overflow-hidden animate-[scaleIn_.42s_cubic-bezier(.34,1.4,.64,1)_both]"
        style={{
          boxShadow: `0 0 30px ${card.glow}, 0 40px 80px rgba(0,0,0,.8)`,
          border: `1px solid ${card.accent}30`,
        }}
      >
        {/* Card Face */}
        <div
          className="h-[430px] relative flex flex-col items-center justify-center overflow-hidden"
          style={{ background: card.grad }}
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,.2),transparent_70%)] z-[1]" />

          {/* Corner ornaments */}
          <div className="absolute top-3.5 left-3.5 opacity-[.28]" dangerouslySetInnerHTML={{ __html: cn.tl }} />
          <div className="absolute top-3.5 right-3.5 opacity-[.28]" dangerouslySetInnerHTML={{ __html: cn.tr }} />
          <div className="absolute bottom-3.5 left-3.5 opacity-[.28]" dangerouslySetInnerHTML={{ __html: cn.bl }} />
          <div className="absolute bottom-3.5 right-3.5 opacity-[.28]" dangerouslySetInnerHTML={{ __html: cn.br }} />

          <div className="text-center relative z-[2] px-5">
            {/* Icon badge */}
            <div
              className="w-[90px] h-[90px] rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-[iconPulse_3s_ease-in-out_infinite]"
              style={{
                background: card.accent,
                boxShadow: `0 0 20px ${card.glow}, 0 0 40px ${card.glow}`,
              }}
            >
              {card.emoji}
            </div>

            <div className="font-heading text-[50px] font-bold tracking-wider leading-none" style={{ color: card.accent, textShadow: `0 0 60px ${card.glow}` }}>
              Eid <span className="italic">Mubarak</span>
            </div>
            <div className="font-arabic text-[26px] opacity-[.68] rtl mt-2" style={{ color: card.accent }}>
              {card.ar}
            </div>
            <div className="text-[9px] tracking-[3px] uppercase opacity-[.32] mt-3.5" style={{ color: card.accent }}>
              {card.verse}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 px-7 bg-[var(--surface)] flex gap-3 items-center border-t border-[rgba(212,175,55,.08)]">
          <div className="flex-1">
            <div className="font-heading text-[22px] font-bold" style={{ color: card.accent }}>
              {card.title}
            </div>
            <div className="text-[9px] tracking-[2px] uppercase text-[var(--dim)] mt-1">
              {card.tag} · Eid Card
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-[40px] py-3 px-[22px] cursor-pointer font-sans text-[10px] font-semibold tracking-[2px] uppercase transition-all bg-transparent hover:bg-[rgba(212,175,55,.08)]"
            style={{ color: card.accent, border: `1px solid ${card.accent}40` }}
          >
            Close
          </button>
          <button
            onClick={handleShare}
            className="rounded-[40px] py-3 px-[22px] cursor-pointer font-sans text-[10px] font-semibold tracking-[2px] uppercase transition-all border-none text-[var(--bg)] hover:brightness-[1.15] hover:shadow-[0_0_20px_var(--gold)]"
            style={{ background: card.accent }}
          >
            Share 🌙
          </button>
        </div>
      </div>
    </div>
  );
}
