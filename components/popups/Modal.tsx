"use client";

import { useEffect, useRef } from "react";
import Icon from "@/components/Icon";

type ModalProps = {
  label: string;
  width: string;
  radius: string;
  zIndex: number;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ label, width, radius, zIndex, onClose, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80"
      style={{ zIndex }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        data-lenis-prevent
        className={`flex max-h-screen w-[90vw] overflow-x-hidden overflow-y-auto leading-normal ${width}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`relative h-fit w-full bg-white shadow-[2px_8px_23px_3px_rgba(0,0,0,0.2)] ${radius}`}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 flex size-[15px] cursor-pointer text-[#333] focus:outline-none focus-visible:outline-2 focus-visible:outline-black"
          >
            <Icon name="close" className="size-[15px]" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
