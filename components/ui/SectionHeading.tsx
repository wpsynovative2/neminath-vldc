type SectionHeadingProps = {
  title: string;
  highlight: string;
  after?: string;
  className?: string;
};

// Black + gold two-tone section title in Montaga.
export default function SectionHeading({ title, highlight, after, className = "" }: SectionHeadingProps) {
  return (
    <div className={`w-full ${className}`}>
      <h2 className="m-0 font-montaga text-[35px] leading-none font-semibold text-black uppercase max-md:text-[25px]">
        {title} <span className="text-gold">{highlight}</span>
        {after ? ` ${after}` : null}
      </h2>
    </div>
  );
}
