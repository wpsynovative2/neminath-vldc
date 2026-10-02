"use client";

import { usePopup, type PopupName } from "@/components/popups/PopupProvider";

type PopupTriggerProps = {
  popup?: PopupName;
  className?: string;
  children: React.ReactNode;
};

// A link-styled trigger that opens one of the site popups.
export default function PopupTrigger({ popup = "enquiry", className, children }: PopupTriggerProps) {
  const { openPopup } = usePopup();
  return (
    <a
      href="#"
      role="button"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        openPopup(popup);
      }}
    >
      {children}
    </a>
  );
}
