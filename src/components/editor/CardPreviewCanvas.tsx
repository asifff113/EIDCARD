"use client";

import { QRCodeSVG } from "qrcode.react";
import type { CardTemplate, CardCustomization } from "@/types/editor";
import { StarsLayer, GlowLayer, OrnamentFrame } from "@/components/cards/artwork/Layers";
import { CardArtwork } from "@/components/cards/artwork/CardArtwork";

function buildQRValue(c: CardCustomization): string {
  const method = c.paymentMethod === "bkash" ? "bKash" : "Nagad";
  return `${method}: ${c.paymentNumber}`;
}

export default function CardPreviewCanvas({
  template,
  customization,
  size = "preview",
}: {
  template: CardTemplate;
  customization: CardCustomization;
  size?: "preview" | "export";
}) {
  const isExport = size === "export";
  const w = isExport ? 1080 : undefined;
  const h = isExport ? 1512 : undefined;
  const italiana = isExport ? "'Italiana', serif" : "var(--font-italiana), 'Italiana', serif";
  const amiri = isExport ? "'Amiri', serif" : "var(--font-amiri), 'Amiri', serif";
  const cormorant = isExport ? "'Cormorant Garamond', serif" : "var(--font-cormorant), 'Cormorant Garamond', serif";
  const dmSans = isExport ? "'DM Sans', sans-serif" : "var(--font-dm-sans), 'DM Sans', sans-serif";

  const greeting = customization.greeting || "Eid Mubarak";
  const greetingLines = greeting.includes(" ")
    ? [greeting.split(" ").slice(0, -1).join(" "), greeting.split(" ").slice(-1)[0]]
    : [greeting];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: w,
        height: h,
        aspectRatio: isExport ? undefined : "5/7",
        borderRadius: isExport ? 0 : "16px",
        background: template.bg,
        boxShadow: isExport ? "none" : `0 0 40px ${template.glow}, 0 40px 100px rgba(0,0,0,.6), 0 0 0 1px ${template.accent}20`,
      }}
    >
      <StarsLayer accent={template.accent} count={isExport ? 60 : 40} />
      <GlowLayer glow={template.glow} />
      <CardArtwork type={template.type} accent={template.accent} accent2={template.accent2} />
      <OrnamentFrame accent={template.accent} />

      {/* Text overlay */}
      <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center" style={{ padding: isExport ? "80px 60px" : "clamp(20px, 4vw, 40px)" }}>
        {/* Recipient name */}
        {customization.recipientName && (
          <div className="mb-3 opacity-80" style={{
            fontFamily: dmSans,
            fontSize: isExport ? "22px" : "clamp(10px, 1.5vw, 14px)",
            color: template.accent,
            letterSpacing: "2px",
          }}>
            {customization.recipientName}
          </div>
        )}

        {/* Subtitle */}
        <div className="uppercase mb-3 opacity-60" style={{
          color: template.accent,
          fontSize: isExport ? "16px" : "clamp(7px, 1vw, 10px)",
          letterSpacing: isExport ? "5px" : "4px",
        }}>
          {template.subtitle}
        </div>

        {/* Main greeting */}
        <div className="leading-[.88] mb-2" style={{
          fontFamily: italiana,
          fontSize: isExport ? "84px" : "clamp(32px, 5vw, 52px)",
          color: template.accent,
          textShadow: `0 0 60px ${template.glow}`,
        }}>
          {greetingLines.map((line, i) => (
            <span key={i}>{line}{i < greetingLines.length - 1 && <br />}</span>
          ))}
        </div>

        {/* Arabic */}
        <div className="mb-3 opacity-70" style={{
          fontFamily: amiri,
          fontSize: isExport ? "36px" : "clamp(14px, 2.5vw, 22px)",
          direction: "rtl",
          color: template.accent,
        }}>
          {customization.greetingAr}
        </div>

        {/* Divider */}
        <div className="opacity-30 mb-2" style={{ width: isExport ? "60px" : "32px", height: "1px", background: template.accent }} />

        {/* Personal message */}
        {customization.personalMessage && (
          <div className="mb-3 max-w-[80%] opacity-60" style={{
            fontFamily: cormorant,
            fontSize: isExport ? "20px" : "clamp(9px, 1.2vw, 13px)",
            color: template.accent,
            lineHeight: 1.6,
            fontStyle: "italic",
          }}>
            {customization.personalMessage}
          </div>
        )}

        {/* Year */}
        <div className="uppercase italic opacity-30" style={{
          fontFamily: cormorant,
          fontSize: isExport ? "14px" : "clamp(7px, 1vw, 9px)",
          letterSpacing: "3px",
          color: template.accent,
        }}>
          {customization.year}
        </div>

        {/* Sender */}
        {customization.senderName && (
          <div className="mt-4 opacity-50" style={{
            fontFamily: dmSans,
            fontSize: isExport ? "16px" : "clamp(8px, 1.2vw, 12px)",
            color: template.accent,
            letterSpacing: "1px",
          }}>
            — {customization.senderName}
          </div>
        )}
      </div>

      {/* QR Code */}
      {customization.showQR && customization.paymentNumber && customization.paymentMethod && (
        <div className="absolute z-[6] flex flex-col items-center" style={{
          bottom: isExport ? "60px" : "16px",
          right: isExport ? "60px" : "16px",
        }}>
          <div className="rounded-lg" style={{ padding: isExport ? "10px" : "5px", background: "white" }}>
            <QRCodeSVG
              value={buildQRValue(customization)}
              size={isExport ? 100 : 52}
              level="M"
              bgColor="white"
              fgColor="#000"
            />
          </div>
          <div className="text-center mt-1 opacity-60" style={{
            fontSize: isExport ? "11px" : "6px",
            color: template.accent,
          }}>
            {customization.paymentMethod === "bkash" ? "bKash" : "Nagad"} Eidi
          </div>
        </div>
      )}
    </div>
  );
}
