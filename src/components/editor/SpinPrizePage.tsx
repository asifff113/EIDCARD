"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Coins, RotateCw, Sparkles } from "lucide-react";
import type { CardCustomization, CardTemplate } from "@/types/editor";

const MAX_SPIN_SEGMENT_COUNT = 30;
const SPIN_DURATION_MS = 4600;
const WHEEL_SPARKLES = [
  { left: "7%", top: "16%", size: 4, delay: 0.15 },
  { left: "18%", top: "5%", size: 6, delay: 0.65 },
  { left: "84%", top: "10%", size: 5, delay: 0.35 },
  { left: "94%", top: "28%", size: 4, delay: 0.9 },
  { left: "10%", top: "80%", size: 5, delay: 0.5 },
  { left: "86%", top: "88%", size: 6, delay: 0.2 },
];

function clampSpinAmount(value: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.max(1, Math.min(100000, Math.round(value)));
}

function getSpinStep(maxAmount: number) {
  if (maxAmount <= 3) {
    return 0.1;
  }

  if (maxAmount <= 12) {
    return 0.25;
  }

  if (maxAmount <= 30) {
    return 0.5;
  }

  return 1;
}

function formatSpinValue(value: number) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2).replace(/\.?0+$/, "");
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function greatestCommonDivisor(a: number, b: number) {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }

  return x || 1;
}

function buildAvailableSpinValues(maxAmount: number) {
  const limit = clampSpinAmount(maxAmount);
  const step = getSpinStep(limit);
  const values: number[] = [];
  const used = new Set<string>();

  for (let current = 1; current <= limit + step / 2; current += step) {
    const value = Math.min(limit, Math.max(1, roundToStep(current, step)));
    const formatted = formatSpinValue(value);

    if (used.has(formatted)) {
      continue;
    }

    used.add(formatted);
    values.push(value);
  }

  const limitLabel = formatSpinValue(limit);
  if (!used.has(limitLabel)) {
    values.push(limit);
  }

  return values;
}

function sampleSpinValues(values: number[], targetCount: number) {
  if (values.length <= targetCount) {
    return values;
  }

  const lastIndex = values.length - 1;
  const picked = new Set<number>();
  const indexes: number[] = [];

  for (let index = 0; index < targetCount; index += 1) {
    let candidate = Math.round((index * lastIndex) / (targetCount - 1));

    if (picked.has(candidate)) {
      let offset = 1;

      while (candidate + offset <= lastIndex || candidate - offset >= 0) {
        if (candidate + offset <= lastIndex && !picked.has(candidate + offset)) {
          candidate += offset;
          break;
        }

        if (candidate - offset >= 0 && !picked.has(candidate - offset)) {
          candidate -= offset;
          break;
        }

        offset += 1;
      }
    }

    picked.add(candidate);
    indexes.push(candidate);
  }

  return [...new Set(indexes)].sort((a, b) => a - b).map((index) => values[index]);
}

function buildWheelOrder(length: number) {
  if (length <= 2) {
    return Array.from({ length }, (_, index) => index);
  }

  let step = Math.max(2, Math.round(length * 0.38));
  while (greatestCommonDivisor(step, length) !== 1) {
    step += 1;
  }

  return Array.from({ length }, (_, index) => (index * step) % length);
}

function buildSpinValues(maxAmount: number) {
  const availableValues = buildAvailableSpinValues(maxAmount);
  const sampledValues = sampleSpinValues(availableValues, MAX_SPIN_SEGMENT_COUNT);
  const wheelOrder = buildWheelOrder(sampledValues.length);

  return wheelOrder.map((index) => sampledValues[index]);
}

export default function SpinPrizePage({
  template,
  customization,
  interactive = true,
}: {
  template: CardTemplate;
  customization: CardCustomization;
  interactive?: boolean;
}) {
  const spinEnabled = customization.spinPageEnabled;
  const maxAmount = clampSpinAmount(customization.spinMaxAmount);
  const segments = useMemo(() => buildSpinValues(maxAmount), [maxAmount]);
  const segmentAngle = 360 / segments.length;
  const ultraDenseWheel = segments.length >= 28;
  const denseWheel = segments.length >= 22;
  const compactWheel = segments.length >= 16;
  const labelDistance = ultraDenseWheel ? 132 : denseWheel ? 128 : compactWheel ? 124 : 118;
  const labelWidth = ultraDenseWheel ? 38 : denseWheel ? 42 : compactWheel ? 50 : 64;
  const labelFontSize = ultraDenseWheel ? "9px" : denseWheel ? "10px" : compactWheel ? "11px" : "13px";
  const markerOffset = ultraDenseWheel ? 162 : denseWheel ? 158 : compactWheel ? 154 : 148;
  const accentSecondary = template.accent2 ?? template.accent;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [revealKey, setRevealKey] = useState(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setRotation(0);
    setIsSpinning(false);
    setResult(null);
  }, [maxAmount, spinEnabled]);

  const wheelBackground = useMemo(() => {
    const segmentFill = `conic-gradient(from -90deg, ${segments
      .map((_, index) => {
        const start = index * segmentAngle;
        const end = (index + 1) * segmentAngle;
        const fill = index % 4 === 0
          ? `${template.accent}24`
          : index % 4 === 1
            ? `${accentSecondary}1d`
            : index % 4 === 2
              ? "rgba(82, 144, 193, .26)"
              : "rgba(230, 196, 118, .15)";
        return `${fill} ${start}deg ${end}deg`;
      })
      .join(", ")})`;

    return [
      "radial-gradient(circle at 50% 20%, rgba(255,255,255,.24), rgba(255,255,255,0) 32%)",
      "radial-gradient(circle at 50% 72%, rgba(4,7,16,0) 34%, rgba(4,7,16,.82) 100%)",
      segmentFill,
    ].join(", ");
  }, [accentSecondary, segmentAngle, segments, template.accent]);

  function handleSpin() {
    if (!interactive || !spinEnabled || isSpinning) {
      return;
    }

    const winningIndex = Math.floor(Math.random() * segments.length);
    const currentNormalized = ((rotation % 360) + 360) % 360;
    const targetCenter = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
    const delta = targetCenter >= currentNormalized
      ? targetCenter - currentNormalized
      : 360 - currentNormalized + targetCenter;
    const nextRotation = rotation + 9 * 360 + delta;

    setIsSpinning(true);
    setResult(null);
    setRotation(nextRotation);

    timeoutRef.current = setTimeout(() => {
      setResult(segments[winningIndex]);
      setIsSpinning(false);
      setRevealKey((current) => current + 1);
    }, SPIN_DURATION_MS);
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,.06)",
        background: "linear-gradient(180deg, #120f1d 0%, #090910 58%, #06060a 100%)",
        padding: "28px 24px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-20% auto auto -12%",
          width: "260px",
          height: "260px",
          borderRadius: "999px",
          background: `radial-gradient(circle, ${template.glow} 0%, rgba(255,255,255,0) 72%)`,
          opacity: 0.24,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "auto -14% -18% auto",
          width: "300px",
          height: "300px",
          borderRadius: "999px",
          background: `radial-gradient(circle, ${accentSecondary}22 0%, rgba(255,255,255,0) 72%)`,
          opacity: 0.26,
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 14px",
            borderRadius: "999px",
            border: `1px solid ${template.accent}30`,
            background: `${template.accent}12`,
            fontSize: "10px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: `${template.accent}bb`,
            marginBottom: "14px",
            boxShadow: `0 0 22px ${template.glow}`,
          }}
        >
          Lucky Spin
        </div>
        <div
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 46px)",
            lineHeight: 0.92,
            color: "#f4e6bf",
            textShadow: "0 10px 28px rgba(0,0,0,.28)",
          }}
        >
          Spin for your
          <br />
          Eidi amount
        </div>
        <div
          style={{
            maxWidth: "520px",
            marginTop: "12px",
            fontSize: "13px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,.44)",
          }}
        >
          {spinEnabled
            ? `Each slice shows a unique reward between 1 and ${formatSpinValue(maxAmount)}, with fractional options when needed.`
            : "Enable this page in the editor to add a recipient spin reward."}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(360px, 100%)",
          minHeight: "94px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {result !== null ? (
          <div
            key={`result-banner-${revealKey}`}
            style={{
              position: "relative",
              width: "100%",
              padding: "14px 18px 16px",
              borderRadius: "26px",
              border: `1px solid ${template.accent}4f`,
              background: `linear-gradient(180deg, ${template.accent}16 0%, rgba(8,8,14,.96) 100%)`,
              boxShadow: `0 16px 36px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.08), 0 0 32px ${template.glow}`,
              overflow: "hidden",
              animation: "scaleIn .45s cubic-bezier(.18,.88,.22,1) both",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "auto auto -28px -18px",
                width: "120px",
                height: "120px",
                borderRadius: "999px",
                background: `radial-gradient(circle, ${template.glow} 0%, rgba(255,255,255,0) 72%)`,
                opacity: 0.45,
                filter: "blur(12px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 12px",
                borderRadius: "999px",
                border: `1px solid ${template.accent}3f`,
                background: `${template.accent}14`,
                color: template.accent,
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              <Sparkles size={13} />
              Blessing unlocked
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                color: "#f4e6bf",
              }}
            >
              <Coins size={15} />
              <span
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(28px, 3.8vw, 38px)",
                  lineHeight: 0.95,
                  fontStyle: "italic",
                  letterSpacing: "1px",
                  textShadow: `0 0 22px ${template.glow}`,
                }}
              >
                {formatSpinValue(result)}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                marginTop: "6px",
                fontSize: "11px",
                color: "rgba(255,255,255,.34)",
              }}
            >
              The pointer stopped on this Eidi amount.
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.03)",
              color: "rgba(255,255,255,.34)",
              fontSize: "11px",
              letterSpacing: "1.3px",
              textTransform: "uppercase",
            }}
          >
            Spin to reveal your Eidi amount
          </div>
        )}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(350px, 100%)",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {WHEEL_SPARKLES.map((sparkle, index) => (
          <div
            key={`wheel-sparkle-${index}`}
            style={{
              position: "absolute",
              left: sparkle.left,
              top: sparkle.top,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              borderRadius: "999px",
              background: "#f8edc7",
              boxShadow: `0 0 14px ${template.glow}`,
              opacity: 0.78,
              animation: `twinkle ${2.6 + sparkle.delay}s ease-in-out ${sparkle.delay}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: "-18px",
            borderRadius: "999px",
            background: `radial-gradient(circle, ${template.glow} 0%, rgba(255,255,255,0) 68%)`,
            opacity: isSpinning ? 1 : 0.65,
            filter: "blur(12px)",
            animation: isSpinning ? "pulse 1.4s ease-in-out infinite" : "none",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "999px",
            border: `1px solid ${template.accent}2b`,
            boxShadow: `0 0 0 1px rgba(255,255,255,.03), inset 0 0 0 1px rgba(255,255,255,.02)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "34px",
            height: "64px",
            filter: `drop-shadow(0 14px 24px ${template.glow})`,
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              clipPath: "polygon(50% 100%, 12% 26%, 88% 26%)",
              background: `linear-gradient(180deg, #fff5c8 0%, ${template.accent} 52%, ${accentSecondary} 100%)`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "18px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "16px",
            height: "16px",
            borderRadius: "999px",
            background: "#f4e6bf",
            border: `2px solid ${template.accent}`,
            boxShadow: `0 0 16px ${template.glow}, 0 0 0 4px rgba(8,8,14,.78)`,
            zIndex: 7,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "999px",
            border: `2px solid ${template.accent}52`,
            background: wheelBackground,
            boxShadow: `0 0 0 12px rgba(255,255,255,.03), inset 0 0 90px ${template.glow}, 0 24px 70px rgba(0,0,0,.34)`,
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(.1,.92,.16,1)` : "transform .45s ease",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "12px",
              borderRadius: "999px",
              border: `1px solid ${template.accent}34`,
              background: "radial-gradient(circle at 50% 26%, rgba(255,255,255,.18), rgba(255,255,255,0) 46%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "26px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,.08)",
              pointerEvents: "none",
            }}
          />
          {Array.from({ length: segments.length }, (_, index) => (
            <div
              key={`tick-${index}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: index % 2 === 0 ? "3px" : "2px",
                height: index % 2 === 0 ? "24px" : "14px",
                background: index % 2 === 0 ? `${template.accent}92` : "rgba(255,255,255,.18)",
                borderRadius: "999px",
                transform: `translateX(-50%) rotate(${index * segmentAngle}deg) translateY(-${markerOffset}px)`,
                transformOrigin: `center ${markerOffset}px`,
                opacity: index % 2 === 0 ? 0.9 : 0.58,
              }}
            />
          ))}
          {segments.map((_, index) => (
            <div
              key={`divider-${index}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "1px",
                height: "44%",
                background: "linear-gradient(180deg, rgba(255,255,255,.26), rgba(255,255,255,0))",
                transform: `translateX(-50%) rotate(${index * segmentAngle}deg) translateY(-58%)`,
                transformOrigin: "center bottom",
                opacity: 0.18,
              }}
            />
          ))}
          {segments.map((value, index) => {
            const angle = index * segmentAngle + segmentAngle / 2;

            return (
              <div
                key={`${value}-${index}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle}deg) translateY(-${labelDistance}px) rotate(${-angle}deg)`,
                  transformOrigin: "center center",
                  width: `${labelWidth}px`,
                  marginLeft: `-${labelWidth / 2}px`,
                color: "#f4e6bf",
                fontSize: labelFontSize,
                fontWeight: 700,
                letterSpacing: "0.35px",
                textShadow: "0 3px 12px rgba(0,0,0,.34)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSpinValue(value)}
            </div>
          );
          })}
        </div>
        <button
          onClick={handleSpin}
          disabled={!spinEnabled || !interactive || isSpinning}
          style={{
            position: "absolute",
            zIndex: 8,
            width: "122px",
            height: "122px",
            borderRadius: "999px",
            border: `1px solid ${template.accent}55`,
            background: spinEnabled
              ? "linear-gradient(160deg, rgba(21,18,32,.98) 0%, rgba(7,7,12,.98) 100%)"
              : "rgba(255,255,255,.04)",
            color: spinEnabled ? template.accent : "rgba(255,255,255,.26)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: !spinEnabled || !interactive || isSpinning ? "default" : "pointer",
            boxShadow: spinEnabled
              ? `0 16px 34px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.08), inset 0 -18px 28px rgba(0,0,0,.42), 0 0 26px ${template.glow}`
              : "none",
            transition: "all .25s ease",
            transform: isSpinning ? "scale(.97)" : "scale(1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "10px",
              borderRadius: "999px",
              border: `1px solid ${template.accent}24`,
              background: `radial-gradient(circle at 50% 26%, ${template.accent}18 0%, rgba(255,255,255,0) 52%)`,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              border: `1px solid ${template.accent}42`,
              background: `${template.accent}14`,
              animation: isSpinning ? "rotateSlow .8s linear infinite" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: spinEnabled ? `0 0 18px ${template.glow}` : "none",
            }}
          >
            {isSpinning ? <RotateCw size={18} /> : <Sparkles size={18} />}
          </div>
          <span
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontWeight: 700,
            }}
          >
            {isSpinning ? "Spinning" : "Spin"}
          </span>
          <span
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "9px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: spinEnabled ? "rgba(255,255,255,.42)" : "rgba(255,255,255,.22)",
            }}
          >
            Prize wheel
          </span>
        </button>
      </div>

      <div
        style={{
          minHeight: "36px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,.34)" }}>
          {spinEnabled
            ? isSpinning
              ? "The wheel is spinning through the blessings..."
              : result !== null
                ? "Spin again to reveal another amount."
                : "Tap the center button to spin for a random Eidi amount."
            : "Turn on the spin page and set the maximum amount in the editor."}
        </div>
      </div>
    </div>
  );
}
