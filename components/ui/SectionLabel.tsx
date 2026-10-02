type SectionLabelProps = {
  text: string;
  /** Width of the text + line group, e.g. "w-[17%] max-md:w-[55%]". */
  width: string;
};

// Uppercase maroon label followed by a short rule ("UNIT TYPES ———").
export default function SectionLabel({ text, width }: SectionLabelProps) {
  return (
    <div className="w-full py-0.5">
      <span className={`flex items-center ${width}`}>
        <span className="max-w-[95%] shrink-0 font-convergence text-[24px] leading-none font-semibold text-maroon uppercase max-md:text-[20px]">
          {text}
        </span>
        <span className="ms-[5px] grow border-t-2 border-maroon" />
      </span>
    </div>
  );
}
