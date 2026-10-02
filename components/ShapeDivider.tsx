// Elementor "opacity fan" bottom divider leading into the black footer.
export default function ShapeDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-px left-0 w-full rotate-180 overflow-hidden leading-none"
    >
      <svg
        viewBox="0 0 283.5 19.6"
        preserveAspectRatio="none"
        className="relative left-1/2 block h-[100px] w-[calc(100%+1.3px)] -translate-x-1/2 fill-black max-md:h-[30px]"
      >
        <path style={{ opacity: 0.33 }} d="M0 0L0 18.8 141.8 4.1 283.5 18.8 283.5 0z" />
        <path style={{ opacity: 0.33 }} d="M0 0L0 12.6 141.8 4 283.5 12.6 283.5 0z" />
        <path style={{ opacity: 0.33 }} d="M0 0L0 6.4 141.8 4 283.5 6.4 283.5 0z" />
        <path d="M0 0L0 1.2 141.8 4 283.5 1.2 283.5 0z" />
      </svg>
    </div>
  );
}
