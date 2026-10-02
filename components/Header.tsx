"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import { usePopup } from "./popups/PopupProvider";
import { navLinks, site } from "@/data/site";

type HeaderProps = {
  /** Prefix for section anchors — "" on the home page, "/" elsewhere. */
  linkPrefix?: string;
};

export default function Header({ linkPrefix = "" }: HeaderProps) {
  const { openPopup } = usePopup();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on outside tap.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 z-[500] ml-[2.5%] flex w-[95%] flex-row justify-around gap-5 rounded-b-[30px] bg-black p-2.5 shadow-[rgba(0,0,0,0.4)_0px_2px_4px,rgba(0,0,0,0.3)_0px_7px_13px_-3px,rgba(0,0,0,0.2)_0px_-3px_0px_inset] max-md:ml-0 max-md:w-full max-md:flex-wrap max-md:justify-between max-md:rounded-b-[20px]">
      <a href={`${linkPrefix}#overview`} className="block w-[115px] max-w-[115px] max-md:w-[100px]">
        <Image
          src={site.logoHeader}
          alt={site.name}
          width={1035}
          height={590}
          preload
          sizes="115px"
          className="w-full"
        />
      </a>

      <div className="flex w-auto flex-row items-center justify-between gap-5">
        {/* Desktop navigation */}
        <nav aria-label="Main" className="max-md:hidden">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`${linkPrefix}${link.href}`}
                  className="block px-[15px] py-[13px] font-roboto text-[13px] leading-5 font-semibold text-white uppercase transition-colors hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile navigation */}
        <div ref={menuRef} className="relative md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex cursor-pointer items-center justify-center rounded-[3px] border-2 border-white bg-black/5 p-[0.25em] text-[22px] text-white"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="size-[1em]" />
          </button>
          {menuOpen && (
            <nav
              id="mobile-menu"
              aria-label="Main"
              className="absolute top-[calc(4vh+10px)] right-[13vw] z-[2] w-max overflow-hidden rounded-[10px] rounded-tr-[2px] bg-white shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px]"
            >
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={`${linkPrefix}${link.href}`}
                      onClick={() => setMenuOpen(false)}
                      className="block px-5 py-2.5 font-roboto text-[13px] leading-5 font-semibold text-[#33373d] uppercase transition-colors hover:bg-[#33373d] hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="rounded-[10px] shadow-[0px_0px_10px_1px_rgba(255,255,255,0.79)] max-md:hidden">
          <button type="button" className="enquiry-btn" onClick={() => openPopup("enquiry")}>
            Enquiry now
          </button>
        </div>
      </div>
    </header>
  );
}
