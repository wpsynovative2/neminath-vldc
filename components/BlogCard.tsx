import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { blogSection, type BlogPost } from "@/data/blogs";

export function formatBlogDate(date: string) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// Card linking to a blog's dedicated page; styled like the site's cream feature cards.
export default function BlogCard({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blogs/${post.slug}/`}
      className={`group flex flex-col overflow-hidden rounded-[10px] border-b-[3px] border-maroon bg-cream shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0px_6px_18px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 390px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex grow flex-col gap-2.5 p-[22px]">
        <time dateTime={post.date} className="font-roboto text-[13px] text-muted">
          {formatBlogDate(post.date)}
        </time>
        <h3 className="m-0 line-clamp-2 font-rubik text-[20px] leading-[1.25] font-semibold text-gold max-md:text-[17px]">
          {post.title}
        </h3>
        <p className="m-0 line-clamp-3 font-roboto text-[15px] text-ink max-md:text-[13px]">{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-2 pt-1 font-jost text-[16px] font-medium text-maroon">
          {blogSection.readMore}
          <Icon name="arrow-right" className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
