"use client";

import type { PaymentMethod } from "@/types/editor";

export const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; color: string }[] = [
  { value: "bkash", label: "bKash", color: "#e2136e" },
  { value: "nagad", label: "Nagad", color: "#f06b22" },
  { value: "rocket", label: "Rocket", color: "#8c2be2" },
  { value: "card", label: "Card", color: "#2f6fed" },
  { value: null, label: "None", color: "rgba(255,255,255,.1)" },
];

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return PAYMENT_OPTIONS.find((option) => option.value === method)?.label ?? "Payment";
}

export function sanitizePaymentValue(value: string): string {
  return value.replace(/[^0-9A-Za-z -]/g, "").slice(0, 28);
}

export function buildPaymentQrValue(method: PaymentMethod, value: string): string {
  const label = getPaymentMethodLabel(method);
  return `${label}: ${value}`;
}

export function maskPaymentValue(value: string): string {
  if (!value) return "";
  if (value.length <= 4) return value;
  const visible = value.slice(-4);
  return `${"\u2022".repeat(Math.max(4, value.length - 4))}${visible}`;
}
