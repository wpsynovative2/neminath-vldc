import Image from "next/image";
import Icon from "@/components/Icon";
import LottieAnimation from "@/components/LottieAnimation";
import FlyButton from "@/components/ui/FlyButton";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { advantages } from "@/data/home";

export default function Advantages() {
  const [small, tall] = advantages.images;

  return (
    <div
      id="advantages"
      className="relative -mb-[60px] w-full scroll-mt-[100px] px-0 pt-10 pb-[30px] max-md:px-2.5 max-md:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center justify-evenly gap-x-0 gap-y-[25px] max-md:justify-center">
        {/* Artwork: triangles + hexagon images */}
        <div className="relative flex w-full flex-row items-center justify-center gap-[9px] p-2.5 max-md:gap-[5px] md:w-[45%]">
          <div className="clip-triangle flex h-[90px] min-h-[70px] w-[15%] bg-maroon p-2.5 max-md:h-[50px] max-md:min-h-[61px] max-md:w-[45px]" />
          <div className="clip-hexagon-short w-[33%] max-w-[33%] max-md:w-[100px] max-md:max-w-[100px]">
            <Image
              src={small.src}
              alt=""
              width={small.width}
              height={small.height}
              sizes="(max-width: 767px) 100px, 180px"
              className="h-[200px] w-full max-md:h-[135px]"
            />
          </div>
          <div className="clip-triangle-outline absolute top-[62px] left-[230px] flex h-[90px] min-h-[70px] w-[15%] bg-maroon p-2.5 max-md:top-[51px] max-md:left-[43.5%] max-md:h-[60px] max-md:min-h-[50px] max-md:w-[41px]" />
          <div className="clip-triangle-outline absolute top-[268px] left-[230px] flex h-[90px] min-h-[70px] w-[15%] bg-maroon p-2.5 max-md:top-[195px] max-md:left-[43.5%] max-md:h-[60px] max-md:min-h-[50px] max-md:w-[41px]" />
          <div className="clip-hexagon-tall w-[33%] max-w-[33%] max-md:w-[111px] max-md:max-w-[111px]">
            <Image
              src={tall.src}
              alt=""
              width={tall.width}
              height={tall.height}
              sizes="(max-width: 767px) 111px, 180px"
              className="h-[400px] w-full max-md:h-[285px]"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="relative flex w-full flex-row flex-wrap content-center items-start justify-start gap-x-0.5 gap-y-[15px] md:w-[55%]">
          <SectionLabel text={advantages.label} width="w-[33%] max-md:w-[55%]" />
          <SectionHeading
            title={advantages.title}
            highlight={advantages.highlight}
            className="-mt-[5px] mb-2.5"
          />
          <ul className="mb-2.5 list-disc ps-10 font-jost text-black max-md:text-[12px]">
            {advantages.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <FlyButton label={advantages.cta} flyIcon="5em" flyText="14em" />
        </div>

        {/* Feature cards */}
        {advantages.cards.map((card) => (
          <article
            key={card.number}
            className="relative flex w-full flex-col gap-2.5 rounded-[10px] border-l-[3px] border-maroon bg-cream p-[22px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] md:w-[30%]"
          >
            <p className="m-0 font-roboto text-[40px] leading-none font-semibold text-gold-faded max-md:text-[30px]">
              {card.number}
            </p>
            <h3 className="m-0 flex items-start max-md:mb-[5px]">
              <Icon name={card.icon} className="relative top-1 size-5 shrink-0 text-maroon max-md:mr-[5px]" />
              <span className="ps-[5px] font-rubik text-[20px] leading-[22px] font-medium text-gold max-md:text-[17px] max-md:leading-none md:ps-2.5">
                {card.title}
              </span>
            </h3>
            <p className="m-0 font-roboto text-[15px] text-ink max-md:text-[12px]">{card.text}</p>
          </article>
        ))}
      </div>

      <LottieAnimation
        path={advantages.lottie}
        className="absolute top-[-11%] left-[73%] w-[284px] max-w-[284px] max-md:top-[-1%] max-md:left-0 max-md:w-40"
      />
    </div>
  );
}
