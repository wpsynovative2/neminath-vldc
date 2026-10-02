export const site = {
  name: "Neminath VLDC",
  domain: "neminathvldc.com",
  url: "https://neminathvldc.com",
  title: "Neminath VLDC | Industrial Spaces in Virar East, Chandansar Road",
  description:
    "Neminath VLDC offers premium industrial spaces and commercial infrastructure at Chandansar Road, Virar East. Strategically located for warehouses, manufacturing units, and business growth with excellent connectivity.",
  ogTitle: "Neminath VLDC | Premium Industrial Spaces in Virar East",
  ogDescription:
    "Discover modern industrial spaces at Chandansar Road, Virar East. Neminath VLDC offers strategically located industrial infrastructure ideal for warehouses, manufacturing units, logistics, and business expansion.",
  ogImage: "/images/og-image.jpg",
  logoHeader: "/images/logo/logo-header.png",
  logoFooter: "/images/logo/logo-footer.png",
  // Google Tag Manager container — leave empty to disable.
  gtmId: "GTM-5NXTQMZN",
};

export const navLinks = [
  { label: "overview", href: "#overview" },
  { label: "units", href: "#units" },
  { label: "advantages", href: "#advantages" },
  { label: "master plan", href: "#master-plan" },
  { label: "connectivity", href: "#connectivity" },
  { label: "gallery", href: "#gallery" },
  { label: "contact us", href: "#contact-us" },
];

export const contact = {
  address: "HDIL, Chandansar Road, Virar East, 401305",
  mapLink: "https://maps.app.goo.gl/58nzQRXgu3WEN1gg6",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.7971714661976!2d72.83520137597178!3d19.464309839665905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9002e11839d%3A0x55aae2f0f2dd0562!2sNeminath%20Vldc%20Indistries!5e0!3m2!1sen!2sin!4v1779101606846!5m2!1sen!2sin",
  phones: [
    { label: "+91 9370065101", href: "tel:93700 65101" },
    { label: "+91 9833000044", href: "tel:98330 00044" },
  ],
  primaryPhone: { label: "9370065101", href: "tel:9370065101" },
  callUsHref: "tel:+91 9370065101",
  emails: ["info@neminathvldc.com", "sales@neminathvldc.com"],
  hours: ["Mon-Sat : 8am-6pm", "Sunday : Closed"],
  whatsapp:
    "https://api.whatsapp.com/send?phone=919833000044&text=Hello!%20I%27m%20interested%20in%20your%20project.%20Please%20share%20more%20details.",
};

export const socialLinks = [
  { icon: "envelope", label: "Email", href: "mailto:info@neminathvldc.com" },
  { icon: "whatsapp", label: "WhatsApp", href: contact.whatsapp },
  {
    icon: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61588058956802#%20%20facebook",
  },
  {
    icon: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/neminathindustrial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==%20%20instagram",
  },
] as const;
