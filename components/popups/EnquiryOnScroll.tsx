"use client";

import { useEffect } from "react";
import { usePopup } from "./PopupProvider";

// Opens the enquiry popup once per visit after scrolling down 30% of the page.
export default function EnquiryOnScroll({ percent = 30 }: { percent?: number }) {
  const { openPopup } = usePopup();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const goingDown = y > lastY;
      lastY = y;
      if (goingDown && scrollable > 0 && (y / scrollable) * 100 >= percent) {
        window.removeEventListener("scroll", onScroll);
        openPopup("enquiry");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openPopup, percent]);

  return null;
}
