import type { NextConfig } from "next";

// Static export for Hostinger shared hosting: `npm run build` writes the site to `out/`,
// which is uploaded to public_html. The enquiry form posts to public/api/enquiry.php.
const nextConfig: NextConfig = {
  output: "export",
  // Every page becomes folder/index.html, which Apache serves without rewrite rules.
  trailingSlash: true,
  // No image server on static hosting; images in public/images are pre-optimised WebP.
  images: { unoptimized: true },
};

export default nextConfig;
