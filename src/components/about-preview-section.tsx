import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Certified and ethical breeders only",
  "Comprehensive health screening",
  "Lifetime support for pet parents",
  "Easy adoption process",
];

export function AboutPreviewSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/about.jpg"
                alt="Happy family with their new pet"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                draggable={false}
              />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-bottom-6 sm:-right-4 rounded-xl bg-primary p-6 text-primary-foreground shadow-xl">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm">Years of Experience</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              About FurFam
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Your Trusted Partner in Pet Adoption
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At FurFam, we believe every pet deserves a loving home. Founded by
              passionate pet lovers, we&apos;ve spent over a decade connecting
              families with their perfect furry companions. Our commitment to
              ethical breeding and animal welfare sets us apart.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
