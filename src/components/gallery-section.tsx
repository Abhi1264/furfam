"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { breeds } from "@/lib/breeds-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type GalleryItem = {
  id: string;
  name: string;
  image: string;
  type: string;
  temperament: string[];
};

const BASE_GALLERY: GalleryItem[] = breeds
  .filter((breed) => Boolean(breed.image))
  .map((breed) => ({
    id: breed.id,
    name: breed.name,
    image: breed.image,
    type: breed.type,
    temperament: breed.temperament,
  }));

const SLIDES_PER_VIEW = 3;
const SLIDES_PER_MOBILE = 1;
const CLONE_FACTOR = 2;

export function GallerySection() {
  const [items] = useState<GalleryItem[]>(() => {
    return Array.from({ length: CLONE_FACTOR }, () => BASE_GALLERY).flat();
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = items.length;

  const slidesPerView =
    typeof window !== "undefined" && window.innerWidth < 768
      ? SLIDES_PER_MOBILE
      : SLIDES_PER_VIEW;

  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || totalSlides === 0) return;
      setIsAnimating(true);

      let next = index;
      if (index < 0) {
        next = maxIndex;
      } else if (index > maxIndex) {
        next = 0;
      }

      setActiveIndex(next);

      window.setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating, maxIndex, totalSlides]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Wheel / trackpad scroll support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        if (event.deltaX > 0) {
          goNext();
        } else if (event.deltaX < 0) {
          goPrev();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let isTouching = false;

    const onTouchStart = (e: TouchEvent) => {
      isTouching = true;
      startX = e.touches[0]?.clientX ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const currentX = e.touches[0]?.clientX ?? 0;
      const diff = startX - currentX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goNext();
        } else {
          goPrev();
        }
        isTouching = false;
      }
    };

    const onTouchEnd = () => {
      isTouching = false;
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              Gallery
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Moments from Our Furfam Community
            </h2>
            <p className="text-muted-foreground mt-3 text-pretty">
              Explore a flowing wall of happy pups. Scroll freely to discover
              different breeds, temperaments, and personalities brought to life.
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative"
          aria-roledescription="carousel"
        >
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/90 shadow-sm hover:shadow-md"
              onClick={goPrev}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center justify-end">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/90 shadow-sm hover:shadow-md"
              onClick={goNext}
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-hidden px-10 md:px-14">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  (activeIndex * 100) / slidesPerView
                }%)`,
              }}
            >
              {items.map((item, index) => (
                <article
                  key={`${item.id}-${index}`}
                  className="group relative w-full shrink-0 sm:w-1/2 lg:w-1/3"
                >
                  <div className="overflow-hidden rounded-2xl bg-card border shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden bg-secondary/40">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        draggable={false}
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="capitalize">
                          {item.type}
                        </Badge>
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                        <span className="line-clamp-1">
                          {item.temperament.slice(0, 3).join(" · ")}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.temperament.slice(3, 6).join(" · ") ||
                          "Loving, loyal, and ready for cuddles."}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: Math.min(8, maxIndex + 1) }).map(
              (_, dotIndex) => {
                const isActive =
                  Math.round(activeIndex / slidesPerView) === dotIndex;
                return (
                  <button
                    key={dotIndex}
                    type="button"
                    className="group"
                    onClick={() => goTo(dotIndex * slidesPerView)}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-6 bg-primary"
                          : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                      }`}
                    />
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/breeds">
            <Button size="lg" className="group cursor-pointer">
              Explore All Breeds
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
