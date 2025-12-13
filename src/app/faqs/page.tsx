import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FurFam Pet Shop",
  description:
    "Find answers to common questions about our puppies, adoption process, health guarantees, delivery services, and more at FurFam.",
  keywords:
    "FAQs, frequently asked questions, puppy adoption questions, pet care questions, dog breed information",
};

export default function FAQsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="font-serif text-2xl font-bold md:text-3xl text-balance">
                Still Have Questions?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-primary-foreground/90 leading-relaxed">
                Our friendly team is here to help. Get in touch and we&apos;ll
                get back to you as soon as possible.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent cursor-pointer"
                  asChild
                >
                  <Link href="/breeds">Explore Breeds</Link>
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
