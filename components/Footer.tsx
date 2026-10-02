import Image from "next/image";
import Icon from "./Icon";
import LottieCursor from "./LottieCursor";
import { footer } from "@/data/footer";
import { contact, site, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black px-0 py-[50px] max-md:px-2.5 max-md:py-[30px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap items-center justify-center gap-2.5">
        <div className="max-md:w-1/2">
          <Image
            src={site.logoFooter}
            alt={`${site.name} — Neminath Group`}
            width={1350}
            height={1080}
            sizes="(max-width: 767px) 50vw, 352px"
            className="w-[352px] max-md:w-full"
          />
        </div>

        <div className="flex w-full flex-row flex-wrap content-start items-start justify-center gap-5 rounded-[10px] border-l-2 border-white p-2.5 max-md:border-t-2 max-md:border-l-0 md:w-[69%]">
          <p className="m-0 text-center font-roboto text-[14px] text-white max-md:text-justify max-md:text-[12px]">
            {footer.about}
          </p>

          <ul className="-mx-[5px] flex">
            {socialLinks.map((link) => (
              <li key={link.label} className="mx-[5px] pe-[5px]">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex rounded-full bg-white text-black"
                >
                  <Icon name={link.icon} className="m-2 size-[30px]" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-row items-center justify-center gap-2.5 border-y-2 border-white p-2.5 max-md:gap-[5px] max-md:px-0 md:w-[90%]">
            <a href={contact.primaryPhone.href} className="flex items-center text-white">
              <span className="flex rounded-full bg-white text-black">
                <Icon name="phone" className="m-3 size-[30px] max-md:m-[7px] max-md:size-[15px]" />
              </span>
              <span className="ps-[5px] font-roboto text-[49px] leading-[1.5] max-md:text-[20px]">
                {contact.primaryPhone.label}
              </span>
            </a>
            <div className="w-[46%] max-w-[46%] border-l-2 border-white ps-[15px] text-start font-roboto text-[18px] text-white max-md:ps-1.5 max-md:text-[12px]">
              <p className="m-0">{contact.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full border-t-2 border-white pt-5 text-justify font-arial text-[15px] leading-5 text-white max-md:text-[12px] max-md:leading-[1.2em]">
          <p className="mb-[0.9rem]">{footer.disclaimer}</p>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-5 border-t border-[#C2C2C2] px-2.5 max-md:flex-wrap max-md:content-between max-md:justify-center max-md:p-2.5">
          <p className="m-0 font-roboto text-[15px] leading-none text-white max-md:text-center max-md:leading-[1.5]">
            {footer.copyright}
          </p>
          <a
            href={footer.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="wave-link relative inline-block overflow-hidden py-[7px] font-cinzel text-[15px] text-white max-md:ms-2.5 max-md:self-center max-md:text-[14px]"
          >
            <span>{footer.credit.label}</span>
            <svg viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
            </svg>
          </a>
        </div>

        {/* Desktop-only gear cursor; like the live site it sits in the footer flow. */}
        <div className="hidden lg:block">
          <LottieCursor />
        </div>
      </div>
    </footer>
  );
}
