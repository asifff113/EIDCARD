"use client";

import { Plus, Trash2 } from "lucide-react";
import type { CardCustomization, PaymentEntry, PaymentMethod } from "@/types/editor";
import { PAYMENT_OPTIONS, sanitizePaymentValue } from "@/components/editor/paymentUtils";

function generateId() {
  return `pm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function PaymentTab({
  customization,
  accent,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const methods = customization.paymentMethods ?? [];
  const nonNullOptions = PAYMENT_OPTIONS.filter((o) => o.value !== null);

  function addMethod() {
    const newEntry: PaymentEntry = {
      id: generateId(),
      method: "bkash",
      number: "",
    };
    onChange({ paymentMethods: [...methods, newEntry] });
  }

  function removeMethod(id: string) {
    onChange({ paymentMethods: methods.filter((m) => m.id !== id) });
  }

  function updateMethod(id: string, partial: Partial<PaymentEntry>) {
    onChange({
      paymentMethods: methods.map((m) =>
        m.id === id ? { ...m, ...partial } : m
      ),
    });
  }

  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "8px",
    color: "#e0e0e0",
    padding: "10px 14px",
    fontSize: "15px",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
    transition: "border-color .2s",
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,.35)",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Existing payment methods */}
      {methods.map((entry, index) => (
        <div
          key={entry.id}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,.06)",
            background: "rgba(255,255,255,.02)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ ...labelStyle, marginBottom: 0 }}>
              Payment Method {index + 1}
            </span>
            <button
              onClick={() => removeMethod(entry.id)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,100,100,.5)",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b6b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,100,100,.5)")}
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Method selector */}
          <div className="grid grid-cols-4 gap-1.5 mb-3 max-[480px]:grid-cols-2">
            {nonNullOptions.map(({ value: method, label, color }) => {
              const isActive = entry.method === method;
              return (
                <button
                  key={label}
                  onClick={() =>
                    updateMethod(entry.id, { method: method as PaymentMethod })
                  }
                  style={{
                    padding: "8px",
                    background: isActive ? color : "rgba(255,255,255,.04)",
                    border: isActive
                      ? "1px solid transparent"
                      : "1px solid rgba(255,255,255,.08)",
                    borderRadius: "8px",
                    color: isActive ? "#fff" : "rgba(255,255,255,.4)",
                    fontSize: "11px",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    transition: "all .2s",
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Number input */}
          <input
            style={inputStyle}
            value={entry.number}
            onChange={(e) => {
              const val = sanitizePaymentValue(e.target.value);
              updateMethod(entry.id, { number: val });
            }}
            placeholder={
              entry.method === "card"
                ? "Visa ending 1234"
                : "01XXXXXXXXX"
            }
            inputMode={entry.method === "card" ? "text" : "numeric"}
            onFocus={(e) => (e.target.style.borderColor = accent)}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,.08)")
            }
          />
        </div>
      ))}

      {/* Add method button */}
      <button
        onClick={addMethod}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px",
          borderRadius: "12px",
          border: `1px dashed rgba(212,175,55,.25)`,
          background: "rgba(212,175,55,.04)",
          color: accent,
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all .2s",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(212,175,55,.5)";
          e.currentTarget.style.background = "rgba(212,175,55,.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(212,175,55,.25)";
          e.currentTarget.style.background = "rgba(212,175,55,.04)";
        }}
      >
        <Plus size={16} />
        Add Payment Method
      </button>

      {/* Reveal label */}
      {methods.length > 0 && (
        <>
          <div>
            <label style={labelStyle}>Reveal Label</label>
            <input
              style={inputStyle}
              value={customization.paymentRevealLabel}
              onChange={(e) =>
                onChange({ paymentRevealLabel: e.target.value.slice(0, 30) })
              }
              placeholder="Tap to reveal Eidi"
              onFocus={(e) => (e.target.style.borderColor = accent)}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,.08)")
              }
            />
            <div
              className="mt-1"
              style={{ fontSize: "9px", color: "rgba(255,255,255,.25)" }}
            >
              This label covers the payment details until the viewer taps.
            </div>
          </div>

          <div>
            <label style={labelStyle}>Show QR Code</label>
            <button
              onClick={() => onChange({ showQR: !customization.showQR })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: customization.showQR
                  ? `${accent}15`
                  : "rgba(255,255,255,.04)",
                border: `1px solid ${
                  customization.showQR ? accent + "40" : "rgba(255,255,255,.08)"
                }`,
                borderRadius: "8px",
                color: customization.showQR ? accent : "rgba(255,255,255,.4)",
                cursor: "pointer",
                width: "100%",
                fontSize: "12px",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                transition: "all .2s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "20px",
                  borderRadius: "10px",
                  background: customization.showQR
                    ? accent
                    : "rgba(255,255,255,.15)",
                  position: "relative",
                  transition: "background .2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: "2px",
                    left: customization.showQR ? "18px" : "2px",
                    transition: "left .2s",
                  }}
                />
              </div>
              {customization.showQR
                ? "QR code visible on Eidi page"
                : "Tap-to-reveal label instead of QR"}
            </button>
          </div>
        </>
      )}

      {methods.length === 0 && (
        <div
          className="text-center py-8"
          style={{ color: "rgba(255,255,255,.15)", fontSize: "12px" }}
        >
          Add a payment method to include Eidi details in your card
        </div>
      )}
    </div>
  );
}
