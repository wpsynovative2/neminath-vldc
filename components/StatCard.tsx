"use client";

import { useEffect, useRef, useState } from "react";

type StatCardProps = {
  prefix: string;
  from: number;
  to: number;
  suffix: string;
  title: string;
  delayMs: number;
  zIndex: number;
};

const DURATION_MS = 2000;

// Gradient stat card: bounces in from the left, then counts up (Elementor counter).
export default function StatCard({ prefix, from, to, suffix, title, delayMs, zIndex }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || from === to) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setValue(Math.round(from + (to - from) * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, from, to]);

  return (
    <div
      ref={ref}
      className={`relative flex min-h-[140px] w-[22%] flex-row flex-wrap content-center items-center justify-center rounded-[12px] border-l-4 border-white bg-[linear-gradient(66deg,var(--color-maroon)_46%,var(--color-gold)_100%)] p-2.5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] max-md:w-[48%] ${
        visible ? "animate-bounce-in-left" : "invisible"
      }`}
      style={{ zIndex, animationDelay: `${delayMs}ms` }}
    >
      <div className="flex flex-col text-center">
        <div className="flex font-roboto text-[30px] leading-none font-semibold text-white uppercase">
          <span className="grow text-end whitespace-pre-wrap">{prefix}</span>
          <span>{value.toLocaleString("en-US")}</span>
          <span className="grow text-start whitespace-pre-wrap">{suffix}</span>
        </div>
        <div className="flex justify-center font-roboto-slab text-[20px] leading-[2.5] font-normal text-[#CECECE] max-md:text-[15px] max-md:leading-[1.5]">
          {title}
        </div>
      </div>
    </div>
  );
}
