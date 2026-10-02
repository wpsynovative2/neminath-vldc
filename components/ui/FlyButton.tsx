"use client";

import Icon from "@/components/Icon";
import { usePopup } from "@/components/popups/PopupProvider";

type FlyButtonProps = {
  label: string;
  /** How far the icon and label slide out on hover (they differ per button on the live site). */
  flyIcon?: string;
  flyText?: string;
  href?: string;
};

// Maroon CTA whose paper-plane icon flies off on hover. Opens the enquiry popup by default.
export default function FlyButton({ label, flyIcon = "5em", flyText = "12em", href }: FlyButtonProps) {
  const { openPopup } = usePopup();
  const style = { "--fly-icon": flyIcon, "--fly-text": flyText } as React.CSSProperties;
  const content = (
    <>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <Icon name="send" />
        </div>
      </div>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="fly-btn w-fit no-underline" style={style}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className="fly-btn" style={style} onClick={() => openPopup("enquiry")}>
      {content}
    </button>
  );
}
