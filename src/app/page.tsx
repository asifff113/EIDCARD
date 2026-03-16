"use client";

import { useState, useMemo } from "react";
import Starfield from "@/components/shared/Starfield";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import CategoryFilter from "@/components/cards/CategoryFilter";
import FlipCard from "@/components/cards/FlipCard";
import CardModal from "@/components/cards/CardModal";
import Footer from "@/components/layout/Footer";
import { CARDS, type EidCard } from "@/data/cards";

export default function Home() {
  const [activeTag, setActiveTag] = useState("All");
  const [modalCard, setModalCard] = useState<EidCard | null>(null);

  const filtered = useMemo(
    () => (activeTag === "All" ? CARDS : CARDS.filter((c) => c.tag === activeTag)),
    [activeTag]
  );

  return (
    <>
      <Starfield />
      <Navbar cardCount={CARDS.length} />
      <Hero />

      {/* Section Head */}
      <div
        id="card-grid"
        className="relative z-[1] px-[60px] pt-20 pb-13 flex items-end justify-between animate-[fadeUp_.7s_ease_both_.2s] max-[640px]:px-5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-1.5"
      >
        <div>
          <h2 className="font-heading text-[clamp(32px,4vw,52px)] font-bold tracking-[-1px]">
            The Royal <em className="text-[var(--gold)] italic">Collection</em>
          </h2>
          <p className="text-[10px] tracking-[3.5px] text-[var(--dim)] uppercase mt-2.5">
            Hover to reveal · Click to open · Share with love
          </p>
        </div>
        <div className="font-heading text-[90px] font-bold text-[rgba(212,175,55,.05)] leading-none tracking-[-6px] select-none max-[640px]:hidden">
          {filtered.length}
        </div>
      </div>

      {/* Filter */}
      <div className="relative z-[1] px-[60px] max-[640px]:px-5">
        <CategoryFilter active={activeTag} onChange={setActiveTag} />
      </div>

      {/* Card Grid */}
      <div className="relative z-[1] grid grid-cols-4 gap-6 px-[60px] pb-[100px] max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[800px]:px-5 max-[800px]:pb-[70px] max-[480px]:grid-cols-1">
        {filtered.map((card, i) => (
          <FlipCard
            key={card.id}
            card={card}
            index={i}
            onOpen={setModalCard}
          />
        ))}
      </div>

      <Footer />
      <CardModal card={modalCard} onClose={() => setModalCard(null)} />
    </>
  );
}
