"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AccountPanel({
  label,
  email,
}: {
  label: string;
  email: string;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    setBusy(true);
    await supabase.auth.signOut();
    router.refresh();
    setBusy(false);
  }

  return (
    <section className="relative z-[1] px-6 pb-8 max-[640px]:px-4">
      <div
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-[20px] border px-5 py-4 max-[720px]:flex-col max-[720px]:items-start"
        style={{
          background: "rgba(255,255,255,.03)",
          borderColor: "rgba(212,175,55,.12)",
        }}
      >
        <div>
          <div
            className="text-[10px] tracking-[3px] uppercase"
            style={{ color: "rgba(212,175,55,.62)" }}
          >
            Signed In
          </div>
          <div
            className="mt-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "24px",
              color: "#f4e6bf",
            }}
          >
            Welcome, {label}
          </div>
          <div style={{ color: "rgba(255,255,255,.42)", fontSize: "13px", marginTop: "4px" }}>
            {email}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={busy}
          className="flex items-center gap-2 rounded-[999px] border px-4 py-3 text-[11px] tracking-[2px] uppercase transition-colors disabled:opacity-60"
          style={{
            borderColor: "rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.04)",
            color: "rgba(255,255,255,.66)",
          }}
        >
          <LogOut size={14} />
          {busy ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </section>
  );
}
