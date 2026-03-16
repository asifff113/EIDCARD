"use client";

import { useState } from "react";
import { Type, CreditCard } from "lucide-react";
import type { CardCustomization } from "@/types/editor";
import TextTab from "./TextTab";
import PaymentTab from "./PaymentTab";

export default function EditorPanel({
  customization,
  accent,
  onChange,
}: {
  customization: CardCustomization;
  accent: string;
  onChange: (partial: Partial<CardCustomization>) => void;
}) {
  const [tab, setTab] = useState<"text" | "payment">("text");

  return (
    <div className="flex flex-col h-full" style={{
      background: "rgba(255,255,255,.02)",
      border: "1px solid rgba(255,255,255,.06)",
      borderRadius: "16px",
    }}>
      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,.06)" }}>
        {([
          { key: "text", label: "Text", icon: Type },
          { key: "payment", label: "Payment", icon: CreditCard },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 transition-all cursor-pointer"
            style={{
              background: tab === key ? "rgba(255,255,255,.04)" : "transparent",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: tab === key ? `2px solid ${accent}` : "2px solid transparent",
              borderRadius: 0,
              color: tab === key ? accent : "rgba(255,255,255,.3)",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5">
        {tab === "text" ? (
          <TextTab customization={customization} accent={accent} onChange={onChange} />
        ) : (
          <PaymentTab customization={customization} accent={accent} onChange={onChange} />
        )}
      </div>
    </div>
  );
}
