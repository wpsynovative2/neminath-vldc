import type { Metadata } from "next";
import {
  Cinzel,
  Convergence,
  DM_Sans,
  Jost,
  Montaga,
  Poppins,
  Roboto,
  Roboto_Flex,
  Roboto_Slab,
  Rubik,
} from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import PopupProvider from "@/components/popups/PopupProvider";
import SmoothScroll from "@/components/SmoothScroll";

const roboto = Roboto({ subsets: ["latin"], variable: "--ff-roboto" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--ff-roboto-slab" });
const robotoFlex = Roboto_Flex({ subsets: ["latin"], variable: "--ff-roboto-flex" });
const convergence = Convergence({ subsets: ["latin"], weight: "400", variable: "--ff-convergence" });
const montaga = Montaga({ subsets: ["latin"], weight: "400", variable: "--ff-montaga" });
const jost = Jost({ subsets: ["latin"], variable: "--ff-jost" });
const rubik = Rubik({ subsets: ["latin"], variable: "--ff-rubik" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-poppins" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--ff-cinzel" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--ff-dm-sans" });

const fontVariables = [
  roboto,
  robotoSlab,
  robotoFlex,
  convergence,
  montaga,
  jost,
  rubik,
  poppins,
  cinzel,
  dmSans,
]
  .map((font) => font.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.domain,
    title: site.ogTitle,
    description: site.ogDescription,
    images: [{ url: site.ogImage }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={fontVariables}>
      <body>
        <SmoothScroll />
        <PopupProvider>{children}</PopupProvider>
      </body>
    </html>
  );
}
