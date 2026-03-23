"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function AuthPanel({
  initialRequired = false,
  initialMode = "signup",
  signInHref,
  signUpHref,
  successHref = "/#create-studio",
}: {
  initialRequired?: boolean;
  initialMode?: Mode;
  signInHref?: string;
  signUpHref?: string;
  successHref?: string;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(
    initialRequired ? "Please sign in to create, edit, and share cards." : null,
  );
  const callbackNext = successHref.startsWith("/") ? successHref : "/";

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode]);

  useEffect(() => {
    setMessage(initialRequired ? "Please sign in to create, edit, and share cards." : null);
  }, [initialRequired]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackNext)}`,
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (data.session) {
          router.replace(successHref);
          return;
        }

        setMessage(
          "Account created! Check your email to confirm, then come back and sign in.",
        );
        setMode("signin");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.replace(successHref);
    } finally {
      setBusy(false);
    }
  }

  const isSignUp = mode === "signup";

  return (
    <div className="auth-page">
      {/* ── Left: Form Side ── */}
      <div className="auth-form-side">
        {/* Logo / Home link */}
        <Link href="/" className="auth-logo">
          <span className="auth-logo-icon">☪</span>
          <span className="auth-logo-text">EID MUBARAK</span>
        </Link>

        <div className="auth-form-container">
          <h1 className="auth-title">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="auth-subtitle">
            {isSignUp
              ? "Sign up to start creating beautiful Eid cards"
              : "Sign in to continue creating and sharing cards"}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-name">
                  Full Name
                </label>
                <div className="auth-input-wrap">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    id="auth-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="auth-input"
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">
                Email Address
              </label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input
                  id="auth-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-password">
                Password
              </label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  id="auth-password"
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="auth-input"
                />
              </div>
            </div>

            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-message">{message}</div>}

            <button
              type="submit"
              disabled={busy}
              className="auth-submit-btn"
            >
              {busy
                ? "Please wait..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <p className="auth-switch-text">
            {isSignUp ? "Already have an account?" : "Don\u2019t have an account?"}{" "}
            <Link
              href={isSignUp ? (signInHref ?? "/login") : (signUpHref ?? "/signup")}
              className="auth-switch-link"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Decorative Panel ── */}
      <div className="auth-decor-side">
        {/* Animated stars canvas */}
        <AuthStars />

        {/* Floating decorative elements */}
        <div className="auth-decor-orb auth-decor-orb-1" />
        <div className="auth-decor-orb auth-decor-orb-2" />
        <div className="auth-decor-orb auth-decor-orb-3" />

        <div className="auth-decor-content">
          <div className="auth-decor-moon">☪</div>
          <h2 className="auth-decor-title">
            {isSignUp ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="auth-decor-description">
            {isSignUp
              ? "Enter your personal details and start your journey creating beautiful Eid cards"
              : "Sign in with your credentials to access the card editor, your saved designs, and sharing tools"}
          </p>
          <Link
            href={isSignUp ? (signInHref ?? "/login") : (signUpHref ?? "/signup")}
            className="auth-decor-btn"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </div>

        {/* Bottom decorative line */}
        <div className="auth-decor-bottom">
          <span>Crafted for Eid</span>
          <span className="auth-decor-dot" />
          <span>Create, Customize, Share</span>
        </div>
      </div>
    </div>
  );
}

/* ── Tiny star particles for the decorative panel ── */
function AuthStars() {
  useEffect(() => {
    const canvas = document.getElementById("auth-stars-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let stars: { x: number; y: number; r: number; ph: number; sp: number; gold: boolean }[] = [];
    let t = 0;
    let raf: number;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.012 + 0.003,
        gold: Math.random() < 0.3,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const s of stars) {
        const op = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * s.sp * 60 + s.ph));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.gold
          ? `rgba(240,208,96,${op * 0.8})`
          : `rgba(255,255,255,${op * 0.5})`;
        ctx!.fill();
      }
      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      id="auth-stars-canvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
