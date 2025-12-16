import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-background">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold md:text-3xl text-balance">
            Explore Our Pet Care Blog
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/90 leading-relaxed">
            Discover expert advice, breed guides, training tips, and helpful
            resources to help you care for your furry family member. Read our
            latest articles and become a better pet parent.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 bg-foreground text-background hover:bg-foreground/90"
              asChild
            >
              <Link href="/blogs">
                Read Our Blog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
