"use client";

import { useCallback, useState } from "react";
import type { CardCustomization, EditorOverrides } from "@/types/editor";

export function useShareCard() {
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);

  const shareCard = useCallback(
    async ({
      templateId,
      title,
      customization,
      overrides,
    }: {
      templateId: number;
      title: string;
      customization: CardCustomization;
      overrides?: EditorOverrides | null;
    }) => {
      setIsSharing(true);
      setShareStatus(null);
      setShareError(null);

      try {
        const response = await fetch("/api/share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateId,
            customization,
            overrides,
          }),
        });

        const data = (await response.json()) as { slug?: string; error?: string };

        if (!response.ok || !data.slug) {
          setShareError(data.error || "Could not create a share link.");
          return null;
        }

        const url = `${window.location.origin}/shared/${data.slug}`;

        if (navigator.share) {
          try {
            await navigator.share({
              title: `${title} | Eid Card`,
              text: "View this finished Eid card.",
              url,
            });
            setShareStatus("Share link sent.");
            return url;
          } catch (error) {
            if ((error as Error).name === "AbortError") {
              return null;
            }
          }
        }

        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          setShareStatus("Share link copied to clipboard.");
        } else {
          setShareStatus(url);
        }

        return url;
      } catch {
        setShareError("Network error while creating the share link.");
        return null;
      } finally {
        setIsSharing(false);
      }
    },
    [],
  );

  return {
    isSharing,
    shareStatus,
    shareError,
    shareCard,
    clearShareFeedback() {
      setShareStatus(null);
      setShareError(null);
    },
  };
}
