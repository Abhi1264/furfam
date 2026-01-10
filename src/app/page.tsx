import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { BreedTypesSection } from "@/components/breed-types-section";
import { AboutPreviewSection } from "@/components/about-preview-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";
import { GallerySection } from "@/components/gallery-section";
import { CTABanner } from "@/components/cta-banner";
import { StatsSection } from "@/components/stats-section";
import { ProcessSection } from "@/components/process-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PartnersSection />
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
