"use client";

import type { CardCustomization } from "@/types/editor";

export default function PaymentTab({
  customization,
  accent,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const inputStyle = {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "8px",
    color: "#e0e0e0",
    padding: "10px 14px",
    fontSize: "13px",
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
      <div>
        <label style={labelStyle}>Payment Method</label>
        <div className="flex gap-2">
          {(["bkash", "nagad", null] as const).map((method) => {
            const isActive = customization.paymentMethod === method;
            const label = method === "bkash" ? "bKash" : method === "nagad" ? "Nagad" : "None";
            const bg = isActive
              ? method === "bkash" ? "#e2136e" : method === "nagad" ? "#f06b22" : "rgba(255,255,255,.1)"
              : "rgba(255,255,255,.04)";
            return (
              <button
                key={label}
                onClick={() => onChange({
                  paymentMethod: method,
                  showQR: method !== null ? customization.showQR : false,
                })}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: bg,
                  border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,.08)",
                  borderRadius: "8px",
                  color: isActive ? "#fff" : "rgba(255,255,255,.4)",
                  fontSize: "12px",
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
      </div>

      {customization.paymentMethod && (
        <>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              style={inputStyle}
              value={customization.paymentNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                onChange({ paymentNumber: val });
              }}
              placeholder="01XXXXXXXXX"
              inputMode="numeric"
              onFocus={(e) => (e.target.style.borderColor = accent)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.08)")}
            />
            {customization.paymentNumber && customization.paymentNumber.length < 11 && (
              <div className="mt-1" style={{ fontSize: "9px", color: "rgba(255,200,100,.5)" }}>
                Enter 11-digit number
              </div>
            )}
          </div>

          <div>
            <label style={labelStyle}>Show QR Code on Card</label>
            <button
              onClick={() => onChange({ showQR: !customization.showQR })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: customization.showQR ? `${accent}15` : "rgba(255,255,255,.04)",
                border: `1px solid ${customization.showQR ? accent + "40" : "rgba(255,255,255,.08)"}`,
                borderRadius: "8px",
                color: customization.showQR ? accent : "rgba(255,255,255,.4)",
                cursor: "pointer",
                width: "100%",
                fontSize: "12px",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                transition: "all .2s",
              }}
            >
              <div style={{
                width: "36px",
                height: "20px",
                borderRadius: "10px",
                background: customization.showQR ? accent : "rgba(255,255,255,.15)",
                position: "relative",
                transition: "background .2s",
                flexShrink: 0,
              }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  top: "2px",
                  left: customization.showQR ? "18px" : "2px",
                  transition: "left .2s",
                }} />
              </div>
              {customization.showQR ? "QR Visible on Card" : "QR Hidden"}
            </button>
          </div>
        </>
      )}

      {!customization.paymentMethod && (
        <div className="text-center py-8" style={{ color: "rgba(255,255,255,.15)", fontSize: "12px" }}>
          Select a payment method to add Eidi QR code to your card
        </div>
      )}
    </div>
  );
}
