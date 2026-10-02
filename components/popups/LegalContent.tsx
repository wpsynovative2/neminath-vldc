import Icon from "@/components/Icon";
import { legal } from "@/data/forms";

type LegalContentProps = {
  type: "privacy" | "terms";
  onAccept: () => void;
};

export default function LegalContent({ type, onAccept }: LegalContentProps) {
  const content = legal[type];

  return (
    <div className="flex w-full flex-row flex-wrap content-center justify-start gap-5 p-[35px] max-md:p-5">
      <div className="popup-heading relative pb-2">
        <h2 className="m-0 font-dm-sans text-[25px] leading-none font-semibold text-maroon">
          {content.title}
        </h2>
      </div>

      <h3 className="m-0 w-full font-jost text-[20px] leading-none font-normal text-maroon max-md:text-[15px]">
        {content.intro}
      </h3>

      <ul className="mt-[15px] w-full max-md:mt-0">
        {content.points.map((point, index) => (
          <li
            key={point}
            className={`flex items-start border-[#ddd] ${
              index < content.points.length - 1 ? "border-b pb-2" : ""
            } ${index > 0 ? "mt-2" : ""}`}
          >
            <Icon
              name="arrow-right"
              className="relative top-[5px] mr-1 size-4 shrink-0 text-maroon max-md:size-3"
            />
            <span className="ps-[5px] font-roboto text-base text-slate max-md:text-xs">{point}</span>
          </li>
        ))}
      </ul>

      {content.footer && (
        <p className="m-0 font-jost text-[15px] text-black">{content.footer}</p>
      )}

      <button
        type="button"
        onClick={onAccept}
        className="cursor-pointer rounded-[0_12px_0_12px] bg-maroon px-6 py-3 font-roboto text-[20px] leading-none font-medium text-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]"
      >
        {content.button}
      </button>
    </div>
  );
}
