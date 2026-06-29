"use client";

import { useRef } from "react";

interface ContentRowProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function ContentRow({ title, children }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold px-6 md:px-16 mb-4 text-nf-white">
        {title}
      </h2>
      <div className="relative group">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center bg-nf-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label="Scroll left"
        >
          <span className="material-symbols-outlined text-white text-3xl select-none">
            chevron_left
          </span>
        </button>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="content-row-scroll flex gap-2 md:gap-3 overflow-x-auto px-6 md:px-16 py-2"
        >
          {children}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center bg-nf-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label="Scroll right"
        >
          <span className="material-symbols-outlined text-white text-3xl select-none">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
