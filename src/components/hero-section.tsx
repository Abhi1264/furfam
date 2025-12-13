import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PawPrint } from "lucide-react";

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
              <Button size="lg" asChild>
                <Link href="#breeds">
                  Explore Breeds <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
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
                  height={450}
                  width={450}
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
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 50L48 45.8C96 41.7 192 33.3 288 37.5C384 41.7 480 58.3 576 62.5C672 66.7 768 58.3 864 50C960 41.7 1056 33.3 1152 37.5C1248 41.7 1344 58.3 1392 66.7L1440 75V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
