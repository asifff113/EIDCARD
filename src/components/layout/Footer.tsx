export default function Footer() {
  return (
    <footer className="relative z-[1] text-center py-14 px-8 border-t border-[rgba(212,175,55,.06)]">
      <div className="inline-block mb-3.5 opacity-45 animate-[floatSlow_5s_ease-in-out_infinite]">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path
            d="M28,5 A17,17 0 1,0 28,39 A12,12 0 1,1 28,5Z"
            fill="#d4af37"
          />
          <circle cx="33" cy="7" r="3" fill="#d4af37" />
        </svg>
      </div>
      <p className="text-[10px] tracking-[3px] text-[#1e1a10] uppercase">
        designed with <span className="text-[var(--gold)]">♥</span> for eid
        &nbsp;·&nbsp; royal blessings &nbsp;·&nbsp; 1446 AH
      </p>
    </footer>
  );
}
