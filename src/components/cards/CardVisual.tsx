"use client";

import type { EidCard } from "@/data/cards";

function moonSVG(accent: string, size = 36) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id={`mg-${size}`}>
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={`M${size * 0.6},${size * 0.1} A${size * 0.38},${size * 0.38} 0 1,0 ${size * 0.6},${size * 0.9} A${size * 0.26},${size * 0.26} 0 1,1 ${size * 0.6},${size * 0.1}Z`}
        fill={accent}
        filter={`url(#mg-${size})`}
      />
      <circle cx={size * 0.7} cy={size * 0.15} r={size * 0.068} fill={accent} />
      <circle cx={size * 0.78} cy={size * 0.32} r={size * 0.028} fill={accent} opacity="0.7" />
    </svg>
  );
}

export default function CardVisual({ card }: { card: EidCard }) {
  const { accent, glow, ar, verse, type } = card;

  if (type === "mosque1" || type === "mosque2") {
    return (
      <div className="relative z-[2] text-center mb-16">
        {moonSVG(accent)}
        <div className="font-heading text-2xl font-bold tracking-wider leading-tight mt-2" style={{ color: accent, textShadow: `0 0 22px ${glow}` }}>
          Eid Mubarak
        </div>
        <div className="font-arabic text-[13px] opacity-60 rtl mt-1" style={{ color: accent }}>
          عيد مبارك
        </div>
      </div>
    );
  }

  if (type === "lantern") {
    return (
      <div className="relative z-[2] text-center flex flex-col items-center">
        <svg width="68" height="114" viewBox="0 0 68 114" style={{ marginBottom: 8, filter: `drop-shadow(0 0 18px ${accent})` }}>
          <line x1="34" y1="0" x2="34" y2="12" stroke={accent} strokeWidth="1.4" opacity=".6" />
          <path d="M20,12 L48,12 L52,22 L16,22Z" fill={accent} opacity=".85" />
          <path d="M16,22 C8,38 6,66 10,86 L18,100 L50,100 L58,86 C62,66 60,38 52,22Z" fill={accent} opacity=".45" />
          <path d="M16,22 C8,38 6,66 10,86 L18,100 L50,100 L58,86 C62,66 60,38 52,22Z" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
          <line x1="34" y1="22" x2="34" y2="100" stroke={accent} strokeWidth=".7" opacity=".35" />
          <polygon points="34,44 37,55 48,55 39,62 42,73 34,66 26,73 29,62 20,55 31,55" fill={accent} opacity=".72" />
          <path d="M18,100 L16,110 L52,110 L50,100Z" fill={accent} opacity=".85" />
          <ellipse cx="34" cy="24" rx="5" ry="8" fill={accent} opacity=".95" style={{ animation: "candleFlame 1.6s ease-in-out infinite" }} />
          <ellipse cx="34" cy="22" rx="3" ry="5" fill="white" opacity=".55" style={{ animation: "candleFlame 1.6s ease-in-out infinite .4s" }} />
        </svg>
        <div className="font-heading text-2xl font-bold tracking-wider leading-tight" style={{ color: accent, textShadow: `0 0 26px ${glow}` }}>
          Eid Mubarak
        </div>
        <div className="font-arabic text-[13px] opacity-60 rtl mt-1" style={{ color: accent }}>عيد مبارك</div>
      </div>
    );
  }

  if (type === "mandala") {
    return (
      <div className="relative z-[2] text-center">
        <svg width="90" height="90" viewBox="-45 -45 90 90" style={{ marginBottom: 8, animation: "rotateSlowR 20s linear infinite" }}>
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <line x1="0" y1="12" x2="0" y2="38" stroke={accent} strokeWidth="1" opacity=".6" />
              <polygon points="0,8 3,14 -3,14" fill={accent} opacity=".5" />
            </g>
          ))}
          <circle cx="0" cy="0" r="10" fill="none" stroke={accent} strokeWidth="1.4" />
          <circle cx="0" cy="0" r="4" fill={accent} opacity=".55" />
        </svg>
        <div className="font-heading text-2xl font-bold tracking-wider leading-tight" style={{ color: accent, textShadow: `0 0 26px ${glow}` }}>
          Eid Mubarak
        </div>
        <div className="font-arabic text-[13px] opacity-60 rtl mt-1" style={{ color: accent }}>عيد مبارك</div>
      </div>
    );
  }

  if (type === "calli1" || type === "calli2") {
    return (
      <div className="relative z-[2] text-center px-5">
        <div className="font-arabic text-[clamp(16px,2.8vw,24px)] rtl font-bold leading-relaxed mb-3" style={{ color: accent, textShadow: `0 0 32px ${glow}` }}>
          {ar}
        </div>
        <div className="w-[50px] h-px mx-auto mb-3" style={{ background: accent, opacity: 0.35 }} />
        <div className="font-heading text-2xl font-bold tracking-wider leading-tight" style={{ color: accent, textShadow: `0 0 18px ${glow}` }}>
          Eid Mubarak
        </div>
        <div className="text-[9px] tracking-[3px] uppercase mt-2" style={{ color: accent, opacity: 0.35 }}>{verse}</div>
      </div>
    );
  }

  if (type === "star") {
    return (
      <div className="relative z-[2] text-center">
        <svg width="84" height="84" viewBox="0 0 84 84" style={{ marginBottom: 10 }}>
          <path d="M53,7 A34,34 0 1,0 53,77 A24,24 0 1,1 53,7Z" fill={accent} opacity=".9" />
          <circle cx="62" cy="10" r="5.5" fill={accent} />
          <polygon points="72,30 75.5,41 87,41 78,47.5 81.5,58.5 72,52 62.5,58.5 66,47.5 57,41 68.5,41" fill={accent} opacity=".85" style={{ animation: "pulse 3s ease-in-out infinite" }} />
        </svg>
        <div className="font-heading text-2xl font-bold tracking-wider leading-tight" style={{ color: accent, textShadow: `0 0 26px ${glow}` }}>
          Eid Mubarak
        </div>
        <div className="font-arabic text-[13px] opacity-60 rtl mt-1" style={{ color: accent }}>عيد مبارك</div>
      </div>
    );
  }

  if (type === "kaaba") {
    return (
      <div className="relative z-[2] text-center flex flex-col items-center">
        <svg width="96" height="96" viewBox="0 0 96 96" style={{ marginBottom: 10, filter: `drop-shadow(0 0 18px ${accent})` }}>
          <rect x="12" y="28" width="66" height="58" fill="#0a0a0a" stroke={accent} strokeWidth="1.2" />
          <rect x="12" y="55" width="66" height="12" fill={accent} opacity=".55" />
          <rect x="38" y="60" width="20" height="26" fill={accent} opacity=".25" rx="2" />
          <polygon points="4,28 92,28 82,16 14,16" fill="#141414" stroke={accent} strokeWidth=".9" />
          <polygon points="78,28 92,28 92,86 78,86" fill="#080808" stroke={accent} strokeWidth=".9" />
        </svg>
        <div className="font-heading text-2xl font-bold tracking-wider leading-tight" style={{ color: accent, textShadow: `0 0 26px ${glow}` }}>
          Eid Mubarak
        </div>
        <div className="font-arabic text-[13px] opacity-60 rtl mt-1" style={{ color: accent }}>عيد مبارك</div>
      </div>
    );
  }

  // Default: moon + text (cosmic, aurora, tasbih, dua, palm, rain, rain2, bloom, minimal, moonline, arabesque, zellige)
  return (
    <div className="relative z-[2] text-center">
      {moonSVG(accent, 48)}
      <div className="w-10 h-px mx-auto my-3.5" style={{ background: accent, opacity: 0.4 }} />
      <div className="font-heading text-[26px] font-bold tracking-wider leading-tight" style={{ color: accent, textShadow: `0 0 28px ${glow}` }}>
        Eid Mubarak
      </div>
      <div className="font-arabic text-[15px] opacity-60 rtl mt-1.5" style={{ color: accent }}>عيد مبارك</div>
    </div>
  );
}
