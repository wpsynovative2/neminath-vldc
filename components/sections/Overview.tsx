import Image from "next/image";
import FlyButton from "@/components/ui/FlyButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { overview } from "@/data/home";

export default function Overview() {
  const [first, second] = overview.images;

  return (
    <div
      id="overview"
      className="relative flex w-full scroll-mt-[30vh] flex-row flex-wrap content-center justify-between gap-5 md:w-[1200px]"
    >
      {/* Copy */}
      <div className="relative flex w-full flex-row flex-wrap items-center justify-start gap-5 p-2.5 max-md:mt-[75px] max-md:gap-2.5 md:w-[62%]">
        <div className="flex w-full flex-row items-start justify-start">
          <h2 className="m-0 font-convergence text-[24px] leading-none font-bold text-maroon uppercase max-md:text-[20px]">
            {overview.label}
          </h2>
          <div className="w-[11%] py-3">
            <div className="border-t-[2.6px] border-maroon" />
          </div>
        </div>

        <SectionHeading
          title={overview.title}
          highlight={overview.highlight}
          after={overview.titleAfter}
          className="-mt-[30px] max-md:-mt-2.5"
        />

        <ol className="m-0 list-decimal ps-10 text-justify font-jost text-[15px] text-[#474747] max-md:text-[12px]">
          {overview.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>

        <FlyButton label={overview.cta} flyIcon="5em" flyText="12em" />
      </div>

      {/* Image collage */}
      <div className="relative flex w-full flex-row flex-wrap content-center items-start justify-between p-2.5 md:w-[35%]">
        <div className="relative -mr-[18%] max-md:w-[71%]">
          <Image
            src={first.src}
            alt=""
            width={first.width}
            height={first.height}
            sizes="(max-width: 767px) 71vw, 285px"
            className="w-[285px] rounded-tl-[100px] max-md:w-full"
          />
        </div>
        <div className="relative z-[2] mt-[49%] -ml-[100%] p-1 before:absolute before:top-0 before:left-0 before:z-[1] before:size-full before:rounded-tr-[80px] before:bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_70%,rgba(255,255,255,0)_100%)] before:content-[''] max-md:-mt-[32%] max-md:ml-[27%] max-md:w-[71%]">
          <Image
            src={second.src}
            alt=""
            width={second.width}
            height={second.height}
            sizes="(max-width: 767px) 71vw, 245px"
            className="relative z-[2] w-[245px] rounded-tr-[80px] max-md:w-full"
          />
        </div>
        <div className="relative z-0 -mt-[18%] flex min-h-[134px] w-full bg-[linear-gradient(95deg,#DD8C0D_32%,#FFE5A2_100%)] p-2.5 max-md:min-h-[110px] md:w-[95%]" />
      </div>
    </div>
  );
}
