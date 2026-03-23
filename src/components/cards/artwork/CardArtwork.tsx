type ArtworkProps = {
  type: string;
  accent: string;
  accent2: string;
};

type BlossomProps = {
  x: number;
  y: number;
  scale?: number;
  fill: string;
  center?: string;
  opacity?: number;
};

type LeafSprigProps = {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  stroke: string;
  opacity?: number;
};

type HangingLanternProps = {
  x: number;
  y: number;
  scale?: number;
  metal: string;
  light: string;
  glowId: string;
  delay?: string;
};

type HangingStarProps = {
  x: number;
  y: number;
  size?: number;
  color: string;
  opacity?: number;
};

type CrescentGlyphProps = {
  x: number;
  y: number;
  outer: number;
  inner: number;
  color: string;
  glowId?: string;
  opacity?: number;
  rotation?: number;
};

type BokehFieldProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  count?: number;
  maxRadius?: number;
  opacity?: number;
  blurId?: string;
};

type CornerFlourishProps = {
  x: number;
  y: number;
  color: string;
  scale?: number;
  rotation?: number;
  opacity?: number;
};

type FloralClusterProps = {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
};

type PaperRosetteProps = {
  x: number;
  y: number;
  scale?: number;
  outer: string;
  middle: string;
  inner: string;
  core?: string;
  points?: number;
  opacity?: number;
};

function Blossom({ x, y, scale = 1, fill, center = "#f3c55d", opacity = 1 }: BlossomProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-9"
          rx="5.5"
          ry="12"
          fill={fill}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="3.2" fill={center} opacity="0.95" />
    </g>
  );
}

function LeafSprig({ x, y, scale = 1, rotation = 0, stroke, opacity = 1 }: LeafSprigProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
      <path d="M0 0 C10 -15 18 -34 18 -55" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      {[-44, -36, -28, -20, -12].map((offset, index) => (
        <g key={offset}>
          <path
            d={`M18 ${offset} C8 ${offset - 6} 3 ${offset - 12} 0 ${offset - 18}`}
            fill="none"
            stroke={stroke}
            strokeWidth={index < 3 ? "1.6" : "1.25"}
            strokeLinecap="round"
          />
          <path
            d={`M18 ${offset} C28 ${offset - 6} 33 ${offset - 12} 36 ${offset - 18}`}
            fill="none"
            stroke={stroke}
            strokeWidth={index < 3 ? "1.6" : "1.25"}
            strokeLinecap="round"
          />
        </g>
      ))}
    </g>
  );
}

function HangingStar({ x, y, size = 8, color, opacity = 1 }: HangingStarProps) {
  const tip = size * 1.55;
  const points = [
    [0, -tip],
    [size * 0.32, -size * 0.38],
    [tip, -size * 0.34],
    [size * 0.5, size * 0.2],
    [size * 0.9, tip],
    [0, size * 0.58],
    [-size * 0.9, tip],
    [-size * 0.5, size * 0.2],
    [-tip, -size * 0.34],
    [-size * 0.32, -size * 0.38],
  ]
    .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
    .join(" ");

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <line x1="0" y1={-size * 3.8} x2="0" y2={-size * 1.3} stroke={color} strokeWidth="1" opacity=".45" />
      <polygon points={points} fill={color} />
    </g>
  );
}

function CrescentGlyph({
  x,
  y,
  outer,
  inner,
  color,
  glowId,
  opacity = 1,
  rotation = 0,
}: CrescentGlyphProps) {
  const path = `M${outer * 0.42} ${-outer} A${outer} ${outer} 0 1 0 ${outer * 0.42} ${outer} A${inner} ${inner} 0 1 1 ${outer * 0.42} ${-outer} Z`;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`} opacity={opacity}>
      <path d={path} fill={color} filter={glowId ? `url(#${glowId})` : undefined} />
    </g>
  );
}

function BokehField({
  x,
  y,
  width,
  height,
  color,
  count = 24,
  maxRadius = 16,
  opacity = 0.28,
  blurId,
}: BokehFieldProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: count }, (_, index) => {
        const cx = (index * 37.7) % width;
        const cy = (index * 73.3) % height;
        const radius = 2 + (index % 5) * (maxRadius / 5);
        const alpha = opacity * (0.36 + (index % 4) * 0.18);

        return (
          <circle
            key={index}
            cx={cx.toFixed(1)}
            cy={cy.toFixed(1)}
            r={radius.toFixed(1)}
            fill={color}
            opacity={alpha.toFixed(2)}
            filter={blurId ? `url(#${blurId})` : undefined}
          />
        );
      })}
    </g>
  );
}

function CornerFlourish({
  x,
  y,
  color,
  scale = 1,
  rotation = 0,
  opacity = 1,
}: CornerFlourishProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
      <path d="M0 0 C18 0 34 8 46 22 C56 34 62 50 64 68" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 12 C24 12 34 18 42 30 C48 40 50 50 50 60" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity=".72" />
      <path d="M22 2 C30 8 34 18 34 30" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity=".72" />
      <path d="M40 38 C34 36 28 40 26 46 C24 54 28 60 36 62 C44 64 50 60 52 52" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity=".78" />
      <circle cx="52" cy="16" r="2.2" fill={color} opacity=".82" />
      <circle cx="16" cy="52" r="1.8" fill={color} opacity=".74" />
      <circle cx="40" cy="30" r="1.3" fill={color} opacity=".72" />
    </g>
  );
}

function FloralCluster({ x, y, scale = 1, opacity = 1 }: FloralClusterProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <Blossom x={-30} y={12} scale={1.15} fill="#ffd6de" center="#d8a05d" opacity={0.96} />
      <Blossom x={0} y={-10} scale={1.35} fill="#ffc7d6" center="#d8a05d" opacity={0.98} />
      <Blossom x={34} y={10} scale={1.08} fill="#ffe4eb" center="#d8a05d" opacity={0.92} />
      <Blossom x={-56} y={30} scale={0.78} fill="#ffe7ec" center="#d8a05d" opacity={0.9} />
      <Blossom x={60} y={32} scale={0.72} fill="#ffe7ec" center="#d8a05d" opacity={0.88} />
      <LeafSprig x={-8} y={44} scale={1.1} rotation={18} stroke="#96ad71" opacity={0.7} />
      <LeafSprig x={28} y={48} scale={0.9} rotation={-34} stroke="#96ad71" opacity={0.64} />
      <LeafSprig x={-48} y={52} scale={0.7} rotation={26} stroke="#96ad71" opacity={0.58} />
    </g>
  );
}

function buildRosettePoints(points: number, outerRadius: number, innerRadius: number) {
  return Array.from({ length: points * 2 }, (_, index) => {
    const angle = (index * Math.PI) / points - Math.PI / 2;
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    return `${(Math.cos(angle) * radius).toFixed(2)},${(Math.sin(angle) * radius).toFixed(2)}`;
  }).join(" ");
}

function PaperRosette({
  x,
  y,
  scale = 1,
  outer,
  middle,
  inner,
  core = "#d9a33a",
  points = 12,
  opacity = 1,
}: PaperRosetteProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <polygon points={buildRosettePoints(points, 34, 22)} fill={outer} />
      <polygon points={buildRosettePoints(points, 28, 17)} fill={middle} />
      <polygon points={buildRosettePoints(points, 21, 12)} fill={inner} />
      <polygon points={buildRosettePoints(Math.max(8, points - 2), 14, 8)} fill={middle} opacity="0.92" />
      <circle r="5.8" fill={core} opacity="0.96" />
      <circle r="2.6" fill="#fff" opacity="0.75" />
    </g>
  );
}

function HangingLantern({
  x,
  y,
  scale = 1,
  metal,
  light,
  glowId,
  delay = "0s",
}: HangingLanternProps) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      style={{ animation: `floatSlow 5.2s ease-in-out infinite ${delay}` }}
    >
      <line x1="0" y1="-86" x2="0" y2="-18" stroke={metal} strokeWidth="2" opacity="0.52" />
      <ellipse cx="0" cy="-18" rx="10" ry="5.5" fill={metal} opacity="0.92" />
      <path d="M-8 -12 L8 -12 L11 0 L-11 0 Z" fill={metal} opacity="0.95" />
      <path d="M-13 0 C-16 22 -16 48 -10 64 L-4 78 L4 78 L10 64 C16 48 16 22 13 0 Z" fill={metal} opacity="0.94" />
      <path d="M-8 8 L8 8 L8 56 L-8 56 Z" fill={light} opacity="0.9" filter={`url(#${glowId})`} />
      <ellipse cx="0" cy="31" rx="17" ry="24" fill={light} opacity="0.7" filter={`url(#${glowId})`} />
      <path d="M-4 78 L-7 92 L7 92 L4 78 Z" fill={metal} opacity="0.92" />
      <line x1="-8" y1="8" x2="-8" y2="56" stroke={metal} strokeWidth="1" opacity="0.4" />
      <line x1="8" y1="8" x2="8" y2="56" stroke={metal} strokeWidth="1" opacity="0.4" />
      <line x1="0" y1="6" x2="0" y2="70" stroke={metal} strokeWidth="1" opacity="0.28" />
    </g>
  );
}

export function CardArtwork({ type, accent, accent2 }: ArtworkProps) {
  switch (type) {
    case "mosque-gold":
      return (
        <svg className="absolute bottom-0 w-full z-[2]" viewBox="0 0 400 280" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity=".9" />
              <stop offset="100%" stopColor={accent} stopOpacity=".2" />
            </linearGradient>
            <filter id="mgg">
              <feGaussianBlur stdDeviation="4" />
            </filter>
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
            <filter id="cng">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
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
          {[{ x: 80, y: 60, s: 1 }, { x: 200, y: 30, s: 1.3 }, { x: 320, y: 70, s: 0.9 }, { x: 140, y: 100, s: 0.7 }, { x: 260, y: 90, s: 0.75 }].map((lantern, index) => (
            <g key={index} transform={`translate(${lantern.x},${lantern.y}) scale(${lantern.s})`} opacity={0.5 + lantern.s * 0.3}>
              <line x1="0" y1="-30" x2="0" y2="0" stroke={accent} strokeWidth="1.2" opacity=".5" />
              <path d="M-12,0 L12,0 L14,12 L-14,12Z" fill={accent} opacity=".8" />
              <path d="M-14,12 C-18,35 -18,60 -12,75 L-6,88 L6,88 L12,75 C18,60 18,35 14,12Z" fill={accent} opacity=".55" />
              <ellipse cx="0" cy="14" rx="4" ry="7" fill={accent} opacity=".9" style={{ animation: `candleFlame ${1.5 + index * 0.3}s ease-in-out infinite` }} />
              <ellipse cx="0" cy="13" rx="2.5" ry="4.5" fill="white" opacity=".45" style={{ animation: `candleFlame ${1.5 + index * 0.3}s ease-in-out infinite .3s` }} />
              <path d="M-6,88 L-8,96 L8,96 L6,88Z" fill={accent} opacity=".7" />
            </g>
          ))}
        </svg>
      );

    case "mandala-purple":
      return (
        <svg className="absolute z-[2]" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "90%", height: "90%", animation: "rotateSlow 60s linear infinite" }} viewBox="-180 -180 360 360">
          {Array.from({ length: 16 }, (_, index) => (
            <g key={index} transform={`rotate(${index * 22.5})`}>
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
          {Array.from({ length: 12 }, (_, index) => {
            const x = ((index * 137.508 + 40) % 340 + 30);
            const y = ((index * 97.33 + 50) % 460 + 50);
            const r = 6 + (index % 4) * 3;
            const rotation = index * 30;
            return (
              <g key={index} transform={`translate(${x},${y}) rotate(${rotation})`} opacity={0.15 + (index % 4) * 0.08}>
                <ellipse cx="0" cy="0" rx={r} ry={r * 1.6} fill={accent} />
              </g>
            );
          })}
          <g transform="translate(200,240)">
            {Array.from({ length: 8 }, (_, index) => (
              <ellipse key={index} cx="0" cy="-30" rx="12" ry="30" fill={accent} opacity=".2" transform={`rotate(${index * 45})`} />
            ))}
            <circle cx="0" cy="0" r="10" fill={accent} opacity=".4" />
          </g>
        </svg>
      );

    case "aurora-cyan":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="aur1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity=".3" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="aur2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent2} stopOpacity=".2" />
              <stop offset="100%" stopColor={accent2} stopOpacity="0" />
            </linearGradient>
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
          {Array.from({ length: 8 }, (_, index) => (
            <g key={index} transform={`rotate(${index * 45})`}>
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
            <radialGradient id="cvg1" cx="50%" cy="40%">
              <stop offset="0%" stopColor={accent} stopOpacity=".25" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="220" r="140" fill="url(#cvg1)" />
          <path d="M220,140 A80,80 0 1,0 220,310 A55,55 0 1,1 220,140Z" fill={accent} opacity=".5" />
          <circle cx="240" cy="148" r="12" fill={accent} opacity=".65" />
          <circle cx="258" cy="178" r="6" fill={accent} opacity=".4" />
          {Array.from({ length: 20 }, (_, index) => {
            const angle = index * 0.5;
            const radius = 100 + index * 4;
            const x = 200 + Math.cos(angle) * radius * 0.3;
            const y = 230 + Math.sin(angle) * radius * 0.3;
            return <circle key={index} cx={x.toFixed(0)} cy={y.toFixed(0)} r={(0.8 + index * 0.08).toFixed(1)} fill={accent} opacity=".12" />;
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

    case "crescent-bloom":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="cbBlur">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id="cbGlow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="cbCrescentClip">
              <path d="M188 132 A136 136 0 1 0 188 470 A98 98 0 1 1 188 132 Z" />
            </clipPath>
            <radialGradient id="cbMistA">
              <stop offset="0%" stopColor="#d8fbff" stopOpacity=".65" />
              <stop offset="100%" stopColor="#d8fbff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cbMistB">
              <stop offset="0%" stopColor={accent2} stopOpacity=".35" />
              <stop offset="100%" stopColor={accent2} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="44" cy="88" r="56" fill="url(#cbMistA)" filter="url(#cbBlur)" opacity=".55" />
          <circle cx="342" cy="118" r="34" fill="url(#cbMistB)" filter="url(#cbBlur)" opacity=".42" />
          <circle cx="58" cy="490" r="46" fill="url(#cbMistA)" filter="url(#cbBlur)" opacity=".42" />
          <circle cx="344" cy="462" r="58" fill="url(#cbMistA)" filter="url(#cbBlur)" opacity=".3" />

          <path d="M34 42 C96 18 166 18 236 42" fill="none" stroke={accent} strokeOpacity=".42" strokeWidth="1" strokeDasharray="1 11" strokeLinecap="round" />
          <path d="M228 40 C278 20 332 20 382 48" fill="none" stroke={accent} strokeOpacity=".4" strokeWidth="1" strokeDasharray="1 11" strokeLinecap="round" />
          {[86, 140, 198, 316].map((x, index) => (
            <g key={x}>
              <line x1={x} y1="0" x2={x} y2={index % 2 === 0 ? "96" : "72"} stroke={accent} strokeOpacity=".32" strokeWidth="1.2" strokeDasharray="2 8" />
              <circle cx={x} cy={index % 2 === 0 ? 92 : 68} r="3.3" fill={accent} opacity=".9" />
              <path d={`M${x - 6} ${index % 2 === 0 ? 102 : 78} L${x} ${index % 2 === 0 ? 112 : 88} L${x + 6} ${index % 2 === 0 ? 102 : 78}`} fill={accent} opacity=".85" />
            </g>
          ))}

          <path d="M188 132 A136 136 0 1 0 188 470 A98 98 0 1 1 188 132 Z" fill={accent} opacity=".86" filter="url(#cbGlow)" />
          <path d="M188 132 A136 136 0 1 0 188 470 A98 98 0 1 1 188 132 Z" fill="none" stroke={accent2} strokeWidth="1.4" opacity=".55" />

          <g clipPath="url(#cbCrescentClip)">
            <LeafSprig x={138} y={158} scale={0.9} rotation={-34} stroke="#d9fbff" opacity={0.72} />
            <LeafSprig x={206} y={170} scale={1.06} rotation={18} stroke="#d9fbff" opacity={0.72} />
            <LeafSprig x={214} y={266} scale={0.95} rotation={42} stroke="#d9fbff" opacity={0.64} />
            <LeafSprig x={122} y={294} scale={1.02} rotation={-70} stroke="#d9fbff" opacity={0.62} />
            <LeafSprig x={170} y={372} scale={0.88} rotation={12} stroke="#d9fbff" opacity={0.66} />
            <LeafSprig x={102} y={416} scale={0.8} rotation={-22} stroke="#d9fbff" opacity={0.54} />

            <Blossom x={154} y={206} scale={0.72} fill="#f7fbff" opacity={0.96} />
            <Blossom x={202} y={224} scale={0.6} fill="#f7fbff" opacity={0.9} />
            <Blossom x={170} y={262} scale={0.58} fill="#f7fbff" opacity={0.88} />
            <Blossom x={146} y={312} scale={0.68} fill="#f7fbff" opacity={0.94} />
            <Blossom x={188} y={346} scale={0.52} fill="#f7fbff" opacity={0.9} />
            <Blossom x={138} y={398} scale={0.46} fill="#f7fbff" opacity={0.84} />

            {[
              [112, 206, 2.4], [126, 232, 1.7], [182, 188, 1.8], [210, 262, 2.2], [112, 336, 2.1],
              [145, 360, 1.9], [188, 302, 1.6], [132, 430, 1.8], [208, 196, 2], [176, 410, 1.8],
            ].map(([x, y, r], index) => (
              <circle key={index} cx={x} cy={y} r={r} fill={accent2} opacity=".7" />
            ))}
          </g>

          <g transform="translate(112 360)" filter="url(#cbGlow)">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse key={angle} cx="0" cy="-22" rx="13" ry="36" fill="#ffffff" transform={`rotate(${angle})`} />
            ))}
            <circle cx="0" cy="0" r="7" fill="#d4b04d" />
            <circle cx="0" cy="0" r="3.5" fill="#6f9131" opacity=".65" />
          </g>

          <LeafSprig x={250} y={438} scale={0.72} rotation={126} stroke="#d9fbff" opacity={0.82} />
          <LeafSprig x={278} y={456} scale={0.56} rotation={110} stroke="#d9fbff" opacity={0.7} />

          {[
            [72, 444, 1.1], [92, 458, 1.4], [122, 474, 1], [188, 484, 1.2], [232, 496, 1.1], [268, 470, 1.3], [302, 490, 1.1],
          ].map(([x, y, r], index) => (
            <circle key={index} cx={x} cy={y} r={r} fill={accent} opacity=".88" />
          ))}
        </svg>
      );

    case "royal-lantern":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <pattern id="rlPanelPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 4 C30 10 36 20 36 20 C36 20 30 30 20 36 C10 30 4 20 4 20 C4 20 10 10 20 4 Z" fill="none" stroke="#bfa36c" strokeOpacity=".24" strokeWidth="1" />
              <circle cx="20" cy="20" r="3.5" fill="#bfa36c" fillOpacity=".18" />
            </pattern>
            <linearGradient id="rlGold" x1="0" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#f7d48d" />
              <stop offset="48%" stopColor={accent} />
              <stop offset="100%" stopColor="#8e6727" />
            </linearGradient>
            <filter id="rlGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="rlCrescentClip">
              <path d="M168 148 A118 118 0 1 0 168 416 A82 82 0 1 1 168 148 Z" />
            </clipPath>
          </defs>

          <rect x="0" y="0" width="208" height="560" fill="rgba(255,255,255,.32)" />
          <rect x="208" y="0" width="192" height="560" fill="url(#rlPanelPattern)" opacity=".9" />
          <path d="M208 0 L208 560" stroke="#a57a34" strokeWidth="2" opacity=".45" />
          <path d="M388 0 L388 560" stroke="#76541e" strokeWidth="4" opacity=".5" />

          <g transform="translate(56 234)" opacity=".76">
            {Array.from({ length: 18 }, (_, index) => (
              <g key={index} transform={`rotate(${index * 20})`}>
                <path d="M0 -146 C22 -126 42 -84 38 -36 C34 10 14 44 0 56 C-14 44 -34 10 -38 -36 C-42 -84 -22 -126 0 -146 Z" fill="none" stroke="url(#rlGold)" strokeWidth="2.2" opacity=".78" />
                <circle cx="0" cy="-154" r="5" fill="url(#rlGold)" opacity=".82" />
              </g>
            ))}
            <circle cx="0" cy="0" r="44" fill="none" stroke="url(#rlGold)" strokeWidth="2.2" opacity=".45" />
            <circle cx="0" cy="0" r="12" fill="url(#rlGold)" opacity=".32" />
          </g>

          <path d="M168 148 A118 118 0 1 0 168 416 A82 82 0 1 1 168 148 Z" fill="url(#rlGold)" filter="url(#rlGlow)" />
          <path d="M168 148 A118 118 0 1 0 168 416 A82 82 0 1 1 168 148 Z" fill="none" stroke="#8f6a2d" strokeWidth="1.5" opacity=".4" />

          <g clipPath="url(#rlCrescentClip)" opacity=".9">
            {[
              [100, 188], [128, 210], [110, 248], [138, 278], [118, 320], [148, 352],
              [184, 182], [194, 224], [180, 264], [206, 300], [190, 344],
            ].map(([x, y], index) => (
              <Blossom key={index} x={x} y={y} scale={0.36 + (index % 3) * 0.08} fill="#f9e5ba" center="#ab7c2f" opacity={0.82} />
            ))}
            {[
              "M96 168 C114 186 126 214 124 238",
              "M120 210 C136 232 148 258 148 286",
              "M154 186 C170 206 176 230 176 252",
              "M118 314 C138 330 154 356 158 384",
              "M178 276 C196 292 206 314 208 342",
            ].map((pathData, index) => (
              <path key={index} d={pathData} fill="none" stroke="#f6dfae" strokeWidth="2.1" strokeLinecap="round" opacity=".58" />
            ))}
            {[
              [98, 194], [132, 232], [156, 216], [148, 326], [182, 308], [168, 362], [202, 234],
            ].map(([x, y], index) => (
              <circle key={index} cx={x} cy={y} r="2.6" fill="#fdf2cf" opacity=".74" />
            ))}
          </g>

          <HangingLantern x={214} y={182} scale={0.92} metal={accent} light={accent2} glowId="rlGlow" delay="0.4s" />
          <HangingLantern x={264} y={132} scale={0.72} metal={accent} light={accent2} glowId="rlGlow" delay="1.1s" />
          <HangingLantern x={298} y={392} scale={1.04} metal={accent} light={accent2} glowId="rlGlow" delay="0.8s" />
          <HangingLantern x={204} y={458} scale={0.78} metal={accent} light={accent2} glowId="rlGlow" delay="1.3s" />
        </svg>
      );

    case "moonlit-skyline":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="msGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="msMoonGlow">
              <stop offset="0%" stopColor={accent2} stopOpacity=".7" />
              <stop offset="100%" stopColor={accent2} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="msHaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8dd7ff" stopOpacity=".25" />
              <stop offset="100%" stopColor="#8dd7ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d="M44 134 C84 100 124 98 160 120 C178 130 194 134 200 134 C206 134 222 130 240 120 C276 98 316 100 356 134" fill="none" stroke="#c8f7ff" strokeWidth="2" opacity=".16" />
          <path d="M20 172 C64 130 110 126 154 150" fill="none" stroke="#c8f7ff" strokeWidth="1.7" opacity=".16" />
          <path d="M246 150 C290 126 336 130 380 172" fill="none" stroke="#c8f7ff" strokeWidth="1.7" opacity=".16" />

          <HangingLantern x={72} y={96} scale={0.78} metal="#3e2615" light="#ffefb6" glowId="msGlow" delay="0.2s" />
          <HangingLantern x={144} y={124} scale={0.96} metal="#3e2615" light="#ffefb6" glowId="msGlow" delay="1.1s" />
          <HangingLantern x={262} y={126} scale={0.86} metal="#3e2615" light="#ffefb6" glowId="msGlow" delay="0.7s" />
          <HangingLantern x={334} y={92} scale={0.8} metal="#3e2615" light="#ffefb6" glowId="msGlow" delay="1.5s" />

          <circle cx="236" cy="148" r="48" fill="url(#msMoonGlow)" opacity=".76" />
          <path d="M242 120 A44 44 0 1 0 242 198 A28 28 0 1 1 242 120 Z" fill={accent2} filter="url(#msGlow)" opacity=".96" />
          <circle cx="258" cy="148" r="4.5" fill="#ffffff" opacity=".9" />

          <ellipse cx="200" cy="266" rx="188" ry="120" fill="url(#msHaze)" opacity=".6" />

          <path d="M0 360 L34 360 L34 328 L46 328 L46 360 L64 360 L64 316 C64 278 90 258 112 258 C134 258 160 278 160 316 L160 360 L176 360 L176 278 L184 278 L184 360 L210 360 L210 236 C210 196 240 176 268 176 C296 176 326 196 326 236 L326 360 L344 360 L344 300 L352 300 L352 360 L366 360 L366 318 L378 318 L378 360 L400 360 L400 560 L0 560 Z" fill="rgba(6, 22, 58, .78)" />
          <path d="M0 386 Q76 350 150 374 Q226 346 316 374 Q356 360 400 370 L400 560 L0 560 Z" fill="rgba(4, 15, 45, .88)" />

          <g fill="rgba(6, 22, 58, .78)">
            <ellipse cx="112" cy="258" rx="44" ry="34" />
            <rect x="68" y="258" width="88" height="102" />
            <ellipse cx="268" cy="176" rx="58" ry="44" />
            <rect x="210" y="176" width="116" height="184" />
            <rect x="90" y="210" width="10" height="148" />
            <ellipse cx="95" cy="210" rx="7" ry="10" />
            <rect x="126" y="210" width="10" height="148" />
            <ellipse cx="131" cy="210" rx="7" ry="10" />
            <rect x="236" y="132" width="12" height="228" />
            <ellipse cx="242" cy="132" rx="9" ry="13" />
            <path d="M236 114 C236 104 242 96 248 96 C254 96 260 104 260 114" fill="none" stroke="rgba(6, 22, 58, .78)" strokeWidth="5" />
            <rect x="296" y="198" width="10" height="162" />
            <ellipse cx="301" cy="198" rx="7" ry="10" />
          </g>

          <path d="M0 452 C60 428 122 424 176 444 C230 464 290 464 400 430" fill="none" stroke="rgba(174, 228, 255, .12)" strokeWidth="2" />
          <circle cx="162" cy="468" r="82" fill="none" stroke="rgba(174, 228, 255, .08)" strokeWidth="1.2" />
          <circle cx="162" cy="468" r="56" fill="none" stroke="rgba(174, 228, 255, .08)" strokeWidth="1" />
        </svg>
      );

    case "crescent-imperial":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="ciGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff0bb" />
              <stop offset="42%" stopColor={accent} />
              <stop offset="100%" stopColor="#8d541a" />
            </linearGradient>
            <filter id="ciGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="ciAura">
              <stop offset="0%" stopColor="#ffd48f" stopOpacity=".34" />
              <stop offset="100%" stopColor="#ffd48f" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#ciGold)" strokeWidth="1.3" opacity=".5" />
          <path d="M42 96 Q200 10 358 96" fill="none" stroke="url(#ciGold)" strokeWidth="2.2" opacity=".78" />
          <path d="M52 106 Q200 34 348 106" fill="none" stroke="url(#ciGold)" strokeWidth="1.2" opacity=".38" />

          <CornerFlourish x={18} y={18} color={accent} opacity={0.82} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.82} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.82} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.82} />

          <circle cx="200" cy="164" r="82" fill="url(#ciAura)" opacity=".55" />
          <BokehField x={42} y={368} width={316} height={132} color="#ffba69" count={26} maxRadius={20} opacity={0.26} blurId="ciGlow" />

          <CrescentGlyph x={200} y={150} outer={46} inner={33} color="url(#ciGold)" glowId="ciGlow" />
          <polygon points="200,146 205,159 219,160 208,168 212,182 200,174 188,182 192,168 181,160 195,159" fill="#ffd36f" opacity=".95" filter="url(#ciGlow)" />

          <HangingLantern x={66} y={170} scale={0.72} metal={accent} light={accent2} glowId="ciGlow" delay="0.2s" />
          <HangingLantern x={118} y={124} scale={0.84} metal={accent} light={accent2} glowId="ciGlow" delay="0.8s" />
          <HangingLantern x={282} y={124} scale={0.84} metal={accent} light={accent2} glowId="ciGlow" delay="1.2s" />
          <HangingLantern x={334} y={170} scale={0.72} metal={accent} light={accent2} glowId="ciGlow" delay="0.5s" />

          {[84, 122, 162, 238, 278, 318].map((x, index) => (
            <HangingStar key={x} x={x} y={92 + (index % 2) * 8} size={6 + (index % 3)} color={accent} opacity={0.9} />
          ))}

          {Array.from({ length: 36 }, (_, index) => {
            const x = 28 + (index * 47) % 344;
            const y = 70 + (index * 71) % 330;
            const radius = 0.8 + (index % 4) * 0.7;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 5 === 0 ? "#fff4cb" : accent} opacity={0.2 + (index % 5) * 0.12} />;
          })}
        </svg>
      );

    case "emerald-palace":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="epGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff0bb" />
              <stop offset="45%" stopColor={accent} />
              <stop offset="100%" stopColor="#82571d" />
            </linearGradient>
            <linearGradient id="epDome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ffad6" />
              <stop offset="100%" stopColor="#1e8f81" />
            </linearGradient>
            <filter id="epGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="epWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(153, 255, 226, .18)" />
              <stop offset="100%" stopColor="rgba(153, 255, 226, 0)" />
            </linearGradient>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#epGold)" strokeWidth="1.3" opacity=".45" />
          <path d="M44 106 Q200 8 356 106" fill="none" stroke="url(#epGold)" strokeWidth="2" opacity=".76" />
          <path d="M54 118 Q200 38 346 118" fill="none" stroke="url(#epGold)" strokeWidth="1" opacity=".36" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.76} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.76} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.76} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.76} />

          <HangingLantern x={58} y={154} scale={0.78} metal={accent} light="#fff2b4" glowId="epGlow" delay="0.3s" />
          <HangingLantern x={342} y={154} scale={0.78} metal={accent} light="#fff2b4" glowId="epGlow" delay="0.9s" />

          <CrescentGlyph x={292} y={122} outer={18} inner={12} color="url(#epGold)" glowId="epGlow" />
          <CrescentGlyph x={130} y={86} outer={10} inner={7} color="url(#epGold)" opacity={0.75} />

          {Array.from({ length: 42 }, (_, index) => {
            const x = 24 + (index * 37) % 352;
            const y = 26 + (index * 61) % 236;
            const radius = 0.6 + (index % 4) * 0.7;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fef7cd" : accent2} opacity={0.18 + (index % 5) * 0.12} />;
          })}

          <ellipse cx="200" cy="328" rx="132" ry="24" fill="rgba(255, 229, 148, .16)" filter="url(#epGlow)" />
          <g transform="translate(52 184)">
            <ellipse cx="148" cy="168" rx="126" ry="30" fill="rgba(86, 238, 199, .18)" filter="url(#epGlow)" />
            <rect x="34" y="104" width="228" height="104" rx="4" fill="rgba(6, 29, 31, .88)" stroke="url(#epGold)" strokeWidth="1.4" />

            <rect x="14" y="94" width="18" height="114" fill="rgba(8, 34, 36, .9)" stroke="url(#epGold)" strokeWidth="1.1" />
            <ellipse cx="23" cy="94" rx="13" ry="16" fill="rgba(8, 34, 36, .9)" stroke="url(#epGold)" strokeWidth="1.1" />
            <rect x="264" y="94" width="18" height="114" fill="rgba(8, 34, 36, .9)" stroke="url(#epGold)" strokeWidth="1.1" />
            <ellipse cx="273" cy="94" rx="13" ry="16" fill="rgba(8, 34, 36, .9)" stroke="url(#epGold)" strokeWidth="1.1" />

            <ellipse cx="82" cy="108" rx="34" ry="28" fill="url(#epDome)" stroke="url(#epGold)" strokeWidth="1.3" />
            <path d="M82 56 C82 42 90 34 98 34 C106 34 114 42 114 56" fill="none" stroke="url(#epGold)" strokeWidth="1.4" />
            <rect x="78" y="56" width="8" height="18" fill="url(#epGold)" opacity=".8" />

            <ellipse cx="148" cy="88" rx="48" ry="38" fill="url(#epDome)" stroke="url(#epGold)" strokeWidth="1.5" />
            <path d="M148 28 C148 14 156 6 164 6 C172 6 180 14 180 28" fill="none" stroke="url(#epGold)" strokeWidth="1.6" />
            <rect x="144" y="28" width="8" height="24" fill="url(#epGold)" opacity=".84" />

            <ellipse cx="214" cy="108" rx="34" ry="28" fill="url(#epDome)" stroke="url(#epGold)" strokeWidth="1.3" />
            <path d="M214 56 C214 42 222 34 230 34 C238 34 246 42 246 56" fill="none" stroke="url(#epGold)" strokeWidth="1.4" />
            <rect x="210" y="56" width="8" height="18" fill="url(#epGold)" opacity=".8" />

            <path d="M124 208 L124 126 Q148 86 172 126 L172 208 Z" fill="rgba(9, 39, 42, .95)" stroke="url(#epGold)" strokeWidth="1.5" />
            <path d="M136 208 L136 142 Q148 124 160 142 L160 208 Z" fill="#ffd883" opacity=".92" filter="url(#epGlow)" />
            <path d="M136 176 L160 176" stroke="#fff8d7" strokeWidth="1.5" opacity=".7" />

            {[60, 92, 188, 220].map((x) => (
              <path key={x} d={`M${x} 208 L${x} 150 Q${x + 10} 138 ${x + 20} 150 L${x + 20} 208 Z`} fill="rgba(10, 37, 39, .9)" stroke="url(#epGold)" strokeWidth="1.1" />
            ))}
          </g>

          <g opacity=".2" transform="translate(52 516) scale(1 -0.45)">
            <rect x="34" y="104" width="228" height="104" rx="4" fill="#86ffe8" />
            <ellipse cx="82" cy="108" rx="34" ry="28" fill="#86ffe8" />
            <ellipse cx="148" cy="88" rx="48" ry="38" fill="#86ffe8" />
            <ellipse cx="214" cy="108" rx="34" ry="28" fill="#86ffe8" />
          </g>

          <path d="M84 430 C124 412 164 410 204 426 C246 442 286 444 324 430" fill="none" stroke="rgba(164, 255, 233, .18)" strokeWidth="1.5" />
          <path d="M92 446 C130 430 170 428 210 442 C252 456 284 458 316 446" fill="none" stroke="rgba(164, 255, 233, .14)" strokeWidth="1.2" />
        </svg>
      );

    case "crescent-frame":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="cfGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff0bb" />
              <stop offset="46%" stopColor={accent} />
              <stop offset="100%" stopColor="#87571d" />
            </linearGradient>
            <filter id="cfGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#cfGold)" strokeWidth="1.3" opacity=".48" />
          <path d="M58 84 Q200 12 342 84" fill="none" stroke="url(#cfGold)" strokeWidth="1.7" opacity=".74" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.82} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.82} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.82} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.82} />

          <HangingLantern x={74} y={154} scale={0.84} metal={accent} light={accent2} glowId="cfGlow" delay="0.5s" />
          <HangingLantern x={326} y={154} scale={0.84} metal={accent} light={accent2} glowId="cfGlow" delay="1.1s" />
          <CrescentGlyph x={200} y={126} outer={40} inner={28} color="url(#cfGold)" glowId="cfGlow" />

          {Array.from({ length: 46 }, (_, index) => {
            const x = 20 + (index * 33) % 360;
            const y = 24 + (index * 59) % 360;
            const radius = 0.8 + (index % 4) * 0.7;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff8d8" : accent2} opacity={0.18 + (index % 5) * 0.12} />;
          })}

          <ellipse cx="118" cy="388" rx="74" ry="26" fill="rgba(174, 239, 255, .13)" />
          <ellipse cx="286" cy="394" rx="82" ry="30" fill="rgba(174, 239, 255, .11)" />
          <path d="M36 438 C82 404 132 402 182 428" fill="none" stroke="rgba(192, 255, 247, .2)" strokeWidth="2" />
          <path d="M216 430 C266 398 324 398 364 432" fill="none" stroke="rgba(192, 255, 247, .2)" strokeWidth="2" />
          <path d="M0 456 C64 432 128 432 188 452 C256 474 322 470 400 442" fill="none" stroke="rgba(192, 255, 247, .12)" strokeWidth="1.6" />
        </svg>
      );

    case "amber-lantern":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="alGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3c9" />
              <stop offset="44%" stopColor={accent} />
              <stop offset="100%" stopColor="#8a5114" />
            </linearGradient>
            <filter id="alGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#alGold)" strokeWidth="1.2" opacity=".56" />
          <path d="M54 102 Q200 26 346 102" fill="none" stroke="url(#alGold)" strokeWidth="2" opacity=".78" />
          <path d="M64 114 Q200 58 336 114" fill="none" stroke="url(#alGold)" strokeWidth="1" opacity=".34" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.84} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.84} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.84} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.84} />

          <HangingLantern x={104} y={142} scale={0.84} metal={accent} light={accent2} glowId="alGlow" delay="0.4s" />
          <HangingLantern x={200} y={96} scale={0.96} metal={accent} light={accent2} glowId="alGlow" delay="0.9s" />
          <HangingLantern x={296} y={142} scale={0.84} metal={accent} light={accent2} glowId="alGlow" delay="0.7s" />

          <circle cx="200" cy="236" r="102" fill="rgba(255, 212, 116, .22)" filter="url(#alGlow)" />
          <BokehField x={34} y={214} width={332} height={270} color="#ffce7a" count={42} maxRadius={18} opacity={0.28} blurId="alGlow" />

          {Array.from({ length: 52 }, (_, index) => {
            const x = 18 + (index * 29) % 364;
            const y = 38 + (index * 53) % 464;
            const radius = 0.7 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 7 === 0 ? "#fff6da" : accent} opacity={0.15 + (index % 5) * 0.12} />;
          })}
        </svg>
      );

    case "lantern-cascade":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="lcGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff0c0" />
              <stop offset="46%" stopColor={accent} />
              <stop offset="100%" stopColor="#85501b" />
            </linearGradient>
            <filter id="lcGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#lcGold)" strokeWidth="1.2" opacity=".54" />
          <path d="M48 90 Q200 16 352 90" fill="none" stroke="url(#lcGold)" strokeWidth="1.9" opacity=".74" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.8} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.8} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.8} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.8} />

          <HangingLantern x={86} y={182} scale={1.08} metal={accent} light={accent2} glowId="lcGlow" delay="0.4s" />
          <HangingLantern x={224} y={108} scale={0.84} metal={accent} light={accent2} glowId="lcGlow" delay="1.2s" />

          {[166, 204, 244, 286, 328].map((x, index) => (
            <HangingStar key={x} x={x} y={92 + (index % 2) * 10} size={5 + (index % 3)} color={accent} opacity={0.86} />
          ))}

          <BokehField x={52} y={344} width={292} height={140} color="#ffbb68" count={28} maxRadius={18} opacity={0.26} blurId="lcGlow" />
          {Array.from({ length: 38 }, (_, index) => {
            const x = 26 + (index * 36) % 346;
            const y = 46 + (index * 67) % 404;
            const radius = 0.8 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 5 === 0 ? "#fff3d0" : accent} opacity={0.18 + (index % 4) * 0.14} />;
          })}
        </svg>
      );

    case "lantern-moon":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="lmGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3c5" />
              <stop offset="45%" stopColor={accent} />
              <stop offset="100%" stopColor="#81541d" />
            </linearGradient>
            <filter id="lmGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#lmGold)" strokeWidth="1.25" opacity=".5" />
          <path d="M44 96 Q200 24 356 96" fill="none" stroke="url(#lmGold)" strokeWidth="1.8" opacity=".74" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.78} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.78} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.78} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.78} />

          <CrescentGlyph x={214} y={94} outer={32} inner={22} color="url(#lmGold)" glowId="lmGlow" />
          <CrescentGlyph x={116} y={164} outer={16} inner={11} color="url(#lmGold)" opacity={0.82} />

          <HangingLantern x={74} y={146} scale={0.86} metal={accent} light={accent2} glowId="lmGlow" delay="0.5s" />
          <HangingLantern x={326} y={146} scale={0.86} metal={accent} light={accent2} glowId="lmGlow" delay="0.9s" />
          <HangingLantern x={200} y={214} scale={1.08} metal={accent} light={accent2} glowId="lmGlow" delay="0.2s" />

          <circle cx="200" cy="256" r="84" fill="rgba(255, 214, 120, .16)" filter="url(#lmGlow)" />
          {Array.from({ length: 42 }, (_, index) => {
            const x = 18 + (index * 31) % 364;
            const y = 34 + (index * 57) % 420;
            const radius = 0.7 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 5 === 0 ? "#fff8d6" : accent} opacity={0.16 + (index % 5) * 0.12} />;
          })}

          <path d="M78 378 C122 356 176 354 220 372 C260 388 296 388 332 378" fill="none" stroke="rgba(250, 232, 176, .14)" strokeWidth="1.4" />
        </svg>
      );

    case "star-medallion":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="smGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3cb" />
              <stop offset="44%" stopColor={accent} />
              <stop offset="100%" stopColor="#8d531b" />
            </linearGradient>
            <filter id="smGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#smGold)" strokeWidth="1.2" opacity=".5" />
          <path d="M46 90 Q200 12 354 90" fill="none" stroke="url(#smGold)" strokeWidth="1.8" opacity=".74" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.84} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.84} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.84} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.84} />

          {[96, 136, 176, 224, 264, 304].map((x, index) => (
            <HangingStar key={x} x={x} y={94 + (index % 2) * 8} size={6 + (index % 3)} color={accent} opacity={0.88} />
          ))}

          <g transform="translate(200 250)">
            <circle cx="0" cy="0" r="112" fill="none" stroke="url(#smGold)" strokeWidth="2" opacity=".56" />
            <circle cx="0" cy="0" r="94" fill="rgba(255, 198, 93, .05)" stroke="url(#smGold)" strokeWidth="1.2" opacity=".4" />
            {Array.from({ length: 12 }, (_, index) => (
              <g key={index} transform={`rotate(${index * 30})`}>
                <path d="M0 -112 C12 -96 22 -72 18 -46 C14 -22 6 -8 0 2 C-6 -8 -14 -22 -18 -46 C-22 -72 -12 -96 0 -112 Z" fill="none" stroke="url(#smGold)" strokeWidth="1.4" opacity=".7" />
              </g>
            ))}
            <polygon points="0,-88 18,-24 84,0 18,24 0,88 -18,24 -84,0 -18,-24" fill="rgba(255, 210, 107, .14)" stroke="url(#smGold)" strokeWidth="2.2" filter="url(#smGlow)" />
            <polygon points="0,-66 14,-18 66,0 14,18 0,66 -14,18 -66,0 -14,-18" fill="none" stroke="url(#smGold)" strokeWidth="1.2" opacity=".78" />
            <circle cx="0" cy="0" r="14" fill="#ffd86f" filter="url(#smGlow)" />
          </g>

          {Array.from({ length: 40 }, (_, index) => {
            const x = 20 + (index * 34) % 360;
            const y = 30 + (index * 61) % 420;
            const radius = 0.7 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff6d8" : accent} opacity={0.16 + (index % 4) * 0.13} />;
          })}
        </svg>
      );

    case "crescent-gate":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="cgGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3c4" />
              <stop offset="45%" stopColor={accent} />
              <stop offset="100%" stopColor="#82541e" />
            </linearGradient>
            <filter id="cgGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#cgGold)" strokeWidth="1.2" opacity=".52" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.8} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.8} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.8} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.8} />

          <path d="M82 512 L82 132 Q200 -6 318 132 L318 512" fill="none" stroke="url(#cgGold)" strokeWidth="2" opacity=".78" />
          <path d="M108 512 L108 156 Q200 48 292 156 L292 512" fill="none" stroke="url(#cgGold)" strokeWidth="1.2" opacity=".42" />

          <HangingLantern x={64} y={160} scale={0.72} metal={accent} light={accent2} glowId="cgGlow" delay="0.4s" />
          <HangingLantern x={114} y={118} scale={0.84} metal={accent} light={accent2} glowId="cgGlow" delay="0.9s" />
          <HangingLantern x={286} y={118} scale={0.84} metal={accent} light={accent2} glowId="cgGlow" delay="1.1s" />
          <HangingLantern x={336} y={160} scale={0.72} metal={accent} light={accent2} glowId="cgGlow" delay="0.6s" />

          <CrescentGlyph x={200} y={186} outer={56} inner={38} color="url(#cgGold)" glowId="cgGlow" />
          <circle cx="232" cy="176" r="4" fill="#fff8d3" opacity=".9" />

          {Array.from({ length: 42 }, (_, index) => {
            const x = 24 + (index * 31) % 352;
            const y = 32 + (index * 59) % 390;
            const radius = 0.7 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 5 === 0 ? "#fff7d4" : accent} opacity={0.17 + (index % 5) * 0.12} />;
          })}

          <path d="M126 470 C152 456 182 452 210 458 C238 464 260 466 286 460" fill="none" stroke="rgba(251, 236, 176, .12)" strokeWidth="1.4" />
        </svg>
      );

    case "rose-lantern-blush":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="rbGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff5d6" />
              <stop offset="46%" stopColor={accent} />
              <stop offset="100%" stopColor="#b27a33" />
            </linearGradient>
            <filter id="rbGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="16" y="16" width="368" height="528" fill="none" stroke="url(#rbGold)" strokeWidth="1.1" opacity=".48" />
          <path d="M52 90 Q200 28 348 90" fill="none" stroke="url(#rbGold)" strokeWidth="1.8" opacity=".72" />
          <path d="M78 464 Q200 394 322 464" fill="none" stroke="url(#rbGold)" strokeWidth="1.3" opacity=".34" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.68} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.68} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.68} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.68} />

          <FloralCluster x={78} y={78} scale={1.18} opacity={0.96} />
          <FloralCluster x={322} y={78} scale={1.18} opacity={0.96} />
          <FloralCluster x={86} y={366} scale={1.26} opacity={0.98} />
          <FloralCluster x={314} y={366} scale={1.26} opacity={0.98} />

          <HangingLantern x={146} y={166} scale={0.94} metal={accent} light={accent2} glowId="rbGlow" delay="0.2s" />
          <HangingLantern x={256} y={166} scale={0.94} metal={accent} light={accent2} glowId="rbGlow" delay="0.8s" />
          <HangingLantern x={202} y={190} scale={0.56} metal={accent} light={accent2} glowId="rbGlow" delay="1.2s" />

          {Array.from({ length: 46 }, (_, index) => {
            const x = 24 + (index * 31) % 352;
            const y = 28 + (index * 57) % 468;
            const radius = 0.8 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fffdf1" : "#f2c8b0"} opacity={0.12 + (index % 5) * 0.1} />;
          })}
        </svg>
      );

    case "crescent-mandala":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="cmGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3c8" />
              <stop offset="44%" stopColor={accent} />
              <stop offset="100%" stopColor="#8b531b" />
            </linearGradient>
            <filter id="cmGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="12" y="12" width="376" height="536" fill="none" stroke="url(#cmGold)" strokeWidth="1.2" opacity=".5" />
          <path d="M44 96 Q200 22 356 96" fill="none" stroke="url(#cmGold)" strokeWidth="1.8" opacity=".76" />
          <CornerFlourish x={18} y={18} color={accent} opacity={0.8} />
          <CornerFlourish x={382} y={18} color={accent} rotation={90} opacity={0.8} />
          <CornerFlourish x={382} y={542} color={accent} rotation={180} opacity={0.8} />
          <CornerFlourish x={18} y={542} color={accent} rotation={270} opacity={0.8} />

          <g transform="translate(200 154)">
            <circle cx="0" cy="0" r="86" fill="rgba(255, 205, 120, .07)" stroke="url(#cmGold)" strokeWidth="1.3" opacity=".42" />
            {Array.from({ length: 16 }, (_, index) => (
              <g key={index} transform={`rotate(${index * 22.5})`}>
                <path d="M0 -96 C12 -82 22 -60 18 -34 C14 -14 8 -2 0 10 C-8 -2 -14 -14 -18 -34 C-22 -60 -12 -82 0 -96 Z" fill="none" stroke="url(#cmGold)" strokeWidth="1.2" opacity=".68" />
              </g>
            ))}
            <circle cx="0" cy="0" r="42" fill="none" stroke="url(#cmGold)" strokeWidth="1" opacity=".56" />
          </g>

          <CrescentGlyph x={200} y={154} outer={42} inner={29} color="url(#cmGold)" glowId="cmGlow" />
          <HangingLantern x={78} y={188} scale={0.82} metal={accent} light={accent2} glowId="cmGlow" delay="0.4s" />
          <HangingLantern x={322} y={188} scale={0.82} metal={accent} light={accent2} glowId="cmGlow" delay="0.9s" />

          {Array.from({ length: 46 }, (_, index) => {
            const x = 20 + (index * 33) % 360;
            const y = 28 + (index * 61) % 460;
            const radius = 0.8 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 5 === 0 ? "#fff8d8" : accent} opacity={0.16 + (index % 4) * 0.13} />;
          })}
        </svg>
      );

    case "moon-mosque-halo":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="mhGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CrescentGlyph x={206} y={188} outer={110} inner={82} color={accent2} glowId="mhGlow" opacity={0.94} />
          <CrescentGlyph x={82} y={138} outer={24} inner={17} color={accent2} opacity={0.86} />
          <CrescentGlyph x={302} y={134} outer={22} inner={16} color={accent2} opacity={0.86} />
          <CrescentGlyph x={250} y={82} outer={14} inner={10} color={accent2} opacity={0.82} />

          {Array.from({ length: 56 }, (_, index) => {
            const x = 16 + (index * 29) % 368;
            const y = 20 + (index * 47) % 280;
            const radius = 0.8 + (index % 4) * 0.8;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff6d3" : accent} opacity={0.16 + (index % 5) * 0.12} />;
          })}

          <BokehField x={18} y={298} width={92} height={168} color="#f0c27a" count={18} maxRadius={20} opacity={0.26} blurId="mhGlow" />
          <BokehField x={292} y={304} width={92} height={164} color="#f0c27a" count={18} maxRadius={20} opacity={0.26} blurId="mhGlow" />

          <ellipse cx="200" cy="424" rx="178" ry="58" fill="rgba(219, 228, 255, .14)" />
          <ellipse cx="200" cy="462" rx="200" ry="72" fill="rgba(201, 211, 240, .1)" />

          <g fill="rgba(7, 17, 31, .94)">
            <ellipse cx="200" cy="318" rx="62" ry="54" />
            <rect x="138" y="318" width="124" height="110" />
            <ellipse cx="132" cy="338" rx="28" ry="22" />
            <rect x="104" y="338" width="56" height="90" />
            <ellipse cx="268" cy="338" rx="28" ry="22" />
            <rect x="240" y="338" width="56" height="90" />
            <rect x="86" y="276" width="14" height="152" />
            <ellipse cx="93" cy="276" rx="12" ry="18" />
            <rect x="300" y="276" width="14" height="152" />
            <ellipse cx="307" cy="276" rx="12" ry="18" />
            <rect x="48" y="342" width="10" height="86" />
            <ellipse cx="53" cy="342" rx="8" ry="11" />
            <rect x="342" y="342" width="10" height="86" />
            <ellipse cx="347" cy="342" rx="8" ry="11" />
          </g>

          {[152, 178, 200, 222, 248].map((x, index) => (
            <rect key={x} x={x} y={360 - (index % 2) * 10} width="8" height={index % 2 === 0 ? "22" : "30"} fill="#f8d68c" opacity=".82" filter="url(#mhGlow)" />
          ))}
          <path d="M188 428 L188 372 Q200 354 212 372 L212 428 Z" fill="#f8d68c" opacity=".9" filter="url(#mhGlow)" />
        </svg>
      );

    case "ramadan-arch":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <linearGradient id="raGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff5d0" />
              <stop offset="44%" stopColor={accent} />
              <stop offset="100%" stopColor="#8d5b1e" />
            </linearGradient>
            <filter id="raGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d="M92 510 L92 178 Q200 44 308 178 L308 510" fill="none" stroke="url(#raGold)" strokeWidth="7" filter="url(#raGlow)" opacity=".94" />
          <path d="M110 510 L110 196 Q200 82 290 196 L290 510" fill="none" stroke="url(#raGold)" strokeWidth="1.8" opacity=".5" />
          <path d="M72 510 L72 178 Q200 24 328 178 L328 510" fill="none" stroke="rgba(255, 220, 151, .28)" strokeWidth="1.2" />

          <HangingLantern x={82} y={96} scale={0.86} metal={accent} light={accent2} glowId="raGlow" delay="0.3s" />
          <HangingLantern x={318} y={96} scale={0.86} metal={accent} light={accent2} glowId="raGlow" delay="0.8s" />
          <HangingLantern x={200} y={174} scale={0.78} metal={accent} light={accent2} glowId="raGlow" delay="1.1s" />
          <HangingLantern x={136} y={246} scale={0.68} metal={accent} light={accent2} glowId="raGlow" delay="0.5s" />
          <HangingLantern x={264} y={246} scale={0.68} metal={accent} light={accent2} glowId="raGlow" delay="0.9s" />

          <CrescentGlyph x={200} y={78} outer={20} inner={14} color="url(#raGold)" glowId="raGlow" />
          {Array.from({ length: 48 }, (_, index) => {
            const x = 18 + (index * 31) % 364;
            const y = 18 + (index * 47) % 280;
            const radius = 0.7 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff8d8" : accent} opacity={0.16 + (index % 5) * 0.12} />;
          })}

          <ellipse cx="84" cy="470" rx="58" ry="30" fill="rgba(25, 104, 90, .9)" />
          <rect x="38" y="470" width="92" height="70" fill="rgba(34, 83, 74, .95)" />
          <ellipse cx="316" cy="470" rx="58" ry="30" fill="rgba(25, 104, 90, .9)" />
          <rect x="270" y="470" width="92" height="70" fill="rgba(34, 83, 74, .95)" />

          <g fill="rgba(23, 84, 74, .94)">
            <ellipse cx="200" cy="450" rx="34" ry="22" />
            <rect x="166" y="450" width="68" height="62" />
            <rect x="138" y="438" width="10" height="74" />
            <ellipse cx="143" cy="438" rx="8" ry="10" />
            <rect x="252" y="438" width="10" height="74" />
            <ellipse cx="257" cy="438" rx="8" ry="10" />
          </g>
          <ellipse cx="200" cy="506" rx="180" ry="46" fill="rgba(240, 240, 240, .14)" />
        </svg>
      );

    case "floral-crescent-dawn":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="fdGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="16" y="16" width="368" height="528" fill="none" stroke={accent} strokeWidth="1" opacity=".28" />
          <FloralCluster x={92} y={82} scale={1.12} opacity={0.94} />
          <FloralCluster x={310} y={84} scale={1.08} opacity={0.94} />
          <FloralCluster x={330} y={250} scale={0.82} opacity={0.86} />
          <HangingLantern x={260} y={112} scale={0.82} metal={accent} light={accent2} glowId="fdGlow" delay="0.6s" />
          <HangingLantern x={316} y={120} scale={0.82} metal={accent} light={accent2} glowId="fdGlow" delay="1s" />
          <CrescentGlyph x={122} y={154} outer={54} inner={38} color={accent} glowId="fdGlow" opacity={0.92} />

          <g fill="rgba(173, 196, 230, .36)">
            <ellipse cx="200" cy="236" rx="78" ry="18" />
            <rect x="126" y="236" width="148" height="44" />
            <ellipse cx="170" cy="214" rx="24" ry="18" />
            <ellipse cx="228" cy="214" rx="32" ry="24" />
            <rect x="150" y="190" width="12" height="62" />
            <ellipse cx="156" cy="190" rx="9" ry="12" />
            <rect x="238" y="196" width="12" height="56" />
            <ellipse cx="244" cy="196" rx="9" ry="12" />
          </g>

          <ellipse cx="200" cy="438" rx="170" ry="62" fill="rgba(255, 255, 255, .26)" />
          <ellipse cx="112" cy="460" rx="86" ry="32" fill="rgba(255, 255, 255, .2)" />
          <ellipse cx="296" cy="456" rx="92" ry="34" fill="rgba(255, 255, 255, .2)" />
        </svg>
      );

    case "papercut-arch":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <path d="M22 560 L22 176 Q200 -20 378 176 L378 560 Z" fill="#f6d697" />
          <path d="M46 560 L46 196 Q200 18 354 196 L354 560 Z" fill="#d8862b" />
          <path d="M72 560 L72 216 Q200 58 328 216 L328 560 Z" fill="#8b1f28" />
          <path d="M96 560 L96 238 Q200 96 304 238 L304 560 Z" fill="#a22b2f" />
          <path d="M112 560 L112 252 Q200 132 288 252 L288 560 Z" fill="#5f1620" />
          <CrescentGlyph x={196} y={170} outer={34} inner={24} color={accent} opacity={0.92} />
          <polygon points="240,160 245,172 258,173 248,181 252,194 240,186 228,194 232,181 222,173 235,172" fill={accent2} opacity=".88" />

          <g fill="#f4c26c">
            <ellipse cx="200" cy="266" rx="80" ry="16" />
            <rect x="120" y="266" width="160" height="54" />
            <ellipse cx="146" cy="246" rx="20" ry="14" />
            <ellipse cx="200" cy="234" rx="34" ry="24" />
            <ellipse cx="254" cy="246" rx="20" ry="14" />
            <rect x="106" y="224" width="10" height="96" />
            <ellipse cx="111" cy="224" rx="8" ry="11" />
            <rect x="284" y="224" width="10" height="96" />
            <ellipse cx="289" cy="224" rx="8" ry="11" />
          </g>

          {Array.from({ length: 18 }, (_, index) => {
            const x = 42 + (index * 19) % 316;
            const y = 46 + (index * 31) % 152;
            return <circle key={index} cx={x} cy={y} r={1.4 + (index % 3) * 0.6} fill={accent2} opacity={0.46} />;
          })}
        </svg>
      );

    case "cloud-crescent":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="ccGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CrescentGlyph x={172} y={136} outer={62} inner={44} color={accent} glowId="ccGlow" opacity={0.96} />
          {[120, 166, 208, 252, 294].map((x, index) => (
            <HangingStar key={x} x={x} y={72 + (index % 2) * 10} size={5 + (index % 3)} color={accent} opacity={0.88} />
          ))}
          <HangingLantern x={308} y={118} scale={0.7} metal={accent} light={accent2} glowId="ccGlow" delay="0.8s" />
          <HangingLantern x={346} y={92} scale={0.52} metal={accent} light={accent2} glowId="ccGlow" delay="1.1s" />

          {Array.from({ length: 52 }, (_, index) => {
            const x = 18 + (index * 29) % 364;
            const y = 18 + (index * 47) % 280;
            const radius = 0.8 + (index % 4) * 0.7;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fff8ef" : accent} opacity={0.16 + (index % 5) * 0.12} />;
          })}

          <ellipse cx="116" cy="404" rx="104" ry="62" fill="rgba(255, 255, 255, .24)" />
          <ellipse cx="224" cy="422" rx="132" ry="74" fill="rgba(255, 255, 255, .22)" />
          <ellipse cx="324" cy="404" rx="86" ry="54" fill="rgba(255, 255, 255, .22)" />
          <ellipse cx="200" cy="480" rx="192" ry="84" fill="rgba(255, 255, 255, .18)" />
        </svg>
      );

    case "ivory-lantern":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="ilGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="18" y="18" width="364" height="524" fill="none" stroke={accent} strokeWidth="1" opacity=".24" />
          <path d="M30 88 C72 34 124 34 166 88" fill="none" stroke={accent} strokeWidth="1.2" opacity=".26" />
          <path d="M234 88 C276 34 328 34 370 88" fill="none" stroke={accent} strokeWidth="1.2" opacity=".26" />
          <path d="M18 150 C76 122 124 124 172 146" fill="none" stroke={accent} strokeWidth=".8" opacity=".18" />
          <path d="M228 146 C276 124 324 122 382 150" fill="none" stroke={accent} strokeWidth=".8" opacity=".18" />

          <HangingLantern x={86} y={120} scale={0.62} metal={accent} light={accent2} glowId="ilGlow" delay="0.2s" />
          <HangingLantern x={144} y={104} scale={0.86} metal={accent} light={accent2} glowId="ilGlow" delay="0.8s" />
          <HangingLantern x={256} y={112} scale={0.74} metal={accent} light={accent2} glowId="ilGlow" delay="1.1s" />
          <HangingLantern x={326} y={120} scale={0.62} metal={accent} light={accent2} glowId="ilGlow" delay="0.6s" />

          {[106, 128, 170, 230, 270, 294].map((x, index) => (
            <HangingStar key={x} x={x} y={142 + (index % 2) * 8} size={4 + (index % 3)} color={accent} opacity={0.56} />
          ))}

          {Array.from({ length: 40 }, (_, index) => {
            const x = 22 + (index * 33) % 356;
            const y = 30 + (index * 61) % 444;
            const radius = 0.7 + (index % 4) * 0.5;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 6 === 0 ? "#fffdf6" : accent} opacity={0.08 + (index % 5) * 0.06} />;
          })}
        </svg>
      );

    case "aurora-glass":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="agGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="72" y="84" width="256" height="356" rx="34" fill="rgba(255, 255, 255, .08)" stroke="rgba(255, 255, 255, .48)" strokeWidth="1.3" />
          <rect x="82" y="94" width="236" height="336" rx="28" fill="rgba(255, 255, 255, .04)" />
          <CrescentGlyph x={200} y={156} outer={52} inner={36} color={accent} glowId="agGlow" opacity={0.96} />
          <HangingLantern x={76} y={182} scale={0.5} metal={accent} light={accent2} glowId="agGlow" delay="0.7s" />

          {Array.from({ length: 34 }, (_, index) => {
            const x = 26 + (index * 31) % 348;
            const y = 28 + (index * 59) % 360;
            const radius = 0.8 + (index % 4) * 0.6;
            return <circle key={index} cx={x} cy={y} r={radius} fill={index % 5 === 0 ? "#fffdf1" : accent2} opacity={0.14 + (index % 4) * 0.1} />;
          })}

          <ellipse cx="86" cy="426" rx="74" ry="46" fill="rgba(255, 255, 255, .12)" />
          <ellipse cx="322" cy="392" rx="58" ry="34" fill="rgba(255, 255, 255, .1)" />
        </svg>
      );

    case "twilight-minaret":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="tmGlow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <linearGradient id="tmSkyFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent2} stopOpacity="0.18" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></linearGradient>
          </defs>
          <rect x="0" y="0" width="400" height="560" fill="url(#tmSkyFade)" />

          {/* Twin minarets */}
          <rect x="68" y="200" width="18" height="220" rx="3" fill={accent} opacity={0.7} />
          <rect x="314" y="200" width="18" height="220" rx="3" fill={accent} opacity={0.7} />
          <polygon points="77,200 60,170 94,170" fill={accent} opacity={0.8} />
          <polygon points="323,200 306,170 340,170" fill={accent} opacity={0.8} />
          <circle cx="77" cy="162" r="8" fill={accent} opacity={0.9} filter="url(#tmGlow)" />
          <circle cx="323" cy="162" r="8" fill={accent} opacity={0.9} filter="url(#tmGlow)" />

          {/* Central dome */}
          <ellipse cx="200" cy="280" rx="90" ry="60" fill={accent} opacity={0.15} />
          <path d="M140 310 Q200 200 260 310" fill="none" stroke={accent} strokeWidth="2" opacity={0.6} />
          <path d="M150 310 Q200 215 250 310" fill={accent} opacity={0.08} />

          {/* Crescent on dome */}
          <CrescentGlyph x={200} y={230} outer={22} inner={16} color={accent2} glowId="tmGlow" opacity={0.9} rotation={-20} />

          {/* Arch doorway */}
          <path d="M170 420 L170 340 Q200 300 230 340 L230 420" fill="none" stroke={accent} strokeWidth="1.5" opacity={0.5} />

          {/* Ground line */}
          <line x1="40" y1="420" x2="360" y2="420" stroke={accent} strokeWidth="0.8" opacity={0.3} />

          {/* Stars field */}
          {Array.from({ length: 50 }, (_, i) => {
            const sx = 20 + (i * 37) % 360;
            const sy = 20 + (i * 53) % 160;
            const r = 0.6 + (i % 4) * 0.5;
            return <circle key={i} cx={sx} cy={sy} r={r} fill={i % 7 === 0 ? "#fff" : accent2} opacity={0.15 + (i % 5) * 0.08} />;
          })}

          {/* Hanging star ornaments */}
          <HangingStar x={120} y={120} size={6} color={accent2} opacity={0.6} />
          <HangingStar x={280} y={100} size={5} color={accent2} opacity={0.5} />
          <HangingStar x={200} y={80} size={7} color={accent} opacity={0.7} />

          <CornerFlourish x={24} y={24} color={accent} scale={1} opacity={0.35} />
          <CornerFlourish x={376} y={24} color={accent} scale={1} rotation={90} opacity={0.35} />
          <CornerFlourish x={376} y={536} color={accent} scale={1} rotation={180} opacity={0.35} />
          <CornerFlourish x={24} y={536} color={accent} scale={1} rotation={270} opacity={0.35} />
        </svg>
      );

    case "golden-dome-garden":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="gdGlow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <radialGradient id="gdDomeShine" cx="50%" cy="30%"><stop offset="0%" stopColor={accent2} stopOpacity="0.3" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></radialGradient>
          </defs>

          {/* Grand central dome */}
          <ellipse cx="200" cy="240" rx="110" ry="80" fill="url(#gdDomeShine)" />
          <path d="M100 280 Q200 140 300 280" fill="none" stroke={accent} strokeWidth="2.5" opacity={0.7} />
          <path d="M110 280 Q200 155 290 280" fill={accent} opacity={0.06} />

          {/* Dome finial */}
          <CrescentGlyph x={200} y={170} outer={18} inner={13} color={accent} glowId="gdGlow" opacity={0.85} />

          {/* Side arches */}
          <path d="M60 340 Q100 290 140 340" fill="none" stroke={accent} strokeWidth="1.5" opacity={0.4} />
          <path d="M260 340 Q300 290 340 340" fill="none" stroke={accent} strokeWidth="1.5" opacity={0.4} />

          {/* Garden flowers */}
          <Blossom x={80} y={440} scale={1.2} fill={accent2} center={accent} opacity={0.7} />
          <Blossom x={140} y={460} scale={0.9} fill={accent} center={accent2} opacity={0.6} />
          <Blossom x={260} y={455} scale={1.0} fill={accent2} center={accent} opacity={0.65} />
          <Blossom x={320} y={435} scale={1.1} fill={accent} center={accent2} opacity={0.7} />
          <Blossom x={200} y={470} scale={0.7} fill={accent2} center={accent} opacity={0.5} />

          {/* Leaf sprigs */}
          <LeafSprig x={60} y={460} scale={0.9} rotation={-15} stroke={accent2} opacity={0.5} />
          <LeafSprig x={340} y={450} scale={0.9} rotation={15} stroke={accent2} opacity={0.5} />
          <LeafSprig x={170} y={478} scale={0.7} rotation={-10} stroke={accent} opacity={0.4} />
          <LeafSprig x={230} y={475} scale={0.7} rotation={10} stroke={accent} opacity={0.4} />

          {/* Pathway */}
          <line x1="175" y1="420" x2="175" y2="500" stroke={accent} strokeWidth="0.5" opacity={0.2} />
          <line x1="225" y1="420" x2="225" y2="500" stroke={accent} strokeWidth="0.5" opacity={0.2} />

          {/* Ground */}
          <line x1="30" y1="420" x2="370" y2="420" stroke={accent} strokeWidth="0.7" opacity={0.25} />

          {/* Ambient particles */}
          <BokehField x={40} y={60} width={320} height={160} color={accent2} count={18} maxRadius={2.5} opacity={0.18} />

          <CornerFlourish x={24} y={24} color={accent} scale={0.9} opacity={0.3} />
          <CornerFlourish x={376} y={24} color={accent} scale={0.9} rotation={90} opacity={0.3} />
        </svg>
      );

    case "sapphire-crescent":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="scGlow"><feGaussianBlur stdDeviation="10" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="scSoftGlow"><feGaussianBlur stdDeviation="18" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Large central crescent */}
          <CrescentGlyph x={200} y={200} outer={80} inner={58} color={accent} glowId="scGlow" opacity={0.85} rotation={-25} />

          {/* Inner glow ring */}
          <circle cx="200" cy="200" r="95" fill="none" stroke={accent2} strokeWidth="0.8" opacity={0.2} />
          <circle cx="200" cy="200" r="110" fill="none" stroke={accent2} strokeWidth="0.5" opacity={0.12} />

          {/* Star cluster inside crescent */}
          <HangingStar x={220} y={170} size={8} color={accent2} opacity={0.8} />
          <HangingStar x={240} y={195} size={5} color={accent2} opacity={0.6} />
          <HangingStar x={230} y={215} size={4} color={accent} opacity={0.5} />
          <HangingStar x={248} y={175} size={3} color="#fff" opacity={0.4} />

          {/* Radiating lines from crescent */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = Math.round((200 + Math.cos(angle) * 120) * 100) / 100;
            const y1 = Math.round((200 + Math.sin(angle) * 120) * 100) / 100;
            const x2 = Math.round((200 + Math.cos(angle) * 150) * 100) / 100;
            const y2 = Math.round((200 + Math.sin(angle) * 150) * 100) / 100;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent2} strokeWidth="0.5" opacity={0.15} />;
          })}

          {/* Floating gems / bokeh */}
          <BokehField x={30} y={320} width={340} height={180} color={accent} count={24} maxRadius={3} opacity={0.15} />

          {/* Bottom decorative wave */}
          <path d="M0 480 Q100 460 200 480 Q300 500 400 480" fill="none" stroke={accent2} strokeWidth="1" opacity={0.2} />
          <path d="M0 495 Q100 475 200 495 Q300 515 400 495" fill="none" stroke={accent} strokeWidth="0.7" opacity={0.15} />

          {/* Starfield */}
          {Array.from({ length: 60 }, (_, i) => {
            const sx = 15 + (i * 41) % 370;
            const sy = 15 + (i * 67) % 530;
            const r = 0.5 + (i % 5) * 0.4;
            return <circle key={i} cx={sx} cy={sy} r={r} fill={i % 8 === 0 ? "#fff" : accent2} opacity={0.1 + (i % 6) * 0.06} />;
          })}
        </svg>
      );

    case "rose-gold-filigree":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="rgGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Central ornate frame */}
          <rect x="60" y="80" width="280" height="400" rx="20" fill="none" stroke={accent} strokeWidth="1.2" opacity={0.35} />
          <rect x="72" y="92" width="256" height="376" rx="14" fill="none" stroke={accent} strokeWidth="0.6" opacity={0.2} />

          {/* Top arch in frame */}
          <path d="M100 160 Q200 80 300 160" fill="none" stroke={accent} strokeWidth="1.5" opacity={0.4} />

          {/* Filigree corners */}
          <CornerFlourish x={72} y={92} color={accent} scale={1.3} opacity={0.55} />
          <CornerFlourish x={328} y={92} color={accent} scale={1.3} rotation={90} opacity={0.55} />
          <CornerFlourish x={328} y={468} color={accent} scale={1.3} rotation={180} opacity={0.55} />
          <CornerFlourish x={72} y={468} color={accent} scale={1.3} rotation={270} opacity={0.55} />

          {/* Central crescent */}
          <CrescentGlyph x={200} y={200} outer={36} inner={26} color={accent} glowId="rgGlow" opacity={0.8} rotation={-15} />

          {/* Floral clusters */}
          <Blossom x={110} y={140} scale={0.8} fill={accent2} center={accent} opacity={0.6} />
          <Blossom x={290} y={140} scale={0.8} fill={accent2} center={accent} opacity={0.6} />
          <Blossom x={110} y={420} scale={0.7} fill={accent} center={accent2} opacity={0.5} />
          <Blossom x={290} y={420} scale={0.7} fill={accent} center={accent2} opacity={0.5} />
          <Blossom x={200} y={400} scale={0.9} fill={accent2} center={accent} opacity={0.55} />

          {/* Delicate vine lines */}
          <path d="M80 160 Q60 280 80 400" fill="none" stroke={accent} strokeWidth="0.6" opacity={0.25} />
          <path d="M320 160 Q340 280 320 400" fill="none" stroke={accent} strokeWidth="0.6" opacity={0.25} />

          {/* Small leaf accents */}
          <LeafSprig x={85} y={220} scale={0.5} rotation={-20} stroke={accent2} opacity={0.35} />
          <LeafSprig x={315} y={220} scale={0.5} rotation={20} stroke={accent2} opacity={0.35} />
          <LeafSprig x={85} y={340} scale={0.5} rotation={-10} stroke={accent2} opacity={0.3} />
          <LeafSprig x={315} y={340} scale={0.5} rotation={10} stroke={accent2} opacity={0.3} />

          {/* Ambient sparkle */}
          {Array.from({ length: 20 }, (_, i) => {
            const sx = 90 + (i * 29) % 220;
            const sy = 120 + (i * 47) % 320;
            return <circle key={i} cx={sx} cy={sy} r={0.8 + (i % 3) * 0.4} fill={accent2} opacity={0.12 + (i % 4) * 0.05} />;
          })}
        </svg>
      );

    case "midnight-lantern-trail":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="mlGlow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Trail of lanterns - diagonal cascade */}
          <HangingLantern x={80} y={60} scale={0.7} metal={accent} light={accent2} glowId="mlGlow" delay="0s" />
          <HangingLantern x={150} y={120} scale={0.85} metal={accent} light={accent2} glowId="mlGlow" delay="0.4s" />
          <HangingLantern x={200} y={190} scale={1.0} metal={accent} light={accent2} glowId="mlGlow" delay="0.8s" />
          <HangingLantern x={260} y={140} scale={0.75} metal={accent} light={accent2} glowId="mlGlow" delay="1.2s" />
          <HangingLantern x={330} y={80} scale={0.65} metal={accent} light={accent2} glowId="mlGlow" delay="0.2s" />

          {/* Connecting light trail */}
          <path d="M80 100 Q115 130 150 155 Q175 175 200 225 Q230 175 260 175 Q295 130 330 118" fill="none" stroke={accent2} strokeWidth="0.8" opacity={0.2} strokeDasharray="4 6" />

          {/* Crescent moon background */}
          <CrescentGlyph x={320} y={60} outer={30} inner={22} color={accent} glowId="mlGlow" opacity={0.4} rotation={-30} />

          {/* Stars scattered */}
          {Array.from({ length: 45 }, (_, i) => {
            const sx = 10 + (i * 39) % 380;
            const sy = 10 + (i * 57) % 540;
            const r = 0.5 + (i % 4) * 0.5;
            return <circle key={i} cx={sx} cy={sy} r={r} fill={i % 6 === 0 ? "#fff" : accent2} opacity={0.1 + (i % 5) * 0.07} />;
          })}

          {/* Floating blossoms at bottom */}
          <Blossom x={60} y={450} scale={0.8} fill={accent2} center={accent} opacity={0.4} />
          <Blossom x={160} y={470} scale={0.6} fill={accent} center={accent2} opacity={0.35} />
          <Blossom x={280} y={460} scale={0.7} fill={accent2} center={accent} opacity={0.4} />
          <Blossom x={350} y={440} scale={0.5} fill={accent} center={accent2} opacity={0.3} />

          <LeafSprig x={100} y={480} scale={0.6} rotation={-20} stroke={accent2} opacity={0.3} />
          <LeafSprig x={310} y={475} scale={0.6} rotation={15} stroke={accent2} opacity={0.3} />
        </svg>
      );

    case "jade-arch-paradise":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="jaGlow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Grand pointed arch */}
          <path d="M80 420 L80 240 Q80 160 200 100 Q320 160 320 240 L320 420" fill="none" stroke={accent} strokeWidth="2" opacity={0.5} />
          <path d="M92 420 L92 248 Q92 172 200 118 Q308 172 308 248 L308 420" fill={accent} opacity={0.04} />

          {/* Inner arch */}
          <path d="M120 420 L120 260 Q120 195 200 150 Q280 195 280 260 L280 420" fill="none" stroke={accent2} strokeWidth="1" opacity={0.3} />

          {/* Arch keystone ornament */}
          <CrescentGlyph x={200} y={120} outer={16} inner={11} color={accent2} glowId="jaGlow" opacity={0.8} />
          <HangingStar x={200} y={100} size={5} color={accent} opacity={0.7} />

          {/* Hanging lantern inside arch */}
          <HangingLantern x={200} y={180} scale={0.8} metal={accent} light={accent2} glowId="jaGlow" delay="0s" />

          {/* Side pillars */}
          <rect x="70" y="240" width="14" height="180" rx="3" fill={accent} opacity={0.2} />
          <rect x="316" y="240" width="14" height="180" rx="3" fill={accent} opacity={0.2} />

          {/* Paradise garden at bottom */}
          <Blossom x={100} y={470} scale={1.0} fill={accent2} center={accent} opacity={0.6} />
          <Blossom x={200} y={480} scale={1.2} fill={accent} center={accent2} opacity={0.55} />
          <Blossom x={300} y={465} scale={0.9} fill={accent2} center={accent} opacity={0.6} />
          <Blossom x={150} y={490} scale={0.7} fill={accent} center={accent2} opacity={0.4} />
          <Blossom x={250} y={488} scale={0.8} fill={accent2} center={accent} opacity={0.45} />

          <LeafSprig x={60} y={480} scale={0.8} rotation={-10} stroke={accent} opacity={0.4} />
          <LeafSprig x={340} y={475} scale={0.8} rotation={10} stroke={accent} opacity={0.4} />

          {/* Ambient particles */}
          <BokehField x={100} y={160} width={200} height={240} color={accent2} count={16} maxRadius={2} opacity={0.14} />
        </svg>
      );

    case "sunset-silhouette":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="ssGlow"><feGaussianBlur stdDeviation="12" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <linearGradient id="ssSunGrad" cx="50%" cy="50%"><stop offset="0%" stopColor={accent2} stopOpacity="0.4" /><stop offset="100%" stopColor={accent} stopOpacity="0" /></linearGradient>
          </defs>

          {/* Sun disc */}
          <circle cx="200" cy="180" r="70" fill={accent} opacity={0.12} filter="url(#ssGlow)" />
          <circle cx="200" cy="180" r="50" fill={accent2} opacity={0.08} />
          <circle cx="200" cy="180" r="50" fill="none" stroke={accent} strokeWidth="1.5" opacity={0.3} />

          {/* Mosque silhouette */}
          <rect x="140" y="300" width="120" height="120" fill={accent} opacity={0.12} />
          {/* Main dome */}
          <path d="M145 300 Q200 240 255 300" fill={accent} opacity={0.12} />
          {/* Left minaret */}
          <rect x="110" y="280" width="12" height="140" rx="2" fill={accent} opacity={0.15} />
          <polygon points="116,280 106,260 126,260" fill={accent} opacity={0.15} />
          {/* Right minaret */}
          <rect x="278" y="280" width="12" height="140" rx="2" fill={accent} opacity={0.15} />
          <polygon points="284,280 274,260 294,260" fill={accent} opacity={0.15} />

          {/* Crescent on dome */}
          <CrescentGlyph x={200} y={252} outer={12} inner={8} color={accent2} glowId="ssGlow" opacity={0.9} />

          {/* Birds silhouettes */}
          <path d="M100 140 Q105 134 110 140 Q115 134 120 140" fill="none" stroke={accent} strokeWidth="1.2" opacity={0.3} />
          <path d="M280 120 Q284 115 288 120 Q292 115 296 120" fill="none" stroke={accent} strokeWidth="1" opacity={0.25} />
          <path d="M160 100 Q163 96 166 100 Q169 96 172 100" fill="none" stroke={accent} strokeWidth="0.8" opacity={0.2} />

          {/* Horizon line */}
          <line x1="0" y1="420" x2="400" y2="420" stroke={accent} strokeWidth="0.6" opacity={0.2} />

          {/* Palm tree silhouette left */}
          <rect x="40" y="340" width="6" height="80" rx="2" fill={accent} opacity={0.12} />
          <path d="M43 340 Q20 320 10 300" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity={0.1} />
          <path d="M43 340 Q50 310 70 295" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity={0.1} />
          <path d="M43 345 Q30 330 15 325" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity={0.08} />

          {/* Palm tree silhouette right */}
          <rect x="354" y="350" width="5" height="70" rx="2" fill={accent} opacity={0.1} />
          <path d="M356 350 Q370 330 385 320" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity={0.08} />
          <path d="M356 350 Q345 325 330 315" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity={0.08} />

          {/* Warm glow particles */}
          {Array.from({ length: 30 }, (_, i) => {
            const sx = 60 + (i * 31) % 280;
            const sy = 120 + (i * 43) % 200;
            return <circle key={i} cx={sx} cy={sy} r={1 + (i % 3) * 0.6} fill={accent2} opacity={0.08 + (i % 4) * 0.04} />;
          })}
        </svg>
      );

    case "diamond-star-burst":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="dsGlow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Central 8-pointed star */}
          <g transform="translate(200, 220)">
            {/* Diamond star shape */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x2 = Math.round(Math.cos(angle) * 90 * 100) / 100;
              const y2 = Math.round(Math.sin(angle) * 90 * 100) / 100;
              return <line key={i} x1={0} y1={0} x2={x2} y2={y2} stroke={accent} strokeWidth="1.5" opacity={0.35} />;
            })}
            {/* Inner star outline */}
            <polygon
              points={Array.from({ length: 16 }, (_, i) => {
                const angle = (i * 22.5 * Math.PI) / 180;
                const r = i % 2 === 0 ? 70 : 35;
                return `${Math.round(Math.cos(angle) * r * 100) / 100},${Math.round(Math.sin(angle) * r * 100) / 100}`;
              }).join(" ")}
              fill={accent} opacity={0.06} stroke={accent} strokeWidth="1" />
            {/* Inner glow circle */}
            <circle r="28" fill={accent2} opacity={0.12} filter="url(#dsGlow)" />
            <CrescentGlyph x={0} y={0} outer={20} inner={14} color={accent2} glowId="dsGlow" opacity={0.9} />
          </g>

          {/* Orbiting smaller stars */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = ((i * 45 + 22.5) * Math.PI) / 180;
            const sx = Math.round((200 + Math.cos(angle) * 130) * 100) / 100;
            const sy = Math.round((220 + Math.sin(angle) * 130) * 100) / 100;
            return <HangingStar key={i} x={sx} y={sy} size={4 + (i % 3)} color={i % 2 === 0 ? accent : accent2} opacity={0.45} />;
          })}

          {/* Outer ring */}
          <circle cx="200" cy="220" r="140" fill="none" stroke={accent} strokeWidth="0.6" opacity={0.15} strokeDasharray="3 8" />
          <circle cx="200" cy="220" r="160" fill="none" stroke={accent2} strokeWidth="0.4" opacity={0.1} strokeDasharray="2 10" />

          {/* Corner ornaments */}
          <CornerFlourish x={28} y={28} color={accent} scale={1.1} opacity={0.4} />
          <CornerFlourish x={372} y={28} color={accent} scale={1.1} rotation={90} opacity={0.4} />
          <CornerFlourish x={372} y={532} color={accent} scale={1.1} rotation={180} opacity={0.4} />
          <CornerFlourish x={28} y={532} color={accent} scale={1.1} rotation={270} opacity={0.4} />

          {/* Sparkle dust */}
          {Array.from({ length: 40 }, (_, i) => {
            const sx = 20 + (i * 37) % 360;
            const sy = 20 + (i * 61) % 520;
            return <circle key={i} cx={sx} cy={sy} r={0.6 + (i % 3) * 0.4} fill={i % 7 === 0 ? "#fff" : accent2} opacity={0.08 + (i % 5) * 0.05} />;
          })}
        </svg>
      );

    case "ocean-crescent-pearl":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="ocGlow"><feGaussianBlur stdDeviation="10" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Large crescent */}
          <CrescentGlyph x={200} y={180} outer={65} inner={48} color={accent} glowId="ocGlow" opacity={0.75} rotation={-20} />

          {/* Pearl circle inside crescent */}
          <circle cx="230" cy="170" r="18" fill={accent2} opacity={0.15} />
          <circle cx="230" cy="170" r="18" fill="none" stroke={accent2} strokeWidth="1.2" opacity={0.5} />
          <circle cx="225" cy="165" r="4" fill="#fff" opacity={0.3} />

          {/* Flowing waves */}
          <path d="M0 380 Q100 360 200 380 Q300 400 400 380" fill="none" stroke={accent2} strokeWidth="1.2" opacity={0.25} />
          <path d="M0 400 Q100 380 200 400 Q300 420 400 400" fill="none" stroke={accent} strokeWidth="1" opacity={0.2} />
          <path d="M0 420 Q100 400 200 420 Q300 440 400 420" fill="none" stroke={accent2} strokeWidth="0.8" opacity={0.15} />
          <path d="M0 440 Q100 420 200 440 Q300 460 400 440" fill="none" stroke={accent} strokeWidth="0.6" opacity={0.1} />

          {/* Scattered pearls / bubbles */}
          {[
            { x: 80, y: 420, r: 6 }, { x: 140, y: 450, r: 4 }, { x: 260, y: 430, r: 5 },
            { x: 320, y: 460, r: 3.5 }, { x: 180, y: 470, r: 4.5 }, { x: 340, y: 410, r: 3 },
            { x: 60, y: 460, r: 3 }, { x: 220, y: 445, r: 5.5 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={p.r} fill={accent2} opacity={0.1} />
              <circle cx={p.x} cy={p.y} r={p.r} fill="none" stroke={accent2} strokeWidth="0.7" opacity={0.3} />
              <circle cx={p.x - p.r * 0.2} cy={p.y - p.r * 0.3} r={p.r * 0.2} fill="#fff" opacity={0.25} />
            </g>
          ))}

          {/* Hanging lantern accent */}
          <HangingLantern x={100} y={100} scale={0.55} metal={accent} light={accent2} glowId="ocGlow" delay="0.5s" />
          <HangingLantern x={310} y={120} scale={0.5} metal={accent} light={accent2} glowId="ocGlow" delay="1s" />

          {/* Stars */}
          {Array.from({ length: 35 }, (_, i) => {
            const sx = 15 + (i * 43) % 370;
            const sy = 15 + (i * 59) % 340;
            return <circle key={i} cx={sx} cy={sy} r={0.6 + (i % 4) * 0.4} fill={i % 6 === 0 ? "#fff" : accent2} opacity={0.12 + (i % 5) * 0.06} />;
          })}
        </svg>
      );

    case "ruby-mandala-glow":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="rmGlow"><feGaussianBlur stdDeviation="7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Mandala - outer ring */}
          <g transform="translate(200, 230)">
            {/* Outer petal ring */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x = Math.round(Math.cos(angle) * 100 * 100) / 100;
              const y = Math.round(Math.sin(angle) * 100 * 100) / 100;
              return <ellipse key={`o${i}`} cx={x} cy={y} rx="18" ry="6" fill={accent} opacity={0.12} transform={`rotate(${i * 30} ${x} ${y})`} />;
            })}
            {/* Middle petal ring */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = ((i * 45 + 22.5) * Math.PI) / 180;
              const x = Math.round(Math.cos(angle) * 65 * 100) / 100;
              const y = Math.round(Math.sin(angle) * 65 * 100) / 100;
              return <ellipse key={`m${i}`} cx={x} cy={y} rx="14" ry="5" fill={accent2} opacity={0.15} transform={`rotate(${i * 45 + 22.5} ${x} ${y})`} />;
            })}
            {/* Inner petal ring */}
            {Array.from({ length: 6 }, (_, i) => {
              const angle = (i * 60 * Math.PI) / 180;
              const x = Math.round(Math.cos(angle) * 35 * 100) / 100;
              const y = Math.round(Math.sin(angle) * 35 * 100) / 100;
              return <ellipse key={`in${i}`} cx={x} cy={y} rx="10" ry="4" fill={accent} opacity={0.2} transform={`rotate(${i * 60} ${x} ${y})`} />;
            })}

            {/* Concentric circles */}
            <circle r="110" fill="none" stroke={accent} strokeWidth="0.8" opacity={0.2} />
            <circle r="75" fill="none" stroke={accent2} strokeWidth="0.6" opacity={0.18} />
            <circle r="45" fill="none" stroke={accent} strokeWidth="0.5" opacity={0.15} />

            {/* Center glow */}
            <circle r="22" fill={accent} opacity={0.1} filter="url(#rmGlow)" />
            <CrescentGlyph x={0} y={0} outer={16} inner={11} color={accent2} glowId="rmGlow" opacity={0.9} />

            {/* Dot accents between petals */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = ((i * 30 + 15) * Math.PI) / 180;
              const x = Math.round(Math.cos(angle) * 85 * 100) / 100;
              const y = Math.round(Math.sin(angle) * 85 * 100) / 100;
              return <circle key={`d${i}`} cx={x} cy={y} r="2" fill={accent2} opacity={0.35} />;
            })}
          </g>

          {/* Bottom decorative band */}
          <Blossom x={80} y={460} scale={0.7} fill={accent2} center={accent} opacity={0.4} />
          <Blossom x={200} y={475} scale={0.8} fill={accent} center={accent2} opacity={0.45} />
          <Blossom x={320} y={455} scale={0.65} fill={accent2} center={accent} opacity={0.4} />

          {/* Ambient dust */}
          {Array.from({ length: 30 }, (_, i) => {
            const sx = 20 + (i * 41) % 360;
            const sy = 20 + (i * 63) % 520;
            return <circle key={i} cx={sx} cy={sy} r={0.7 + (i % 3) * 0.4} fill={i % 5 === 0 ? accent : accent2} opacity={0.08 + (i % 4) * 0.04} />;
          })}
        </svg>
      );

    case "lantern-mandala-crescent":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="lmcGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lmcBlur">
              <feGaussianBlur stdDeviation="11" />
            </filter>
            <linearGradient id="lmcFlare" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff1c7" stopOpacity="0" />
              <stop offset="48%" stopColor={accent2} stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fff1c7" stopOpacity="0" />
            </linearGradient>
            <clipPath id="lmcCrescentClip">
              <path d="M60 -136 A136 136 0 1 0 60 136 A97 97 0 1 1 60 -136 Z" />
            </clipPath>
          </defs>

          <BokehField x={0} y={0} width={400} height={560} color="#fff8eb" count={18} maxRadius={26} opacity={0.18} blurId="lmcBlur" />
          <BokehField x={0} y={0} width={400} height={560} color={accent} count={12} maxRadius={22} opacity={0.12} blurId="lmcBlur" />

          <path d="M250 92 C286 66 315 64 349 84" fill="none" stroke="#d8c59e" strokeWidth="1.2" opacity="0.18" />
          <path d="M276 110 C292 95 311 96 325 112 C313 121 291 123 276 110 Z" fill="none" stroke="#d8c59e" strokeWidth="1" opacity="0.16" />
          <path d="M242 120 C260 104 281 104 297 120" fill="none" stroke="#d8c59e" strokeWidth="1" opacity="0.14" />
          <path d="M232 130 C247 139 261 140 274 132" fill="none" stroke="#d8c59e" strokeWidth="1" opacity="0.12" />

          <circle cx="54" cy="188" r="26" fill={accent2} opacity="0.46" filter="url(#lmcGlow)" />
          <rect x="-10" y="184" width="170" height="3.5" fill="url(#lmcFlare)" opacity="0.82" filter="url(#lmcBlur)" />

          <HangingLantern x={70} y={84} scale={0.72} metal={accent} light={accent2} glowId="lmcGlow" delay="0s" />
          <HangingLantern x={295} y={90} scale={0.88} metal={accent} light={accent2} glowId="lmcGlow" delay="0.55s" />

          <g transform="translate(168 278) rotate(-8)">
            <g clipPath="url(#lmcCrescentClip)">
              {Array.from({ length: 20 }, (_, index) => {
                const angle = (index * 18 - 92) * Math.PI / 180;
                const cx = Math.cos(angle) * 109;
                const cy = Math.sin(angle) * 109;
                const rotation = index * 18 - 92;
                return (
                  <g key={`lmc-petal-${index}`}>
                    <ellipse
                      cx={cx.toFixed(2)}
                      cy={cy.toFixed(2)}
                      rx="9"
                      ry="23"
                      fill="none"
                      stroke="#23364d"
                      strokeWidth="2"
                      opacity="0.82"
                      transform={`rotate(${rotation.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)})`}
                    />
                    <ellipse
                      cx={cx.toFixed(2)}
                      cy={cy.toFixed(2)}
                      rx="4.2"
                      ry="13"
                      fill="none"
                      stroke="#23364d"
                      strokeWidth="1"
                      opacity="0.45"
                      transform={`rotate(${rotation.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)})`}
                    />
                  </g>
                );
              })}

              <path d="M-78 -108 C-63 -82 -68 -54 -81 -26 C-92 0 -93 24 -79 48 C-66 71 -61 94 -68 118" fill="none" stroke="#23364d" strokeWidth="2.2" opacity="0.88" />
              <path d="M-64 -106 C-49 -81 -53 -56 -64 -29 C-74 -4 -74 22 -61 46 C-50 67 -47 92 -52 112" fill="none" stroke="#23364d" strokeWidth="1.1" opacity="0.52" />
              {[-89, -54, -18, 18, 56].map((cy, index) => (
                <g key={`lmc-vine-${index}`}>
                  <circle cx="-86" cy={cy} r="10" fill="none" stroke="#23364d" strokeWidth="1.6" opacity="0.7" />
                  <circle cx="-86" cy={cy} r="4" fill="none" stroke="#23364d" strokeWidth="1" opacity="0.4" />
                </g>
              ))}

              <path d="M-116 70 C-96 46 -72 42 -50 50 C-25 60 -17 84 7 92" fill="none" stroke="#23364d" strokeWidth="2" opacity="0.84" />
              <path d="M-120 96 C-100 71 -76 66 -52 73 C-25 82 -16 109 12 116" fill="none" stroke="#23364d" strokeWidth="1.5" opacity="0.7" />
              <path d="M-114 116 C-91 92 -68 90 -44 98 C-19 107 -8 133 18 139" fill="none" stroke="#23364d" strokeWidth="1.2" opacity="0.55" />
              {[-100, -72, -44].map((cx, index) => (
                <g key={`lmc-swirl-${index}`} opacity={0.78 - index * 0.12}>
                  <circle cx={cx} cy="84" r={11 - index * 1.8} fill="none" stroke="#23364d" strokeWidth="1.5" />
                  <circle cx={cx} cy="110" r={11 - index * 1.8} fill="none" stroke="#23364d" strokeWidth="1.5" />
                </g>
              ))}
            </g>

            <path d="M60 -136 A136 136 0 1 0 60 136 A97 97 0 1 1 60 -136 Z" fill="none" stroke="#23364d" strokeWidth="3.4" opacity="0.95" />
            <path d="M46 -121 A121 121 0 1 0 46 121 A84 84 0 1 1 46 -121 Z" fill="none" stroke="#23364d" strokeWidth="1.15" opacity="0.48" />
          </g>

          <PaperRosette x={92} y={112} scale={1.18} outer="#2d8a4f" middle="#d1a53f" inner="#fffdfa" core="#3f8d4d" points={12} opacity={0.98} />
          <PaperRosette x={48} y={220} scale={0.68} outer="#c46618" middle="#d79f39" inner="#fffdfa" core="#b3642b" points={12} opacity={0.94} />
          <PaperRosette x={206} y={244} scale={0.55} outer="#5ca24e" middle="#d7af4d" inner="#fffdfa" core="#6ba151" points={12} opacity={0.92} />
          <PaperRosette x={86} y={444} scale={1.56} outer="#c2650f" middle="#d49a2c" inner="#fffdfa" core="#b4611f" points={12} opacity={0.98} />
          <PaperRosette x={186} y={498} scale={0.4} outer="#d08a35" middle="#ecc16c" inner="#fffdfa" core="#c5802c" points={11} opacity={0.92} />

          {[
            { x: 42, y: 104, r: 18, o: 0.12 },
            { x: 350, y: 64, r: 22, o: 0.12 },
            { x: 356, y: 392, r: 20, o: 0.1 },
            { x: 58, y: 518, r: 18, o: 0.09 },
            { x: 336, y: 526, r: 16, o: 0.11 },
          ].map((glow, index) => (
            <circle key={`lmc-glow-${index}`} cx={glow.x} cy={glow.y} r={glow.r} fill="#fff6df" opacity={glow.o} filter="url(#lmcBlur)" />
          ))}
        </svg>
      );

    case "festive-mandala-crescent":
      return (
        <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 400 560">
          <defs>
            <filter id="fmcGlow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="fmcBokeh"><feGaussianBlur stdDeviation="8" /></filter>
            <clipPath id="fmcCresClip">
              <path d="M52.5 -125 A125 125 0 1 0 52.5 125 A88 88 0 1 1 52.5 -125 Z" />
            </clipPath>
          </defs>

          {/* === WARM GOLDEN BOKEH === */}
          {[
            { cx: 55, cy: 60, r: 22 }, { cx: 340, cy: 45, r: 18 }, { cx: 30, cy: 190, r: 26 },
            { cx: 375, cy: 155, r: 20 }, { cx: 85, cy: 330, r: 24 }, { cx: 360, cy: 310, r: 28 },
            { cx: 45, cy: 460, r: 18 }, { cx: 365, cy: 480, r: 22 }, { cx: 180, cy: 55, r: 16 },
            { cx: 290, cy: 90, r: 14 }, { cx: 25, cy: 530, r: 20 }, { cx: 380, cy: 540, r: 16 },
            { cx: 200, cy: 520, r: 15 }, { cx: 140, cy: 400, r: 17 }, { cx: 310, cy: 420, r: 23 },
            { cx: 60, cy: 270, r: 12 }, { cx: 310, cy: 200, r: 19 }, { cx: 160, cy: 140, r: 13 },
          ].map((b, i) => (
            <circle key={`bk${i}`} cx={b.cx} cy={b.cy} r={b.r} fill={accent} opacity={0.09} filter="url(#fmcBokeh)" />
          ))}

          {/* === LARGE CRESCENT - dark outlined with mandala line patterns === */}
          <g transform="translate(150, 255) rotate(-15)">
            {/* Mandala patterns clipped to crescent band */}
            <g clipPath="url(#fmcCresClip)">
              {/* Concentric ring patterns - line art style */}
              <circle r="90" fill="none" stroke="#2a3a52" strokeWidth="1" opacity={0.6} />
              <circle r="93" fill="none" stroke="#2a3a52" strokeWidth="0.5" opacity={0.4} strokeDasharray="1.5 2.5" />
              <circle r="97" fill="none" stroke="#2a3a52" strokeWidth="1.2" opacity={0.55} />
              {/* Dot ring at r=100 */}
              {Array.from({ length: 24 }, (_, i) => {
                const a = i * Math.PI / 12;
                const cx = Math.round(Math.cos(a) * 100 * 100) / 100;
                const cy = Math.round(Math.sin(a) * 100 * 100) / 100;
                return <circle key={`d1${i}`} cx={cx} cy={cy} r="1.8" fill="#2a3a52" opacity={0.55} />;
              })}
              <circle r="103" fill="none" stroke="#2a3a52" strokeWidth="0.7" opacity={0.45} strokeDasharray="5 3" />
              <circle r="106" fill="none" stroke="#2a3a52" strokeWidth="1.5" opacity={0.5} />
              {/* Eye/paisley shapes at r=109 */}
              {Array.from({ length: 18 }, (_, i) => {
                const a = i * Math.PI / 9;
                const ex = Math.round(Math.cos(a) * 109 * 100) / 100;
                const ey = Math.round(Math.sin(a) * 109 * 100) / 100;
                const rot = Math.round(a * 180 / Math.PI * 100) / 100;
                return <ellipse key={`ey${i}`} cx={ex} cy={ey} rx="4.5" ry="2" fill="none" stroke="#2a3a52" strokeWidth="0.8" opacity={0.5} transform={`rotate(${rot} ${ex} ${ey})`} />;
              })}
              <circle r="113" fill="none" stroke="#2a3a52" strokeWidth="0.6" opacity={0.4} strokeDasharray="3 4" />
              {/* Dot ring at r=116 */}
              {Array.from({ length: 20 }, (_, i) => {
                const a = i * Math.PI / 10;
                const cx = Math.round(Math.cos(a) * 116 * 100) / 100;
                const cy = Math.round(Math.sin(a) * 116 * 100) / 100;
                return <circle key={`d2${i}`} cx={cx} cy={cy} r="1.2" fill="#2a3a52" opacity={0.5} />;
              })}
              <circle r="119" fill="none" stroke="#2a3a52" strokeWidth="1" opacity={0.5} />
              <circle r="123" fill="none" stroke="#2a3a52" strokeWidth="0.5" opacity={0.35} strokeDasharray="1 2" />
            </g>
            {/* Thick dark crescent outline */}
            <path d="M52.5 -125 A125 125 0 1 0 52.5 125 A88 88 0 1 1 52.5 -125 Z" fill="none" stroke="#2a3a52" strokeWidth="2.8" opacity={0.75} />
          </g>

          {/* === WHITE CIRCLE with mandala petal border === */}
          <g transform="translate(228, 268)">
            {/* White filled background */}
            <circle r="60" fill="#fff" opacity={0.85} />
            <circle r="60" fill="none" stroke="#2a3a52" strokeWidth="1.5" opacity={0.5} />
            {/* Petal border */}
            {Array.from({ length: 16 }, (_, i) => {
              const a = i * Math.PI / 8 - Math.PI / 2;
              const px = Math.round(Math.cos(a) * 60 * 100) / 100;
              const py = Math.round(Math.sin(a) * 60 * 100) / 100;
              const rot = Math.round((i * 22.5 - 90) * 100) / 100;
              return <ellipse key={`pt${i}`} cx={px} cy={py} rx="8" ry="4" fill="#2a3a52" opacity={0.15} transform={`rotate(${rot} ${px} ${py})`} />;
            })}
            {/* Outer dot ring */}
            {Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12;
              const cx = Math.round(Math.cos(a) * 70 * 100) / 100;
              const cy = Math.round(Math.sin(a) * 70 * 100) / 100;
              return <circle key={`cd${i}`} cx={cx} cy={cy} r="1.2" fill="#2a3a52" opacity={0.35} />;
            })}
          </g>

          {/* === HANGING GOLDEN LANTERNS === */}
          <HangingLantern x={100} y={10} scale={0.68} metal={accent} light={accent2} glowId="fmcGlow" delay="0s" />
          <HangingLantern x={230} y={2} scale={0.8} metal={accent} light={accent2} glowId="fmcGlow" delay="0.5s" />
          <HangingLantern x={340} y={8} scale={0.65} metal={accent} light={accent2} glowId="fmcGlow" delay="1s" />

          {/* === MULTI-LAYER STAR MANDALA FLOWERS === */}

          {/* Large orange/gold flower - bottom left */}
          <g transform="translate(80, 445)">
            {/* Layer 1: outer dark orange star */}
            <polygon points={Array.from({ length: 32 }, (_, i) => {
              const a = i * Math.PI / 16 - Math.PI / 2;
              const r = i % 2 === 0 ? 48 : 30;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#c47830" opacity={0.8} />
            {/* Layer 2: gold star */}
            <polygon points={Array.from({ length: 32 }, (_, i) => {
              const a = i * Math.PI / 16 - Math.PI / 2;
              const r = i % 2 === 0 ? 40 : 24;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#d4a040" opacity={0.85} />
            {/* Layer 3: white star */}
            <polygon points={Array.from({ length: 32 }, (_, i) => {
              const a = i * Math.PI / 16 - Math.PI / 2;
              const r = i % 2 === 0 ? 32 : 19;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#fff" opacity={0.8} />
            {/* Layer 4: inner orange star */}
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 22 : 13;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#d4853a" opacity={0.75} />
            {/* Center */}
            <circle r="8" fill="#d4a040" opacity={0.9} />
            <circle r="4" fill="#fff" opacity={0.7} />
          </g>

          {/* Green/white flower - top left */}
          <g transform="translate(85, 120)">
            {/* Outer green star */}
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 34 : 20;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#3a7a4e" opacity={0.8} />
            {/* Mid white star */}
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 26 : 15;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#fff" opacity={0.75} />
            {/* Inner green star */}
            <polygon points={Array.from({ length: 16 }, (_, i) => {
              const a = i * Math.PI / 8 - Math.PI / 2;
              const r = i % 2 === 0 ? 18 : 10;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#5ab87a" opacity={0.8} />
            {/* Center */}
            <circle r="5.5" fill="#d4a040" opacity={0.85} />
            <circle r="2.5" fill="#fff" opacity={0.6} />
          </g>

          {/* Green flower - right side */}
          <g transform="translate(350, 320)">
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 28 : 16;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#3a7a4e" opacity={0.75} />
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 21 : 12;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#fff" opacity={0.7} />
            <polygon points={Array.from({ length: 16 }, (_, i) => {
              const a = i * Math.PI / 8 - Math.PI / 2;
              const r = i % 2 === 0 ? 14 : 8;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#5ab87a" opacity={0.75} />
            <circle r="4.5" fill="#d4a040" opacity={0.8} />
          </g>

          {/* Small orange flower - bottom right */}
          <g transform="translate(330, 460)">
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 20 : 12;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#c47830" opacity={0.75} />
            <polygon points={Array.from({ length: 24 }, (_, i) => {
              const a = i * Math.PI / 12 - Math.PI / 2;
              const r = i % 2 === 0 ? 15 : 9;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#d4a040" opacity={0.8} />
            <polygon points={Array.from({ length: 16 }, (_, i) => {
              const a = i * Math.PI / 8 - Math.PI / 2;
              const r = i % 2 === 0 ? 10 : 6;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#fff" opacity={0.7} />
            <circle r="3.5" fill="#d4853a" opacity={0.8} />
          </g>

          {/* Tiny gold flower - top right */}
          <g transform="translate(360, 85)">
            <polygon points={Array.from({ length: 16 }, (_, i) => {
              const a = i * Math.PI / 8 - Math.PI / 2;
              const r = i % 2 === 0 ? 14 : 8;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#d4a040" opacity={0.6} />
            <polygon points={Array.from({ length: 16 }, (_, i) => {
              const a = i * Math.PI / 8 - Math.PI / 2;
              const r = i % 2 === 0 ? 9 : 5;
              return `${Math.round(Math.cos(a) * r * 100) / 100},${Math.round(Math.sin(a) * r * 100) / 100}`;
            }).join(" ")} fill="#fff" opacity={0.5} />
            <circle r="3" fill={accent} opacity={0.7} />
          </g>

          {/* === LEAF SPRIGS === */}
          <LeafSprig x={45} y={470} scale={0.75} rotation={-25} stroke="#3a7a4e" opacity={0.5} />
          <LeafSprig x={120} y={465} scale={0.6} rotation={15} stroke="#5ab87a" opacity={0.4} />
          <LeafSprig x={310} y={480} scale={0.6} rotation={10} stroke="#3a7a4e" opacity={0.4} />
          <LeafSprig x={370} y={445} scale={0.5} rotation={-15} stroke="#5ab87a" opacity={0.35} />
          <LeafSprig x={55} y={145} scale={0.5} rotation={-30} stroke="#3a7a4e" opacity={0.4} />
          <LeafSprig x={115} y={140} scale={0.45} rotation={20} stroke="#5ab87a" opacity={0.35} />

          {/* === GOLDEN SPARKLE DUST === */}
          {Array.from({ length: 40 }, (_, i) => {
            const sx = 15 + (i * 43) % 370;
            const sy = 15 + (i * 61) % 530;
            const r = 0.6 + (i % 4) * 0.4;
            return <circle key={`sp${i}`} cx={sx} cy={sy} r={r} fill={i % 6 === 0 ? "#fff" : accent} opacity={0.12 + (i % 5) * 0.04} />;
          })}
        </svg>
      );

    default:
      return null;
  }
}
