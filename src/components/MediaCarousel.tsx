"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

type Props = {
  items: MediaItem[];
  className?: string;
  itemClassName?: string;
};

export function MediaCarousel({ items, className, itemClassName }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!zoomedImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomedImage(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomedImage]);

  if (items.length === 0) return null;

  const scrollByAmount = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = Math.max(rail.clientWidth * 0.8, 280);
    rail.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={`relative ${className ?? ""}`}>
        {items.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Scroll media left"
              onClick={() => scrollByAmount("left")}
              className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-fg backdrop-blur transition hover:border-accent/50 hover:bg-card sm:inline-flex"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Scroll media right"
              onClick={() => scrollByAmount("right")}
              className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-fg backdrop-blur transition hover:border-accent/50 hover:bg-card sm:inline-flex"
            >
              →
            </button>
          </>
        ) : null}

        <div
          ref={railRef}
          className="flex snap-x gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onWheel={(event) => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
            event.preventDefault();
            event.currentTarget.scrollLeft += event.deltaY;
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className={`relative shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-bg-elevated ${itemClassName ?? ""}`}
            >
              {item.type === "video" ? (
                <video
                  className="h-full w-full bg-black object-contain"
                  src={item.src}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setZoomedImage({ src: item.src, alt: item.alt ?? "" })
                  }
                  className="relative block h-full w-full cursor-zoom-in"
                  aria-label="Zoom image"
                >
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    fill
                    className="object-cover transition duration-300 hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 520px, 85vw"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {zoomedImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-border bg-bg/80 px-3 py-1 text-sm text-fg"
            onClick={() => setZoomedImage(null)}
            aria-label="Close zoom"
          >
            Close
          </button>
          <div
            className="relative h-[84vh] w-[min(94vw,1200px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              fill
              className="object-contain"
              sizes="94vw"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

