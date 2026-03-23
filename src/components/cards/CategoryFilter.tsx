"use client";

import { TAGS } from "@/data/cards";

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5 justify-center mb-12 animate-[fadeUp_.7s_ease_both_.3s]">
      {TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={`py-2 px-5 rounded-[40px] text-[10px] tracking-[2px] uppercase font-sans font-medium transition-all cursor-pointer border ${
            active === tag
              ? "bg-[var(--gold)] text-[var(--bg)] border-[var(--gold)] shadow-[0_0_20px_rgba(212,175,55,.3)]"
              : "bg-transparent text-[var(--muted)] border-[rgba(212,175,55,.15)] hover:border-[rgba(212,175,55,.4)] hover:text-[var(--gold)]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
