import { moneyBanner } from "@/data/home";

export default function MoneyBanner() {
  return (
    <div className="relative flex min-h-[104px] w-full flex-row items-center justify-center bg-[linear-gradient(262deg,var(--color-maroon)_54%,var(--color-gold-light)_100%)] max-md:min-h-[50px]">
      <h2 className="m-0 font-roboto text-[38px] leading-none font-semibold text-white uppercase max-md:px-2.5 max-md:text-start max-md:text-[3.8vw]">
        {moneyBanner.text} <span>{moneyBanner.highlight}</span>
      </h2>
    </div>
  );
}
