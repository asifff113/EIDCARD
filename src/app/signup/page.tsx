import { redirect } from "next/navigation";
import AuthPanel from "@/components/auth/AuthPanel";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function SignupPage() {
  const supabaseConfigured = isSupabaseConfigured();

  if (supabaseConfigured) {
    const user = await getCurrentUser();
    if (user) {
      redirect("/");
    }
  }

  return supabaseConfigured ? (
    <AuthPanel
      initialMode="signup"
      signInHref="/login"
      signUpHref="/signup"
    />
  ) : (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "rgba(255,255,255,.66)",
        padding: 20,
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(212,175,55,.12)",
          borderRadius: 20,
          padding: "20px 24px",
        }}
      >
        Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to enable account
        creation and protected sharing.
      </div>
    </div>
  );
}
