import StatCard from "@/components/StatCard";
import { stats } from "@/data/home";

export default function Stats() {
  return (
    <div
      className="relative mt-[100px] flex min-h-[400px] w-full bg-cover bg-center bg-no-repeat px-2.5 lg:bg-fixed"
      style={{ backgroundImage: `url(${stats.background})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black opacity-70" />
      <div className="relative mx-auto flex min-h-[400px] w-full max-w-[1200px] flex-row flex-wrap content-around items-center justify-around gap-2.5 max-md:content-center max-md:justify-center">
        {stats.items.map((item, index) => (
          <StatCard key={item.title} {...item} delayMs={index * 500} zIndex={index === 0 ? 3 : 2} />
        ))}
      </div>
    </div>
  );
}
