"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  CardTemplate,
  CardCustomization,
  CardLayout,
  EditorOverrides,
  Sticker,
  StickerType,
  GreetingFont,
  BackgroundOverride,
} from "@/types/editor";
import { DEFAULT_CUSTOMIZATION, DEFAULT_EDITOR_OVERRIDES } from "@/types/editor";

export function useFullEditor(initialTemplate: CardTemplate) {
  const [customization, setCustomization] = useState<CardCustomization>(() => ({
    ...DEFAULT_CUSTOMIZATION,
    greetingAr: initialTemplate.ar || DEFAULT_CUSTOMIZATION.greetingAr,
  }));
  const [overrides, setOverrides] = useState<EditorOverrides>(DEFAULT_EDITOR_OVERRIDES);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  const updateCustomization = useCallback((partial: Partial<CardCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateOverrides = useCallback((partial: Partial<EditorOverrides>) => {
    setOverrides((prev) => ({ ...prev, ...partial }));
  }, []);

  const setBackground = useCallback((bg: BackgroundOverride | null) => {
    setOverrides((prev) => ({ ...prev, background: bg }));
  }, []);

  const setGreetingFont = useCallback((font: GreetingFont | null) => {
    setOverrides((prev) => ({ ...prev, greetingFont: font }));
  }, []);

  const setTextColor = useCallback((color: string | null) => {
    setOverrides((prev) => ({ ...prev, textColor: color }));
  }, []);

  const setLayout = useCallback((layout: CardLayout | null) => {
    setOverrides((prev) => ({ ...prev, layout: layout }));
  }, []);

  const addSticker = useCallback((stickerType: StickerType) => {
    const sticker: Sticker = {
      id: crypto.randomUUID(),
      stickerType,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
    };
    setOverrides((prev) => ({ ...prev, stickers: [...prev.stickers, sticker] }));
    setSelectedStickerId(sticker.id);
  }, []);

  const updateSticker = useCallback((id: string, partial: Partial<Sticker>) => {
    setOverrides((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? { ...s, ...partial } : s)),
    }));
  }, []);

  const removeSticker = useCallback((id: string) => {
    setOverrides((prev) => ({
      ...prev,
      stickers: prev.stickers.filter((s) => s.id !== id),
    }));
    setSelectedStickerId((prev) => (prev === id ? null : prev));
  }, []);

  const effectiveTemplate: CardTemplate = useMemo(
    () => ({
      ...initialTemplate,
      ...(overrides.background?.type === "gradient" ? { bg: overrides.background.value } : {}),
      ...(overrides.textColor ? { textColor: overrides.textColor } : {}),
      ...(overrides.layout ? { layout: overrides.layout } : {}),
    }),
    [initialTemplate, overrides.background, overrides.textColor, overrides.layout]
  );

  const backgroundImage: string | null = useMemo(
    () => (overrides.background?.type === "image" ? overrides.background.value : null),
    [overrides.background]
  );

  const resetOverrides = useCallback(() => {
    setOverrides(DEFAULT_EDITOR_OVERRIDES);
    setSelectedStickerId(null);
  }, []);

  return {
    customization,
    overrides,
    effectiveTemplate,
    backgroundImage,
    selectedStickerId,
    updateCustomization,
    updateOverrides,
    setBackground,
    setGreetingFont,
    setTextColor,
    setLayout,
    addSticker,
    updateSticker,
    removeSticker,
    setSelectedStickerId,
    resetOverrides,
  };
}
