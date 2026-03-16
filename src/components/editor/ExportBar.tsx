"use client";

import { Download, Share2, Loader2 } from "lucide-react";

export default function ExportBar({
  accent,
  isExporting,
  onDownload,
  onShare,
}: {
  accent: string;
  isExporting: boolean;
  onDownload: () => void;
  onShare: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDownload}
        disabled={isExporting}
        className="flex items-center gap-2 py-2.5 px-5 cursor-pointer transition-all hover:brightness-110 disabled:opacity-50"
        style={{
          background: accent,
          border: "none",
          borderRadius: "8px",
          color: "#000",
          fontSize: "11px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        Download PNG
      </button>
      <button
        onClick={onShare}
        disabled={isExporting}
        className="flex items-center gap-2 py-2.5 px-5 cursor-pointer transition-all hover:brightness-110 disabled:opacity-50"
        style={{
          background: "rgba(255,255,255,.06)",
          border: `1px solid ${accent}40`,
          borderRadius: "8px",
          color: accent,
          fontSize: "11px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        <Share2 size={14} />
        Share
      </button>
    </div>
  );
}
