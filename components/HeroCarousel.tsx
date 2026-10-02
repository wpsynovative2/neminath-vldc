"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";

type Slide = { src: string; alt: string; width: number; height: number };

type HeroCarouselProps = {
  slides: Slide[];
  autoplayMs: number;
  speedMs: number;
  showDots?: boolean;
  className?: string;
};

export default function HeroCarousel({
  slides,
  autoplayMs,
  speedMs,
  showDots = true,
  className = "",
}: HeroCarouselProps) {
  // Track is [last, ...slides, first] so the loop wraps seamlessly.
  const track = [slides[slides.length - 1], ...slides, slides[0]];
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setAnimate(true);
    setPosition(next);
  }, []);

  // Autoplay — pauses on hover and stops for good once the visitor interacts.
  useEffect(() => {
    if (hovered || interacted) return;
    const timer = window.setTimeout(() => go(position + 1), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [position, hovered, interacted, autoplayMs, go]);

  // After sliding onto a clone, jump to the real slide without animation.
  const onTransitionEnd = () => {
    if (position === 0) {
      setAnimate(false);
      setPosition(slides.length);
    } else if (position === slides.length + 1) {
      setAnimate(false);
      setPosition(1);
    }
  };

  const userGo = (next: number) => {
    setInteracted(true);
    go(next);
  };

  const active = (position - 1 + slides.length) % slides.length;

  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) > 40) userGo(position + (delta < 0 ? 1 : -1));
      }}
    >
      <div
        className="flex items-start"
        style={{
          transform: `translate3d(-${position * 100}%, 0, 0)`,
          transition: animate ? `transform ${speedMs}ms ease` : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {track.map((slide, index) => (
          <figure
            key={`${slide.src}-${index}`}
            className="m-0 w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-hidden={index !== position}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              sizes="100vw"
              preload={index === 1}
              className="inline w-full align-baseline"
            />
          </figure>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => userGo(position - 1)}
        className="absolute top-1/2 left-2.5 z-[1] flex size-[25px] -translate-y-1/2 cursor-pointer items-center justify-center text-maroon"
      >
        <Icon name="chevron-left" className="size-[25px]" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => userGo(position + 1)}
        className="absolute top-1/2 right-2.5 z-[1] flex size-[25px] -translate-y-1/2 cursor-pointer items-center justify-center text-maroon"
      >
        <Icon name="chevron-right" className="size-[25px]" />
      </button>

      {showDots && (
        <div className="absolute bottom-[11px] left-0 z-[1] flex w-full justify-center">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => userGo(index + 1)}
              className={`mx-1.5 size-1.5 cursor-pointer rounded-full bg-black ${
                index === active ? "opacity-100" : "opacity-20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
