import Icon from "@/components/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { specifications } from "@/data/home";

// Hidden on the live site (display: none). Set `specifications.visible` to true to show it.
export default function Specifications() {
  return (
    <div
      id="specs"
      className={`relative z-[2] mt-5 w-full scroll-mt-[100px] p-2.5 ${specifications.visible ? "" : "hidden"}`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center justify-around gap-5">
        <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
          <h2 className="m-0 font-convergence text-[24px] leading-none font-bold text-maroon uppercase">
            {specifications.label}
          </h2>
          <div className="w-[8%] py-3">
            <div className="border-t-[2.6px] border-maroon" />
          </div>
          <SectionHeading
            title={specifications.title}
            highlight={specifications.highlight}
            className="-mt-2.5"
          />
          <p className="mb-[0.9rem] text-black">{specifications.description}</p>
        </div>

        {specifications.groups.map((group) => (
          <article
            key={group.title}
            className="flex w-full flex-col gap-[5px] rounded-[10px] border-t-[3px] border-maroon bg-cream p-[22px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] md:w-[48%]"
          >
            <h3 className="m-0 flex items-center gap-[5px] font-rubik text-[23px] font-medium text-gold">
              <Icon name="arrow-right" className="size-[23px] text-maroon" />
              {group.title}
            </h3>
            <p className="mb-[0.9rem] font-roboto text-[15px] text-ink">{group.text}</p>
            {group.specs.map((spec) => (
              <div key={spec.label} className="border-b border-dashed border-[#5E5E5E] py-[5px]">
                <p className="m-0 flex justify-between font-roboto text-[16px] leading-none font-semibold text-ink">
                  <span>{spec.label}</span> <span className="text-gold">{spec.value}</span>
                </p>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
