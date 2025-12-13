import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Award, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | FurFam Pet Shop",
  description:
    "Learn about FurFam&apos;s mission to connect loving families with healthy, happy puppies. Discover our commitment to ethical breeding and animal welfare.",
  keywords:
    "about FurFam, pet shop story, ethical dog breeding, animal welfare, pet adoption",
};

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description:
      "Every decision we make puts the welfare of our animals first. We believe that happy, healthy puppies make the best companions.",
  },
  {
    icon: Shield,
    title: "Ethical Standards",
    description:
      "We partner exclusively with certified breeders who meet our rigorous standards for animal care, health testing, and ethical practices.",
  },
  {
    icon: Users,
    title: "Family Focused",
    description:
      "We&apos;re dedicated to matching the right pet with the right family, ensuring lasting bonds and happy homes for all.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description:
      "Every puppy comes with comprehensive health guarantees, vaccinations, and documentation you can trust.",
  },
];

const milestones = [
  {
    year: "2013",
    title: "Founded",
    description:
      "FurFam was born from a passion for connecting families with pets",
  },
  {
    year: "2016",
    title: "1,000 Families",
    description: "We celebrated our 1,000th successful adoption",
  },
  {
    year: "2019",
    title: "Nationwide Reach",
    description: "Expanded our network to serve families across the country",
  },
  {
    year: "2023",
    title: "10,000+ Happy Homes",
    description: "A decade of creating lasting bonds between pets and families",
  },
];

// const team = [
//   {
//     name: "Aryan",
//     role: "Founder",
//     image: "/aryan.jpg",
//     bio: "Aryan founded FurFam to revolutionize ethical pet adoption.",
//   },
//   {
//     name: "Person 2",
//     role: "Head of Breeder Relations",
//     image: "/person2.jpg",
//     bio: "James ensures all our partner breeders maintain the highest standards of care and ethics.",
//   },
//   {
//     name: "Person 3",
//     role: "Customer Experience Director",
//     image: "/person3.jpg",
//     bio: "Emily leads our team in providing exceptional support throughout your adoption journey.",
//   },
// ];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Our Story
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
                Where Every Pet Finds a Loving Home
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Founded in 2013, FurFam has been on a mission to transform pet
                adoption. We believe that every family deserves the perfect
                furry companion, and every pet deserves a loving forever home.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                  <Image
                    src="/about.jpg"
                    alt="FurFam team with puppies"
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-primary p-6 text-primary-foreground shadow-xl md:block">
                  <div className="text-4xl font-bold">10K+</div>
                  <div className="text-sm">Happy Families</div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At FurFam, we&apos;re more than just a pet shop – we&apos;re
                  matchmakers for families and their future best friends. Our
                  mission is to create lasting bonds between pets and people
                  while upholding the highest standards of animal welfare.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We work exclusively with certified, ethical breeders who share
                  our commitment to raising healthy, well-socialized puppies.
                  Every dog in our network receives comprehensive health
                  screenings, vaccinations, and early socialization to ensure
                  they&apos;re ready for their new homes.
                </p>
                <ul className="space-y-3">
                  {[
                    "Certified ethical breeders only",
                    "Comprehensive health guarantees",
                    "Lifetime support for pet parents",
                    "Easy, transparent adoption process",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Our Core Values
              </h2>
              <p className="mt-4 text-muted-foreground">
                These principles guide everything we do at FurFam.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className="rounded-2xl bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Our Journey
              </h2>
              <p className="mt-4 text-muted-foreground">
                A decade of bringing families and pets together.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {milestone.year.slice(2)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="h-full w-0.5 bg-border" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm font-medium text-primary">
                        {milestone.year}
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Meet Our Team
              </h2>
              <p className="mt-4 text-muted-foreground">
                Passionate pet lovers dedicated to finding your perfect
                companion.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-card shadow-sm"
                >
                  <div className="relative h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-card-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="font-serif text-2xl font-bold md:text-3xl text-balance">
                Ready to Find Your Perfect Companion?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-primary-foreground/90 leading-relaxed">
                Let us help you find the furry family member you&apos;ve been
                dreaming of.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/#breeds">Explore Breeds</Link>
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
