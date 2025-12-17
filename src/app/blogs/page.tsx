import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllBlogPosts } from "@/lib/blog-utils";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pet Care Blog | FurFam Pet Shop",
  description:
    "Expert pet care advice, breed guides, training tips, and helpful resources for dog owners. Stay informed with the latest from FurFam's pet care blog.",
  keywords:
    "pet care blog, dog care tips, breed guides, puppy training, pet advice, dog health, pet nutrition, dog behavior",
  openGraph: {
    title: "Pet Care Blog | FurFam Pet Shop",
    description:
      "Expert pet care advice, breed guides, training tips, and helpful resources for dog owners.",
    type: "website",
  },
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const allPosts = getAllBlogPosts();

  const posts = category
    ? allPosts.filter((post) => post.category === category)
    : allPosts;

  const categories = Array.from(
    new Set(allPosts.map((post) => post.category)),
  ).sort();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Our Blog
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
                Expert Pet Care Advice & Resources
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Discover helpful tips, breed guides, training advice, and expert
                insights to help you care for your furry family member.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  No Blog Posts Yet
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Check back soon for helpful pet care articles and guides!
                </p>
              </div>
            ) : (
              <>
                {/* Categories Filter */}
                {categories.length > 0 && (
                  <div className="mb-8 flex flex-wrap gap-2 justify-center">
                    <Button
                      variant={!category ? "default" : "outline"}
                      className="rounded-full"
                      asChild
                    >
                      <Link href="/blogs">All Posts</Link>
                    </Button>
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={category === cat ? "default" : "outline"}
                        className="rounded-full"
                        asChild
                      >
                        <Link
                          href={`/blogs?category=${encodeURIComponent(cat)}`}
                        >
                          {cat}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}

                {/* Blog Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg"
                    >
                      {post.image && (
                        <Link href={`/blogs/${post.slug}`}>
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              draggable={false}
                            />
                          </div>
                        </Link>
                      )}
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {post.category}
                          </span>
                          {post.readingTime && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readingTime} min read
                            </span>
                          )}
                        </div>

                        <h2 className="mb-2 font-serif text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                        </h2>

                        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                          {post.description}
                        </p>

                        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                        </div>

                        {post.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 lg:py-24">
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
