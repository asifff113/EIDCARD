"use client";

import { useState, useCallback } from "react";
import type { CardTemplate, CardCustomization } from "@/types/editor";
import { DEFAULT_CUSTOMIZATION } from "@/types/editor";

export function useCardEditor() {
  const [step, setStep] = useState<"pick" | "edit">("pick");
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(null);
  const [customization, setCustomization] = useState<CardCustomization>(DEFAULT_CUSTOMIZATION);

  const selectTemplate = useCallback((template: CardTemplate) => {
    setSelectedTemplate(template);
    setCustomization({
      ...DEFAULT_CUSTOMIZATION,
      greetingAr: template.ar || DEFAULT_CUSTOMIZATION.greetingAr,
    });
    setStep("edit");
  }, []);

  const updateCustomization = useCallback((partial: Partial<CardCustomization>) => {
    setCustomization(prev => ({ ...prev, ...partial }));
  }, []);

  const goBack = useCallback(() => {
    setStep("pick");
    setSelectedTemplate(null);
    setCustomization(DEFAULT_CUSTOMIZATION);
  }, []);

  return { step, selectedTemplate, customization, selectTemplate, updateCustomization, goBack };
}
