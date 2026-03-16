export function OrnamentFrame({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[4]" viewBox="0 0 400 560" preserveAspectRatio="none">
      <path d="M20,40 L20,20 L40,20" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
      <path d="M20,20 L32,20 L32,32 L20,32Z" fill="none" stroke={accent} strokeWidth=".5" opacity=".3" />
      <circle cx="20" cy="20" r="2" fill={accent} opacity=".6" />
      <path d="M360,20 L380,20 L380,40" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
      <path d="M368,20 L380,20 L380,32 L368,32Z" fill="none" stroke={accent} strokeWidth=".5" opacity=".3" />
      <circle cx="380" cy="20" r="2" fill={accent} opacity=".6" />
      <path d="M20,520 L20,540 L40,540" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
      <circle cx="20" cy="540" r="2" fill={accent} opacity=".6" />
      <path d="M360,540 L380,540 L380,520" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
      <circle cx="380" cy="540" r="2" fill={accent} opacity=".6" />
      <line x1="80" y1="16" x2="320" y2="16" stroke={accent} strokeWidth=".5" opacity=".15" />
      <path d="M185,10 L200,4 L215,10" fill="none" stroke={accent} strokeWidth=".8" opacity=".4" />
      <circle cx="200" cy="4" r="1.5" fill={accent} opacity=".5" />
      <line x1="80" y1="544" x2="320" y2="544" stroke={accent} strokeWidth=".5" opacity=".15" />
      <path d="M185,550 L200,556 L215,550" fill="none" stroke={accent} strokeWidth=".8" opacity=".4" />
    </svg>
  );
}

export function GlowLayer({ glow }: { glow: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" style={{
      background: `radial-gradient(ellipse 60% 50% at 50% 35%, ${glow}, transparent 70%)`,
    }} />
  );
}

export function StarsLayer({ accent, count = 40 }: { accent: string; count?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 400 560">
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={((i * 137.508 + 20) % 380 + 10).toFixed(0)}
          cy={((i * 97.33 + 15) % 540 + 10).toFixed(0)}
          r={(0.4 + (i % 5) * 0.3).toFixed(1)}
          fill={i % 7 === 0 ? accent : "white"}
          opacity={(0.1 + (i % 8) * 0.08).toFixed(2)}
          style={{ animation: `twinkle ${2 + (i % 5) * 0.8}s ease-in-out infinite ${(i * 0.21 % 3).toFixed(1)}s` }}
        />
      ))}
    </svg>
  );
}
