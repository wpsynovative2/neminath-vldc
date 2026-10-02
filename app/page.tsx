import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import ShapeDivider from "@/components/ShapeDivider";
import EnquiryOnScroll from "@/components/popups/EnquiryOnScroll";
import Overview from "@/components/sections/Overview";
import Stats from "@/components/sections/Stats";
import UnitTypes from "@/components/sections/UnitTypes";
import Advantages from "@/components/sections/Advantages";
import MasterPlan from "@/components/sections/MasterPlan";
import Connectivity from "@/components/sections/Connectivity";
import Gallery from "@/components/sections/Gallery";
import InvestmentReturns from "@/components/sections/InvestmentReturns";
import MoneyBanner from "@/components/sections/MoneyBanner";
import Contact from "@/components/sections/Contact";
import Blogs from "@/components/sections/Blogs";
import { backgrounds, hero } from "@/data/home";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero — overlaps the next section by 15% (desktop) / 20% (mobile) */}
        <section className="relative z-[2] flex flex-row flex-wrap items-center justify-center max-md:mt-[15%] max-md:-mb-[20%]">
          <HeroCarousel
            slides={hero.desktopSlides}
            autoplayMs={hero.autoplayMs}
            speedMs={hero.speedMs}
            className="-mb-[15%] max-md:hidden"
          />
          <HeroCarousel
            slides={hero.mobileSlides}
            autoplayMs={hero.autoplayMs}
            speedMs={hero.speedMs}
            showDots={false}
            className="md:hidden"
          />
        </section>

        {/* Overview → Stats → Unit types → Advantages share one gear background */}
        <section
          className="relative z-[1] flex flex-row flex-wrap items-start justify-center gap-5 bg-cover bg-top bg-no-repeat pt-[17%] max-md:pt-0"
          style={{ backgroundImage: `url(${backgrounds.gears})` }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-white opacity-65" />
          <Overview />
          <Stats />
          <UnitTypes />
          <Advantages />
        </section>

        <MasterPlan />

        {/* Connectivity → Blogs share the second gear background */}
        <section
          className="relative flex flex-row flex-wrap content-center justify-center gap-5 bg-cover bg-top bg-no-repeat pt-[50px] pb-[100px] max-md:pb-[50px]"
          style={{ backgroundImage: `url(${backgrounds.gears})` }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-white opacity-65" />
          <ShapeDivider />
          <Connectivity />
          <Gallery />
          <InvestmentReturns />
          <MoneyBanner />
          <Contact />
          <Blogs />
        </section>
      </main>

      <Footer />
      <MobileBar />
      <EnquiryOnScroll />
    </>
  );
}
