"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type NavbarProps = {
  templateCount: number;
  active?: "home" | "museum";
};

const navItems: Array<{ key: NavbarProps["active"]; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/" },
  { key: "museum", label: "Museum", href: "/gallery" },
];

export default function Navbar({ templateCount, active }: NavbarProps) {
  const router = useRouter();
  const authEnabled = isSupabaseConfigured();
  const supabase = useMemo(() => (authEnabled ? createClient() : null), [authEnabled]);
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authLabel =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Account";

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setUser(data.user ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    setBusy(true);
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
    setBusy(false);
  }

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* ── Logo ── */}
        <Link className="navbar-logo" href="/">
          <svg
            className="navbar-logo-svg"
            width="38"
            height="38"
            viewBox="0 0 34 34"
          >
            <defs>
              <filter id="nf">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M22,4 A15,15 0 1,0 22,30 A10.5,10.5 0 1,1 22,4Z"
              fill="#d4af37"
              filter="url(#nf)"
            />
            <circle cx="26" cy="5.5" r="2.8" fill="#d4af37" />
          </svg>
          <span className="navbar-logo-text">EID MUBARAK</span>
        </Link>

        {/* ── Center Nav Links ── */}
        <div className="navbar-links">
          {navItems.map((item) => {
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                className={`navbar-link ${isActive ? "navbar-link--active" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Actions ── */}
        <div className="navbar-actions">
          <div className="navbar-badge">
            <span className="navbar-badge-dot" />
            {templateCount} Templates
          </div>

          {authEnabled ? (
            user ? (
              <>
                <div className="navbar-user">
                  <div className="navbar-user-avatar">
                    {authLabel.charAt(0).toUpperCase()}
                  </div>
                  <span className="navbar-user-name">{authLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={busy}
                  className="navbar-btn navbar-btn--ghost"
                >
                  {busy ? "Signing Out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" className="navbar-btn navbar-btn--primary">
                  Sign Up
                </Link>
                <Link href="/login" className="navbar-btn navbar-btn--ghost">
                  Sign In
                </Link>
              </>
            )
          ) : null}
        </div>

        {/* ── Mobile Actions ── */}
        <div className="navbar-mobile-actions">
          {authEnabled ? (
            user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={busy}
                className="navbar-btn navbar-btn--ghost navbar-btn--sm"
              >
                {busy ? "Out" : "Sign Out"}
              </button>
            ) : (
              <>
                <Link href="/signup" className="navbar-btn navbar-btn--primary navbar-btn--sm">
                  Sign Up
                </Link>
                <Link href="/login" className="navbar-btn navbar-btn--ghost navbar-btn--sm">
                  Sign In
                </Link>
              </>
            )
          ) : null}

          <div className="navbar-badge navbar-badge--sm">
            {templateCount} Cards
          </div>
        </div>
      </div>

      {/* ── Mobile Nav Links ── */}
      <div className="navbar-mobile-links">
        {navItems.map((item) => {
          const isActive = active === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`navbar-mobile-link ${isActive ? "navbar-mobile-link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
