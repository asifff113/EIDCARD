import { NextResponse } from "next/server";
import { TEMPLATES } from "@/data/templates";
import { generateShareSlug, normalizeOverrides } from "@/lib/share";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { SharedCardPayload } from "@/types/share";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in to share cards." }, { status: 401 });
  }

  let payload: SharedCardPayload;

  try {
    payload = (await request.json()) as SharedCardPayload;
  } catch {
    return NextResponse.json({ error: "Invalid share payload." }, { status: 400 });
  }

  const template = TEMPLATES.find((item) => item.id === payload.templateId);
  if (!template) {
    return NextResponse.json({ error: "Template not found." }, { status: 404 });
  }

  const overrides = normalizeOverrides(payload.overrides);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const slug = generateShareSlug();
    const { error } = await supabase.from("shared_cards").insert({
      slug,
      user_id: user.id,
      template_id: payload.templateId,
      customization: payload.customization,
      overrides,
    });

    if (!error) {
      return NextResponse.json({ slug });
    }
  }

  return NextResponse.json(
    { error: "Could not create a share link. Please try again." },
    { status: 500 },
  );
}
