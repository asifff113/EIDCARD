import { notFound, redirect } from "next/navigation";
import { TEMPLATES } from "@/data/templates";
import FullEditor from "@/components/editor/FullEditor";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const template = TEMPLATES.find((t) => t.id === Number(id));
  return {
    title: template ? `Edit: ${template.title} | Eid Card` : "Editor | Eid Card",
  };
}

export default async function EditorPage({ params }: Props) {
  if (isSupabaseConfigured()) {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/login?required=1");
    }
  }

  const { id } = await params;
  const template = TEMPLATES.find((t) => t.id === Number(id));
  if (!template) notFound();

  return <FullEditor template={template} />;
}
