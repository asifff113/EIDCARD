export function CardArtwork({ type, accent, accent2 }: { type: string; accent: string; accent2: string }) {
  switch (type) {
    case "mosque-gold":
      return (
        <svg className="absolute bottom-0 w-full z-[2]" viewBox="0 0 400 280" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent} stopOpacity=".9" /><stop offset="100%" stopColor={accent} stopOpacity=".2" /></linearGradient>
            <filter id="mgg"><feGaussianBlur stdDeviation="4" /></filter>
          </defs>
          <ellipse cx="200" cy="105" rx="45" ry="42" fill="url(#mg1)" filter="url(#mgg)" />
          <rect x="155" y="105" width="90" height="175" fill={accent} opacity=".5" />
          <ellipse cx="120" cy="135" rx="30" ry="28" fill={accent} opacity=".4" />
          <rect x="90" y="135" width="60" height="145" fill={accent} opacity=".3" />
          <ellipse cx="280" cy="135" rx="30" ry="28" fill={accent} opacity=".4" />
          <rect x="250" y="135" width="60" height="145" fill={accent} opacity=".3" />
          <rect x="55" y="80" width="10" height="200" fill={accent} opacity=".4" />
          <ellipse cx="60" cy="80" rx="8" ry="12" fill={accent} opacity=".6" />
          <path d="M56,65 A6,8 0 0,1 64,65 A4,5 0 0,0 56,65Z" fill={accent} opacity=".8" />
          <rect x="335" y="80" width="10" height="200" fill={accent} opacity=".4" />
          <ellipse cx="340" cy="80" rx="8" ry="12" fill={accent} opacity=".6" />
          <path d="M336,65 A6,8 0 0,1 344,65 A4,5 0 0,0 336,65Z" fill={accent} opacity=".8" />
          <path d="M170,175 A30,34 0 0,1 230,175 L230,280 L170,280Z" fill={accent} opacity=".15" />
          <rect x="0" y="276" width="400" height="4" fill={accent} opacity=".15" />
        </svg>
      );

    case "crescent-night":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="cng"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <path d="M240,120 A90,90 0 1,0 240,340 A62,62 0 1,1 240,120Z" fill={accent} filter="url(#cng)" opacity=".85" />
          <circle cx="265" cy="130" r="14" fill={accent} opacity=".9" />
          <circle cx="285" cy="165" r="7" fill={accent} opacity=".5" />
          <polygon points="310,200 316,218 335,218 320,228 326,246 310,236 294,246 300,228 285,218 304,218" fill={accent} opacity=".7" style={{ animation: "starPulse 3s ease-in-out infinite" }} />
          <polygon points="145,400 149,412 162,412 152,420 156,432 145,424 134,432 138,420 128,412 141,412" fill={accent} opacity=".4" style={{ animation: "starPulse 4s ease-in-out infinite 1s" }} />
        </svg>
      );

    case "lantern-warm":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          {[{ x: 80, y: 60, s: 1 }, { x: 200, y: 30, s: 1.3 }, { x: 320, y: 70, s: 0.9 }, { x: 140, y: 100, s: 0.7 }, { x: 260, y: 90, s: 0.75 }].map((l, i) => (
            <g key={i} transform={`translate(${l.x},${l.y}) scale(${l.s})`} opacity={0.5 + l.s * 0.3}>
              <line x1="0" y1="-30" x2="0" y2="0" stroke={accent} strokeWidth="1.2" opacity=".5" />
              <path d="M-12,0 L12,0 L14,12 L-14,12Z" fill={accent} opacity=".8" />
              <path d="M-14,12 C-18,35 -18,60 -12,75 L-6,88 L6,88 L12,75 C18,60 18,35 14,12Z" fill={accent} opacity=".55" />
              <ellipse cx="0" cy="14" rx="4" ry="7" fill={accent} opacity=".9" style={{ animation: `candleFlame ${1.5 + i * 0.3}s ease-in-out infinite` }} />
              <ellipse cx="0" cy="13" rx="2.5" ry="4.5" fill="white" opacity=".45" style={{ animation: `candleFlame ${1.5 + i * 0.3}s ease-in-out infinite .3s` }} />
              <path d="M-6,88 L-8,96 L8,96 L6,88Z" fill={accent} opacity=".7" />
            </g>
          ))}
        </svg>
      );

    case "mandala-purple":
      return (
        <svg className="absolute z-[2]" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "90%", height: "90%", animation: "rotateSlow 60s linear infinite" }} viewBox="-180 -180 360 360">
          {Array.from({ length: 16 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 22.5})`}>
              <line x1="0" y1="18" x2="0" y2="155" stroke={accent} strokeWidth=".5" opacity=".35" />
              <ellipse cx="0" cy="85" rx="8" ry="20" fill="none" stroke={accent} strokeWidth=".4" opacity=".3" />
              <circle cx="0" cy="155" r="4" fill={accent} opacity=".25" />
              <path d="M-3,40 L0,32 L3,40" fill={accent} opacity=".2" />
            </g>
          ))}
          <circle cx="0" cy="0" r="15" fill="none" stroke={accent} strokeWidth=".7" opacity=".5" />
          <circle cx="0" cy="0" r="6" fill={accent} opacity=".2" />
          <circle cx="0" cy="0" r="45" fill="none" stroke={accent} strokeWidth=".35" opacity=".3" />
          <circle cx="0" cy="0" r="90" fill="none" stroke={accent} strokeWidth=".25" opacity=".2" />
          <circle cx="0" cy="0" r="140" fill="none" stroke={accent} strokeWidth=".2" opacity=".15" />
        </svg>
      );

    case "kaaba-sacred":
      return (
        <svg className="absolute z-[2]" style={{ bottom: "15%", left: "50%", transform: "translateX(-50%)", width: "70%" }} viewBox="0 0 300 260">
          <rect x="50" y="60" width="200" height="200" fill="#0a0a0a" stroke={accent} strokeWidth="1.5" />
          <rect x="50" y="110" width="200" height="28" fill={accent} opacity=".45" />
          <rect x="115" y="120" width="70" height="140" fill={accent} opacity=".12" rx="4" />
          <polygon points="30,60 270,60 250,35 50,35" fill="#141414" stroke={accent} strokeWidth="1" />
          <polygon points="250,60 270,60 270,260 250,260" fill="#080808" stroke={accent} strokeWidth=".8" />
          <text x="150" y="130" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="11" fill={accent} opacity=".8">{"\u0627\u0644\u0644\u0647 \u0623\u0643\u0628\u0631"}</text>
          <text x="150" y="145" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="8" fill={accent} opacity=".6">{"\u0644\u0627 \u0625\u0644\u0647 \u0625\u0644\u0627 \u0627\u0644\u0644\u0647"}</text>
        </svg>
      );

    case "calligraphy-teal":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <text x="200" y="200" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="52" fill={accent} opacity=".8" direction="rtl">{"\u0628\u0633\u0645 \u0627\u0644\u0644\u0647"}</text>
          <text x="200" y="250" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="30" fill={accent} opacity=".5" direction="rtl">{"\u0627\u0644\u0631\u062d\u0645\u0646 \u0627\u0644\u0631\u062d\u064a\u0645"}</text>
          <line x1="100" y1="270" x2="300" y2="270" stroke={accent} strokeWidth=".6" opacity=".2" />
          <circle cx="100" cy="270" r="2" fill={accent} opacity=".3" />
          <circle cx="300" cy="270" r="2" fill={accent} opacity=".3" />
          <path d="M120,290 Q160,305 200,290 Q240,275 280,290" fill="none" stroke={accent} strokeWidth=".5" opacity=".2" />
          <path d="M130,310 Q170,320 200,310 Q230,300 270,310" fill="none" stroke={accent} strokeWidth=".4" opacity=".15" />
        </svg>
      );

    case "bloom-rose":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          {Array.from({ length: 12 }, (_, i) => {
            const x = ((i * 137.508 + 40) % 340 + 30);
            const y = ((i * 97.33 + 50) % 460 + 50);
            const r = 6 + (i % 4) * 3;
            const rot = i * 30;
            return (
              <g key={i} transform={`translate(${x},${y}) rotate(${rot})`} opacity={0.15 + (i % 4) * 0.08}>
                <ellipse cx="0" cy="0" rx={r} ry={r * 1.6} fill={accent} />
              </g>
            );
          })}
          <g transform="translate(200,240)">
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-30" rx="12" ry="30" fill={accent} opacity=".2" transform={`rotate(${i * 45})`} />
            ))}
            <circle cx="0" cy="0" r="10" fill={accent} opacity=".4" />
          </g>
        </svg>
      );

    case "aurora-cyan":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="aur1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={accent} stopOpacity=".3" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></linearGradient>
            <linearGradient id="aur2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent2} stopOpacity=".2" /><stop offset="100%" stopColor={accent2} stopOpacity="0" /></linearGradient>
          </defs>
          <ellipse cx="200" cy="180" rx="180" ry="60" fill="url(#aur1)" />
          <ellipse cx="160" cy="220" rx="140" ry="45" fill="url(#aur2)" />
          <ellipse cx="250" cy="200" rx="120" ry="50" fill="url(#aur1)" opacity=".5" />
          <path d="M210,280 A50,50 0 1,0 210,380 A35,35 0 1,1 210,280Z" fill={accent} opacity=".6" />
          <circle cx="225" cy="285" r="8" fill={accent} opacity=".7" />
        </svg>
      );

    case "zellige-blue":
      return (
        <svg className="absolute z-[2]" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80%", height: "60%" }} viewBox="-150 -150 300 300">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <rect x="-4" y="30" width="8" height="90" fill="none" stroke={accent} strokeWidth=".6" opacity=".3" rx="2" />
              <polygon points="0,20 8,30 -8,30" fill={accent} opacity=".2" />
              <circle cx="0" cy="125" r="5" fill="none" stroke={accent} strokeWidth=".5" opacity=".3" />
            </g>
          ))}
          <polygon points="0,-18 17,0 0,18 -17,0" fill="none" stroke={accent} strokeWidth=".8" opacity=".5" />
          <circle cx="0" cy="0" r="8" fill={accent} opacity=".15" />
          <circle cx="0" cy="0" r="60" fill="none" stroke={accent} strokeWidth=".3" opacity=".2" />
        </svg>
      );

    case "palm-green":
      return (
        <svg className="absolute bottom-0 right-0 z-[2]" style={{ width: "60%", height: "70%" }} viewBox="0 0 250 400">
          <rect x="110" y="200" width="20" height="200" rx="5" fill={accent} opacity=".35" />
          <path d="M120,200 Q70,130 30,90 Q70,115 110,170 Q70,100 55,40 Q90,105 118,180 Q100,100 98,20 Q115,105 120,180 Q125,100 142,20 Q140,105 122,180 Q155,105 195,40 Q180,100 130,170 Q170,115 210,90 Q175,130 120,200Z" fill={accent} opacity=".6" />
          <circle cx="118" cy="202" r="8" fill={accent} opacity=".7" />
          <circle cx="126" cy="208" r="7" fill={accent} opacity=".55" />
          <circle cx="114" cy="212" r="6.5" fill={accent} opacity=".45" />
        </svg>
      );

    case "cosmic-violet":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <radialGradient id="cvg1" cx="50%" cy="40%"><stop offset="0%" stopColor={accent} stopOpacity=".25" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></radialGradient>
          </defs>
          <circle cx="200" cy="220" r="140" fill="url(#cvg1)" />
          <path d="M220,140 A80,80 0 1,0 220,310 A55,55 0 1,1 220,140Z" fill={accent} opacity=".5" />
          <circle cx="240" cy="148" r="12" fill={accent} opacity=".65" />
          <circle cx="258" cy="178" r="6" fill={accent} opacity=".4" />
          {Array.from({ length: 20 }, (_, i) => {
            const angle = i * 0.5;
            const r = 100 + i * 4;
            const x = 200 + Math.cos(angle) * r * 0.3;
            const y = 230 + Math.sin(angle) * r * 0.3;
            return <circle key={i} cx={x.toFixed(0)} cy={y.toFixed(0)} r={(0.8 + i * 0.08).toFixed(1)} fill={accent} opacity=".12" />;
          })}
        </svg>
      );

    case "desert-amber":
      return (
        <svg className="absolute bottom-0 w-full z-[2]" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax meet">
          <path d="M0,200 Q50,120 120,160 Q180,100 250,140 Q320,80 400,130 L400,200Z" fill={accent} opacity=".12" />
          <path d="M0,200 Q80,150 160,170 Q220,130 300,155 Q360,110 400,145 L400,200Z" fill={accent} opacity=".18" />
          <path d="M0,200 Q100,165 180,180 Q240,155 320,170 Q380,150 400,165 L400,200Z" fill={accent} opacity=".08" />
          <path d="M160,145 Q185,105 210,145" fill="none" stroke={accent} strokeWidth="1" opacity=".35" />
          <rect x="148" y="120" width="6" height="80" fill={accent} opacity=".25" />
          <ellipse cx="151" cy="120" rx="4" ry="6" fill={accent} opacity=".3" />
          <rect x="216" y="120" width="6" height="80" fill={accent} opacity=".25" />
          <ellipse cx="219" cy="120" rx="4" ry="6" fill={accent} opacity=".3" />
        </svg>
      );

    default:
      return null;
  }
}
