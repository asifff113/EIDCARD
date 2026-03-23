"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Sticker } from "@/types/editor";
import { StickerSVG } from "./StickerRenderer";

export default function StickerLayer({
  stickers,
  accentColor,
  interactive,
  onUpdate,
  onSelect,
  selectedId,
}: {
  stickers: Sticker[];
  accentColor: string;
  interactive: boolean;
  onUpdate: (id: string, partial: Partial<Sticker>) => void;
  onSelect: (id: string | null) => void;
  selectedId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(400);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    startStickerX: number;
    startStickerY: number;
  } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, sticker: Sticker) => {
      if (!interactive || !containerRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onSelect(sticker.id);
      setDraggingId(sticker.id);
      dragRef.current = {
        id: sticker.id,
        startX: e.clientX,
        startY: e.clientY,
        startStickerX: sticker.x,
        startStickerY: sticker.y,
      };
    },
    [interactive, onSelect]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dy = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      const newX = Math.max(0, Math.min(100, dragRef.current.startStickerX + dx));
      const newY = Math.max(0, Math.min(100, dragRef.current.startStickerY + dy));
      onUpdate(dragRef.current.id, { x: newX, y: newY });
    },
    [onUpdate]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
    setDraggingId(null);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    const updateWidth = () => setContainerWidth(element.offsetWidth || 400);

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stickerSize = (sticker: Sticker, containerWidth: number) => {
    const base = Math.max(30, containerWidth * 0.08);
    return base * sticker.scale;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[7]"
      style={{ pointerEvents: "none" }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {stickers.map((sticker) => {
        const size = stickerSize(sticker, containerWidth);
        const isSelected = selectedId === sticker.id;

        return (
          <div
            key={sticker.id}
            className="absolute"
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
              cursor: interactive ? (draggingId === sticker.id ? "grabbing" : "grab") : "default",
              outline: isSelected && interactive ? `2px dashed ${accentColor}` : "none",
              outlineOffset: "4px",
              borderRadius: "4px",
              transition: draggingId === sticker.id ? "none" : "outline 0.15s",
              pointerEvents: interactive ? "auto" : "none",
            }}
            onPointerDown={(e) => handlePointerDown(e, sticker)}
            onClick={(e) => e.stopPropagation()}
          >
            <StickerSVG type={sticker.stickerType} color={accentColor} size={size} />
          </div>
        );
      })}
    </div>
  );
}
