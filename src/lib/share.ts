import type { EditorOverrides } from "@/types/editor";
import { DEFAULT_EDITOR_OVERRIDES } from "@/types/editor";

export function generateShareSlug() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

export function normalizeOverrides(overrides?: EditorOverrides | null): EditorOverrides {
  return {
    ...DEFAULT_EDITOR_OVERRIDES,
    ...overrides,
    background: overrides?.background ?? null,
    greetingFont: overrides?.greetingFont ?? null,
    textColor: overrides?.textColor ?? null,
    layout: overrides?.layout ?? null,
    stickers: overrides?.stickers ?? [],
    coverTextOffset: overrides?.coverTextOffset
      ? {
          x: overrides.coverTextOffset.x ?? 0,
          y: overrides.coverTextOffset.y ?? 0,
        }
      : { ...DEFAULT_EDITOR_OVERRIDES.coverTextOffset },
    templateSnapshot: overrides?.templateSnapshot ?? null,
  };
}
