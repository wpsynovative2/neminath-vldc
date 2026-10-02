// Frosted-glass layer that blurs the image beneath it (used to tease floor plans).
export default function Frost({ strong = false }: { strong?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-[1] rounded-[5px] bg-white/24 shadow-[0_4px_30px_rgba(0,0,0,0.1)] ${
        strong ? "backdrop-blur-[4px]" : "backdrop-blur-[3px]"
      }`}
    />
  );
}
