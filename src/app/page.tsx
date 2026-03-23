import Starfield from "@/components/shared/Starfield";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import CreateStudioSection from "@/components/editor/CreateStudioSection";
import Footer from "@/components/layout/Footer";
import { TEMPLATES } from "@/data/templates";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function Home() {
  const user = await getCurrentUser();
  const supabaseConfigured = isSupabaseConfigured();

  return (
    <>
      <Starfield />
      <Navbar templateCount={TEMPLATES.length} active="home" />
      <Hero />
      {supabaseConfigured ? (
        <CreateStudioSection canEdit={Boolean(user)} authEnabled />
      ) : (
        <>
          <section className="relative z-[1] px-6 pb-8 max-[640px]:px-4">
            <div
              className="mx-auto max-w-[1280px] rounded-[20px] border px-5 py-4"
              style={{
                background: "rgba(255,255,255,.03)",
                borderColor: "rgba(212,175,55,.12)",
                color: "rgba(255,255,255,.66)",
              }}
            >
              Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to enable sign up, protected editing, and shared-card links.
            </div>
          </section>
          <CreateStudioSection canEdit />
        </>
      )}
      <Footer />
    </>
  );
}
