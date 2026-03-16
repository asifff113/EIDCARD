"use client";

import type { EidCard } from "@/data/cards";
import CardVisual from "./CardVisual";

export default function FlipCard({
  card,
  index,
  onOpen,
}: {
  card: EidCard;
  index: number;
  onOpen: (card: EidCard) => void;
}) {
  return (
    <div
      className="group"
      style={{
        perspective: "1400px",
        height: 320,
        cursor: "pointer",
        animation: `fadeUp .65s ease both`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-[750ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-[2rem] overflow-hidden border border-[rgba(212,175,55,.22)] flex flex-col items-center justify-center transition-all group-hover:shadow-[0_0_30px_rgba(212,175,55,.35),0_15px_40px_rgba(0,0,0,.7)] group-hover:border-[rgba(212,175,55,.6)]"
          style={{ background: card.grad }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,.18),transparent_70%)]" />

          <CardVisual card={card} />

          {/* Number */}
          <div
            className="absolute top-[13px] left-[15px] font-heading text-[11px] opacity-[.28] tracking-[1px]"
            style={{ color: card.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Badge */}
          <div
            className="absolute top-3 right-3 backdrop-blur-[12px] bg-[rgba(0,0,0,.35)] rounded-[20px] py-[3px] px-2.5 text-[9px] tracking-[1.5px] uppercase"
            style={{ borderColor: `${card.accent}35`, color: card.accent, border: `1px solid ${card.accent}35` }}
          >
            {card.tag}
          </div>

          {/* Hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] tracking-[2px] uppercase opacity-[.22] whitespace-nowrap">
            Hover to reveal
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2rem] overflow-hidden">
          <div className="w-full h-full bg-[var(--surface)] flex flex-col p-[22px] relative overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,.15)]">
            <div className="absolute inset-0 pointer-events-none rounded-[2rem] bg-[radial-gradient(circle_at_30%_80%,rgba(212,175,55,.1),transparent_65%)]" />
            <div
              className="h-[3px] absolute top-0 left-0 right-0 rounded-t-[2rem]"
              style={{ background: card.accent }}
            />

            <div className="flex justify-between items-start mb-1.5 mt-2 relative z-[1]">
              <div className="font-heading text-[19px] font-bold" style={{ color: card.accent }}>
                {card.title}
              </div>
              <div
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[18px] animate-[iconPulse_3s_ease-in-out_infinite] shrink-0"
                style={{ background: card.accent, boxShadow: `0 0 20px ${card.glow}` }}
              >
                {card.emoji}
              </div>
            </div>

            <div className="font-arabic text-[17px] rtl mb-2.5 opacity-70 leading-relaxed relative z-[1]" style={{ color: card.accent }}>
              {card.ar}
            </div>
            <div className="text-[11px] text-[#55506a] leading-[1.75] flex-1 mb-3.5 relative z-[1]">
              {card.desc}
            </div>
            <div className="text-[9px] tracking-[2.5px] uppercase mb-3.5 relative z-[1]" style={{ color: `${card.accent}50` }}>
              {card.verse}
            </div>
            <button
              className="w-full py-2.5 rounded-[40px] border-none cursor-pointer font-sans text-[10px] tracking-[2px] font-semibold uppercase transition-all relative z-[1] hover:brightness-[1.2] hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--gold)]"
              style={{
                background: `${card.accent}15`,
                color: card.accent,
                border: `1px solid ${card.accent}38`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onOpen(card);
              }}
            >
              Open Card →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
