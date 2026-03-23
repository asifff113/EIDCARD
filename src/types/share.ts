import type { CardCustomization, EditorOverrides } from "@/types/editor";

export interface SharedCardPayload {
  templateId: number;
  customization: CardCustomization;
  overrides?: EditorOverrides | null;
}

export interface SharedCardRecord extends SharedCardPayload {
  slug: string;
}
