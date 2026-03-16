"use client";

export default function Hero() {
  return (
    <section className="relative z-[1] min-h-[94vh] flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden">
      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[380, 580, 780, 980, 1180].map((s, i) => (
          <div
            key={s}
            className="absolute rounded-full border border-[rgba(212,175,55,.07)]"
            style={{ width: s, height: s, opacity: 0.1 - i * 0.015 }}
          />
        ))}
      </div>

      {/* Eyebrow Pill */}
      <div className="text-[10px] tracking-[6px] text-[var(--gold)] uppercase mb-5 opacity-70 animate-[fadeUp_.8s_ease_both_.1s] bg-[rgba(0,0,0,.3)] backdrop-blur-[6px] border border-[rgba(212,175,55,.3)] rounded-[40px] py-2 px-6 inline-block">
        ✦ &nbsp; Eid Al-Fitr 1446 &nbsp; ✦
      </div>

      {/* Title */}
      <h1 className="font-heading text-[clamp(68px,13vw,140px)] font-bold leading-[.88] tracking-[2px] bg-gradient-to-br from-[var(--gold3)] via-[var(--gold)] to-[var(--gold2)] bg-[length:300%] bg-clip-text text-transparent animate-[shimmer_7s_linear_infinite,fadeUp_1s_ease_both_.2s] mb-1.5 drop-shadow-[2px_2px_10px_rgba(212,175,55,.3)]">
        Eid <span className="italic">Mubarak</span>
      </h1>

      {/* Arabic */}
      <div className="font-arabic text-[clamp(28px,5.5vw,60px)] text-[var(--gold)] opacity-60 rtl [text-shadow:0_0_70px_rgba(212,175,55,.25)] animate-[fadeUp_.9s_ease_both_.35s] mb-6">
        عيد مبارك سعيد
      </div>

      {/* Divider */}
      <div className="flex items-center gap-[18px] justify-center animate-[fadeUp_.9s_ease_both_.45s] mb-13">
        <div className="h-px w-[90px] bg-gradient-to-r from-transparent to-[rgba(212,175,55,.5)]" />
        <div className="w-[5px] h-[5px] bg-[var(--gold)] rotate-45 opacity-60" />
        <div className="h-px w-[90px] bg-gradient-to-l from-transparent to-[rgba(212,175,55,.5)]" />
      </div>

      {/* CTA */}
      <div className="flex gap-4 justify-center flex-wrap animate-[fadeUp_.9s_ease_both_.55s]">
        <button
          className="py-3.5 px-9 rounded-[40px] bg-[var(--gold)] text-[var(--bg)] border-none font-sans text-[11px] tracking-[3px] font-semibold uppercase cursor-pointer transition-all hover:bg-[var(--gold2)] hover:-translate-y-1 hover:shadow-[0_0_30px_var(--gold),0_12px_40px_rgba(0,0,0,.5)]"
          onClick={() =>
            document.getElementById("card-grid")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore 30 Cards
        </button>
        <button className="py-3.5 px-9 rounded-[40px] bg-transparent text-[var(--gold)] border border-[rgba(212,175,55,.4)] font-sans text-[11px] tracking-[3px] uppercase cursor-pointer transition-all hover:bg-[rgba(212,175,55,.1)] hover:border-[var(--gold)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,.3)]">
          Share Blessings 🌙
        </button>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] tracking-[3px] text-white/[.18] uppercase animate-[floatSlow_3s_ease-in-out_infinite]">
        <div className="w-px h-11 bg-gradient-to-b from-[rgba(212,175,55,.4)] to-transparent" />
        Scroll
      </div>
    </section>
  );
}
