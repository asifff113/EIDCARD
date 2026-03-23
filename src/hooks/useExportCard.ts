"use client";

import { useRef, useCallback, useState } from "react";

export function useExportCard() {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const renderCanvas = useCallback(async () => {
    if (!exportRef.current) return null;
    if ("fonts" in document) {
      await document.fonts.ready;
    }

    const html2canvas = (await import("html2canvas")).default;
    return html2canvas(exportRef.current, {
      scale: Math.min(window.devicePixelRatio || 1, 2),
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });
  }, []);

  const exportAsPng = useCallback(async (filename = "eid-card.png") => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [renderCanvas]);

  const shareAsImage = useCallback(async (title: string) => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0)
      );

      if (blob && navigator.share) {
        const file = new File([blob], "eid-card.png", { type: "image/png" });
        const canShareFile = typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });

        if (canShareFile) {
          await navigator.share({ title: "Eid Mubarak!", text: title, files: [file] });
          return;
        }
      }

      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "eid-card.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } else if (navigator.share) {
        await navigator.share({ title: "Eid Mubarak!", text: title, url: window.location.href });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") console.error("Share failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [renderCanvas]);

  return { exportRef, isExporting, exportAsPng, shareAsImage };
}
