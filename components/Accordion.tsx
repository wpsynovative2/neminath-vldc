"use client";

import { useId, useState } from "react";
import Icon from "./Icon";

type AccordionProps = {
  groups: { title: string; items: string[] }[];
  className?: string;
};

// Single-open, collapsible accordion (first item open by default).
export default function Accordion({ groups, className = "" }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={className}>
      {groups.map((group, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={group.title} className={index > 0 ? "mt-2.5" : ""}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className={`flex w-full cursor-pointer items-center justify-between overflow-hidden p-[18px] text-left text-[14px] leading-none font-bold shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] transition-colors hover:bg-maroon hover:text-white ${
                isOpen ? "rounded-t-[5px] bg-maroon text-white" : "rounded-[5px] bg-[#f3f3f3] text-black"
              }`}
            >
              <span role="heading" aria-level={3}>
                {group.title}
              </span>
              <Icon name={isOpen ? "arrow-up" : "arrow-down"} className="size-[14px] shrink-0" />
            </button>
            <div
              id={panelId}
              role="region"
              hidden={!isOpen}
              className="overflow-hidden rounded-b-[5px] border-x-2 border-b-2 border-maroon bg-white pt-0 pr-2.5 pb-[25px] pl-5 max-md:text-[15px]"
            >
              <ul className="mt-2.5 px-0.5">
                {group.items.map((item) => (
                  <li key={item} className="flex h-[30px] items-center gap-[5px] p-0">
                    <Icon name="angle-double-right" className="mt-0.5 h-4 w-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
