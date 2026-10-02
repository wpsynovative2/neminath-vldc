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
import Script from "next/script";
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
        {site.gtmId && (
          <>
            {/* Google Tag Manager */}
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
            </Script>
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <SmoothScroll />
        <PopupProvider>{children}</PopupProvider>
      </body>
    </html>
  );
}
