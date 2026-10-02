import Image from "next/image";
import Accordion from "@/components/Accordion";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { connectivity } from "@/data/home";

export default function Connectivity() {
  return (
    <div id="connectivity" className="relative w-full scroll-mt-[100px] p-2.5">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center items-center justify-between gap-5">
        <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
          <SectionLabel text={connectivity.label} width="w-[20%] max-md:w-[65%]" />
          <SectionHeading title={connectivity.title} highlight={connectivity.highlight} className="-mt-2.5" />
          <p className="mb-[0.9rem] font-roboto text-black max-md:text-[15px]">{connectivity.description}</p>
        </div>

        <Image
          src={connectivity.map.src}
          alt="Neminath VLDC location map"
          width={connectivity.map.width}
          height={connectivity.map.height}
          sizes="(max-width: 767px) 100vw, 650px"
          className="w-[650px] max-w-full"
        />

        <Accordion groups={connectivity.groups} className="w-[500px] max-w-full" />
      </div>
    </div>
  );
}
