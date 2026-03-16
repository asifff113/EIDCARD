"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Scene data ──────────────────────────────────── */
interface Scene {
  id: number;
  tag: string;
  title: string;
  ar: string;
  verse: string;
  layout: string;
  bg: string;
  accent: string;
  desc: string;
}

const SCENES: Scene[] = [
  {
    id: 1, tag: "Sacred", title: "Golden Mosque", ar: "المسجد الذهبي",
    verse: "Peace on this blessed morning", layout: "cinematic-left",
    bg: "linear-gradient(135deg,#0e0c20 0%,#1a1030 40%,#2a1800 100%)",
    accent: "#c9a84c",
    desc: "The golden minarets rise at dawn \u2014 the call to prayer echoing across rooftops as Eid morning unfolds.",
  },
  {
    id: 2, tag: "Celestial", title: "Nebula Blessing", ar: "سديم البركة",
    verse: "Written in the stars", layout: "centered-massive",
    bg: "linear-gradient(145deg,#060010 0%,#10002a 50%,#040018 100%)",
    accent: "#c084fc",
    desc: "The universe pauses to celebrate \u2014 galaxies spiral and nebulae bloom across the holy night sky.",
  },
  {
    id: 3, tag: "Festive", title: "Lantern Night", ar: "ليلة الفوانيس",
    verse: "Light upon light", layout: "right-focus",
    bg: "linear-gradient(145deg,#0e0800 0%,#1e1000 50%,#080400 100%)",
    accent: "#ff9f43",
    desc: "A hundred lanterns swaying in the night breeze, their warm glow painting every face in gold.",
  },
  {
    id: 4, tag: "Spiritual", title: "Sacred Mandala", ar: "المندالا المقدسة",
    verse: "In perfect harmony", layout: "full-mandala",
    bg: "linear-gradient(145deg,#08061a 0%,#120c30 50%,#060418 100%)",
    accent: "#a855f7",
    desc: "Infinite geometry \u2014 each line a prayer, each circle a breath of gratitude on the morning of Eid.",
  },
  {
    id: 5, tag: "Classic", title: "Crescent & Star", ar: "النجم والهلال",
    verse: "Guide me to your light", layout: "centered-minimal",
    bg: "linear-gradient(160deg,#020408 0%,#04081a 60%,#020406 100%)",
    accent: "#e8e0ff",
    desc: "The eternal symbols of faith \u2014 crescent and star \u2014 shining bright against the infinite night.",
  },
  {
    id: 6, tag: "Nature", title: "Date Palm", ar: "نخلة التمر",
    verse: "Sweet as Eid itself", layout: "split-art",
    bg: "linear-gradient(145deg,#030e00 0%,#071a00 50%,#020a00 100%)",
    accent: "#86efac",
    desc: "Beneath the shade of the date palm, families gather. Iftar ended. Eid begins. The sweetest fruit on the sweetest day.",
  },
  {
    id: 7, tag: "Holy", title: "Kaaba Night", ar: "الكعبة المشرفة",
    verse: "Heart of the world", layout: "dramatic-full",
    bg: "linear-gradient(160deg,#040406 0%,#0a0a0e 60%,#030305 100%)",
    accent: "#d4a030",
    desc: "The Kaaba \u2014 black draped in golden calligraphy \u2014 stands as the spiritual axis of 1.8 billion hearts. On Eid, they turn as one.",
  },
  {
    id: 8, tag: "Dreamy", title: "Rose Rain", ar: "مطر الورد",
    verse: "Mercy falls like petals", layout: "portrait-center",
    bg: "linear-gradient(145deg,#1a0010 0%,#300020 50%,#100008 100%)",
    accent: "#f472b6",
    desc: "Like rose petals falling from the sky \u2014 each one a mercy, each one a blessing on the night of Eid.",
  },
];

/* ── Deterministic star positions ────────────────── */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  cx: ((i * 137.508) % 400).toFixed(1),
  cy: ((i * 97.33 + 15) % 400).toFixed(1),
  r: (0.3 + (i % 7) * 0.25).toFixed(1),
  op: (0.1 + (i % 10) * 0.08).toFixed(2),
  dur: (2 + (i % 5) * 0.8).toFixed(1),
  delay: (i * 0.21 % 3).toFixed(1),
}));

const KAABA_STARS = Array.from({ length: 80 }, (_, i) => ({
  cx: ((i * 123.456) % 400).toFixed(1),
  cy: ((i * 67.89 + 10) % 200).toFixed(1),
  r: (0.3 + (i % 5) * 0.2).toFixed(1),
  op: (0.1 + (i % 8) * 0.06).toFixed(2),
  dur: (3 + (i % 4) * 1).toFixed(1),
  delay: (i * 0.31 % 4).toFixed(1),
}));

/* ── SVG Visual Components ────────────────────────── */
function MosqueVisual({ accent }: { accent: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 500" preserveAspectRatio="xMidYMax meet" className="absolute bottom-0">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity=".95" />
          <stop offset="100%" stopColor={accent} stopOpacity=".3" />
        </linearGradient>
        <filter id="f1"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <ellipse cx="300" cy="195" rx="55" ry="52" fill="url(#g1)" filter="url(#f1)" />
      <rect x="245" y="195" width="110" height="305" fill={accent} opacity=".55" />
      <ellipse cx="165" cy="240" rx="38" ry="35" fill={accent} opacity=".45" />
      <rect x="127" y="240" width="76" height="260" fill={accent} opacity=".38" />
      <ellipse cx="435" cy="240" rx="38" ry="35" fill={accent} opacity=".45" />
      <rect x="397" y="240" width="76" height="260" fill={accent} opacity=".38" />
      <rect x="88" y="125" width="14" height="375" fill={accent} opacity=".5" />
      <ellipse cx="95" cy="125" rx="10" ry="16" fill={accent} opacity=".65" />
      <path d="M90,106 A8,10 0 0,1 100,106 A5,6 0 0,0 90,106Z" fill={accent} />
      <rect x="498" y="125" width="14" height="375" fill={accent} opacity=".5" />
      <ellipse cx="505" cy="125" rx="10" ry="16" fill={accent} opacity=".65" />
      <path d="M500,106 A8,10 0 0,1 510,106 A5,6 0 0,0 500,106Z" fill={accent} />
      <path d="M262,310 A38,42 0 0,1 338,310 L338,500 L262,500Z" fill={accent} opacity=".2" />
      <rect x="0" y="496" width="600" height="4" fill={accent} opacity=".2" />
    </svg>
  );
}

function LanternVisual({ accent }: { accent: string }) {
  const lanterns = [0, 55, 110, 165, 220, 275, 330];
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 500" className="absolute inset-0" style={{ opacity: 0.85 }}>
      {lanterns.map((xBase, i) => {
        const x = 30 + xBase * 0.535;
        const y = 40 + Math.sin(i * 1.3) * 30;
        const w = 36;
        const h = 100;
        return (
          <g key={i} transform={`translate(${x},${y})`}>
            <line x1={w / 2} y1="0" x2={w / 2} y2="12" stroke={accent} strokeWidth="1.5" opacity=".6" />
            <path d={`M${w * 0.15},12 L${w * 0.85},12 L${w * 0.95},${h * 0.22} L${w * 0.05},${h * 0.22}Z`} fill={accent} opacity=".8" />
            <path d={`M${w * 0.05},${h * 0.22} C0,${h * 0.5} 0,${h * 0.75} ${w * 0.1},${h * 0.88} L${w * 0.2},${h * 1.02} L${w * 0.8},${h * 1.02} L${w * 0.9},${h * 0.88} C${w},${h * 0.75} ${w},${h * 0.5} ${w * 0.95},${h * 0.22}Z`} fill={accent} opacity=".65" />
            <ellipse cx={w / 2} cy={h * 0.24} rx="5" ry="8" fill={accent} opacity=".9" style={{ animation: `candleFlame ${1.4 + i * 0.2}s ease-in-out infinite` }} />
            <ellipse cx={w / 2} cy={h * 0.22} rx="3" ry="5" fill="white" opacity=".5" style={{ animation: `candleFlame ${1.4 + i * 0.2}s ease-in-out infinite .4s` }} />
            <path d={`M${w * 0.2},${h * 1.02} L${w * 0.15},${h * 1.12} L${w * 0.85},${h * 1.12} L${w * 0.8},${h * 1.02}Z`} fill={accent} opacity=".8" />
          </g>
        );
      })}
    </svg>
  );
}

function MandalaVisual({ accent }: { accent: string }) {
  return (
    <svg width="100%" height="100%" viewBox="-200 -200 400 400" className="absolute inset-0" style={{ opacity: 0.22, animation: "rotateSlow 50s linear infinite" }}>
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} transform={`rotate(${i * (360 / 16)})`}>
          <line x1="0" y1="20" x2="0" y2="170" stroke={accent} strokeWidth=".6" opacity=".5" />
          <ellipse cx="0" cy="100" rx="10" ry="22" fill="none" stroke={accent} strokeWidth=".5" opacity=".4" />
          <circle cx="0" cy="170" r="5" fill={accent} opacity=".3" />
        </g>
      ))}
      <circle cx="0" cy="0" r="18" fill="none" stroke={accent} strokeWidth=".8" />
      <circle cx="0" cy="0" r="50" fill="none" stroke={accent} strokeWidth=".4" opacity=".4" />
      <circle cx="0" cy="0" r="100" fill="none" stroke={accent} strokeWidth=".3" opacity=".3" />
      <circle cx="0" cy="0" r="155" fill="none" stroke={accent} strokeWidth=".25" opacity=".2" />
    </svg>
  );
}

function CrescentStarVisual({ accent }: { accent: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
      <defs>
        <filter id="csf"><feGaussianBlur stdDeviation="8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {STARS.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op} style={{ animation: `twinkle ${s.dur}s ease-in-out infinite ${s.delay}s` }} />
      ))}
      <path d="M220,60 A110,110 0 1,0 220,340 A76,76 0 1,1 220,60Z" fill={accent} filter="url(#csf)" opacity=".9" />
      <circle cx="240" cy="74" r="18" fill={accent} />
      <polygon points="310,140 317,162 340,162 322,176 329,198 310,184 291,198 298,176 280,162 303,162" fill={accent} opacity=".85" style={{ animation: "starPulse 3s ease-in-out infinite" }} />
    </svg>
  );
}

function DatePalmVisual({ accent }: { accent: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 350 500" className="absolute bottom-0 right-0" style={{ height: "85%" }}>
      <rect x="162" y="260" width="26" height="240" rx="6" fill={accent} opacity=".4" />
      <path d="M175,260 Q110,180 60,140 Q110,165 160,220 Q110,150 95,90 Q140,155 172,230 Q150,145 148,60 Q168,150 174,228 Q178,148 198,60 Q196,145 178,230 Q210,155 255,90 Q240,150 190,220 Q240,165 290,140 Q245,180 175,260Z" fill={accent} opacity=".72" />
      <circle cx="172" cy="262" r="11" fill={accent} />
      <circle cx="182" cy="268" r="10" fill={accent} opacity=".8" />
      <circle cx="167" cy="274" r="9" fill={accent} opacity=".7" />
      <circle cx="178" cy="278" r="8" fill={accent} opacity=".6" />
    </svg>
  );
}

function KaabaVisual({ accent }: { accent: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0" style={{ opacity: 0.7 }}>
      {KAABA_STARS.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={accent} opacity={s.op} style={{ animation: `twinkle ${s.dur}s ease-in-out infinite ${s.delay}s` }} />
      ))}
      <rect x="120" y="160" width="160" height="240" fill="#0a0a0a" stroke={accent} strokeWidth="1.5" />
      <rect x="120" y="210" width="160" height="24" fill={accent} opacity=".5" />
      <rect x="176" y="216" width="48" height="184" fill={accent} opacity=".2" rx="3" />
      <polygon points="100,160 300,160 280,136 120,136" fill="#141414" stroke={accent} strokeWidth="1" />
      <polygon points="280,160 300,160 300,400 280,400" fill="#080808" stroke={accent} strokeWidth=".8" />
      <text x="200" y="226" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="9" fill={accent} opacity=".9">الله أكبر</text>
      <text x="200" y="238" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="7" fill={accent} opacity=".7">لا إله إلا الله</text>
    </svg>
  );
}

/* ── Canvas Effects ──────────────────────────────── */
function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    function resize() { cv!.width = window.innerWidth; cv!.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    const S = Array.from({ length: 200 }, (_, i) => ({
      x: ((i * 137.508 + 50) % cv.width) || Math.random() * cv.width,
      y: ((i * 97.33 + 20) % cv.height) || Math.random() * cv.height,
      r: 0.2 + (i % 8) * 0.18, ph: i * 0.5, sp: 0.003 + (i % 10) * 0.001,
      gold: i % 9 === 0,
    }));
    let t = 0;
    let anim: number;
    function draw() {
      ctx!.clearRect(0, 0, cv!.width, cv!.height);
      S.forEach((s) => {
        const op = 0.1 + 0.9 * (0.5 + 0.5 * Math.sin(t * s.sp * 60 + s.ph));
        ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.gold ? `rgba(201,168,76,${op * 0.7})` : `rgba(200,200,255,${op * 0.5})`;
        ctx!.fill();
      });
      t += 0.016; anim = requestAnimationFrame(draw);
    }
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(anim); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0" />;
}

function NebulaCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const par = cv.parentElement;
    function resize() { cv!.width = par?.offsetWidth || 800; cv!.height = par?.offsetHeight || 600; }
    resize();
    const P = Array.from({ length: 120 }, (_, i) => ({
      x: ((i * 123.456 + 30) % cv.width), y: ((i * 67.89 + 10) % cv.height),
      r: 0.3 + (i % 7) * 0.3, vx: (((i * 17) % 30) - 15) * 0.01, vy: (((i * 13) % 30) - 15) * 0.01,
      ph: i * 0.4, sp: 0.002 + (i % 8) * 0.001, hue: 260 + (i % 12) * 5,
    }));
    let t = 0;
    let anim: number;
    function draw() {
      ctx!.fillStyle = "rgba(6,0,16,.08)"; ctx!.fillRect(0, 0, cv!.width, cv!.height);
      P.forEach((p) => {
        const op = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * p.sp * 60 + p.ph));
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue},80%,70%,${op})`; ctx!.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = cv!.width; if (p.x > cv!.width) p.x = 0;
        if (p.y < 0) p.y = cv!.height; if (p.y > cv!.height) p.y = 0;
      });
      t += 0.016; anim = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(anim); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

function RainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const par = cv.parentElement;
    function resize() { cv!.width = par?.offsetWidth || 800; cv!.height = par?.offsetHeight || 600; }
    resize();
    const drops = Array.from({ length: 60 }, (_, i) => ({
      x: ((i * 137.5 + 20) % cv.width), y: ((i * 87.3 + 10) % cv.height),
      s: 4 + (i % 8) * 1.5, vy: 0.4 + (i % 6) * 0.2, op: 0.2 + (i % 5) * 0.12,
    }));
    let anim: number;
    function draw() {
      ctx!.clearRect(0, 0, cv!.width, cv!.height);
      drops.forEach((d) => {
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.s / 2, Math.PI, 0);
        ctx!.arc(d.x, d.y + d.s * 0.3, d.s * 0.35, 0, Math.PI);
        ctx!.fillStyle = `rgba(244,114,182,${d.op})`; ctx!.fill();
        d.y += d.vy;
        if (d.y > cv!.height + 20) { d.y = -20; d.x = ((d.x + 137.5) % cv!.width); }
      });
      anim = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(anim); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ── Scene Content Layouts ────────────────────────── */
function SceneContent({ scene }: { scene: Scene }) {
  const italiana = "var(--font-italiana), 'Italiana', serif";
  const cormorant = "var(--font-cormorant), 'Cormorant Garamond', serif";
  const amiri = "var(--font-amiri), 'Amiri', serif";
  const a = scene.accent;

  switch (scene.layout) {
    case "cinematic-left":
      return (
        <div className="relative z-[1] w-full h-full flex items-center">
          <div className="flex-1 px-[60px] py-20 z-[2] relative max-[700px]:px-6">
            <div className="text-[10px] tracking-[5px] uppercase mb-5" style={{ color: a, opacity: 0.7 }}>{scene.tag}</div>
            <div className="mb-4 leading-[.88]" style={{ fontFamily: italiana, fontSize: "clamp(52px,8vw,110px)", color: a, textShadow: `0 0 80px ${a}40` }}>{scene.title}</div>
            <div className="mb-6" style={{ fontFamily: amiri, fontSize: "clamp(22px,3.5vw,42px)", direction: "rtl", color: a, opacity: 0.7 }}>{scene.ar}</div>
            <div className="w-[60px] h-px mb-5" style={{ background: a, opacity: 0.4 }} />
            <div className="text-[14px] leading-[1.9] max-w-[380px]" style={{ color: "rgba(255,255,255,.4)" }}>{scene.desc}</div>
            <div className="mt-6 text-[10px] tracking-[3px] uppercase italic" style={{ color: a, opacity: 0.4 }}>&ldquo;{scene.verse}&rdquo;</div>
          </div>
          <div className="absolute right-0 top-0 w-[55%] h-full" style={{ opacity: 0.6 }}>
            <MosqueVisual accent={a} />
          </div>
        </div>
      );

    case "centered-massive":
      return (
        <div className="relative z-[1] text-center p-10">
          <NebulaCanvas />
          <div className="relative z-[2]">
            <div className="mb-2.5 leading-[.88]" style={{ fontFamily: italiana, fontSize: "clamp(60px,12vw,140px)", color: a, textShadow: `0 0 100px ${a}60` }}>Eid Mubarak</div>
            <div className="mb-5" style={{ fontFamily: amiri, fontSize: "clamp(24px,4vw,50px)", direction: "rtl", color: a, opacity: 0.65 }}>{scene.ar}</div>
            <div className="text-[10px] tracking-[5px] uppercase" style={{ color: "rgba(255,255,255,.2)" }}>{scene.verse}</div>
          </div>
        </div>
      );

    case "right-focus":
      return (
        <div className="relative z-[1] w-full h-full flex items-end">
          <LanternVisual accent={a} />
          <div className="absolute left-[60px] top-1/2 -translate-y-1/2 z-[3] max-w-[380px] max-[700px]:left-6">
            <div className="text-[9px] tracking-[5px] uppercase mb-4" style={{ color: a, opacity: 0.6 }}>{scene.tag}</div>
            <div className="mb-4 leading-[.9]" style={{ fontFamily: cormorant, fontSize: "clamp(40px,6vw,82px)", fontWeight: 300, fontStyle: "italic", color: "white" }}>{scene.title}</div>
            <div className="mb-5" style={{ fontFamily: amiri, fontSize: "clamp(20px,3vw,36px)", color: a, direction: "rtl" }}>{scene.ar}</div>
            <div className="text-[13px] leading-[1.9] max-w-[320px]" style={{ color: "rgba(255,255,255,.35)" }}>{scene.desc}</div>
          </div>
        </div>
      );

    case "full-mandala":
      return (
        <div className="relative z-[1] text-center">
          <MandalaVisual accent={a} />
          <div className="relative z-[2]">
            <div className="mb-3 tracking-[8px] uppercase" style={{ fontFamily: cormorant, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 300, color: a, opacity: 0.7 }}>{scene.tag}</div>
            <div className="mb-2.5 leading-[.88]" style={{ fontFamily: italiana, fontSize: "clamp(54px,10vw,120px)", color: "white" }}>{scene.title}</div>
            <div className="mb-5" style={{ fontFamily: amiri, fontSize: "clamp(26px,4vw,52px)", direction: "rtl", color: a, opacity: 0.75 }}>{scene.ar}</div>
            <div className="text-[10px] tracking-[4px] uppercase italic" style={{ color: "rgba(255,255,255,.2)" }}>{scene.verse}</div>
          </div>
        </div>
      );

    case "centered-minimal":
      return (
        <div className="relative z-[1] text-center p-10">
          <CrescentStarVisual accent={a} />
          <div className="relative z-[2]" style={{ marginTop: "-60px" }}>
            <div className="leading-[.88] mb-2" style={{ fontFamily: cormorant, fontSize: "clamp(50px,9vw,110px)", fontWeight: 300, color: "white" }}>Eid <em style={{ color: a }}>Mubarak</em></div>
            <div style={{ fontFamily: amiri, fontSize: "clamp(22px,3.5vw,44px)", direction: "rtl", color: a, opacity: 0.7 }}>{scene.ar}</div>
          </div>
        </div>
      );

    case "split-art":
      return (
        <div className="relative z-[1] w-full h-full flex items-center">
          <DatePalmVisual accent={a} />
          <div className="absolute left-[64px] top-1/2 -translate-y-1/2 max-w-[400px] z-[3] max-[700px]:left-6">
            <div className="text-[9px] tracking-[5px] uppercase mb-4" style={{ color: a, opacity: 0.6 }}>{scene.tag}</div>
            <div className="mb-4 leading-[.88]" style={{ fontFamily: italiana, fontSize: "clamp(48px,8vw,96px)", color: a, textShadow: `0 0 60px ${a}40` }}>{scene.title}</div>
            <div className="mb-5" style={{ fontFamily: amiri, fontSize: "clamp(20px,3.2vw,38px)", direction: "rtl", color: a, opacity: 0.8 }}>{scene.ar}</div>
            <div className="text-[13px] leading-[1.9] max-w-[340px]" style={{ color: "rgba(255,255,255,.35)", borderLeft: `2px solid ${a}30`, paddingLeft: "16px" }}>{scene.desc}</div>
          </div>
        </div>
      );

    case "dramatic-full":
      return (
        <div className="relative z-[1] w-full h-full flex flex-col items-center justify-center text-center">
          <KaabaVisual accent={a} />
          <div className="relative z-[3] p-10">
            <div className="text-[9px] tracking-[6px] uppercase mb-5" style={{ color: a, opacity: 0.5 }}>✦ {scene.tag} ✦</div>
            <div className="mb-3 leading-[.88]" style={{ fontFamily: italiana, fontSize: "clamp(56px,10vw,124px)", color: a, textShadow: `0 0 80px ${a}50` }}>Eid Mubarak</div>
            <div className="mb-5" style={{ fontFamily: amiri, fontSize: "clamp(22px,3.5vw,46px)", direction: "rtl", color: a, opacity: 0.7 }}>{scene.ar}</div>
            <div className="text-[11px] tracking-[4px] uppercase max-w-[500px] mx-auto leading-[2]" style={{ color: "rgba(255,255,255,.2)" }}>{scene.desc}</div>
          </div>
        </div>
      );

    case "portrait-center":
      return (
        <div className="relative z-[1] text-center p-10">
          <RainCanvas />
          <div className="relative z-[2]">
            <div className="leading-[.9] mb-2.5" style={{ fontFamily: cormorant, fontSize: "clamp(48px,9vw,110px)", fontWeight: 300, fontStyle: "italic", color: a, textShadow: `0 0 80px ${a}50` }}>Eid<br />Mubarak</div>
            <div className="mb-5" style={{ fontFamily: amiri, fontSize: "clamp(22px,4vw,48px)", direction: "rtl", color: a, opacity: 0.7 }}>{scene.ar}</div>
            <div className="text-[10px] tracking-[5px] uppercase italic" style={{ color: "rgba(255,255,255,.2)" }}>{scene.verse}</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ── Main Cinematic Page ──────────────────────────── */
export default function CinematicPage() {
  const [modal, setModal] = useState<Scene | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalScenes = SCENES.length + 1; // +1 for title

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) setProgress((scrollTop / scrollHeight) * 100);

    const scenes = document.querySelectorAll(".cine-scene");
    scenes.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5) {
        setActiveIdx(i);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (modal) { document.body.style.overflowY = "hidden"; }
    else { document.body.style.overflowY = "scroll"; }
    return () => { document.body.style.overflowY = ""; };
  }, [modal]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const italiana = "var(--font-italiana), 'Italiana', serif";
  const amiri = "var(--font-amiri), 'Amiri', serif";

  return (
    <div className="cinematic-page" style={{ scrollSnapType: "y mandatory", overflowY: "scroll", height: "100%" }}>
      {/* Progress bar */}
      <div className="cine-prog" style={{ width: `${progress}%` }} />

      {/* Nav dots */}
      <div className="cine-dots max-[600px]:hidden">
        {Array.from({ length: totalScenes }, (_, i) => (
          <button
            key={i}
            className={`cine-dot${i === activeIdx ? " on" : ""}`}
            onClick={() => document.getElementById(`scene-${i}`)?.scrollIntoView({ behavior: "smooth" })}
          />
        ))}
      </div>

      {/* Scene 0: Title */}
      <section className="cine-scene s-title" id="scene-0">
        <StarCanvas />
        <div className="relative z-[2] text-center p-10">
          <div className="title-pill">✦ &nbsp; A Cinematic Journey &nbsp; ✦</div>
          <div className="big-eid">Eid</div>
          <div className="big-mubarak">Mubarak</div>
          <div className="title-ar">عيد مبارك سعيد</div>
          <div className="text-[11px] tracking-[5px] uppercase mt-5" style={{ color: "rgba(255,255,255,.2)" }}>
            1446 Hijri · A Cinematic Journey
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* Content Scenes */}
      {SCENES.map((scene, i) => (
        <section
          key={scene.id}
          className="cine-scene"
          id={`scene-${i + 1}`}
          style={{ background: scene.bg }}
        >
          <div className="scene-num" style={{ color: `${scene.accent}40` }}>
            Scene {String(i + 1).padStart(2, "0")}
          </div>
          <div className="scene-tag" style={{ color: `${scene.accent}50` }}>
            {scene.tag}
          </div>
          <SceneContent scene={scene} />
          <button
            className="open-btn"
            style={{ borderColor: `${scene.accent}40`, color: `${scene.accent}60` }}
            onClick={() => setModal(scene)}
          >
            Open Card
          </button>
        </section>
      ))}

      {/* Modal */}
      {modal && (
        <div
          className="cine-mbg"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div
            className="cine-mbox"
            style={{ boxShadow: `0 0 30px ${modal.accent}40, 0 60px 120px rgba(0,0,0,.9)`, border: `1px solid ${modal.accent}22` }}
          >
            <div className="cine-mcard" style={{ background: modal.bg }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-[2]">
                <div className="text-[10px] tracking-[5px] uppercase mb-[18px]" style={{ color: modal.accent, opacity: 0.6 }}>{modal.tag}</div>
                <div className="mb-2.5 leading-[.88]" style={{ fontFamily: italiana, fontSize: "62px", color: modal.accent, textShadow: `0 0 60px ${modal.accent}50` }}>Eid Mubarak</div>
                <div className="mb-4" style={{ fontFamily: amiri, fontSize: "32px", direction: "rtl", color: modal.accent, opacity: 0.72 }}>{modal.ar}</div>
                <div className="w-[50px] h-px mb-[14px]" style={{ background: modal.accent, opacity: 0.35 }} />
                <div className="text-[10px] tracking-[4px] uppercase italic" style={{ color: "rgba(255,255,255,.25)" }}>&ldquo;{modal.verse}&rdquo;</div>
              </div>
            </div>
            <div className="cine-mfoot">
              <div className="flex-1">
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color: modal.accent }}>{modal.title}</div>
                <div className="text-[10px] tracking-[2px] uppercase mt-[3px]" style={{ color: "#333" }}>{modal.tag} · Scene {modal.id}</div>
              </div>
              <button className="cine-mbtn" onClick={() => setModal(null)} style={{ background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.5)" }}>Close</button>
              <button
                className="cine-mbtn"
                style={{ background: modal.accent, color: "#000" }}
                onClick={async () => {
                  if (navigator.share) {
                    await navigator.share({ title: "Eid Mubarak!", text: modal.desc.slice(0, 100), url: window.location.href });
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
      )}
    </div>
  );
}
