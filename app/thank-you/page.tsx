import type { Metadata } from "next";
import MobileBar from "@/components/MobileBar";
import FlyButton from "@/components/ui/FlyButton";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { backgrounds } from "@/data/home";
import { thankYou } from "@/data/forms";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  title: `Thank You | ${site.name}`,
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/" },
};

export default function ThankYouPage() {
  return (
    <>
      <main
        className="relative flex min-h-screen items-center justify-center bg-cover bg-top bg-no-repeat px-2.5 py-[60px] max-md:py-10"
        style={{ backgroundImage: `url(${backgrounds.gears})` }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-white opacity-65" />

        <div className="relative flex w-full max-w-[800px] flex-col gap-5 rounded-[10px] border-l-[3px] border-maroon bg-cream p-[40px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] max-md:p-[22px]">
          <div className="flex flex-col gap-[15px]">
            <SectionLabel text={thankYou.label} width="w-[40%] max-md:w-[65%]" />
            <SectionHeading title={thankYou.title} highlight={thankYou.highlight} className="-mt-2.5" />
          </div>

          <p className="m-0 font-roboto text-[16px] text-ink max-md:text-[14px]">{thankYou.message}</p>

          <p className="m-0 font-roboto text-[16px] text-ink max-md:text-[14px]">
            Need help sooner? Call{" "}
            {contact.phones.map((phone, index) => (
              <span key={phone.href}>
                {index > 0 && " / "}
                <a href={phone.href} className="font-medium text-maroon hover:text-gold">
                  {phone.label}
                </a>
              </span>
            ))}
          </p>

          <FlyButton label={thankYou.backLabel} href="/" flyIcon="5em" flyText="12em" />
        </div>
      </main>

      <MobileBar />
    </>
  );
}
