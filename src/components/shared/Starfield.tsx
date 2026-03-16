"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let stars: {
      x: number; y: number; r: number;
      ph: number; sp: number; gold: boolean;
    }[] = [];
    let shoots: {
      x: number; y: number; vx: number; vy: number;
      life: number; max: number;
    }[] = [];
    let t = 0;
    let raf: number;

    function resize() {
      W = cv!.width = window.innerWidth;
      H = cv!.height = window.innerHeight;
    }

    function init() {
      stars = Array.from({ length: 260 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.7 + 0.12,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.014 + 0.003,
        gold: Math.random() < 0.12,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        const op = 0.1 + 0.9 * (0.5 + 0.5 * Math.sin(t * s.sp * 60 + s.ph));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.gold
          ? `rgba(212,175,55,${op * 0.75})`
          : `rgba(210,208,255,${op * 0.55})`;
        ctx!.fill();
      });

      if (Math.random() < 0.004) {
        shoots.push({
          x: Math.random() * W * 0.6,
          y: Math.random() * H * 0.4,
          vx: 3 + Math.random() * 5,
          vy: 1.2 + Math.random() * 2.5,
          life: 0,
          max: Math.random() * 38 + 22,
        });
      }

      shoots = shoots.filter((s) => s.life < s.max);
      shoots.forEach((s) => {
        s.life++;
        const a =
          s.life < s.max * 0.15
            ? s.life / (s.max * 0.15)
            : s.life > s.max * 0.75
              ? (1 - s.life / s.max) / 0.25
              : 1;
        const grd = ctx!.createLinearGradient(
          s.x, s.y, s.x - s.vx * 16, s.y - s.vy * 16
        );
        grd.addColorStop(0, `rgba(255,248,200,${a * 0.9})`);
        grd.addColorStop(1, "rgba(255,248,200,0)");
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(s.x - s.vx * 16, s.y - s.vy * 16);
        ctx!.strokeStyle = grd;
        ctx!.lineWidth = 2 * a;
        ctx!.stroke();
        s.x += s.vx;
        s.y += s.vy;
      });

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const handleResize = () => { resize(); init(); };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
