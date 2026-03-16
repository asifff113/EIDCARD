"use client";

export default function Navbar({ cardCount }: { cardCount: number }) {
  return (
    <nav className="sticky top-0 z-[300] flex items-center justify-between px-[60px] h-[74px] bg-[rgba(2,2,10,.88)] backdrop-blur-[28px] border-b border-[rgba(212,175,55,.1)] animate-[fadeIn_.6s_ease_both] max-[640px]:px-5">
      <a className="flex items-center gap-3.5 no-underline" href="#">
        <svg
          className="animate-[rotateSlow_26s_linear_infinite]"
          width="34"
          height="34"
          viewBox="0 0 34 34"
        >
          <defs>
            <filter id="nf">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M22,4 A15,15 0 1,0 22,30 A10.5,10.5 0 1,1 22,4Z"
            fill="#d4af37"
            filter="url(#nf)"
          />
          <circle cx="26" cy="5.5" r="2.8" fill="#d4af37" />
        </svg>
        <span className="font-heading text-[18px] font-bold tracking-[3px] bg-gradient-to-r from-[var(--gold3)] via-[var(--gold)] to-[var(--gold2)] bg-[length:300%] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
          EID MUBARAK
        </span>
      </a>

      <div className="flex gap-8 max-[640px]:hidden">
        <a className="text-[10px] tracking-[2.5px] text-[var(--dim)] no-underline uppercase transition-colors hover:text-[var(--gold)]" href="/">
          Royal
        </a>
        <a className="text-[10px] tracking-[2.5px] text-[var(--dim)] no-underline uppercase transition-colors hover:text-[var(--gold)]" href="/gallery">
          Museum
        </a>
        <a className="text-[10px] tracking-[2.5px] text-[var(--dim)] no-underline uppercase transition-colors hover:text-[var(--gold)]" href="/cinematic">
          Cinematic
        </a>
        <a className="text-[10px] tracking-[2.5px] text-[var(--gold)] no-underline uppercase font-medium" href="/create">
          Create
        </a>
      </div>

      <div className="text-[10px] tracking-[2px] text-[var(--muted)] bg-[rgba(0,0,0,.3)] backdrop-blur-[8px] border border-[rgba(212,175,55,.35)] rounded-[40px] py-[7px] px-[18px] uppercase animate-[borderShine_4s_ease-in-out_infinite] max-[640px]:hidden">
        {cardCount} Cards
      </div>
    </nav>
  );
}
