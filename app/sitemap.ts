import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...blogs.map((post) => ({
      url: `${site.url}/blogs/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
