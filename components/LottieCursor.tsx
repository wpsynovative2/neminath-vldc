"use client";

import { useEffect, useRef, useState } from "react";
import LottieAnimation from "./LottieAnimation";

// Desktop-only spinning gear that follows the mouse and flips with direction.
export default function LottieCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1025px) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let prevX = 0;
    let offsetX = 25;

    const onMove = (event: MouseEvent) => {
      const cursor = cursorRef.current;
      const flip = flipRef.current;
      if (!cursor || !flip) return;
      if (event.clientX > prevX) {
        flip.style.transform = "scaleX(-1)";
        offsetX = 75;
      } else if (event.clientX < prevX) {
        flip.style.transform = "scaleX(1)";
        offsetX = 25;
      }
      cursor.style.transform = `translate(${event.clientX - offsetX}px, ${event.clientY - 25}px)`;
      prevX = event.clientX;
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-3 left-3 z-[10000] size-[85px]"
    >
      <div ref={flipRef} className="size-[85px] transition-transform duration-200 ease-[ease]">
        <LottieAnimation path="/lottie_icons/Gears-Lottie-Animation.json" playInViewport={false} />
      </div>
    </div>
  );
}
