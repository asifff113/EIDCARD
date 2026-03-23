"use client";

import type { StickerType } from "@/types/editor";

export function StickerSVG({
  type,
  color,
  size = 60,
}: {
  type: StickerType;
  color: string;
  size?: number;
}) {
  switch (type) {
    case "crescent-1":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M30 4C17.3 4 7 14.3 7 27s10.3 23 23 23c5.2 0 10-1.7 13.9-4.6C39.5 49.4 33 52 26 52 13.3 52 3 41.7 3 29S13.3 6 26 6c2.3 0 4.5.3 6.6.8A23.3 23.3 0 0030 4z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "crescent-2":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M32 5C19.3 5 9 15.3 9 28s10.3 23 23 23c3.8 0 7.4-.9 10.5-2.6C38.2 52 33 54 27.5 54 14.5 54 4 43.5 4 30.5S14.5 7 27.5 7c1.6 0 3.1.1 4.5.4V5z"
            fill={color}
            opacity="0.85"
          />
        </svg>
      );
    case "star-4":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M30 4L34 26 56 30 34 34 30 56 26 34 4 30 26 26z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "star-6":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M30 2l6.9 12 13.9.1-7 12 7 12H36.9L30 50.1 23.1 38.1H9.2l7-12-7-12h13.9z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "star-8":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M30 2l5.4 13.2L48.6 8l-7.2 13.2L56 24.6 41.4 30 56 35.4l-14.6 3.4L48.6 52l-13.2-7.2L30 58l-5.4-13.2L11.4 52l7.2-13.2L4 35.4 18.6 30 4 24.6l14.6-3.4L11.4 8l13.2 7.2z"
            fill={color}
            opacity="0.85"
          />
        </svg>
      );
    case "lantern-1":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path d="M28 2h4v6h-4z" fill={color} opacity="0.6" />
          <path d="M26 8h8l2 4H24z" fill={color} opacity="0.8" />
          <rect x="22" y="12" width="16" height="28" rx="3" fill={color} opacity="0.9" />
          <path d="M22 15h16M22 20h16M22 25h16M22 30h16M22 35h16" stroke="rgba(0,0,0,.15)" strokeWidth="0.8" />
          <path d="M25 40h10l-2 8h-6z" fill={color} opacity="0.7" />
          <circle cx="30" cy="52" r="2" fill={color} opacity="0.5" />
        </svg>
      );
    case "lantern-2":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path d="M29 1h2v5h-2z" fill={color} opacity="0.5" />
          <ellipse cx="30" cy="8" rx="6" ry="2" fill={color} opacity="0.7" />
          <path
            d="M20 10c0 0-2 8-2 20s2 18 2 18h20c0 0 2-6 2-18s-2-20-2-20z"
            fill={color}
            opacity="0.85"
          />
          <path d="M20 15c4-2 12-2 20 0M20 22c4-2 12-2 20 0M20 29c4-2 12-2 20 0M20 36c4-2 12-2 20 0" stroke="rgba(0,0,0,.12)" strokeWidth="0.8" />
          <path d="M26 48h8l-1 6h-6z" fill={color} opacity="0.6" />
          <circle cx="30" cy="56" r="1.5" fill={color} opacity="0.4" />
        </svg>
      );
    case "mosque-silhouette":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M30 8c-8 0-14 6-14 12v4H8v26h44V24h-8v-4c0-6-6-12-14-12z"
            fill={color}
            opacity="0.85"
          />
          <rect x="12" y="6" width="3" height="24" fill={color} opacity="0.7" />
          <rect x="45" y="6" width="3" height="24" fill={color} opacity="0.7" />
          <circle cx="13.5" cy="5" r="2" fill={color} opacity="0.8" />
          <circle cx="46.5" cy="5" r="2" fill={color} opacity="0.8" />
          <path d="M30 8c-4 0-8 4-8 8h16c0-4-4-8-8-8z" fill={color} opacity="0.95" />
        </svg>
      );
    case "mandala-small":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="24" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
          <circle cx="30" cy="30" r="18" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="30" cy="30" r="12" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="30" cy="30" r="6" fill={color} opacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="30"
              y1="30"
              x2={30 + 24 * Math.cos((angle * Math.PI) / 180)}
              y2={30 + 24 * Math.sin((angle * Math.PI) / 180)}
              stroke={color}
              strokeWidth="0.6"
              opacity="0.35"
            />
          ))}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx={30 + 18 * Math.cos((angle * Math.PI) / 180)}
              cy={30 + 18 * Math.sin((angle * Math.PI) / 180)}
              r="2.5"
              fill={color}
              opacity="0.5"
            />
          ))}
        </svg>
      );
    case "floral-corner":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M4 4c12 0 20 4 28 14-8 2-16 0-22-4 2 8 8 14 18 16C18 38 10 42 4 56c0-12 4-20 14-28-2 8 0 16-4 22 8-2 14-8 16-18"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <circle cx="10" cy="10" r="3" fill={color} opacity="0.4" />
          <circle cx="4" cy="28" r="2" fill={color} opacity="0.3" />
          <circle cx="28" cy="4" r="2" fill={color} opacity="0.3" />
        </svg>
      );
    case "sparkle":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path d="M30 8L32 26 30 28 28 26z" fill={color} opacity="0.9" />
          <path d="M30 32L32 34 30 52 28 34z" fill={color} opacity="0.9" />
          <path d="M8 30L26 28 28 30 26 32z" fill={color} opacity="0.9" />
          <path d="M32 30L34 28 52 30 34 32z" fill={color} opacity="0.9" />
          <path d="M16 16L27 27 26 28 15 17z" fill={color} opacity="0.5" />
          <path d="M44 16L33 27 34 28 45 17z" fill={color} opacity="0.5" />
          <path d="M16 44L27 33 28 34 17 45z" fill={color} opacity="0.5" />
          <path d="M44 44L33 33 32 34 43 45z" fill={color} opacity="0.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
          <path
            d="M14 38c-4 0-7-3-7-7s3-7 7-7c.5-5.5 5-10 11-10 4 0 7.5 2 9.5 5 1.5-1 3.2-1.5 5-1.5 5 0 9 4 9 9 0 .3 0 .7-.1 1 3 1.2 5.1 4.1 5.1 7.5 0 4.4-3.6 8-8 8z"
            fill={color}
            opacity="0.7"
          />
        </svg>
      );
    default:
      return null;
  }
}
