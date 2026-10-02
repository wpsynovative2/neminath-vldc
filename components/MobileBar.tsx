"use client";

import Icon from "./Icon";
import { usePopup } from "./popups/PopupProvider";
import { mobileBar } from "@/data/footer";
import { contact } from "@/data/site";

const itemClass = "flex flex-col items-center text-center text-white";
const labelClass = "mt-2 font-jost text-[14px] leading-[1.2] font-normal uppercase";

// Sticky WhatsApp / Brochure / Call bar shown on phones only.
export default function MobileBar() {
  const { openPopup } = usePopup();

  return (
    <>
      {/* Keeps the end of the page clear of the fixed bar. */}
      <div aria-hidden="true" className="h-[65px] md:hidden" />
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-10 flex flex-row items-center justify-around bg-maroon p-2.5 md:hidden"
      >
        {mobileBar.map((item) => {
          const content = (
            <>
              <Icon name={item.icon} className="size-5" />
              <span className={labelClass}>{item.label}</span>
            </>
          );
          if (item.action === "enquiry") {
            return (
              <button key={item.label} type="button" className={`${itemClass} cursor-pointer`} onClick={() => openPopup("enquiry")}>
                {content}
              </button>
            );
          }
          return (
            <a key={item.label} href={item.action === "whatsapp" ? contact.whatsapp : contact.callUsHref} className={itemClass}>
              {content}
            </a>
          );
        })}
      </nav>
    </>
  );
}
