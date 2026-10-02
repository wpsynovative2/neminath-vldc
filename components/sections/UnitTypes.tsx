import FlyButton from "@/components/ui/FlyButton";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { unitTypes } from "@/data/home";

export default function UnitTypes() {
  return (
    <div id="units" className="relative w-full scroll-mt-[100px] px-0 py-[30px] max-md:p-2.5">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center justify-between gap-5">
        <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
          <SectionLabel text={unitTypes.label} width="w-[17%] max-md:w-[55%]" />
          <SectionHeading title={unitTypes.title} highlight={unitTypes.highlight} className="-mt-2.5" />
          <p className="mb-[0.9rem] font-roboto text-black max-md:text-[12px]">{unitTypes.description}</p>
        </div>

        {unitTypes.units.map((unit) => (
          <article
            key={unit.number}
            className="flex w-full flex-col gap-[5px] rounded-[10px] border-b-[3px] border-maroon bg-cream p-[22px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] md:w-[48%]"
          >
            <p className="m-0 font-roboto text-[50px] leading-none font-semibold text-gold-faded max-md:text-[30px]">
              {unit.number}
            </p>
            <h3 className="m-0 font-rubik text-[32px] leading-none font-semibold text-gold uppercase max-md:text-[20px]">
              {unit.name}
            </h3>
            <p className="mb-[0.9rem] font-roboto text-[15px] text-ink max-md:text-[12px]">{unit.description}</p>
            {unit.specs.map((spec) => (
              <div key={spec.label} className="border-b border-dashed border-[#5E5E5E] py-[5px]">
                <p className="m-0 flex justify-between font-roboto text-[16px] leading-none font-semibold text-ink max-md:text-[12px]">
                  <span>{spec.label}</span>{" "}
                  {/* Values are intentionally blurred until the visitor enquires. */}
                  <span className="text-gold blur-[3px] select-none" aria-hidden="true">
                    {spec.value}
                  </span>
                </p>
              </div>
            ))}
          </article>
        ))}

        <FlyButton label={unitTypes.cta} flyIcon="6em" flyText="14em" />
      </div>
    </div>
  );
}
