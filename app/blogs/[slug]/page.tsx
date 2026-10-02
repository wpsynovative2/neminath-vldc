import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MobileBar from "@/components/MobileBar";
import EnquiryForm from "@/components/EnquiryForm";
import BlogCard, { formatBlogDate } from "@/components/BlogCard";
import Icon from "@/components/Icon";
import FlyButton from "@/components/ui/FlyButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogSection, blogs, getBlog, type BlogBlock } from "@/data/blogs";
import { backgrounds } from "@/data/home";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blogs/${post.slug}/`,
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-8 mb-3 font-rubik text-[24px] leading-[1.3] font-semibold text-maroon max-md:text-[20px]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-5 mb-2 font-rubik text-[19px] leading-[1.3] font-semibold text-gold max-md:text-[17px]">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mb-4 list-disc space-y-1.5 ps-6 font-roboto text-[16px] leading-[1.7] text-ink marker:text-maroon max-md:text-[15px]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="mb-4 font-roboto text-[16px] leading-[1.7] text-ink max-md:text-[15px]">{block.text}</p>;
  }
}

export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();

  const related = blogs.filter((item) => item.slug !== post.slug).slice(0, 3);
  const url = `${site.url}/blogs/${post.slug}/`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      image: `${site.url}${post.cover}`,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: site.name },
      publisher: { "@type": "Organization", name: site.name, logo: `${site.url}${site.logoHeader}` },
    },
    ...(post.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main
        className="relative bg-cover bg-top bg-no-repeat px-2.5 pt-10 pb-[60px] max-md:pt-6 max-md:pb-10"
        style={{ backgroundImage: `url(${backgrounds.gears})` }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-white opacity-65" />

        <div className="relative mx-auto w-full max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="mb-5 font-roboto text-[14px] text-muted">
            <Link href="/" className="hover:text-maroon">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#blogs" className="hover:text-maroon">
              Blogs
            </Link>
          </nav>

          <div className="flex flex-col gap-[30px] lg:flex-row lg:items-start">
            {/* Article */}
            <article className="min-w-0 flex-1 rounded-[10px] border-t-[3px] border-maroon bg-white p-[30px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)] max-md:p-5">
              <time dateTime={post.date} className="font-roboto text-[14px] text-muted">
                {formatBlogDate(post.date)}
              </time>
              <h1 className="mt-2 mb-5 font-montaga text-[34px] leading-[1.2] font-semibold text-black max-md:text-[24px]">
                {post.title}
              </h1>
              <Image
                src={post.cover}
                alt=""
                width={1350}
                height={760}
                preload
                sizes="(max-width: 1024px) 100vw, 760px"
                className="mb-6 aspect-[16/9] w-full rounded-[10px] object-cover"
              />

              {post.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}

              {post.faqs.length > 0 && (
                <section className="mt-8">
                  <h2 className="mb-4 font-rubik text-[24px] font-semibold text-maroon max-md:text-[20px]">
                    {blogSection.faqTitle}
                  </h2>
                  <div className="flex flex-col gap-2.5">
                    {post.faqs.map((faq, index) => (
                      <details
                        key={faq.question}
                        open={index === 0}
                        className="group overflow-hidden rounded-[5px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-[#f3f3f3] p-[18px] font-roboto text-[15px] font-bold text-black transition-colors group-open:bg-maroon group-open:text-white hover:bg-maroon hover:text-white [&::-webkit-details-marker]:hidden">
                          {faq.question}
                          <Icon name="arrow-down" className="size-3.5 shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="m-0 border-x-2 border-b-2 border-maroon bg-white px-5 py-4 font-roboto text-[15px] leading-[1.7] text-ink">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-8">
                <FlyButton label="Schedule a Site Visit" flyIcon="5em" flyText="12em" />
              </div>
            </article>

            {/* Sticky enquiry form */}
            <aside className="w-full shrink-0 lg:sticky lg:top-5 lg:w-[380px]">
              <div className="rounded-[10px] border-t-[3px] border-maroon bg-cream p-[22px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.5)]">
                <h2 className="m-0 font-roboto-flex text-[26px] leading-none font-semibold text-black max-md:text-[22px]">
                  {blogSection.sidebarTitle}
                </h2>
                <EnquiryForm variant="blog" className="mt-5 w-full" />
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-[60px] flex flex-col gap-5">
              <SectionHeading title={blogSection.relatedTitle} highlight={blogSection.relatedHighlight} />
              <div className="flex flex-wrap gap-5">
                {related.map((item) => (
                  <BlogCard key={item.slug} post={item} className="w-full md:w-[calc((100%-40px)/3)]" />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <MobileBar />
    </>
  );
}
