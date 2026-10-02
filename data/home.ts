// All copy and media for the home page, section by section.
// Headings use `title` (black) + `highlight` (gold) to mirror the two-tone style.

export const hero = {
  desktopSlides: [
    { src: "/images/hero/desktop/slide-1.webp", alt: "desktop size 01", width: 1600, height: 981 },
    { src: "/images/hero/desktop/slide-2.webp", alt: "desk 2", width: 1350, height: 812 },
    { src: "/images/hero/desktop/slide-3.webp", alt: "desk 1", width: 1350, height: 800 },
    { src: "/images/hero/desktop/slide-4.webp", alt: "desk 3", width: 1350, height: 808 },
    { src: "/images/hero/desktop/slide-5.webp", alt: "Growth", width: 1600, height: 1000 },
    { src: "/images/hero/desktop/slide-6.webp", alt: "Life", width: 1600, height: 1000 },
  ],
  mobileSlides: [
    { src: "/images/hero/mobile/slide-1.webp", alt: "6", width: 1438, height: 2138 },
    { src: "/images/hero/mobile/slide-2.webp", alt: "1", width: 1438, height: 2052 },
    { src: "/images/hero/mobile/slide-3.webp", alt: "2", width: 1438, height: 2057 },
    { src: "/images/hero/mobile/slide-4.webp", alt: "3", width: 1438, height: 2052 },
    { src: "/images/hero/mobile/slide-5.webp", alt: "Smooth", width: 1440, height: 2095 },
    { src: "/images/hero/mobile/slide-6.webp", alt: "Business", width: 1440, height: 2130 },
  ],
  autoplayMs: 5000,
  speedMs: 500,
};

export const overview = {
  label: "Overview",
  title: "Why",
  highlight: "10X",
  titleAfter: "Grow?",
  points: [
    "Located in a demarcated I Zone for approved industrial operations.",
    "Situated in a thriving industrial ecosystem with 300+ operational factories",
    "Strong business environment generating ₹2000+ crore turnover",
    "Designed for manufacturing and scalable operations",
    "Wide industry presence, including manufacturing, automation, plastics, engineering & AI sectors",
    "Reliable power availability for uninterrupted operations",
    "Easy access to skilled and semi-skilled labour",
    "Strategic location in the rapidly developing Vasai–Virar industrial belt",
    "Supported by multiple upcoming infrastructure developments",
  ],
  cta: "Schedule a Site Visit",
  images: [
    { src: "/images/overview/overview-1.webp", width: 1024, height: 1024 },
    { src: "/images/overview/overview-2.webp", width: 1536, height: 1024 },
  ],
};

export const stats = {
  background: "/images/backgrounds/stats-bg.webp",
  items: [
    { prefix: "", from: 0, to: 3, suffix: "+", title: "Unit Types Available" },
    { prefix: "₹", from: 0, to: 35, suffix: " lakh", title: "Onwards" },
    { prefix: "", from: 0, to: 700, suffix: "+", title: "Sq.Ft. Starting Size" },
    { prefix: "nh", from: 48, to: 48, suffix: "", title: "Highway Proximity" },
  ],
};

export const unitTypes = {
  label: "unit types",
  title: "CHOOSE YOUR",
  highlight: "IDEAL SPACE",
  description:
    "Three distinct unit configurations  each designed to match the unique operational needs of modern SMEs.",
  units: [
    {
      number: "01",
      name: "Warehouse Units",
      description:
        "High-clearance, column-free spaces engineered for bulk storage, logistics, and manufacturing operations.",
      specs: [
        { label: "Floor Height", value: "Up to 9 Meters" },
        { label: "Starting Area", value: "2,000 Sq.Ft." },
        { label: "Loading Docks", value: "Included" },
        { label: "Power Load", value: "30–100 KVA" },
      ],
    },
    {
      number: "02",
      name: "Gala / Shed Units",
      description:
        "Compact, versatile industrial galas perfect for small manufacturers, workshops, and product-based businesses.",
      specs: [
        { label: "Floor Height", value: "5–7 Meters" },
        { label: "Starting Area", value: "500 Sq.Ft." },
        { label: "Wide Shutter", value: "12 ft Opening" },
        { label: "Power Load", value: "10–30 KVA" },
      ],
    },
  ],
  cta: "Get Industrial Space Pricing",
};

export const advantages = {
  label: "Advantages",
  title: "WHY neminath",
  highlight: "INDUSTRIES",
  points: [
    "Strategically located in a developed industrial zone",
    "Built for manufacturing, scalability, and operational efficiency",
    "Surrounded by a strong industrial network and supply chain ecosystem",
    "Ensures smooth logistics with excellent connectivity",
    "Designed to support multiple industries and modern operations",
    "Provides a secure, structured, and business-friendly environment",
  ],
  cta: "Check Availability Today",
  images: [
    { src: "/images/advantages/advantage-1.webp", width: 1536, height: 1024 },
    { src: "/images/advantages/advantage-2.webp", width: 1024, height: 1536 },
  ],
  lottie: "/lottie_icons/Gears-animation.json",
  cards: [
    {
      number: "01",
      icon: "map-marker",
      title: "Prime Location",
      text: "Located in the rapidly developing Vasai–Virar industrial belt, offering strong connectivity and a well-established industrial environment.",
    },
    {
      number: "02",
      icon: "hand-holding-usd",
      title: "Investor-Grade ROI",
      text: "Appreciating land values make this a smart long-term play.",
    },
    {
      number: "03",
      icon: "industry",
      title: "Superior Infrastructure",
      text: "Wide internal roads, easy truck movement, and spacious loading & unloading areas designed for efficient industrial operations.",
    },
    {
      number: "04",
      icon: "bolt",
      title: "Efficient Project Planning",
      text: "Well-planned layout with 11 industrial buildings, designed for smooth and streamlined operations.",
    },
    {
      number: "05",
      icon: "lock",
      title: "Secure Industrial Environment",
      text: "Located in a demarcated industrial zone ensuring structured planning, no residential interference, and smooth operations.",
    },
    {
      number: "06",
      icon: "handshake",
      title: "Business-Friendly Ecosystem",
      text: "A thriving industrial community with 300+ factories, strong supply chains, and support for growing businesses.",
    },
  ],
} as const;

export const masterPlan = {
  label: "master plan",
  title: "INTELLIGENT",
  highlight: "SPACE PLANNING",
  description:
    "Every square foot is optimized. From traffic flow to unit positioning, the layout is engineered for operational efficiency.",
  plan: { src: "/images/master-plan/master-plan.webp", width: 869, height: 774 },
  planCta: "Explore Clear Layout",
  floors: [
    { name: "Ground Floor", src: "/images/master-plan/ground-floor.webp" },
    { name: "First Floor", src: "/images/master-plan/first-floor.webp" },
    { name: "Second Floor", src: "/images/master-plan/second-floor.webp" },
  ],
  floorCta: "Unlock Full View",
  cta: "Access Full Floor Plan Now",
  render: { src: "/images/master-plan/project-render.webp", width: 1350, height: 1070 },
};

// Present on the live site but hidden (display: none) — kept here so it can be switched on.
export const specifications = {
  visible: false,
  label: "Specifications",
  title: "BUILT TO THE",
  highlight: "HIGHEST STANDARD",
  description:
    "Technical details that reflect our commitment to quality construction and operational excellence.",
  groups: [
    {
      title: "Structure & Civil",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      specs: [
        { label: "Structure Type", value: "RCC Framed" },
        { label: "Flooring", value: "M40 Grade Industrial" },
        { label: "Roof Height (WH)", value: "Up to 9 Meters" },
        { label: "Road Width", value: "30 Ft Internal Roads" },
        { label: "Compound Wall", value: "Full Boundary Walling" },
      ],
    },
    {
      title: "Electrical & Utilities",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      specs: [
        { label: "Power Supply", value: "MSEDCL Three-Phase" },
        { label: "Backup Power", value: "DG Backup Provided" },
        { label: "Water Supply", value: "Municipal + Borewell" },
        { label: "Fire Safety", value: "Fire NOC Compliant" },
        { label: "Drainage", value: "Underground Storm Drains" },
      ],
    },
    {
      title: "Logistics & Access",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      specs: [
        { label: "Main Gate Width", value: "40 Ft Opening" },
        { label: "Loading Docks", value: "Truck-Level Docks" },
        { label: "Shutter Width", value: "12 Ft Per Unit" },
        { label: "Parking", value: "Dedicated Per Unit" },
        { label: "Turning Radius", value: "Suitable for 32 Ft Trucks" },
      ],
    },
    {
      title: "Office & Amenities",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      specs: [
        { label: "Office Flooring", value: "Vitrified Tiles" },
        { label: "Toilets", value: "Common + Private" },
        { label: "CCTV", value: "Full Complex Coverage" },
        { label: "Internet", value: "Fiber Duct Provided" },
        { label: "Canteen Area", value: "Designated Zone" },
      ],
    },
  ],
};

export const connectivity = {
  label: "Connectivity",
  title: "EVERYTHING IS",
  highlight: "CLOSER THAN YOU THINK",
  description:
    "Situated at the intersection of Mumbai’s industrial growth corridor highway, rail, and port access all within reach.",
  map: { src: "/images/connectivity/location-map.webp", width: 1600, height: 1170 },
  groups: [
    {
      title: "Localities",
      items: [
        "Virar East",
        "Bhatpada",
        "Chandansar",
        "Shirgaon",
        "Khairpada",
        "Wakanpada",
        "Dhaniv Baug",
        "Nallasopara",
      ],
    },
    {
      title: "Transport / Infrastructure",
      items: ["Virar Railway Station", "Virar Phata", "Vasai Phata", "NH 48"],
    },
    { title: "Roads", items: ["Pelhar Road", "Tulinj Road"] },
  ],
};

export const gallery = {
  label: "gallery",
  title: "SEE IT.",
  highlight: "BELIEVE IT.",
  images: [
    { src: "/images/gallery/gallery-1.webp", width: 2560, height: 1440 },
    { src: "/images/gallery/gallery-2.webp", width: 2560, height: 1440 },
    { src: "/images/gallery/gallery-3.webp", width: 2560, height: 1440 },
    { src: "/images/gallery/gallery-4.webp", width: 1600, height: 900 },
    { src: "/images/gallery/gallery-5.webp", width: 2560, height: 1440 },
  ],
};

// Present on the live site but hidden (display: none) — kept here so it can be switched on.
export const investmentReturns = {
  visible: false,
  label: "Investment Returns",
  title: "YOUR MONEY WORKS",
  highlight: "HARDER HERE",
  description:
    "Industrial real estate in the MMR region consistently outperforms residential in yield and capital appreciation.",
  items: [
    { value: "8–12%", note: "Per Annum", title: "Estimated Rental Yield", width: "md:w-[23%]" },
    { value: "15%+", note: "Annually", title: "Capital Appreciation Trend", width: "md:w-[23%]" },
    { value: "₹0", note: "Vacancy Day 1", title: "Ready Possession Rent Immediately", width: "md:w-[26%]" },
    { value: "10X", note: "Growth Potential", title: "Designed for Business Scale-up", width: "md:w-[24%]" },
  ],
};

export const moneyBanner = {
  text: "YOUR MONEY WORKS",
  highlight: "HARDER HERE",
};

export const contactSection = {
  label: "contact us",
  title: "LET'S START YOUR",
  highlight: "JOURNEY",
  description:
    "Our team is ready to walk you through unit options, pricing, and site visits. Get in touch today.",
  formTitle: "ENQUIRE NOW",
};

export const backgrounds = {
  gears: "/images/backgrounds/gear-bg.jpeg",
  gearsAlt: "/images/backgrounds/gear-bg-2.jpeg",
};
