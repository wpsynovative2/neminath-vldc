"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Modal from "./Modal";
import EnquiryForm from "@/components/EnquiryForm";
import LegalContent from "./LegalContent";
import { enquiryForm } from "@/data/forms";

export type PopupName = "enquiry" | "privacy" | "terms";

type PopupContextValue = {
  openPopup: (name: PopupName) => void;
  closePopup: (name: PopupName) => void;
};

const PopupContext = createContext<PopupContextValue | null>(null);

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used inside <PopupProvider>");
  return context;
}

export default function PopupProvider({ children }: { children: React.ReactNode }) {
  // Popups stack: the privacy/terms popups can open on top of the enquiry form.
  const [stack, setStack] = useState<PopupName[]>([]);

  const openPopup = useCallback((name: PopupName) => {
    setStack((current) => [...current.filter((item) => item !== name), name]);
  }, []);

  const closePopup = useCallback((name: PopupName) => {
    setStack((current) => current.filter((item) => item !== name));
  }, []);

  const value = useMemo(() => ({ openPopup, closePopup }), [openPopup, closePopup]);

  return (
    <PopupContext.Provider value={value}>
      {children}

      {stack.map((name, index) => (
        <Modal
          key={name}
          label={name === "enquiry" ? enquiryForm.popupTitle : name}
          width={name === "enquiry" ? "md:w-[480px]" : "md:w-[640px]"}
          radius={name === "enquiry" ? "rounded-[5px]" : "rounded-[8px]"}
          zIndex={9000 + index}
          onClose={() => closePopup(name)}
        >
          {name === "enquiry" ? (
            <div className="relative flex w-full flex-row flex-wrap items-center justify-start gap-5 rounded-[10px] p-[30px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] max-md:p-5">
              <div className="popup-heading relative pb-2">
                <h2 className="m-0 font-dm-sans text-[25px] leading-none font-semibold text-maroon">
                  {enquiryForm.popupTitle}
                </h2>
              </div>
              <EnquiryForm variant="popup" className="mt-2.5 w-full" />
            </div>
          ) : (
            <LegalContent type={name} onAccept={() => closePopup(name)} />
          )}
        </Modal>
      ))}
    </PopupContext.Provider>
  );
}
