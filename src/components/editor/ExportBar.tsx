"use client";

import { Download, Share2, Loader2 } from "lucide-react";

export default function ExportBar({
  accent,
  isExporting,
  onDownload,
  onShare,
  fill = false,
}: {
  accent: string;
  isExporting: boolean;
  onDownload: () => void;
  onShare: () => void;
  fill?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${fill ? "w-full" : "flex-wrap"}`}>
      <button
        onClick={onDownload}
        disabled={isExporting}
        className={`flex items-center justify-center gap-1.5 py-2 px-3 cursor-pointer transition-all hover:brightness-110 disabled:opacity-50 ${fill ? "flex-1" : ""}`}
        style={{
          background: accent,
          border: "none",
          borderRadius: "8px",
          color: "#000",
          fontSize: "9px",
          letterSpacing: "1.1px",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          minHeight: "34px",
        }}
      >
        {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
        Download PNG
      </button>
      <button
        onClick={onShare}
        disabled={isExporting}
        className={`flex items-center justify-center gap-1.5 py-2 px-3 cursor-pointer transition-all hover:brightness-110 disabled:opacity-50 ${fill ? "flex-1" : ""}`}
        style={{
          background: "rgba(255,255,255,.06)",
          border: `1px solid ${accent}40`,
          borderRadius: "8px",
          color: accent,
          fontSize: "9px",
          letterSpacing: "1.1px",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          minHeight: "34px",
        }}
      >
        <Share2 size={12} />
        Share Link
      </button>
    </div>
  );
}
