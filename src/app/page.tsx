import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSiteUrl } from "@/lib/site-url";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { BreedTypesSection } from "@/components/breed-types-section";
import { AboutPreviewSection } from "@/components/about-preview-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NewsletterSection } from "@/components/newsletter-section";
// import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";
import { GallerySection } from "@/components/gallery-section";
import { CTABanner } from "@/components/cta-banner";
import { StatsSection } from "@/components/stats-section";
import { ProcessSection } from "@/components/process-section";

const homeTitle =
  "FurFam | Premium Dog Breeds & Responsible Pet Care Across India";
const homeDescription =
  "Explore hundreds of dog breeds, India-ready care guides, and expert-backed resources. FurFam helps families from metros to smaller cities choose and care for dogs responsibly.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "buy dog India",
    "dog breed guide India",
    "pet care tips India",
    "puppy advice India",
    "FurFam India",
    "dog breeds Mumbai Delhi Bangalore",
  ],
  alternates: {
    canonical: `${getSiteUrl()}/`,
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: `${getSiteUrl()}/`,
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* <PartnersSection /> */}
        <GallerySection />
        <FeaturesSection />
        <BreedTypesSection />
        <ProcessSection />
        <TestimonialsSection />
        <StatsSection />
        <AboutPreviewSection />
        <FAQSection />
        <CTABanner />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
