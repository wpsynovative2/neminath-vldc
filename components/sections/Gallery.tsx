import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { gallery } from "@/data/home";

export default function Gallery() {
  const [large, topRight, bottomRight, bottomLeft, bottomRightWide] = gallery.images;
  const alt = "Neminath VLDC site progress";

  return (
    <div id="gallery" className="relative w-full scroll-mt-[100px] px-0 py-[30px] max-md:px-2.5">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center items-center justify-center gap-5">
        <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
          <SectionLabel text={gallery.label} width="w-[17%] max-md:w-[55%]" />
          <SectionHeading title={gallery.title} highlight={gallery.highlight} className="-mt-2.5" />
        </div>

        <div className="flex w-full flex-row flex-wrap content-center justify-center gap-2.5">
          <div className="flex">
            <Image
              src={large.src}
              alt={alt}
              width={large.width}
              height={large.height}
              sizes="(max-width: 767px) 100vw, 700px"
              className="h-full w-[700px] object-cover object-center"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2.5 md:w-[480px]">
            {[topRight, bottomRight].map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 767px) 100vw, 480px"
                className="w-full"
              />
            ))}
          </div>
          <div className="w-full md:w-[49%]">
            <Image
              src={bottomLeft.src}
              alt={alt}
              width={bottomLeft.width}
              height={bottomLeft.height}
              sizes="(max-width: 767px) 100vw, 590px"
              className="w-full"
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Image
              src={bottomRightWide.src}
              alt={alt}
              width={bottomRightWide.width}
              height={bottomRightWide.height}
              sizes="(max-width: 767px) 100vw, 590px"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
