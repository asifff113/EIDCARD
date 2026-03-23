import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SharedCardView from "@/components/shared/SharedCardView";
import { TEMPLATES } from "@/data/templates";
import { normalizeOverrides } from "@/lib/share";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { CardCustomization, EditorOverrides } from "@/types/editor";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

function resolveSharedTemplate(
  templateId: number,
  overrides: EditorOverrides | null,
) {
  const baseTemplate = TEMPLATES.find((item) => item.id === templateId);
  const snapshot = overrides?.templateSnapshot ?? null;

  if (!baseTemplate) {
    return snapshot;
  }

  return snapshot ? { ...baseTemplate, ...snapshot } : baseTemplate;
}

async function getSharedCard(slug: string) {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shared_cards")
    .select("slug, template_id, customization, overrides")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sharedCard = await getSharedCard(slug);
  const overrides = sharedCard
    ? normalizeOverrides(sharedCard.overrides as EditorOverrides | null)
    : null;
  const template = sharedCard
    ? resolveSharedTemplate(sharedCard.template_id, overrides)
    : null;

  return {
    title: template ? `${template.title} | Shared Eid Card` : "Shared Eid Card",
  };
}

export default async function SharedCardPage({ params }: Props) {
  const { slug } = await params;
  const sharedCard = await getSharedCard(slug);

  if (!sharedCard) {
    notFound();
  }

  const overrides = normalizeOverrides(sharedCard.overrides as EditorOverrides | null);
  const template = resolveSharedTemplate(sharedCard.template_id, overrides);
  if (!template) {
    notFound();
  }

  const customization = sharedCard.customization as CardCustomization;

  return (
    <>
      <Navbar templateCount={TEMPLATES.length} active="home" />
      <SharedCardView
        template={template}
        customization={customization}
        overrides={overrides}
      />
      <Footer />
    </>
  );
}
