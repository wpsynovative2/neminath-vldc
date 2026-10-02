"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Same settings as the live site's lenis-init script.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.4,
      duration: 2,
      wheelMultiplier: 1,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    });

    // In-page anchors scroll smoothly and respect each section's scroll-margin-top.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!link || link.pathname !== window.location.pathname) return;
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      lenis.scrollTo(target, { offset: -margin });
      history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
