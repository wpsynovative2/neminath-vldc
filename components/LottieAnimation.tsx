"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

type LottieAnimationProps = {
  path: string;
  className?: string;
  /** Only play while the animation is on screen (Elementor's "arriving to viewport" trigger). */
  playInViewport?: boolean;
};

export default function LottieAnimation({ path, className, playInViewport = true }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: AnimationItem | undefined;
    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled) return;
      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: !playInViewport,
        path,
      });
      if (playInViewport) {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) animation?.play();
          else animation?.pause();
        });
        observer.observe(container);
      }
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      animation?.destroy();
    };
  }, [path, playInViewport]);

  return <div ref={containerRef} className={className} />;
}
