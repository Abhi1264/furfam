import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  getBlogPostBySlug,
  getAllBlogPosts,
  getBlogPostsByCategory,
} from "@/lib/blog-utils";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | FurFam Pet Shop",
    };
  }

  return {
    title: `${post.title} | FurFam Pet Shop Blog`,
    description: post.description,
    keywords: post.keywords || "",
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getBlogPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Image */}
        {post.image && (
          <section className="relative h-64 md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              draggable={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 to-transparent" />
            <div className="container relative z-10 mx-auto flex h-full items-end px-4 pb-8">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-primary/90 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                  {post.category}
                </span>
                <h1 className="mt-4 font-serif text-3xl font-bold text-background md:text-4xl lg:text-5xl text-balance">
                  {post.title}
                </h1>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <article className="py-8 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {/* Back Button */}
              <Link
                href="/blogs"
                className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {/* Post Meta */}
              <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                {post.readingTime && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min read
                  </span>
                )}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Markdown Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Share Section */}
              <div className="mt-12 border-t border-border pt-8">
                <h3 className="mb-4 font-semibold text-foreground">
                  Share this article
                </h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || "https://furfam.vercel.app"}/blogs/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || "https://furfam.vercel.app"}/blogs/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-secondary py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Related Articles
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blogs/${relatedPost.slug}`}
                    className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg"
                  >
                    {relatedPost.image && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {relatedPost.category}
                      </span>
                      <h3 className="mb-2 font-serif text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="font-serif text-2xl font-bold md:text-3xl text-balance">
                Ready to Find Your Perfect Companion?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-primary-foreground/90 leading-relaxed">
                Browse our available breeds or get in touch with our team for
                personalized guidance.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/breeds">Explore Breeds</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent cursor-pointer"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
