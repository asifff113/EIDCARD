"use client";

import { useState, useEffect } from "react";

/* ── Types & Data ──────────────────────────────────── */
interface Artwork {
  id: number;
  room: number;
  title: string;
  ar: string;
  tag: string;
  size: "tall" | "med" | "sq" | "wide";
  verse: string;
  accent: string;
  bg: string;
  desc: string;
  frame: "dark" | "gold" | "green";
}

const ARTWORKS: Artwork[] = [
  {
    id: 1, room: 1, title: "Golden Mosque at Dawn", ar: "المسجد الذهبي",
    tag: "Sacred Architecture", size: "tall", verse: "Peace be upon this blessed morning",
    accent: "#c9a84c", bg: "linear-gradient(160deg,#0e0c20,#1a1030,#281800)",
    desc: "The golden minarets pierce the pre-dawn sky as the call to Fajr prayer echoes across rooftops. This is the morning of Eid \u2014 the most sacred of dawns.",
    frame: "dark",
  },
  {
    id: 2, room: 1, title: "Cosmic Blessing", ar: "البركة الكونية",
    tag: "Celestial", size: "med", verse: "Written in the stars",
    accent: "#c084fc", bg: "linear-gradient(145deg,#060010,#100028,#040018)",
    desc: "The universe itself pauses to celebrate. Nebulae bloom across the holy night sky, each star a witness to the blessings of Eid.",
    frame: "dark",
  },
  {
    id: 3, room: 1, title: "Crescent & Morning Star", ar: "الهلال ونجم الصبح",
    tag: "Classic", size: "sq", verse: "Guide me to your light",
    accent: "#e8e0ff", bg: "linear-gradient(145deg,#020408,#040816,#020406)",
    desc: "The eternal symbols of faith \u2014 crescent and star \u2014 observed by generations of believers across fourteen centuries of Eid mornings.",
    frame: "dark",
  },
  {
    id: 4, room: 1, title: "Lantern Procession", ar: "موكب الفوانيس",
    tag: "Festive", size: "wide", verse: "Light upon light",
    accent: "#ff9f43", bg: "linear-gradient(145deg,#0e0800,#1e1000,#080400)",
    desc: "A procession of Ramadan lanterns swaying in the night breeze, their warm glow painting every face in gold on the eve of Eid.",
    frame: "gold",
  },
  {
    id: 5, room: 1, title: "Aurora Prayer", ar: "صلاة الشفق",
    tag: "Celestial", size: "tall", verse: "Colours of the sacred sky",
    accent: "#22d3ee", bg: "linear-gradient(145deg,#000818,#001530,#000410)",
    desc: "Northern lights shimmer above the horizon as families rise for the Eid prayer, the sky itself draped in heavenly colours.",
    frame: "dark",
  },
  {
    id: 6, room: 1, title: "Kaaba at Night", ar: "الكعبة في الليل",
    tag: "Holy", size: "med", verse: "Heart of the world",
    accent: "#d4a030", bg: "linear-gradient(160deg,#040406,#0a0a0e,#030305)",
    desc: "The Kaaba \u2014 black draped in golden Quranic calligraphy \u2014 stands as the spiritual axis of 1.8 billion hearts. On Eid, they turn as one.",
    frame: "gold",
  },
  {
    id: 7, room: 2, title: "Bismillah", ar: "بسم الله الرحمن الرحيم",
    tag: "Calligraphy", size: "med", verse: "In the name of Allah, the Most Gracious",
    accent: "#e8c070", bg: "linear-gradient(145deg,#080010,#120018,#040008)",
    desc: "The most beautiful opening in the Arabic language \u2014 Bismillah \u2014 rendered in flowing gold calligraphy by masters of the art.",
    frame: "gold",
  },
  {
    id: 8, room: 2, title: "Sacred Mandala", ar: "المندالا المقدسة",
    tag: "Islamic Geometry", size: "tall", verse: "In perfect harmony",
    accent: "#a855f7", bg: "linear-gradient(145deg,#0c0820,#180f38,#0a0618)",
    desc: "Infinite geometric patterns spiral inward toward the divine centre \u2014 the sacred mandala of Islamic art at its most transcendent.",
    frame: "dark",
  },
  {
    id: 9, room: 2, title: "Moroccan Zellige", ar: "الزليج المغربي",
    tag: "Geometric Art", size: "sq", verse: "Beauty in every pattern",
    accent: "#60b4ff", bg: "linear-gradient(145deg,#040c16,#081828,#020810)",
    desc: "Inspired by centuries of Moroccan zellige tilework \u2014 intricate interlocking diamonds and stars that have adorned holy spaces across the Islamic world.",
    frame: "dark",
  },
  {
    id: 10, room: 2, title: "Taqabbal Allahu", ar: "تقبل الله منا ومنكم",
    tag: "Calligraphy", size: "wide", verse: "May Allah accept from us and from you",
    accent: "#26d0ce", bg: "linear-gradient(145deg,#001012,#002020,#000810)",
    desc: "The traditional Eid greeting exchanged between Muslims \u2014 rendered in flowing teal calligraphy \u2014 carries the warmth of a thousand generations.",
    frame: "dark",
  },
  {
    id: 11, room: 2, title: "Date Palm Eden", ar: "نخلة الجنة",
    tag: "Nature", size: "med", verse: "Sweet as Eid itself",
    accent: "#86efac", bg: "linear-gradient(145deg,#030e00,#071a00,#020a00)",
    desc: "The date palm \u2014 provider of the sweetest Iftar, symbol of generosity and abundance \u2014 stands tall on Eid morning, its fruits the first taste of celebration.",
    frame: "green",
  },
  {
    id: 12, room: 2, title: "Prayer Beads", ar: "مسبحة الذكر",
    tag: "Devotional", size: "sq", verse: "Subhanallah \u00b7 Alhamdulillah \u00b7 Allahu Akbar",
    accent: "#e8a060", bg: "linear-gradient(145deg,#100800,#201000,#080400)",
    desc: "Ninety-nine amber beads worn smooth by decades of remembrance \u2014 each one a name of Allah, each one a prayer on the morning of Eid.",
    frame: "gold",
  },
];

const FRAMES = {
  dark: { outer: "#1a120a", inner: "#2a1e10", mat: "#f5f0e8", strip: "#3a2810" },
  gold: { outer: "#5a3c08", inner: "#8a6020", mat: "#f8f4ec", strip: "#c9a040" },
  green: { outer: "#1a2a14", inner: "#2a4020", mat: "#f0f5ee", strip: "#4a7030" },
};

/* ── Moon SVG (deterministic IDs) ──────────────────── */
function MoonSVG({ accent, size = 44, blur = 4, uid }: { accent: string; size?: number; blur?: number; uid: string }) {
  const id = `moon-${uid}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id={id}>
          <feGaussianBlur stdDeviation={blur} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={`M${size * 0.6},${size * 0.1} A${size * 0.38},${size * 0.38} 0 1,0 ${size * 0.6},${size * 0.9} A${size * 0.26},${size * 0.26} 0 1,1 ${size * 0.6},${size * 0.1}Z`}
        fill={accent}
        filter={`url(#${id})`}
      />
      <circle cx={size * 0.7} cy={size * 0.15} r={size * 0.065} fill={accent} />
    </svg>
  );
}

/* ── Artwork Card (uses CSS classes from globals.css) ── */
function ArtworkCard({ art, onClick }: { art: Artwork; onClick: () => void }) {
  const f = FRAMES[art.frame];

  return (
    <div
      className={`artwork ${art.size}`}
      style={{ animationDelay: `${(art.id - 1) * 0.1}s` }}
      onClick={onClick}
    >
      {/* Hanging wire */}
      <div className="wire">
        <svg width="120" height="24" viewBox="0 0 120 24">
          <path d="M10,2 Q60,24 110,2" fill="none" stroke="#8a7050" strokeWidth="1.2" opacity=".5" />
          <circle cx="10" cy="2" r="3" fill="#6a5030" opacity=".6" />
          <circle cx="110" cy="2" r="3" fill="#6a5030" opacity=".6" />
        </svg>
      </div>

      {/* Frame */}
      <div className="frame-shadow">
        <div className="frame-outer" style={{ background: f.outer, outline: `1px solid ${f.strip}20` }}>
          {/* Frame border detail */}
          <div style={{ position: "absolute", inset: "3px", border: `1px solid ${f.strip}40`, pointerEvents: "none", zIndex: 2 }} />
          <div className="frame-inner-border" style={{ background: f.inner }}>
            <div className="mat" style={{ background: f.mat }}>
              <div className="art-piece">
                <div className="art-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                  <div
                    style={{
                      width: "100%", height: "100%", background: art.bg,
                      position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                      flexDirection: "column", textAlign: "center", padding: "20px", overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <MoonSVG accent={art.accent} size={44} blur={4} uid={`card-${art.id}`} />
                      <div
                        style={{
                          fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
                          fontSize: "clamp(18px, 2.5vw, 28px)",
                          fontStyle: "italic", color: art.accent,
                          textShadow: `0 0 30px ${art.accent}50`,
                          marginTop: "10px", lineHeight: 1.1,
                        }}
                      >
                        Eid<br />Mubarak
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-amiri), 'Amiri', serif",
                          fontSize: "clamp(13px, 1.8vw, 18px)",
                          direction: "rtl", color: art.accent, opacity: 0.7, marginTop: "6px",
                        }}
                      >
                        {art.ar}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plaque */}
      <div className="plaque">
        <div className="plaque-line" />
        <div className="plaque-title">{art.title}</div>
        <div className="plaque-ar">{art.ar}</div>
        <div className="plaque-meta">{art.tag} · No. {String(art.id).padStart(2, "0")}</div>
      </div>
    </div>
  );
}

/* ── Main Gallery Page ─────────────────────────────── */
export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<Artwork | null>(null);
  const room1 = ARTWORKS.filter((a) => a.room === 1);
  const room2 = ARTWORKS.filter((a) => a.room === 2);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="gallery-page min-h-screen">
      {/* Texture overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 30% 20%, rgba(255,240,180,.12), transparent),
            radial-gradient(ellipse 50% 35% at 70% 60%, rgba(255,240,180,.12), transparent),
            radial-gradient(ellipse 40% 30% at 50% 85%, rgba(255,240,180,.06), transparent)
          `,
        }}
      />

      {/* Nav */}
      <nav className="museum-nav">
        <a
          href="/gallery"
          style={{ fontFamily: "var(--font-libre), 'Libre Baskerville', serif", fontSize: "17px", color: "#d4a84c", textDecoration: "none", letterSpacing: "1px" }}
        >
          <em>Eid Mubarak</em> Gallery
        </a>
        <div className="flex gap-8 max-[640px]:hidden">
          {[
            { label: "Royal", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Cinematic", href: "/cinematic" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-jost), 'Jost', sans-serif",
                fontSize: "11px", letterSpacing: "3px", color: "#9a8060",
                textDecoration: "none", textTransform: "uppercase", transition: "color .2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a84c"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9a8060"; }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          className="max-[640px]:hidden"
          style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "10px", letterSpacing: "2px", color: "#5a4830", textTransform: "uppercase" }}
        >
          Permanent Collection · 1446 AH
        </div>
      </nav>

      {/* Entrance */}
      <div className="entrance">
        <div className="arch" />
        <div
          className="animate-[fadeUp_.6s_ease_both_.1s]"
          style={{
            fontFamily: "var(--font-jost), 'Jost', sans-serif",
            fontSize: "10px", letterSpacing: "6px", color: "rgba(212,168,76,.4)",
            textTransform: "uppercase", marginBottom: "24px",
            background: "rgba(0,0,0,.3)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(212,168,76,.3)", borderRadius: "40px",
            padding: "8px 24px", display: "inline-block",
          }}
        >
          ✦ &nbsp;The Eid Mubarak Collection&nbsp; ✦
        </div>
        <div
          className="animate-[fadeUp_.8s_ease_both_.2s]"
          style={{
            fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
            fontSize: "clamp(44px, 9vw, 110px)", fontStyle: "italic", fontWeight: 400,
            color: "#d4a84c", lineHeight: ".88", letterSpacing: "-1px",
            marginBottom: "12px", textShadow: "0 0 80px rgba(212,168,76,.2)",
          }}
        >
          A Gallery<br />of Blessings
        </div>
        <div
          className="animate-[fadeUp_.8s_ease_both_.35s]"
          style={{
            fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
            fontSize: "clamp(16px, 3vw, 32px)", color: "rgba(255,255,255,.3)",
            letterSpacing: "8px", textTransform: "uppercase", fontWeight: 400,
          }}
        >
          Eid Al-Fitr · 1446 Hijri
        </div>
        <div
          className="animate-[fadeUp_.8s_ease_both_.45s]"
          style={{
            fontFamily: "var(--font-amiri), 'Amiri', serif",
            fontSize: "clamp(24px, 4.5vw, 56px)", color: "#d4a84c",
            direction: "rtl", opacity: 0.65, marginTop: "16px",
          }}
        >
          عيد مبارك سعيد
        </div>
        <div className="flex items-center gap-5 mt-7 animate-[fadeUp_.8s_ease_both_.5s]">
          <div className="h-px w-20" style={{ background: "rgba(212,168,76,.25)" }} />
          <div className="w-1.5 h-1.5 rotate-45 opacity-40" style={{ background: "#d4a84c" }} />
          <div className="h-px w-20" style={{ background: "linear-gradient(270deg, rgba(212,168,76,.25), transparent)" }} />
        </div>
        <button
          className="animate-[fadeUp_.8s_ease_both_.6s]"
          style={{
            padding: "14px 40px", background: "transparent",
            border: "1px solid rgba(212,168,76,.3)", color: "#d4a84c",
            fontFamily: "var(--font-jost), 'Jost', sans-serif",
            fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase",
            cursor: "pointer", transition: "all .35s", marginTop: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,168,76,.1)";
            e.currentTarget.style.borderColor = "#d4a84c";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(212,168,76,.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={() => document.getElementById("gallery-room-1")?.scrollIntoView({ behavior: "smooth" })}
        >
          Enter the Gallery
        </button>
      </div>

      {/* Gallery Info Bar */}
      <div className="gallery-info">
        <div>
          <div style={{ fontFamily: "var(--font-libre), 'Libre Baskerville', serif", fontSize: "20px", fontStyle: "italic" }}>
            The Eid Collection
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#5a5040", textTransform: "uppercase", marginTop: "4px" }}>
            Permanent Exhibition · Islamic Art & Calligraphy
          </div>
        </div>
        <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#5a5040", textTransform: "uppercase", maxWidth: "400px", lineHeight: 1.6 }}>
          A curated collection of twelve original Eid greeting artworks spanning calligraphy, geometry, sacred architecture, and celestial imagery.
        </div>
        <div style={{ fontFamily: "var(--font-libre), 'Libre Baskerville', serif", fontSize: "40px", color: "rgba(0,0,0,.08)", fontStyle: "italic" }}>
          {ARTWORKS.length}
        </div>
      </div>

      {/* Gallery Room 1 */}
      <div id="gallery-room-1" className="gallery-room">
        <div
          className="flex items-center gap-4 mb-12"
          style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "#5a5040" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
          Gallery I — Sacred Architecture & Celestial
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
        </div>
        <div className="wall">
          {room1.map((art) => (
            <ArtworkCard key={art.id} art={art} onClick={() => setLightbox(art)} />
          ))}
        </div>
      </div>

      {/* Room Divider */}
      <div className="room-div">
        <div style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>
          · · · Gallery Passage · · ·
        </div>
      </div>

      {/* Gallery Room 2 */}
      <div className="gallery-room" style={{ background: "#e8e2d8" }}>
        <div
          className="flex items-center gap-4 mb-12"
          style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "#5a5040" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
          Gallery II — Calligraphy & Geometric Art
          <div className="h-px flex-1" style={{ background: "rgba(0,0,0,.1)" }} />
        </div>
        <div className="wall">
          {room2.map((art) => (
            <ArtworkCard key={art.id} art={art} onClick={() => setLightbox(art)} />
          ))}
        </div>
      </div>

      {/* Museum Footer */}
      <div className="museum-foot">
        <div>
          <div style={{ fontFamily: "var(--font-libre), 'Libre Baskerville', serif", fontSize: "22px", fontStyle: "italic", color: "#d4a84c" }}>
            Eid Mubarak Gallery
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#3a2a14", textTransform: "uppercase", marginTop: "6px" }}>
            Permanent Collection · 1446 AH · All Blessings Reserved
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-amiri), 'Amiri', serif", fontSize: "28px", direction: "rtl", color: "#d4a84c", opacity: 0.55 }}>
          عيد مبارك سعيد
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#3a2a14", textTransform: "uppercase", lineHeight: 2.2 }}>
            COLLECTION<br />CALLIGRAPHY<br />SACRED ART
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lbg"
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
        >
          <div
            className="lbox"
            style={{ boxShadow: `0 0 30px ${lightbox.accent}40, 0 60px 180px rgba(0,0,0,.9), 0 0 0 1px ${lightbox.accent}15` }}
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div className="lb-art" style={{ background: lightbox.bg }}>
                <div style={{ padding: "40px", textAlign: "center", position: "relative", zIndex: 2 }}>
                  <MoonSVG accent={lightbox.accent} size={72} blur={6} uid={`lb-${lightbox.id}`} />
                  <div
                    style={{
                      fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
                      fontSize: "52px", fontStyle: "italic", color: lightbox.accent,
                      textShadow: `0 0 60px ${lightbox.accent}40`,
                      lineHeight: ".9", marginTop: "12px",
                    }}
                  >
                    Eid<br />Mubarak
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-amiri), 'Amiri', serif",
                      fontSize: "30px", direction: "rtl", color: lightbox.accent,
                      opacity: 0.7, marginTop: "10px",
                    }}
                  >
                    {lightbox.ar}
                  </div>
                </div>
              </div>
            </div>
            <div className="lb-info">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-jost), 'Jost', sans-serif",
                    fontSize: "9px", letterSpacing: "4px", textTransform: "uppercase",
                    color: `${lightbox.accent}80`, marginBottom: "14px",
                  }}
                >
                  {lightbox.tag} · 1446 AH
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
                    fontSize: "28px", fontStyle: "italic", color: lightbox.accent,
                    lineHeight: 1.1, marginBottom: "12px",
                  }}
                >
                  {lightbox.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-amiri), 'Amiri', serif",
                    fontSize: "26px", direction: "rtl", color: lightbox.accent,
                    opacity: 0.65, marginBottom: "20px", lineHeight: 1.4,
                  }}
                >
                  {lightbox.ar}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jost), 'Jost', sans-serif",
                    fontSize: "13px", color: "#5a4020", lineHeight: 1.85,
                    flex: 1, marginBottom: "20px",
                    borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: "16px",
                  }}
                >
                  {lightbox.desc}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-libre), 'Libre Baskerville', serif",
                    fontSize: "12px", fontStyle: "italic", color: "#3a2a10",
                    marginBottom: "24px",
                  }}
                >
                  &ldquo;{lightbox.verse}&rdquo;
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="lbbtn ghost" onClick={() => setLightbox(null)}>Close</button>
                <button
                  className="lbbtn primary"
                  onClick={async () => {
                    if (navigator.share) {
                      await navigator.share({ title: "Eid Mubarak!", text: lightbox.desc.slice(0, 100), url: window.location.href });
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
