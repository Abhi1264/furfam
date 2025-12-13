import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Dog,
  Stethoscope,
  GraduationCap,
  Scissors,
  Home,
  Truck,
  Heart,
  Phone,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | FurFam Pet Shop",
  description:
    "Explore FurFam's comprehensive pet services including puppy matching, health checks, training, grooming, and lifetime support for your furry family member.",
  keywords:
    "pet services, puppy training, dog grooming, pet health, puppy delivery, pet care support",
};

const mainServices = [
  {
    icon: Dog,
    title: "Puppy Matching Service",
    description:
      "Our expert team helps you find the perfect breed that matches your lifestyle, living situation, and family dynamics.",
    features: [
      "Personalized breed recommendations",
      "Lifestyle compatibility assessment",
      "Meet & greet sessions",
      "Family introductions",
    ],
  },
  {
    icon: Stethoscope,
    title: "Health Guarantee Program",
    description:
      "Every puppy comes with comprehensive health screenings, vaccinations, and our peace-of-mind health guarantee.",
    features: [
      "Full veterinary examination",
      "Up-to-date vaccinations",
      "Genetic health screening",
      "30-day health guarantee",
    ],
  },
  {
    icon: GraduationCap,
    title: "Training & Socialization",
    description:
      "Our puppies receive early socialization and basic training to ensure they're well-prepared for their new homes.",
    features: [
      "Basic obedience foundation",
      "Potty training introduction",
      "Social skill development",
      "Behavioral assessments",
    ],
  },
  {
    icon: Scissors,
    title: "Grooming Services",
    description:
      "Keep your furry friend looking and feeling their best with our professional grooming services.",
    features: [
      "Full grooming packages",
      "Breed-specific styling",
      "Nail trimming & ear cleaning",
      "Spa treatments",
    ],
  },
];

const additionalServices = [
  {
    icon: Home,
    title: "Home Preparation Guide",
    description:
      "Get expert advice on preparing your home for your new puppy, including safety tips and supply lists.",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    description:
      "We offer safe, comfortable transport options to bring your new family member home.",
  },
  {
    icon: Heart,
    title: "Lifetime Support",
    description:
      "Our relationship doesn't end at adoption. Get ongoing advice and support throughout your pet's life.",
  },
  {
    icon: Phone,
    title: "24/7 Helpline",
    description:
      "Access to our pet care experts whenever you need guidance or have questions about your pup.",
  },
];

const packages = [
  {
    name: "Essential",
    price: "Included",
    description: "Everything you need to start your journey",
    features: [
      "Health guarantee",
      "Vaccination records",
      "Microchipping",
      "Starter kit",
      "New parent guide",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$299",
    description: "Enhanced care for a perfect start",
    features: [
      "Everything in Essential",
      "Extended health guarantee",
      "Basic training session",
      "First grooming",
      "Premium starter kit",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Complete",
    price: "$499",
    description: "The ultimate puppy package",
    features: [
      "Everything in Premium",
      "Lifetime health guarantee",
      "3 training sessions",
      "3 grooming sessions",
      "VIP starter kit",
      "24/7 dedicated support",
    ],
    highlighted: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Our Services
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
                Complete Care for Your Furry Family
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                From finding your perfect companion to lifetime support, we
                offer comprehensive services to ensure you and your pet thrive
                together.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Core Services
              </h2>
              <p className="mt-4 text-muted-foreground">
                Comprehensive solutions for every stage of your pet journey.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {mainServices.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg md:flex-row md:gap-6"
                >
                  <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 md:mb-0">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-serif text-xl font-bold text-card-foreground">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Additional Support
              </h2>
              <p className="mt-4 text-muted-foreground">
                Extra services to make your pet parenting journey easier.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-card p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Care Packages
              </h2>
              <p className="mt-4 text-muted-foreground">
                Choose the perfect package for your new family member.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm ${
                    pkg.highlighted
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border bg-card"
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pkg.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-foreground">
                      {pkg.price}
                    </span>
                    {pkg.price !== "Included" && (
                      <span className="text-muted-foreground"> one-time</span>
                    )}
                  </div>
                  <ul className="mb-6 space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={pkg.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-card p-8 shadow-sm md:flex-row">
              <div>
                <h2 className="font-serif text-2xl font-bold text-card-foreground md:text-3xl">
                  Have Questions About Our Services?
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Our team is here to help you every step of the way.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
