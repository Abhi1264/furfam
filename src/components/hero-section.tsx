import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { HeroSearchButton } from "@/components/hero-search-button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid min-h-[600px] items-center gap-8 py-12 lg:grid-cols-2 lg:py-20 mb-12">
          {/* Content */}
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-background">
              Welcome to FurFam
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Where Every Furry Friend Finds Its Forever Family
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Discover your perfect furry companion from our carefully selected
              premium dog breeds. We connect loving families with healthy, happy
              puppies raised with love and care.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <HeroSearchButton />
              <Button size="lg" variant="outline" asChild>
                <Link href="/breeds">Explore All Breeds</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <PawPrint
                className="absolute top-4 left-4 h-10 w-10 text-primary animate-[pawprint-twist_2s_ease-in-out_infinite]"
                style={{ transformOrigin: "50% 50%" }}
              />
              <style>
                {`
                  @keyframes pawprint-twist {
                    0% {
                      transform: rotate(0deg) scale(1);
                      animation-timing-function: cubic-bezier(0.65,0,0.45,1);
                    }
                    8% {
                      transform: rotate(7deg) scale(1.08);
                    }
                    16% {
                      transform: rotate(15deg) scale(1.14);
                    }
                    24% {
                      transform: rotate(18deg) scale(1.18);
                    }
                    34% {
                      transform: rotate(23deg) scale(1.22);
                    }
                    45% {
                      transform: rotate(30deg) scale(1.3);
                      animation-timing-function: cubic-bezier(0.8,0.07,0.8,1);
                    }
                    58% {
                      transform: rotate(25deg) scale(1.24);
                    }
                    68% {
                      transform: rotate(18deg) scale(1.16);
                    }
                    75% {
                      transform: rotate(10deg) scale(1.07);
                    }
                    85% {
                      transform: rotate(3deg) scale(1.01);
                      animation-timing-function: ease-in;
                    }
                    92% {
                      transform: rotate(-2deg) scale(0.98);
                    }
                    100% {
                      transform: rotate(0deg) scale(1);
                    }
                  }
                `}
              </style>
              <PawPrint
                className="absolute bottom-4 right-4 h-10 w-10 text-primary animate-[pawprint-twist_2s_ease-in-out_infinite] rotate-180"
                style={{ transformOrigin: "50% 100%" }}
              />
              <div className="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-primary/50 lg:h-96 lg:w-96" />
              <div className="absolute -right-4 -top-4 h-48 w-48 rounded-full bg-accent/40 lg:h-64 lg:w-64" />
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-background shadow-2xl lg:h-[450px] lg:w-[450px]">
                <Image
                  src="/home-hero.jpg"
                  alt="Happy pets at FurFam"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "120px" }}>
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 80L48 73C96 66 192 53 288 60C384 66 480 93 576 100C672 107 768 93 864 80C960 67 1056 53 1152 60C1248 66 1344 93 1392 107L1440 120V160H1392C1344 160 1248 160 1152 160C1056 160 960 160 864 160C768 160 672 160 576 160C480 160 384 160 288 160C192 160 96 160 48 160H0V80Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
