import Image from "next/image";
import FlyButton from "@/components/ui/FlyButton";
import Frost from "@/components/ui/Frost";
import PopupTrigger from "@/components/ui/PopupTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import Specifications from "./Specifications";
import { backgrounds, masterPlan } from "@/data/home";

export default function MasterPlan() {
  return (
    <section
      className="relative z-0 flex w-full flex-row flex-wrap content-center justify-center gap-5 bg-cover bg-top bg-no-repeat pt-[100px] max-md:mt-[100px] max-md:pt-0"
      style={{ backgroundImage: `url(${backgrounds.gearsAlt})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-white opacity-65" />

      <div
        id="master-plan"
        className="relative z-[1] w-full scroll-mt-[100px] px-0 pt-5 pb-[50px] max-md:px-2.5 max-md:py-[30px]"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center justify-center gap-5">
          <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
            <SectionLabel text={masterPlan.label} width="w-[20%] max-md:w-[55%]" />
            <SectionHeading title={masterPlan.title} highlight={masterPlan.highlight} className="-mt-2.5" />
            <p className="mb-[0.9rem] font-roboto text-black max-md:text-[15px]">{masterPlan.description}</p>
          </div>

          {/* Master plan preview (blurred) */}
          <div className="relative flex w-full flex-col">
            <div className="relative w-full rounded-[5px] bg-[#FBFAE8] text-center shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)]">
              <Frost strong />
              <Image
                src={masterPlan.plan.src}
                alt=""
                width={masterPlan.plan.width}
                height={masterPlan.plan.height}
                sizes="(max-width: 767px) 60vw, 480px"
                className="inline w-[40%] rounded-[5px] max-md:w-[60%]"
              />
            </div>
            <PopupTrigger className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-maroon px-5 py-2.5 font-jost text-[25px] leading-none text-white transition-transform hover:-translate-y-[calc(50%+3px)] max-md:w-[181px] max-md:text-center max-md:text-[15px]">
              {masterPlan.planCta}
            </PopupTrigger>
          </div>

          {/* Floor plans (blurred) */}
          {masterPlan.floors.map((floor) => (
            <article
              key={floor.name}
              className="relative flex w-full flex-col overflow-hidden rounded-[10px] border-y-[3px] border-maroon bg-cream shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-none md:w-[32%]"
            >
              <div className="relative">
                <Frost />
                <Image
                  src={floor.src}
                  alt=""
                  width={1600}
                  height={900}
                  sizes="(max-width: 767px) 100vw, 384px"
                  className="h-full w-[600px] rounded-[5px]"
                />
              </div>
              <h3 className="m-0 p-[15px] text-center font-rubik text-[20px] leading-none font-semibold text-gold uppercase">
                {floor.name}
              </h3>
              <PopupTrigger className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-maroon px-5 py-2.5 font-jost text-[20px] leading-none whitespace-nowrap text-white transition-transform hover:-translate-y-[calc(50%+3px)] max-md:text-[15px]">
                {masterPlan.floorCta}
              </PopupTrigger>
            </article>
          ))}

          <div className="w-full ps-[3px]">
            <FlyButton label={masterPlan.cta} flyIcon="6em" flyText="14em" />
          </div>
        </div>
      </div>

      <Specifications />

      <div className="relative -mt-[37%] w-full">
        <Image
          src={masterPlan.render.src}
          alt=""
          width={masterPlan.render.width}
          height={masterPlan.render.height}
          sizes="100vw"
          className="w-full"
        />
      </div>
    </section>
  );
}
