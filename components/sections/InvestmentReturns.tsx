import SectionHeading from "@/components/ui/SectionHeading";
import { investmentReturns } from "@/data/home";

// Hidden on the live site (display: none). Set `investmentReturns.visible` to true to show it.
export default function InvestmentReturns() {
  return (
    <div className={`relative w-full p-2.5 pt-0 pb-5 ${investmentReturns.visible ? "" : "hidden"}`}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center items-center justify-between gap-2.5">
        <div className="flex w-full flex-row flex-wrap items-start justify-center gap-x-0.5 gap-y-[15px]">
          <div className="w-[8%] py-3">
            <div className="border-t-[2.6px] border-maroon" />
          </div>
          <h2 className="m-0 font-convergence text-[24px] leading-none font-bold text-maroon uppercase">
            {investmentReturns.label}
          </h2>
          <div className="w-[8%] py-3">
            <div className="border-t-[2.6px] border-maroon" />
          </div>
          <SectionHeading
            title={investmentReturns.title}
            highlight={investmentReturns.highlight}
            className="-mt-2.5 text-center"
          />
          <p className="mb-[0.9rem] text-black">{investmentReturns.description}</p>
        </div>

        {investmentReturns.items.map((item) => (
          <article
            key={item.title}
            className={`flex w-full flex-col gap-[5px] rounded-[10px] border-l-[3px] border-maroon bg-cream p-[22px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] ${item.width}`}
          >
            <p className="m-0 text-center font-roboto text-[50px] leading-none font-semibold text-gold">
              {item.value}
            </p>
            <div className="text-center font-roboto text-[16px]">
              <p className="m-0">{item.note}</p>
              <p className="m-0">{item.title}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
