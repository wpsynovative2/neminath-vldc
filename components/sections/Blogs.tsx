import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import { blogSection, homeBlogs } from "@/data/blogs";

// Home page blog cards — shows posts with `onHome: true`.
export default function Blogs() {
  if (homeBlogs.length === 0) return null;

  return (
    <div id="blogs" className="relative w-full scroll-mt-[100px] px-0 pt-2.5 pb-[30px] max-md:px-2.5">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row flex-wrap content-center justify-center gap-5">
        <div className="flex w-full flex-row flex-wrap items-start justify-start gap-x-0.5 gap-y-[15px]">
          <SectionLabel text={blogSection.label} width="w-[20%] max-md:w-[55%]" />
          <SectionHeading title={blogSection.title} highlight={blogSection.highlight} className="-mt-2.5" />
          <p className="mb-[0.9rem] font-roboto text-black max-md:text-[15px]">{blogSection.description}</p>
        </div>

        {homeBlogs.map((post) => (
          <BlogCard key={post.slug} post={post} className="w-full md:w-[calc((100%-40px)/3)]" />
        ))}
      </div>
    </div>
  );
}
