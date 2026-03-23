"use client";

import { useState } from "react";
import { Coins, Gift, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { CardCustomization, CardTemplate, PaymentEntry } from "@/types/editor";
import { buildPaymentQrValue, getPaymentMethodLabel } from "@/components/editor/paymentUtils";

const METHOD_COLORS: Record<string, string> = {
  bkash: "#e2136e",
  nagad: "#f7931e",
  rocket: "#8b2d8b",
  card: "#3b82f6",
};

const METHOD_ICONS: Record<string, string> = {
  bkash: "BK",
  nagad: "NG",
  rocket: "RK",
  card: "CR",
};

type RevealKind = "envelope" | "treasure";

function RevealArtifact({
  kind,
  accent,
  label,
  onReveal,
}: {
  kind: RevealKind;
  accent: string;
  label: string;
  onReveal: () => void;
}) {
  return (
    <button
      onClick={onReveal}
      className={`eidi-reveal-box eidi-reveal-box--${kind}`}
      style={{ borderColor: `${accent}40` }}
    >
      <div className="eidi-reveal-art">
        {kind === "envelope" ? (
          <div className="eidi-envelope-art">
            <div
              className="eidi-envelope-bill"
              style={{ background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,.92))` }}
            />
            <div className="eidi-envelope-pocket" style={{ borderColor: `${accent}36` }} />
            <div className="eidi-envelope-flap-art" style={{ borderColor: `${accent}2a` }} />
            <div className="eidi-envelope-seal-art" style={{ background: accent }}>
              <Mail size={14} />
            </div>
          </div>
        ) : (
          <div className="eidi-treasure-art">
            <div className="eidi-treasure-lid" style={{ borderColor: `${accent}3a`, background: `${accent}16` }} />
            <div className="eidi-treasure-core" style={{ borderColor: `${accent}3f` }}>
              <div className="eidi-treasure-coin" style={{ background: accent }}>
                <Coins size={16} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="eidi-reveal-label" style={{ color: `${accent}dd` }}>
        {label}
      </div>
    </button>
  );
}

function PaymentMethodCard({
  entry,
  accent,
  revealed,
  onReveal,
  showQR,
}: {
  entry: PaymentEntry;
  accent: string;
  revealed: boolean;
  onReveal: () => void;
  showQR: boolean;
}) {
  const color = METHOD_COLORS[entry.method ?? ""] ?? accent;
  const icon = METHOD_ICONS[entry.method ?? ""] ?? "EI";
  const label = getPaymentMethodLabel(entry.method);
  const qrValue = buildPaymentQrValue(entry.method, entry.number);
  const revealKind: RevealKind = showQR ? "treasure" : "envelope";
  const revealLabel = showQR ? "Tap to open treasure" : "Tap to open envelope";

  return (
    <div className="eidi-method-card" style={{ borderColor: `${color}30` }}>
      <div className="eidi-method-header" style={{ background: `${color}12` }}>
        <span className="eidi-method-icon" style={{ background: color }}>
          {icon}
        </span>
        <span className="eidi-method-label">{label}</span>
      </div>

      <div className="eidi-method-body">
        {revealed ? (
          showQR && entry.number ? (
            <div className="eidi-qr-container">
              <div className="eidi-qr-box">
                <QRCodeSVG value={qrValue} size={140} level="M" bgColor="white" fgColor="#000" />
              </div>
              <div className="eidi-qr-label" style={{ color }}>
                Scan to send {label} Eidi
              </div>
              <div className="eidi-qr-subtext">{entry.number}</div>
            </div>
          ) : (
            <div className="eidi-number-revealed" style={{ color }}>
              {entry.number || "No number added"}
            </div>
          )
        ) : (
          <div className="eidi-reveal-container">
            <RevealArtifact
              kind={revealKind}
              accent={color}
              label={entry.number ? revealLabel : "Tap to reveal"}
              onReveal={onReveal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function EidiPage({
  template,
  customization,
}: {
  template: CardTemplate;
  customization: CardCustomization;
}) {
  const methods = customization.paymentMethods ?? [];
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  function revealMethod(id: string) {
    setRevealedIds((prev) => new Set(prev).add(id));
  }

  if (methods.length === 0) {
    return (
      <div className="eidi-page eidi-page--empty">
        <div className="eidi-empty-state">
          <div className="eidi-empty-artifacts">
            <div className="eidi-empty-artifact" style={{ borderColor: `${template.accent}24`, color: template.accent }}>
              <Mail size={18} />
            </div>
            <div className="eidi-empty-artifact" style={{ borderColor: `${template.accent}24`, color: template.accent }}>
              <Coins size={18} />
            </div>
            <div className="eidi-empty-artifact" style={{ borderColor: `${template.accent}24`, color: template.accent }}>
              <Gift size={18} />
            </div>
          </div>
          <div className="eidi-empty-title">No Eidi payment methods added yet</div>
          <div className="eidi-empty-copy">
            Add a number or QR payment method in the editor to create your Eidi reveal page.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eidi-page">
      <div className="eidi-envelope-header">
        <div className="eidi-envelope-flap" style={{ borderColor: `${template.accent}30` }} />
        <div
          className="eidi-envelope-seal"
          style={{ background: template.accent, boxShadow: `0 0 20px ${template.accent}40` }}
        >
          <Gift size={18} />
        </div>
        <div className="eidi-envelope-title" style={{ color: template.accent }}>
          Eid Mubarak
        </div>
        <div className="eidi-envelope-subtitle">
          {customization.paymentRevealLabel || "Tap to reveal Eidi"}
        </div>
      </div>

      <div className="eidi-methods-grid">
        {methods.map((entry) => (
          <PaymentMethodCard
            key={entry.id}
            entry={entry}
            accent={template.accent}
            revealed={revealedIds.has(entry.id)}
            onReveal={() => revealMethod(entry.id)}
            showQR={customization.showQR}
          />
        ))}
      </div>

      <div className="eidi-footer">
        <div className="eidi-footer-bar" style={{ background: `${template.accent}30` }} />
        <div className="eidi-footer-text">Crafted for Eid</div>
      </div>
    </div>
  );
}
