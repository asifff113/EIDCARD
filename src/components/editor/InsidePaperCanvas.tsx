"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { CardCustomization, CardTemplate, PaperBorderStyle, PaperDecoration, PaperFont, PaperTheme } from "@/types/editor";
import {
  buildPaymentQrValue,
  getPaymentMethodLabel,
  maskPaymentValue,
} from "@/components/editor/paymentUtils";

type ThemeStyles = {
  paper: string;
  border: string;
  text: string;
  softText: string;
  line: string;
  wash: string;
  panel: string;
};

const THEME_STYLES: Record<PaperTheme, ThemeStyles> = {
  parchment: {
    paper: "linear-gradient(180deg, #fbf5e7 0%, #f4e4c1 48%, #efd6a8 100%)",
    border: "rgba(185, 137, 57, .46)",
    text: "#3b2a19",
    softText: "rgba(59, 42, 25, .72)",
    line: "rgba(121, 87, 34, .14)",
    wash: "rgba(214, 170, 82, .16)",
    panel: "rgba(255,255,255,.48)",
  },
  linen: {
    paper: "linear-gradient(180deg, #faf8f0 0%, #eee4d0 52%, #e2d5bb 100%)",
    border: "rgba(142, 119, 79, .42)",
    text: "#403224",
    softText: "rgba(64, 50, 36, .74)",
    line: "rgba(128, 112, 90, .14)",
    wash: "rgba(196, 170, 118, .14)",
    panel: "rgba(255,255,255,.52)",
  },
  "pressed-floral": {
    paper: "linear-gradient(180deg, #fff9f2 0%, #f6e5de 52%, #edcfc8 100%)",
    border: "rgba(156, 111, 97, .38)",
    text: "#4b2d2f",
    softText: "rgba(75, 45, 47, .72)",
    line: "rgba(152, 115, 117, .14)",
    wash: "rgba(219, 166, 162, .18)",
    panel: "rgba(255,255,255,.52)",
  },
  ledger: {
    paper: "linear-gradient(180deg, #fcfaf4 0%, #f2eadb 52%, #e8dfcf 100%)",
    border: "rgba(114, 110, 98, .34)",
    text: "#2f3139",
    softText: "rgba(47, 49, 57, .74)",
    line: "rgba(101, 126, 168, .16)",
    wash: "rgba(179, 188, 208, .12)",
    panel: "rgba(255,255,255,.6)",
  },
  marble: {
    paper: "linear-gradient(180deg, #f8f6ef 0%, #e8ece0 52%, #d7dfd0 100%)",
    border: "rgba(120, 140, 105, .36)",
    text: "#293226",
    softText: "rgba(41, 50, 38, .72)",
    line: "rgba(143, 156, 120, .14)",
    wash: "rgba(168, 182, 144, .14)",
    panel: "rgba(255,255,255,.46)",
  },
  "moonlit-vellum": {
    paper: "linear-gradient(180deg, #13253b 0%, #20314d 52%, #293a56 100%)",
    border: "rgba(233, 201, 129, .34)",
    text: "#f8eed8",
    softText: "rgba(248, 238, 216, .74)",
    line: "rgba(240, 220, 177, .12)",
    wash: "rgba(233, 201, 129, .12)",
    panel: "rgba(12,18,28,.3)",
  },
  "illumined-manuscript": {
    paper: "linear-gradient(180deg, #fdf8ea 0%, #f3e4bc 52%, #ecd39b 100%)",
    border: "rgba(175, 132, 50, .46)",
    text: "#3f2d12",
    softText: "rgba(63, 45, 18, .74)",
    line: "rgba(149, 110, 36, .16)",
    wash: "rgba(221, 180, 88, .16)",
    panel: "rgba(255,255,255,.46)",
  },
  "watercolor-garden": {
    paper: "linear-gradient(180deg, #fffaf4 0%, #f3ebf1 52%, #e6eef5 100%)",
    border: "rgba(147, 125, 135, .34)",
    text: "#45343a",
    softText: "rgba(69, 52, 58, .74)",
    line: "rgba(144, 132, 150, .14)",
    wash: "rgba(217, 183, 180, .14)",
    panel: "rgba(255,255,255,.5)",
  },
  "rosewater-letter": {
    paper: "linear-gradient(180deg, #fffaf7 0%, #f6e8e7 52%, #f1dbdd 100%)",
    border: "rgba(167, 120, 123, .34)",
    text: "#4b3034",
    softText: "rgba(75, 48, 52, .72)",
    line: "rgba(164, 123, 133, .14)",
    wash: "rgba(236, 191, 188, .16)",
    panel: "rgba(255,255,255,.54)",
  },
  "tea-stained-notebook": {
    paper: "linear-gradient(180deg, #fbf6ea 0%, #f1e4cb 52%, #e7d2ad 100%)",
    border: "rgba(147, 109, 62, .38)",
    text: "#45311d",
    softText: "rgba(69, 49, 29, .72)",
    line: "rgba(119, 114, 106, .15)",
    wash: "rgba(181, 130, 71, .14)",
    panel: "rgba(255,255,255,.48)",
  },
  "celadon-silk": {
    paper: "linear-gradient(180deg, #f7faf4 0%, #e5efe2 52%, #d4e2d0 100%)",
    border: "rgba(102, 136, 118, .36)",
    text: "#2d4035",
    softText: "rgba(45, 64, 53, .72)",
    line: "rgba(104, 132, 116, .14)",
    wash: "rgba(154, 188, 161, .14)",
    panel: "rgba(255,255,255,.5)",
  },
  "inkwash-rice-paper": {
    paper: "linear-gradient(180deg, #fbfaf6 0%, #eee9df 52%, #e4ddd0 100%)",
    border: "rgba(105, 98, 89, .34)",
    text: "#242424",
    softText: "rgba(36, 36, 36, .72)",
    line: "rgba(88, 88, 88, .14)",
    wash: "rgba(128, 120, 110, .12)",
    panel: "rgba(255,255,255,.54)",
  },
  "pearl-engraving": {
    paper: "linear-gradient(180deg, #fffefd 0%, #f4f2ee 52%, #e8e5de 100%)",
    border: "rgba(156, 150, 138, .34)",
    text: "#37342e",
    softText: "rgba(55, 52, 46, .72)",
    line: "rgba(166, 160, 149, .14)",
    wash: "rgba(230, 226, 218, .2)",
    panel: "rgba(255,255,255,.58)",
  },
  "indigo-constellation": {
    paper: "linear-gradient(180deg, #0c1630 0%, #172445 52%, #1f2d54 100%)",
    border: "rgba(185, 201, 241, .24)",
    text: "#eef4ff",
    softText: "rgba(238, 244, 255, .72)",
    line: "rgba(187, 204, 237, .14)",
    wash: "rgba(113, 148, 211, .14)",
    panel: "rgba(8,14,28,.3)",
  },
  "mosaic-border": {
    paper: "linear-gradient(180deg, #faf7ef 0%, #eef2ea 52%, #e1e9de 100%)",
    border: "rgba(91, 122, 105, .4)",
    text: "#2a3830",
    softText: "rgba(42, 56, 48, .74)",
    line: "rgba(99, 126, 111, .15)",
    wash: "rgba(104, 145, 124, .12)",
    panel: "rgba(255,255,255,.46)",
  },
  "palace-embossed": {
    paper: "linear-gradient(180deg, #fffdfa 0%, #f4ece0 52%, #eadfcd 100%)",
    border: "rgba(180, 152, 108, .34)",
    text: "#4a3b28",
    softText: "rgba(74, 59, 40, .72)",
    line: "rgba(188, 166, 132, .14)",
    wash: "rgba(228, 211, 186, .18)",
    panel: "rgba(255,255,255,.54)",
  },
  "starlit-manuscript": {
    paper: "linear-gradient(180deg, #0f1830 0%, #1b2746 52%, #243153 100%)",
    border: "rgba(236, 202, 121, .34)",
    text: "#f7edd6",
    softText: "rgba(247, 237, 214, .74)",
    line: "rgba(242, 226, 182, .12)",
    wash: "rgba(236, 202, 121, .12)",
    panel: "rgba(10,15,28,.32)",
  },
};

const FONT_FAMILIES: Record<PaperFont, { heading: string; body: string }> = {
  classic: {
    heading: "var(--font-libre), 'Libre Baskerville', serif",
    body: "var(--font-libre), 'Libre Baskerville', serif",
  },
  elegant: {
    heading: "var(--font-cormorant), 'Cormorant Garamond', serif",
    body: "var(--font-cormorant), 'Cormorant Garamond', serif",
  },
  formal: {
    heading: "var(--font-playfair), 'Playfair Display', serif",
    body: "var(--font-playfair), 'Playfair Display', serif",
  },
  modern: {
    heading: "var(--font-dm-sans), 'DM Sans', sans-serif",
    body: "var(--font-dm-sans), 'DM Sans', sans-serif",
  },
  handwritten: {
    heading: "var(--font-italiana), 'Italiana', serif",
    body: "var(--font-italiana), 'Italiana', serif",
  },
  "arabic-accent": {
    heading: "var(--font-amiri), 'Amiri', serif",
    body: "var(--font-amiri), 'Amiri', serif",
  },
};

function PaperBackgroundLayer({
  themeName,
  theme,
  accent,
  accent2,
}: {
  themeName: PaperTheme;
  theme: ThemeStyles;
  accent: string;
  accent2: string;
}) {
  if (themeName === "linen") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(0deg, rgba(122,106,80,.05) 0, rgba(122,106,80,.05) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(122,106,80,.05) 0, rgba(122,106,80,.05) 1px, transparent 1px, transparent 8px)`,
            opacity: 0.9,
          }}
        />
        <div style={{ position: "absolute", left: "50%", top: "34px", bottom: "34px", width: "1px", background: theme.line, opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: "18px", borderRadius: "26px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.24), inset 0 18px 34px rgba(255,255,255,.18)" }} />
      </>
    );
  }

  if (themeName === "pressed-floral") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        <defs>
          <filter id="paper-soft-blur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <circle cx="82" cy="88" r="54" fill={accent2} opacity=".24" filter="url(#paper-soft-blur)" />
        <circle cx="314" cy="472" r="66" fill={accent} opacity=".14" filter="url(#paper-soft-blur)" />
        {[{ x: 68, y: 86, r: -18 }, { x: 320, y: 470, r: 22 }, { x: 336, y: 132, r: 12 }].map((flower, index) => (
          <g key={index} transform={`translate(${flower.x} ${flower.y}) rotate(${flower.r})`}>
            <path d="M0 0 C14 -20 18 -42 16 -66" fill="none" stroke={theme.line} strokeWidth="1.2" />
            <ellipse cx="-10" cy="-24" rx="10" ry="18" fill={accent} opacity=".16" />
            <ellipse cx="10" cy="-36" rx="11" ry="18" fill={accent2} opacity=".18" />
            <ellipse cx="-6" cy="-54" rx="8" ry="14" fill={accent} opacity=".14" />
            <ellipse cx="12" cy="-16" rx="9" ry="15" fill={accent2} opacity=".14" />
          </g>
        ))}
      </svg>
    );
  }

  if (themeName === "ledger") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "24px",
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0, transparent 31px, ${theme.line} 31px, ${theme.line} 32px)`,
            opacity: 0.95,
          }}
        />
        <div style={{ position: "absolute", top: "20px", bottom: "20px", left: "78px", width: "2px", background: "rgba(193,102,107,.24)" }} />
        <div style={{ position: "absolute", left: "112px", right: "42px", top: "52px", height: "30px", borderBottom: `1px dashed ${theme.line}`, color: theme.softText, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "8px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
          <span>Date</span>
          <span>Notes</span>
        </div>
      </>
    );
  }

  if (themeName === "marble") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={index}
            d={`M${-20 + index * 28} ${70 + index * 24} C ${90 + index * 6} ${18 + index * 28}, ${188 + index * 8} ${148 + index * 16}, ${360 + index * 4} ${76 + index * 46} S ${300 - index * 14} ${382 + index * 22}, ${420 - index * 8} ${522 + index * 10}`}
            fill="none"
            stroke={index % 2 === 0 ? theme.line : `${accent}33`}
            strokeWidth={index % 2 === 0 ? "1.1" : "1.6"}
            opacity={0.72 - index * 0.08}
          />
        ))}
        <path d="M18 162 C88 94 150 124 214 186 C274 246 324 260 386 224" fill="none" stroke={`${accent2}55`} strokeWidth="2" opacity=".7" />
        <path d="M20 386 C94 338 176 358 258 420 C306 456 346 460 388 438" fill="none" stroke={`${accent}44`} strokeWidth="1.6" opacity=".75" />
      </svg>
    );
  }

  if (themeName === "moonlit-vellum") {
    return (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <circle cx="306" cy="96" r="44" fill={accent2} opacity=".12" />
          <path d="M310 52 A48 48 0 1 0 310 148 A33 33 0 1 1 310 52 Z" fill={accent2} opacity=".5" />
          {Array.from({ length: 34 }, (_, index) => {
            const x = 20 + (index * 31) % 360;
            const y = 18 + (index * 47) % 210;
            const radius = 0.8 + (index % 4) * 0.5;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff" : accent2} opacity={0.18 + (index % 4) * 0.08} />;
          })}
          <path d="M46 478 C112 406 186 408 248 472 C288 514 326 522 360 510" fill="none" stroke={theme.line} strokeWidth="1.1" opacity=".52" />
        </svg>
        <div style={{ position: "absolute", inset: "20px", borderRadius: "24px", background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)" }} />
      </>
    );
  }

  if (themeName === "illumined-manuscript") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        <rect x="22" y="22" width="356" height="516" rx="22" fill="none" stroke={theme.line} strokeWidth="1.2" opacity=".65" />
        <rect x="34" y="34" width="332" height="492" rx="16" fill="none" stroke={`${accent}66`} strokeWidth="1.2" opacity=".52" />
        <path d="M94 96 Q200 26 306 96" fill="none" stroke={`${accent}88`} strokeWidth="1.6" opacity=".72" />
        <circle cx="200" cy="96" r="20" fill="none" stroke={theme.line} strokeWidth="1.1" opacity=".6" />
        {Array.from({ length: 12 }, (_, index) => (
          <path
            key={index}
            d="M200 58 C208 74 224 86 242 92 C224 98 208 110 200 126 C192 110 176 98 158 92 C176 86 192 74 200 58 Z"
            fill="none"
            stroke={theme.line}
            strokeWidth=".85"
            opacity=".48"
            transform={`rotate(${index * 30} 200 92)`}
          />
        ))}
        <path d="M70 452 C126 418 176 418 232 452 C270 474 308 480 340 470" fill="none" stroke={theme.line} strokeWidth="1" opacity=".44" />
        <path d="M60 160 C102 144 124 154 158 184" fill="none" stroke={`${accent2}88`} strokeWidth="1" opacity=".3" />
        <path d="M340 160 C298 144 276 154 242 184" fill="none" stroke={`${accent2}88`} strokeWidth="1" opacity=".3" />
      </svg>
    );
  }

  if (themeName === "watercolor-garden") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        <defs>
          <filter id="watercolorBlur">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <circle cx="96" cy="120" r="58" fill="#efb0a3" opacity=".22" filter="url(#watercolorBlur)" />
        <circle cx="312" cy="116" r="64" fill="#bfd7ed" opacity=".22" filter="url(#watercolorBlur)" />
        <circle cx="280" cy="436" r="72" fill="#c7dfb2" opacity=".18" filter="url(#watercolorBlur)" />
        <circle cx="120" cy="452" r="54" fill="#f3d8ae" opacity=".18" filter="url(#watercolorBlur)" />
        {[{ x: 58, y: 460, r: -18 }, { x: 330, y: 476, r: 18 }, { x: 342, y: 156, r: 12 }].map((sprig, index) => (
          <g key={index} transform={`translate(${sprig.x} ${sprig.y}) rotate(${sprig.r})`}>
            <path d="M0 0 C20 -28 38 -60 44 -102" fill="none" stroke={theme.line} strokeWidth="1.1" />
            <ellipse cx="18" cy="-28" rx="10" ry="20" fill={accent2} opacity=".18" />
            <ellipse cx="34" cy="-54" rx="9" ry="18" fill={accent} opacity=".15" />
            <ellipse cx="8" cy="-72" rx="8" ry="16" fill="#dcb0b0" opacity=".16" />
          </g>
        ))}
      </svg>
    );
  }

  if (themeName === "rosewater-letter") {
    return (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <defs>
            <filter id="rosewaterBlur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <circle cx="92" cy="108" r="56" fill={accent} opacity=".16" filter="url(#rosewaterBlur)" />
          <circle cx="316" cy="456" r="64" fill={accent2} opacity=".14" filter="url(#rosewaterBlur)" />
          <path d="M56 126 C92 72 132 52 186 46" fill="none" stroke={theme.line} strokeWidth="1.2" opacity=".58" />
          <path d="M344 432 C306 484 272 508 214 516" fill="none" stroke={theme.line} strokeWidth="1.2" opacity=".58" />
          {[{ x: 76, y: 98, r: -18 }, { x: 322, y: 458, r: 18 }, { x: 324, y: 136, r: 10 }].map((bloom, index) => (
            <g key={index} transform={`translate(${bloom.x} ${bloom.y}) rotate(${bloom.r})`}>
              <ellipse cx="-10" cy="-20" rx="11" ry="18" fill={accent} opacity=".16" />
              <ellipse cx="12" cy="-28" rx="10" ry="17" fill={accent2} opacity=".18" />
              <ellipse cx="-4" cy="-46" rx="9" ry="14" fill={accent} opacity=".14" />
              <ellipse cx="14" cy="-12" rx="8" ry="13" fill={accent2} opacity=".12" />
            </g>
          ))}
        </svg>
        <div style={{ position: "absolute", inset: "24px", borderRadius: "24px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.28), inset 0 18px 32px rgba(255,255,255,.18)" }} />
      </>
    );
  }

  if (themeName === "tea-stained-notebook") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: "18px",
            borderRadius: "24px",
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0, transparent 28px, ${theme.line} 28px, ${theme.line} 29px)`,
            opacity: 0.94,
          }}
        />
        <div style={{ position: "absolute", top: "18px", bottom: "18px", left: "74px", width: "2px", background: "rgba(180,92,84,.26)" }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <defs>
            <filter id="teaStainBlur">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          <circle cx="96" cy="114" r="52" fill={accent} opacity=".08" filter="url(#teaStainBlur)" />
          <circle cx="322" cy="420" r="60" fill={accent2} opacity=".08" filter="url(#teaStainBlur)" />
          {Array.from({ length: 11 }, (_, index) => (
            <circle key={index} cx={60 + index * 28} cy="32" r="5.5" fill="none" stroke={theme.line} strokeWidth=".9" opacity=".26" />
          ))}
          <path d="M42 66 Q200 36 358 66" fill="none" stroke={theme.line} strokeWidth="1" opacity=".28" />
        </svg>
      </>
    );
  }

  if (themeName === "celadon-silk") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,.12) 0, rgba(255,255,255,.12) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(120,144,128,.06) 0, rgba(120,144,128,.06) 1px, transparent 1px, transparent 8px)",
            opacity: 0.7,
          }}
        />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          {Array.from({ length: 6 }, (_, index) => (
            <path
              key={index}
              d={`M-20 ${84 + index * 76} C 90 ${36 + index * 52}, 210 ${142 + index * 36}, 420 ${94 + index * 58}`}
              fill="none"
              stroke={index % 2 === 0 ? theme.line : `${accent}33`}
              strokeWidth={index % 2 === 0 ? "1.1" : "1.6"}
              opacity={0.5 - index * 0.04}
            />
          ))}
          <path d="M44 100 C110 48 162 48 228 100 C286 144 330 146 358 126" fill="none" stroke={`${accent2}66`} strokeWidth="1.3" opacity=".58" />
        </svg>
        <div style={{ position: "absolute", inset: "20px", borderRadius: "26px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.24)" }} />
      </>
    );
  }

  if (themeName === "inkwash-rice-paper") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0, rgba(255,255,255,.05) 1px, transparent 1px, transparent 16px)",
            opacity: 0.5,
          }}
        />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <defs>
            <filter id="inkwashBlur">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          <ellipse cx="114" cy="118" rx="90" ry="48" fill="rgba(46,46,46,.12)" filter="url(#inkwashBlur)" />
          <ellipse cx="304" cy="394" rx="98" ry="56" fill="rgba(74,74,74,.1)" filter="url(#inkwashBlur)" />
          <path d="M64 128 C138 82 216 98 324 154" fill="none" stroke={theme.line} strokeWidth="1.2" opacity=".34" />
          <path d="M84 448 C170 402 254 414 340 474" fill="none" stroke={theme.line} strokeWidth="1.1" opacity=".32" />
          <rect x="302" y="80" width="42" height="66" rx="6" fill={`${accent}18`} stroke={`${accent}66`} strokeWidth="1" opacity=".62" />
          <rect x="316" y="94" width="14" height="38" fill="none" stroke={theme.line} strokeWidth=".9" opacity=".32" />
        </svg>
        <div style={{ position: "absolute", inset: "22px", borderRadius: "24px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.26)" }} />
      </>
    );
  }

  if (themeName === "pearl-engraving") {
    return (
      <>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 18%, rgba(255,255,255,.42) 0%, transparent 24%), radial-gradient(circle at 18% 70%, rgba(255,255,255,.24) 0%, transparent 20%)" }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <rect x="24" y="24" width="352" height="512" rx="22" fill="none" stroke={theme.line} strokeWidth="1.1" opacity=".52" />
          <rect x="38" y="38" width="324" height="484" rx="18" fill="none" stroke={`${accent}44`} strokeWidth="1" opacity=".42" />
          <path d="M86 92 Q200 42 314 92" fill="none" stroke={theme.line} strokeWidth="1.2" opacity=".46" />
          <path d="M86 468 Q200 518 314 468" fill="none" stroke={theme.line} strokeWidth="1.2" opacity=".46" />
          {Array.from({ length: 9 }, (_, index) => {
            const cx = 92 + (index % 3) * 108;
            const cy = 154 + Math.floor(index / 3) * 108;
            return (
              <g key={index} opacity=".26">
                <circle cx={cx} cy={cy} r="1.4" fill={theme.line} />
                {Array.from({ length: 8 }, (_, dot) => {
                  const angle = (dot * 45) * (Math.PI / 180);
                  return <circle key={dot} cx={cx + 12 * Math.cos(angle)} cy={cy + 12 * Math.sin(angle)} r="1" fill={theme.line} />;
                })}
              </g>
            );
          })}
        </svg>
      </>
    );
  }

  if (themeName === "indigo-constellation") {
    return (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <circle cx="300" cy="92" r="38" fill={accent2} opacity=".08" />
          {[
            "58 112 118 86 166 118 214 96",
            "254 138 292 118 336 146 362 118",
            "82 432 138 408 192 440 246 420 304 446",
          ].map((points, index) => (
            <polyline key={index} points={points} fill="none" stroke={theme.line} strokeWidth=".95" opacity=".48" />
          ))}
          {[
            [58, 112, 2.2],
            [118, 86, 2.4],
            [166, 118, 1.8],
            [214, 96, 2.1],
            [254, 138, 1.7],
            [292, 118, 2.3],
            [336, 146, 2],
            [362, 118, 1.8],
            [82, 432, 2.2],
            [138, 408, 1.9],
            [192, 440, 2.4],
            [246, 420, 2.1],
            [304, 446, 1.8],
          ].map(([x, y, r], index) => (
            <circle key={index} cx={x} cy={y} r={r} fill={index % 3 === 0 ? "#ffffff" : accent2} opacity={0.64} />
          ))}
          {Array.from({ length: 42 }, (_, index) => {
            const x = 24 + (index * 37) % 352;
            const y = 24 + (index * 61) % 212;
            const radius = 0.7 + (index % 4) * 0.45;
            return <circle key={`star-${index}`} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff" : accent2} opacity={0.18 + (index % 4) * 0.08} />;
          })}
          <path d="M64 476 C136 430 216 432 332 494" fill="none" stroke={theme.line} strokeWidth="1" opacity=".3" />
        </svg>
        <div style={{ position: "absolute", inset: "20px", borderRadius: "24px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05), inset 0 24px 44px rgba(255,255,255,.02)" }} />
      </>
    );
  }

  if (themeName === "mosaic-border") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        <rect x="22" y="22" width="356" height="516" rx="22" fill="none" stroke={theme.line} strokeWidth=".9" opacity=".48" />
        {[
          { x: 48, y: 48, w: 304, h: 26 },
          { x: 48, y: 486, w: 304, h: 26 },
          { x: 48, y: 84, w: 26, h: 392 },
          { x: 326, y: 84, w: 26, h: 392 },
        ].map((band, bandIndex) => (
          <g key={bandIndex}>
            {Array.from({ length: band.w > band.h ? 14 : 18 }, (_, i) => {
              const unit = band.w > band.h ? band.w / 14 : band.h / 18;
              const cx = band.w > band.h ? band.x + unit * i + unit / 2 : band.x + band.w / 2;
              const cy = band.w > band.h ? band.y + band.h / 2 : band.y + unit * i + unit / 2;
              const size = band.w > band.h ? band.h * 0.34 : band.w * 0.34;
              return (
                <polygon
                  key={i}
                  points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
                  fill="none"
                  stroke={i % 2 === 0 ? `${accent}88` : theme.line}
                  strokeWidth=".9"
                  opacity=".6"
                />
              );
            })}
          </g>
        ))}
      </svg>
    );
  }

  if (themeName === "palace-embossed") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => {
            const cx = 64 + col * 90;
            const cy = 92 + row * 72;
            return (
              <g key={`${row}-${col}`} opacity=".24">
                <circle cx={cx} cy={cy} r="22" fill="none" stroke={theme.line} strokeWidth=".9" />
                <path d={`M${cx - 22} ${cy} Q${cx} ${cy - 22} ${cx + 22} ${cy}`} fill="none" stroke={theme.line} strokeWidth=".9" />
                <path d={`M${cx - 22} ${cy} Q${cx} ${cy + 22} ${cx + 22} ${cy}`} fill="none" stroke={theme.line} strokeWidth=".9" />
              </g>
            );
          }),
        )}
        <rect x="26" y="26" width="348" height="508" rx="20" fill="none" stroke={theme.line} strokeWidth="1" opacity=".44" />
      </svg>
    );
  }

  if (themeName === "starlit-manuscript") {
    return (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
          <path d="M318 56 A42 42 0 1 0 318 140 A28 28 0 1 1 318 56 Z" fill={accent2} opacity=".54" />
          {Array.from({ length: 46 }, (_, index) => {
            const x = 20 + (index * 37) % 360;
            const y = 22 + (index * 53) % 222;
            const radius = 0.7 + (index % 4) * 0.55;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 7 === 0 ? "#fff" : accent2} opacity={0.18 + (index % 4) * 0.08} />;
          })}
          <rect x="26" y="26" width="348" height="508" rx="20" fill="none" stroke={theme.line} strokeWidth="1" opacity=".46" />
          <path d="M70 118 Q200 48 330 118" fill="none" stroke={`${accent}88`} strokeWidth="1.2" opacity=".5" />
        </svg>
        <div style={{ position: "absolute", inset: "18px", borderRadius: "24px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05), inset 0 18px 34px rgba(255,255,255,.02)" }} />
      </>
    );
  }

  if (themeName === "parchment") {
    return (
      <>
        <div style={{ position: "absolute", left: "48px", top: "28px", bottom: "28px", width: "1px", background: theme.line, opacity: 0.35 }} />
        <div style={{ position: "absolute", left: "50%", top: "28px", bottom: "28px", width: "1px", background: theme.line, opacity: 0.22 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 12% 20%, rgba(255,255,255,.22) 0%, transparent 26%), radial-gradient(circle at 84% 78%, rgba(161,104,29,.08) 0%, transparent 24%)" }} />
      </>
    );
  }

  return null;
}

function PaperDecorationLayer({
  decoration,
  color,
  line,
}: {
  decoration: PaperDecoration;
  color: string;
  line: string;
}) {
  if (decoration === "minimal") {
    return (
      <>
        <div style={{ position: "absolute", inset: "24px", border: `1px solid ${line}`, borderRadius: "22px" }} />
        <div style={{ position: "absolute", inset: "38px", border: `1px solid ${line}`, borderRadius: "16px", opacity: 0.72 }} />
      </>
    );
  }

  if (decoration === "none") {
    return null;
  }

  if (decoration === "ornate") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        {/* Corner ornaments */}
        {[
          { x: 30, y: 30, r: 0 },
          { x: 370, y: 30, r: 90 },
          { x: 370, y: 530, r: 180 },
          { x: 30, y: 530, r: 270 },
        ].map((corner, i) => (
          <g key={i} transform={`translate(${corner.x} ${corner.y}) rotate(${corner.r})`}>
            <path d="M0 0 C0 28 0 56 0 84" fill="none" stroke={line} strokeWidth="1.2" opacity=".6" />
            <path d="M0 0 C28 0 56 0 84 0" fill="none" stroke={line} strokeWidth="1.2" opacity=".6" />
            <path d="M0 0 C12 12 24 24 36 36" fill="none" stroke={color} strokeWidth="1" opacity=".4" />
            <circle cx="0" cy="0" r="4" fill={color} opacity=".3" />
          </g>
        ))}
        {/* Center diamond */}
        <path d="M200 240 L220 260 L200 280 L180 260 Z" fill="none" stroke={line} strokeWidth="1" opacity=".4" />
      </svg>
    );
  }

  if (decoration === "geometric") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        {/* Hexagonal pattern in corners */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const cx = 80 + (i % 3) * 120;
          const cy = 80 + Math.floor(i / 3) * 400;
          return (
            <g key={i}>
              <polygon
                points={Array.from({ length: 6 }, (_, j) => {
                  const angle = (j * 60 - 30) * (Math.PI / 180);
                  return `${cx + 28 * Math.cos(angle)},${cy + 28 * Math.sin(angle)}`;
                }).join(" ")}
                fill="none"
                stroke={line}
                strokeWidth="1"
                opacity=".45"
              />
              <polygon
                points={Array.from({ length: 6 }, (_, j) => {
                  const angle = (j * 60 - 30) * (Math.PI / 180);
                  return `${cx + 18 * Math.cos(angle)},${cy + 18 * Math.sin(angle)}`;
                }).join(" ")}
                fill={color}
                opacity=".08"
              />
            </g>
          );
        })}
        <rect x="28" y="28" width="344" height="504" rx="18" fill="none" stroke={line} strokeWidth=".8" opacity=".35" />
      </svg>
    );
  }

  if (decoration === "islamic-arch") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        {/* Top arch */}
        <path d="M120 20 Q120 80 200 80 Q280 80 280 20" fill="none" stroke={line} strokeWidth="1.4" opacity=".5" />
        <path d="M140 20 Q140 65 200 65 Q260 65 260 20" fill="none" stroke={color} strokeWidth="1" opacity=".25" />
        {/* Side pillars */}
        <line x1="120" y1="20" x2="120" y2="80" stroke={line} strokeWidth="1" opacity=".35" />
        <line x1="280" y1="20" x2="280" y2="80" stroke={line} strokeWidth="1" opacity=".35" />
        {/* Bottom arch (inverted) */}
        <path d="M120 540 Q120 480 200 480 Q280 480 280 540" fill="none" stroke={line} strokeWidth="1.4" opacity=".5" />
        <path d="M140 540 Q140 495 200 495 Q260 495 260 540" fill="none" stroke={color} strokeWidth="1" opacity=".25" />
        {/* Star at top center */}
        <polygon
          points="200,30 204,42 216,42 206,50 210,62 200,54 190,62 194,50 184,42 196,42"
          fill={color}
          opacity=".3"
        />
      </svg>
    );
  }

  if (decoration === "lined") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: "26px",
            borderRadius: "22px",
            border: `1px solid ${line}`,
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0, transparent 30px, ${line} 30px, ${line} 31px)`,
            opacity: 0.9,
          }}
        />
        <div style={{ position: "absolute", top: "26px", bottom: "26px", left: "62px", width: "1px", background: line }} />
      </>
    );
  }

  if (decoration === "botanical") {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
        <defs>
          <filter id="paper-bloom-blur">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>
        <path d="M54 124 C82 74 112 54 164 48" fill="none" stroke={line} strokeWidth="1.4" />
        <path d="M338 432 C304 476 272 494 220 504" fill="none" stroke={line} strokeWidth="1.4" />
        {[["92", "90"], ["124", "72"], ["148", "60"], ["284", "498"], ["258", "512"], ["230", "520"]].map(([x, y], index) => (
          <g key={`${x}-${y}-${index}`} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="0" rx="10" ry="18" fill={color} opacity=".18" filter="url(#paper-bloom-blur)" />
            <ellipse cx="0" cy="0" rx="7" ry="12" fill="none" stroke={line} strokeWidth="1" />
          </g>
        ))}
        <circle cx="72" cy="96" r="26" fill="none" stroke={line} strokeWidth="1.1" opacity=".85" />
        <circle cx="318" cy="466" r="24" fill="none" stroke={line} strokeWidth="1.1" opacity=".85" />
      </svg>
    );
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
      <circle cx="110" cy="126" r="88" fill="none" stroke={line} strokeWidth="1.2" opacity=".65" />
      <circle cx="110" cy="126" r="62" fill="none" stroke={line} strokeWidth=".9" opacity=".58" />
      {Array.from({ length: 12 }, (_, index) => (
        <path
          key={index}
          d="M110 38 C122 72 146 94 182 104 C146 114 122 138 110 172 C98 138 74 114 38 104 C74 94 98 72 110 38 Z"
          fill="none"
          stroke={line}
          strokeWidth=".9"
          opacity=".52"
          transform={`rotate(${index * 30} 110 104)`}
        />
      ))}
      <circle cx="302" cy="446" r="76" fill="none" stroke={line} strokeWidth="1" opacity=".5" />
      <path d="M302 388 C334 412 352 434 356 470 C332 454 306 448 272 452 C284 430 292 410 302 388 Z" fill="none" stroke={line} strokeWidth="1" opacity=".48" />
    </svg>
  );
}

function PaymentPanel({
  customization,
  theme,
  template,
  interactive,
}: {
  customization: CardCustomization;
  theme: ThemeStyles;
  template: CardTemplate;
  interactive: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  if (!customization.paymentMethod || !customization.paymentNumber) {
    return null;
  }

  const label = getPaymentMethodLabel(customization.paymentMethod);
  const qrValue = buildPaymentQrValue(customization.paymentMethod, customization.paymentNumber);
  const maskedValue = maskPaymentValue(customization.paymentNumber);

  return (
    <div
      style={{
        marginTop: "24px",
        borderRadius: "22px",
        border: `1px solid ${theme.border}`,
        background: theme.panel,
        padding: "16px 18px",
        boxShadow: `0 18px 44px ${template.glow}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: `${template.accent}20`,
            color: theme.text,
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          }}
        >
          {label} Eidi
        </div>
        <div style={{ color: theme.softText, fontSize: "11px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
          {customization.showQR ? "Ready to scan" : "Protected until reveal"}
        </div>
      </div>

      {customization.showQR ? (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "8px", borderRadius: "14px", background: "#fff" }}>
            <QRCodeSVG value={qrValue} size={86} level="M" bgColor="#ffffff" fgColor="#000000" />
          </div>
          <div style={{ flex: 1, color: theme.softText }}>
            <div style={{ fontSize: "14px", fontFamily: "var(--font-playfair), 'Playfair Display', serif", color: theme.text }}>
              Send your Eidi instantly
            </div>
            <div style={{ marginTop: "6px", fontSize: "12px", lineHeight: 1.6, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
              Scan this code to open the saved payment detail for {label.toLowerCase()}.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "18px", border: `1px solid ${theme.line}` }}>
          <div
            style={{
              padding: "18px 16px",
              filter: revealed ? "none" : "blur(8px)",
              transition: "filter .2s ease",
              background: "rgba(255,255,255,.12)",
            }}
          >
            <div style={{ fontSize: "12px", color: theme.softText, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", marginBottom: "4px" }}>
              Saved payment detail
            </div>
            <div style={{ fontSize: "22px", color: theme.text, fontFamily: "var(--font-libre), 'Libre Baskerville', serif", letterSpacing: "1px" }}>
              {revealed ? customization.paymentNumber : maskedValue}
            </div>
          </div>

          {!revealed && (
            <button
              onClick={() => interactive && setRevealed(true)}
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: "rgba(10,12,16,.18)",
                border: "none",
                cursor: interactive ? "pointer" : "default",
                color: theme.text,
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              <span
                style={{
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: `1px solid ${theme.border}`,
                  background: theme.panel,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {customization.paymentRevealLabel || "Tap to reveal Eidi"}
              </span>
            </button>
          )}

          {revealed && interactive && (
            <button
              onClick={() => setRevealed(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                borderRadius: "999px",
                border: `1px solid ${theme.border}`,
                background: theme.panel,
                color: theme.text,
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "6px 10px",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              Hide
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PaperBorderLayer({
  borderStyle,
  color,
  accent,
  isExport,
}: {
  borderStyle: PaperBorderStyle;
  color: string;
  accent: string;
  isExport: boolean;
}) {
  const inset = isExport ? "48px" : "24px";
  const radius = isExport ? "28px" : "20px";

  if (borderStyle === "none") return null;

  if (borderStyle === "double") {
    return (
      <>
        <div style={{ position: "absolute", inset, borderRadius: radius, border: `1px solid ${color}`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: isExport ? "54px" : "28px", borderRadius: isExport ? "24px" : "16px", border: `1px solid ${color}`, pointerEvents: "none", opacity: 0.5 }} />
      </>
    );
  }

  if (borderStyle === "golden") {
    return (
      <div
        style={{
          position: "absolute",
          inset,
          borderRadius: radius,
          border: `2px solid ${accent}`,
          boxShadow: `inset 0 0 12px ${accent}22, 0 0 12px ${accent}15`,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (borderStyle === "dotted") {
    return (
      <div
        style={{
          position: "absolute",
          inset,
          borderRadius: radius,
          border: `2px dotted ${color}`,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
    );
  }

  // classic (default)
  return (
    <div style={{ position: "absolute", inset, borderRadius: radius, border: `1px solid ${color}`, pointerEvents: "none" }} />
  );
}

export default function InsidePaperCanvas({
  template,
  customization,
  size = "preview",
  interactive = true,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  size?: "preview" | "export";
  interactive?: boolean;
}) {
  const isExport = size === "export";
  const theme = THEME_STYLES[customization.paperTheme];
  const fonts = FONT_FAMILIES[customization.paperFont];
  const textAlign = customization.paperAlignment;

  // Apply overrides
  const effectivePaper = customization.paperBgOverride ?? theme.paper;
  const textColor = customization.paperTextColor ?? theme.text;
  const softTextColor = customization.paperTextColor
    ? `${customization.paperTextColor}bb`
    : theme.softText;
  const lineColor = customization.paperTextColor
    ? `${customization.paperTextColor}22`
    : theme.line;
  const borderColor = customization.paperTextColor
    ? `${customization.paperTextColor}44`
    : theme.border;
  const sealColor = customization.paperSealColor ?? template.accent;
  const sealColor2 = customization.paperSealColor
    ? `${customization.paperSealColor}cc`
    : template.accent2;
  const sealLetter = customization.paperSealLetter || "E";

  // Font size multipliers
  const headingScale = customization.paperHeadingSize / 100;
  const bodyScale = customization.paperBodySize / 100;
  const lineSpacingScale = customization.paperLineSpacing / 100;
  const decoOpacity = customization.paperOpacity / 100;

  const baseHeadingSize = isExport ? 72 : customization.paperFont === "modern" ? 28 : 34;
  const baseBodySize = isExport ? 27 : customization.paperFont === "modern" ? 14 : 16;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        height: isExport ? "100%" : undefined,
        aspectRatio: isExport ? undefined : "8.5 / 11",
        borderRadius: isExport ? 0 : "24px",
        background: effectivePaper,
        boxShadow: isExport ? "none" : "0 34px 80px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.06)",
      }}
    >
      {/* Wash overlay - only when using theme (not custom bg) */}
      {!customization.paperBgOverride && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 18% 12%, ${theme.wash} 0%, transparent 26%), radial-gradient(circle at 82% 22%, ${theme.wash} 0%, transparent 20%), radial-gradient(circle at 50% 82%, ${theme.wash} 0%, transparent 24%)`,
          }}
        />
      )}

      {/* Theme background layer - only when using theme */}
      {!customization.paperBgOverride && (
        <PaperBackgroundLayer themeName={customization.paperTheme} theme={theme} accent={template.accent} accent2={template.accent2} />
      )}

      {/* Decoration layer */}
      <div style={{ opacity: decoOpacity }}>
        <PaperDecorationLayer decoration={customization.paperDecoration} color={template.accent} line={lineColor} />
      </div>

      {/* Border */}
      <PaperBorderLayer
        borderStyle={customization.paperBorderStyle}
        color={borderColor}
        accent={template.accent}
        isExport={isExport}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: isExport ? "86px 94px 92px" : "40px 38px 34px",
          color: textColor,
        }}
      >
        {/* Header bar */}
        {customization.paperShowHeader && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: isExport ? "28px" : "18px",
              color: softTextColor,
            }}
          >
            <div
              style={{
                fontSize: isExport ? "13px" : "10px",
                letterSpacing: isExport ? "4px" : "3px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              Inside Note
            </div>
            <div
              style={{
                width: isExport ? "110px" : "68px",
                height: "1px",
                background: lineColor,
                flexShrink: 0,
              }}
            />
            <div
              style={{
                fontSize: isExport ? "13px" : "10px",
                letterSpacing: isExport ? "4px" : "3px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              {customization.year}
            </div>
          </div>
        )}

        <div style={{ textAlign }}>
          {customization.recipientName && (
            <div
              style={{
                fontSize: isExport ? "18px" : "12px",
                letterSpacing: isExport ? "3px" : "2px",
                textTransform: "uppercase",
                color: softTextColor,
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                marginBottom: isExport ? "20px" : "12px",
              }}
            >
              For {customization.recipientName}
            </div>
          )}

          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: `${baseHeadingSize * headingScale}px`,
              color: textColor,
              lineHeight: 0.95,
              marginBottom: isExport ? "24px" : "16px",
              fontStyle: customization.paperFont === "modern" ? "normal" : "italic",
              textShadow: `0 10px 30px ${template.glow}`,
            }}
          >
            {customization.paperTitle}
          </div>
        </div>

        <div
          style={{
            width: textAlign === "center" ? "120px" : "92px",
            height: "1px",
            background: lineColor,
            marginBottom: isExport ? "28px" : "18px",
            alignSelf: textAlign === "right" ? "flex-end" : textAlign === "center" ? "center" : "flex-start",
          }}
        />

        <div
          style={{
            flex: 1,
            textAlign,
            fontFamily: fonts.body,
            fontSize: `${baseBodySize * bodyScale}px`,
            lineHeight: 1.8 * lineSpacingScale,
            color: softTextColor,
            whiteSpace: "pre-wrap",
          }}
        >
          {customization.paperMessage}
        </div>

        <div
          style={{
            marginTop: isExport ? "32px" : "18px",
            textAlign,
          }}
        >
          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: isExport ? "30px" : "18px",
              color: textColor,
              fontStyle: customization.paperFont === "modern" ? "normal" : "italic",
            }}
          >
            {customization.paperClosing}
          </div>
          <div
            style={{
              marginTop: isExport ? "12px" : "6px",
              fontSize: isExport ? "20px" : "12px",
              color: softTextColor,
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              letterSpacing: "1px",
            }}
          >
            {customization.senderName || "Your name"}
          </div>
        </div>

        <PaymentPanel
          key={`${customization.paymentMethod ?? "none"}|${customization.paymentNumber}|${customization.showQR ? "qr" : "masked"}|${customization.paymentRevealLabel}`}
          customization={customization}
          theme={theme}
          template={template}
          interactive={interactive}
        />
      </div>

      {customization.paperShowSeal && (
        <div
          style={{
            position: "absolute",
            bottom: isExport ? "42px" : "22px",
            right: isExport ? "44px" : "22px",
            width: isExport ? "86px" : "52px",
            height: isExport ? "86px" : "52px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, ${sealColor2}, ${sealColor} 65%, rgba(90,35,10,.95) 100%)`,
            boxShadow: `0 12px 30px ${template.glow}`,
            display: "grid",
            placeItems: "center",
            color: "#fff8e8",
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: isExport ? "24px" : "14px",
            transform: "rotate(-12deg)",
            zIndex: 3,
          }}
        >
          <span style={{ transform: "translateY(-1px)" }}>{sealLetter}</span>
        </div>
      )}
    </div>
  );
}
