"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { CardTemplate, CardCustomization, GreetingFont, PositionOffset } from "@/types/editor";
import { DEFAULT_EDITOR_OVERRIDES, isOpeningNoteTemplate } from "@/types/editor";
import { FONT_OPTIONS } from "@/data/fontOptions";
import { StarsLayer, GlowLayer, OrnamentFrame } from "@/components/cards/artwork/Layers";
import { CardArtwork } from "@/components/cards/artwork/CardArtwork";
import { buildPaymentQrValue, getPaymentMethodLabel } from "@/components/editor/paymentUtils";

type FontSet = {
  italiana: string;
  amiri: string;
  cormorant: string;
  dmSans: string;
  playfair: string;
  libre: string;
};

type OverlayProps = {
  template: CardTemplate;
  customization: CardCustomization;
  greetingLines: string[];
  isExport: boolean;
  textColor: string;
  fonts: FontSet;
  greetingFontFamily?: string | null;
};

function buildQRValue(customization: CardCustomization): string {
  return buildPaymentQrValue(customization.paymentMethod, customization.paymentNumber);
}

function ClassicOverlay({
  template,
  customization,
  greetingLines,
  isExport,
  textColor,
  fonts,
  greetingFontFamily,
}: OverlayProps) {
  return (
    <div
      className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center"
      style={{ padding: isExport ? "80px 60px" : "clamp(20px, 4vw, 40px)" }}
    >
      {customization.recipientName && (
        <div
          className="mb-3 opacity-80"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "22px" : "clamp(10px, 1.5vw, 14px)",
            color: textColor,
            letterSpacing: "2px",
          }}
        >
          {customization.recipientName}
        </div>
      )}

      <div
        className="uppercase mb-3 opacity-60"
        style={{
          color: textColor,
          fontSize: isExport ? "16px" : "clamp(7px, 1vw, 10px)",
          letterSpacing: isExport ? "5px" : "4px",
        }}
      >
        {template.subtitle}
      </div>

      <div
        className="leading-[.88] mb-2"
        style={{
          fontFamily: greetingFontFamily || fonts.italiana,
          fontSize: isExport ? "84px" : "clamp(32px, 5vw, 52px)",
          color: textColor,
          textShadow: `0 0 60px ${template.glow}`,
        }}
      >
        {greetingLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < greetingLines.length - 1 && <br />}
          </span>
        ))}
      </div>

      <div
        className="mb-3 opacity-70"
        style={{
          fontFamily: fonts.amiri,
          fontSize: isExport ? "36px" : "clamp(14px, 2.5vw, 22px)",
          direction: "rtl",
          color: textColor,
        }}
      >
        {customization.greetingAr}
      </div>

      <div className="opacity-30 mb-2" style={{ width: isExport ? "60px" : "32px", height: "1px", background: template.accent }} />

      {customization.personalMessage && (
        <div
          className="mb-3 max-w-[80%] opacity-60"
          style={{
            fontFamily: fonts.cormorant,
            fontSize: isExport ? "20px" : "clamp(9px, 1.2vw, 13px)",
            color: textColor,
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          {customization.personalMessage}
        </div>
      )}

      <div
        className="uppercase italic opacity-30"
        style={{
          fontFamily: fonts.cormorant,
          fontSize: isExport ? "14px" : "clamp(7px, 1vw, 9px)",
          letterSpacing: "3px",
          color: textColor,
        }}
      >
        {customization.year}
      </div>

      {customization.senderName && (
        <div
          className="mt-4 opacity-50"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "16px" : "clamp(8px, 1.2vw, 12px)",
            color: textColor,
            letterSpacing: "1px",
          }}
        >
          - {customization.senderName}
        </div>
      )}
    </div>
  );
}

function CrescentBloomOverlay({
  template,
  customization,
  greetingLines,
  isExport,
  textColor,
  fonts,
  greetingFontFamily,
}: OverlayProps) {
  const detailLine = customization.personalMessage || template.subtitle;

  return (
    <div
      className="absolute inset-0 z-[5] flex items-start justify-end text-right"
      style={{ padding: isExport ? "112px 78px 80px 56px" : "38px 28px 28px 24px" }}
    >
      <div style={{ width: isExport ? "380px" : "52%" }}>
        {customization.recipientName && (
          <div
            className="mb-4 uppercase opacity-70"
            style={{
              fontFamily: fonts.dmSans,
              fontSize: isExport ? "16px" : "clamp(8px, 1vw, 10px)",
              letterSpacing: isExport ? "4px" : "2.5px",
              color: textColor,
            }}
          >
            {customization.recipientName}
          </div>
        )}

        {customization.greetingAr && (
          <div
            className="mb-2 opacity-65"
            style={{
              fontFamily: fonts.amiri,
              fontSize: isExport ? "24px" : "clamp(11px, 1.6vw, 16px)",
              color: textColor,
              direction: "rtl",
            }}
          >
            {customization.greetingAr}
          </div>
        )}

        <div
          className="leading-[.8]"
          style={{
            fontFamily: greetingFontFamily || fonts.cormorant,
            fontSize: isExport ? "102px" : "clamp(46px, 8vw, 68px)",
            color: textColor,
            textShadow: `0 0 44px ${template.glow}`,
            fontStyle: "italic",
            transform: "rotate(-4deg)",
            transformOrigin: "right center",
          }}
        >
          {greetingLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < greetingLines.length - 1 && <br />}
            </span>
          ))}
        </div>

        <div className="mt-5 mb-3 flex justify-end">
          <div style={{ width: isExport ? "120px" : "52px", height: "1px", background: textColor, opacity: 0.28 }} />
        </div>

        <div
          className="opacity-70"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "18px" : "clamp(9px, 1.2vw, 12px)",
            color: textColor,
            lineHeight: 1.7,
          }}
        >
          {detailLine}
        </div>

        {customization.senderName && (
          <div
            className="mt-3 opacity-86"
            style={{
              fontFamily: fonts.playfair,
              fontSize: isExport ? "24px" : "clamp(12px, 1.8vw, 18px)",
              color: textColor,
              fontStyle: "italic",
            }}
          >
            from {customization.senderName}
          </div>
        )}

        <div
          className="mt-5 uppercase opacity-45"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "11px" : "clamp(7px, .9vw, 9px)",
            color: textColor,
            letterSpacing: isExport ? "4px" : "2px",
          }}
        >
          {customization.year}
        </div>
      </div>
    </div>
  );
}

function RoyalSplitOverlay({
  template,
  customization,
  greetingLines,
  isExport,
  textColor,
  fonts,
  greetingFontFamily,
}: OverlayProps) {
  const message = customization.personalMessage || "Best Wishes";

  return (
    <div
      className="absolute inset-0 z-[5] flex items-center justify-end text-right"
      style={{ padding: isExport ? "74px 58px 68px 230px" : "28px 22px 24px 46%" }}
    >
      <div style={{ width: isExport ? "360px" : "100%" }}>
        {customization.recipientName && (
          <div
            className="mb-5 uppercase opacity-70"
            style={{
              fontFamily: fonts.dmSans,
              fontSize: isExport ? "15px" : "clamp(8px, 1vw, 10px)",
              letterSpacing: isExport ? "4px" : "2.5px",
              color: textColor,
            }}
          >
            For {customization.recipientName}
          </div>
        )}

        <div
          className="leading-[.9]"
          style={{
            fontFamily: greetingFontFamily || fonts.dmSans,
            fontSize: isExport ? "86px" : "clamp(34px, 5.6vw, 52px)",
            color: textColor,
            fontWeight: 600,
            textShadow: `0 0 36px ${template.glow}`,
          }}
        >
          {greetingLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < greetingLines.length - 1 && <br />}
            </span>
          ))}
        </div>

        <div
          className="mt-7 opacity-85"
          style={{
            fontFamily: fonts.playfair,
            fontSize: isExport ? "26px" : "clamp(14px, 2vw, 22px)",
            color: textColor,
            fontStyle: "italic",
          }}
        >
          {message}
        </div>

        {customization.senderName && (
          <div
            className="mt-2"
            style={{
              fontFamily: fonts.cormorant,
              fontSize: isExport ? "48px" : "clamp(24px, 3.6vw, 34px)",
              color: textColor,
              fontStyle: "italic",
            }}
          >
            {customization.senderName}
          </div>
        )}

        <div
          className="mt-5 uppercase opacity-45"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "11px" : "clamp(7px, .9vw, 9px)",
            color: textColor,
            letterSpacing: isExport ? "4px" : "2px",
          }}
        >
          {customization.year}
        </div>
      </div>
    </div>
  );
}

function SkylineBottomOverlay({
  template,
  customization,
  greetingLines,
  isExport,
  textColor,
  fonts,
  greetingFontFamily,
}: OverlayProps) {
  return (
    <div
      className="absolute inset-0 z-[5] flex flex-col items-center justify-end text-center"
      style={{ padding: isExport ? "80px 70px 110px" : "28px 24px 42px" }}
    >
      {customization.recipientName && (
        <div
          className="mb-4 uppercase opacity-70"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "14px" : "clamp(8px, 1vw, 10px)",
            letterSpacing: isExport ? "4px" : "2.5px",
            color: textColor,
          }}
        >
          {customization.recipientName}
        </div>
      )}

      <div
        className="leading-[.86]"
        style={{
          fontFamily: greetingFontFamily || fonts.italiana,
          fontSize: isExport ? "84px" : "clamp(34px, 5.4vw, 50px)",
          color: textColor,
          textShadow: `0 0 42px ${template.glow}`,
        }}
      >
        {greetingLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < greetingLines.length - 1 && <br />}
          </span>
        ))}
      </div>

      <div
        className="mt-2 opacity-80"
        style={{
          fontFamily: fonts.amiri,
          fontSize: isExport ? "34px" : "clamp(14px, 2.2vw, 20px)",
          color: textColor,
          direction: "rtl",
        }}
      >
        {customization.greetingAr}
      </div>

      {customization.personalMessage && (
        <div
          className="mt-4 max-w-[78%] opacity-72"
          style={{
            fontFamily: fonts.libre,
            fontSize: isExport ? "18px" : "clamp(9px, 1.2vw, 12px)",
            color: textColor,
            lineHeight: 1.7,
          }}
        >
          {customization.personalMessage}
        </div>
      )}

      {(customization.senderName || customization.year) && (
        <div
          className="mt-5 uppercase opacity-46"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "11px" : "clamp(7px, .9vw, 9px)",
            color: textColor,
            letterSpacing: isExport ? "4px" : "2px",
          }}
        >
          {[customization.senderName, customization.year].filter(Boolean).join(" | ")}
        </div>
      )}
    </div>
  );
}

function CalligraphyStackOverlay({
  template,
  customization,
  greetingLines,
  isExport,
  textColor,
  fonts,
  greetingFontFamily,
}: OverlayProps) {
  return (
    <div
      className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center"
      style={{ padding: isExport ? "92px 62px 84px" : "32px 22px 30px" }}
    >
      {customization.recipientName && (
        <div
          className="mb-4 uppercase opacity-68"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "14px" : "clamp(8px, 1vw, 10px)",
            letterSpacing: isExport ? "4px" : "2.5px",
            color: textColor,
          }}
        >
          {customization.recipientName}
        </div>
      )}

      <div
        className="leading-[.9]"
        style={{
          fontFamily: fonts.amiri,
          fontSize: isExport ? "88px" : "clamp(38px, 6.4vw, 60px)",
          color: textColor,
          direction: "rtl",
          textShadow: `0 0 42px ${template.glow}`,
        }}
      >
        {customization.greetingAr}
      </div>

      <div
        className="mt-5 leading-[.92]"
        style={{
          fontFamily: greetingFontFamily || fonts.playfair,
          fontSize: isExport ? "58px" : "clamp(24px, 4vw, 38px)",
          color: textColor,
          textShadow: `0 0 28px ${template.glow}`,
        }}
      >
        {greetingLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < greetingLines.length - 1 && <br />}
          </span>
        ))}
      </div>

      <div className="mt-4 mb-3" style={{ width: isExport ? "110px" : "48px", height: "1px", background: textColor, opacity: 0.28 }} />

      <div
        className="opacity-68"
        style={{
          fontFamily: fonts.cormorant,
          fontSize: isExport ? "19px" : "clamp(10px, 1.3vw, 14px)",
          color: textColor,
          fontStyle: "italic",
        }}
      >
        {customization.personalMessage || template.subtitle}
      </div>

      {(customization.senderName || customization.year) && (
        <div
          className="mt-5 uppercase opacity-46"
          style={{
            fontFamily: fonts.dmSans,
            fontSize: isExport ? "11px" : "clamp(7px, .9vw, 9px)",
            color: textColor,
            letterSpacing: isExport ? "4px" : "2px",
          }}
        >
          {[customization.senderName, customization.year].filter(Boolean).join(" | ")}
        </div>
      )}
    </div>
  );
}

function CrescentEmblemOverlay({
  template,
  customization,
  isExport,
  textColor,
  fonts,
  greetingFontFamily,
}: OverlayProps) {
  const greetingWords = (customization.greeting || "Eid Mubarak")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const primaryWord = greetingWords[0] ?? "Eid";
  const secondaryWords = greetingWords.slice(1).join(" ") || "Mubarak";
  const detailLine = customization.personalMessage || (customization.senderName ? `from ${customization.senderName}` : "");

  return (
    <div className="absolute inset-0 z-[5]">
      <div
        className="absolute text-center"
        style={{
          left: "58.5%",
          top: "55.5%",
          transform: "translate(-50%, -50%)",
          width: isExport ? "312px" : "32%",
          color: textColor,
        }}
      >
        {customization.recipientName && (
          <div
            className="mb-2 uppercase opacity-55"
            style={{
              fontFamily: fonts.dmSans,
              fontSize: isExport ? "13px" : "clamp(7px, .9vw, 9px)",
              letterSpacing: isExport ? "4px" : "2px",
            }}
          >
            {customization.recipientName}
          </div>
        )}

        <div
          style={{
            fontFamily: greetingFontFamily || fonts.cormorant,
            fontSize: isExport ? "94px" : "clamp(36px, 6vw, 52px)",
            fontStyle: "italic",
            lineHeight: 0.78,
            color: textColor,
            textShadow: `0 10px 30px ${template.glow}`,
          }}
        >
          {primaryWord}
        </div>

        <div
          className="mt-1"
          style={{
            fontFamily: fonts.playfair,
            fontSize: isExport ? "18px" : "clamp(9px, 1.5vw, 13px)",
            fontWeight: 600,
            letterSpacing: isExport ? "6px" : "3px",
            color: textColor,
          }}
        >
          {secondaryWords}
        </div>

        {detailLine && (
          <div
            className="mt-3 opacity-62"
            style={{
              fontFamily: fonts.libre,
              fontSize: isExport ? "14px" : "clamp(8px, 1vw, 10px)",
              lineHeight: 1.5,
              color: textColor,
            }}
          >
            {detailLine}
          </div>
        )}
      </div>
    </div>
  );
}

function CoverTextLayer({
  children,
  offset,
  interactive,
  onOffsetChange,
  isExport,
}: {
  children: ReactNode;
  offset: PositionOffset;
  interactive: boolean;
  onOffsetChange?: (offset: PositionOffset) => void;
  isExport: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!interactive || isExport || !containerRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        originX: offset.x,
        originY: offset.y,
      };
      setIsDragging(true);
    },
    [interactive, isExport, offset.x, offset.y],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || !containerRef.current || !onOffsetChange) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
      const deltaY = ((event.clientY - dragRef.current.startY) / rect.height) * 100;

      onOffsetChange({
        x: Math.max(-36, Math.min(36, dragRef.current.originX + deltaX)),
        y: Math.max(-58, Math.min(34, dragRef.current.originY + deltaY)),
      });
    },
    [onOffsetChange],
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  return (
    <div className="absolute inset-0 z-[5]" style={{ pointerEvents: interactive ? "auto" : "none" }}>
      <div
        ref={containerRef}
        className="absolute inset-0"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate(${offset.x}%, ${offset.y}%)`,
          transition: isDragging ? "none" : "transform .16s ease-out",
          cursor: interactive ? (isDragging ? "grabbing" : "grab") : "default",
        }}
      >
        {children}
        {interactive && !isExport && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "6px 10px",
              borderRadius: "999px",
              background: "rgba(5,5,14,.62)",
              border: "1px solid rgba(255,255,255,.14)",
              color: "rgba(255,255,255,.68)",
              fontSize: "9px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            Drag text
          </div>
        )}
      </div>
    </div>
  );
}

function CardTextOverlay(props: OverlayProps) {
  switch (props.template.layout) {
    case "crescent-bloom":
      return <CrescentBloomOverlay {...props} />;
    case "royal-split":
      return <RoyalSplitOverlay {...props} />;
    case "skyline-bottom":
      return <SkylineBottomOverlay {...props} />;
    case "calligraphy-stack":
      return <CalligraphyStackOverlay {...props} />;
    case "crescent-emblem":
      return <CrescentEmblemOverlay {...props} />;
    default:
      return <ClassicOverlay {...props} />;
  }
}

export default function CardPreviewCanvas({
  template,
  customization,
  size = "preview",
  greetingFontOverride,
  coverTextOffset = DEFAULT_EDITOR_OVERRIDES.coverTextOffset,
  interactiveText = false,
  onCoverTextOffsetChange,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  size?: "preview" | "export" | "framed";
  greetingFontOverride?: GreetingFont | null;
  coverTextOffset?: PositionOffset;
  interactiveText?: boolean;
  onCoverTextOffsetChange?: (offset: PositionOffset) => void;
}) {
  const isExport = size === "export";
  const isFramed = size === "framed";
  const width = isExport ? 1080 : undefined;
  const height = isExport ? 1512 : undefined;

  // Font pairing override
  const baseFonts: FontSet = {
    italiana: isExport ? "'Italiana', serif" : "var(--font-italiana), 'Italiana', serif",
    amiri: isExport ? "'Amiri', serif" : "var(--font-amiri), 'Amiri', serif",
    cormorant: isExport ? "'Cormorant Garamond', serif" : "var(--font-cormorant), 'Cormorant Garamond', serif",
    dmSans: isExport ? "'DM Sans', sans-serif" : "var(--font-dm-sans), 'DM Sans', sans-serif",
    playfair: isExport ? "'Playfair Display', serif" : "var(--font-playfair), 'Playfair Display', serif",
    libre: isExport ? "'Libre Baskerville', serif" : "var(--font-libre), 'Libre Baskerville', serif",
  };

  const fonts: FontSet = (() => {
    if (!customization.fontPairing) return baseFonts;
    const f = { ...baseFonts };
    switch (customization.fontPairing) {
      case "classic":
        f.italiana = baseFonts.italiana;
        f.cormorant = baseFonts.cormorant;
        break;
      case "elegant":
        f.italiana = baseFonts.cormorant;
        f.dmSans = baseFonts.playfair;
        break;
      case "modern":
        f.italiana = baseFonts.dmSans;
        f.cormorant = isExport ? "'Inter', sans-serif" : "var(--font-inter), 'Inter', sans-serif";
        break;
      case "calligraphic":
        f.italiana = baseFonts.amiri;
        f.dmSans = baseFonts.cormorant;
        break;
      case "bold":
        f.italiana = baseFonts.playfair;
        f.cormorant = baseFonts.dmSans;
        break;
    }
    return f;
  })();

  // Apply greeting font override from the full editor
  const greetingFontFamily = (() => {
    if (!greetingFontOverride) return null;
    const opt = FONT_OPTIONS.find((f) => f.id === greetingFontOverride);
    if (!opt) return null;
    return isExport ? opt.exportFont : opt.cssVariable;
  })();

  const greeting = customization.greeting || "Eid Mubarak";
  const greetingLines = greeting.includes(" ")
    ? [greeting.split(" ").slice(0, -1).join(" "), greeting.split(" ").slice(-1)[0]]
    : [greeting];
  const textColor = template.textColor ?? template.accent;

  // Apply overrides from customization
  const effectiveBg = customization.bgOverride ?? template.bg;
  const templateStarsCount = template.starsCount ?? (isExport ? 60 : 40);
  const showStars = customization.overrideStars !== null ? customization.overrideStars : templateStarsCount > 0;
  const starsCount = customization.overrideStars !== null ? customization.starsCount : templateStarsCount;
  const showFrame = customization.overrideFrame !== null ? customization.overrideFrame : (template.showFrame ?? true);
  const showGlow = customization.overrideGlow !== null ? customization.overrideGlow : true;
  const effectiveLayout = customization.layoutOverride ?? template.layout;
  const showCoverPayment = !isOpeningNoteTemplate(template);

  // Build effective template for text overlay
  const effectiveTemplate = effectiveLayout !== template.layout
    ? { ...template, layout: effectiveLayout }
    : template;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width,
        height,
        aspectRatio: isExport ? undefined : "5/7",
        borderRadius: isExport || isFramed ? 0 : "16px",
        background: effectiveBg,
        boxShadow:
          isExport || isFramed
            ? "none"
            : `0 0 40px ${template.glow}, 0 40px 100px rgba(0,0,0,.6), 0 0 0 1px ${template.accent}20`,
      }}
    >
      {showStars && starsCount > 0 && <StarsLayer accent={template.accent} count={starsCount} />}
      {showGlow && <GlowLayer glow={template.glow} />}
      <CardArtwork type={template.type} accent={template.accent} accent2={template.accent2} />
      {showFrame && <OrnamentFrame accent={template.accent} />}

      <CoverTextLayer
        offset={coverTextOffset}
        interactive={interactiveText}
        onOffsetChange={onCoverTextOffsetChange}
        isExport={isExport}
      >
        <CardTextOverlay
          template={effectiveTemplate}
          customization={customization}
          greetingLines={greetingLines}
          isExport={isExport}
          textColor={textColor}
          fonts={fonts}
          greetingFontFamily={greetingFontFamily}
        />
      </CoverTextLayer>

      {showCoverPayment && customization.showQR && customization.paymentNumber && customization.paymentMethod && (
        <div
          className="absolute z-[6] flex flex-col items-center"
          style={{
            bottom: isExport ? "60px" : "16px",
            right: isExport ? "60px" : "16px",
          }}
        >
          <div className="rounded-lg" style={{ padding: isExport ? "10px" : "5px", background: "white" }}>
            <QRCodeSVG
              value={buildQRValue(customization)}
              size={isExport ? 100 : 52}
              level="M"
              bgColor="white"
              fgColor="#000"
            />
          </div>
          <div
            className="text-center mt-1 opacity-70"
            style={{
              fontSize: isExport ? "11px" : "6px",
              color: textColor,
            }}
          >
            {getPaymentMethodLabel(customization.paymentMethod)} Eidi
          </div>
        </div>
      )}
    </div>
  );
}
