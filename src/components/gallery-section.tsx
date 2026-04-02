"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { breeds } from "@/lib/breeds-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GalleryItem = {
  id: string;
  name: string;
  image: string;
  type: string;
  typeSlug: string;
  temperament: string[];
  price?: string;
};

const FEATURED_BREED_IDS = [
  "golden-retriever",
  "labrador-retriever",
  "poodle",
  "maltese",
  "maltipoo",
  "golden-doodle",
  "german-shepherd",
  "shih-tzu",
  "siberian-husky",
];

const GALLERY_ITEMS: GalleryItem[] = FEATURED_BREED_IDS.map((id) =>
  breeds.find((breed) => breed.id === id),
)
  .filter((breed): breed is (typeof breeds)[number] => Boolean(breed))
  .map((breed) => ({
    id: breed.id,
    name: breed.name,
    image: breed.image,
    type: breed.type,
    typeSlug: breed.typeSlug,
    temperament: breed.temperament,
    price: breed.price,
  }));

const MAX_VISIBLE_OFFSET = 2;

function circularOffset(index: number, active: number, length: number): number {
  let diff = index - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

function toTransparentImagePath(imagePath: string): string {
  // Converts "/pet-name.jpg" -> "/pet-name-transparent.png"
  // so transparent assets are consistently used in this gallery section.
  if (imagePath.includes("-transparent.")) return imagePath;

  const replaced = imagePath.replace(/\.(png|jpe?g|webp)$/i, "-transparent.png");
  return replaced === imagePath ? imagePath : replaced;
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragState = useRef<{
    startX: number;
    startY: number;
    didDrag: boolean;
    swipeTriggered: boolean;
  } | null>(null);

  // Used to suppress Link navigation only after we detect a real swipe/drag gesture.
  // Cleared on the next Link click.
  const suppressNextClick = useRef(false);

  const count = GALLERY_ITEMS.length;

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % count);
  }, [count]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    suppressNextClick.current = false;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      didDrag: false,
      swipeTriggered: false,
    };
    // Pointer capture can interfere with desktop click behavior on trackpads,
    // so only enable it for touch interactions.
    if (e.pointerType === "touch") {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || dragState.current.swipeTriggered) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    // Avoid interfering with vertical scrolling / trackpad gestures:
    // Only start considering a drag when horizontal movement clearly dominates.
    if (!dragState.current.didDrag) {
      const horizontalDominates = Math.abs(dx) > Math.abs(dy) * 1.2;
      const activationThreshold = e.pointerType === "touch" ? 14 : 18;
      const passedActivation = Math.abs(dx) >= activationThreshold;
      if (!(horizontalDominates && passedActivation)) return;
      dragState.current.didDrag = true;
    }

    // Trigger carousel step only after a meaningful swipe.
    const SWIPE_THRESHOLD = e.pointerType === "touch" ? 58 : 80;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    dragState.current.swipeTriggered = true;
    suppressNextClick.current = true;
    if (dx > 0) goPrev();
    else goNext();
  };

  const onPointerUp = () => {
    dragState.current = null;
  };

  return (
    <section className="overflow-x-clip overflow-y-hidden py-16 md:py-24 bg-linear-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              Most Loved
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Popular Dog Breeds
            </h2>
            <p className="text-muted-foreground mt-3 mb-6 text-pretty">
              Discover our most sought-after breeds that families love. Each
              puppy is health-checked and ready for their forever home.
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl overflow-x-clip">
          {/* <div className="pointer-events-none absolute inset-x-8 top-[18%] h-32 rounded-full bg-primary/20 blur-3xl md:top-[24%] md:h-40" /> */}
          <div
            className="relative perspective-[1650px] select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{ touchAction: "pan-y" }}
            aria-roledescription="carousel"
          >
            <div
              className="relative mx-auto min-h-120 w-full sm:min-h-128 md:min-h-136"
              style={{ transformStyle: "preserve-3d" }}
            >
              {GALLERY_ITEMS.map((item, index) => {
                const offset = circularOffset(index, activeIndex, count);
                if (Math.abs(offset) > MAX_VISIBLE_OFFSET) return null;

                const isCenter = offset === 0;
                const depth = Math.abs(offset);
                const href = `/breeds/${item.typeSlug}/${item.id}`;
                const transparentImage = toTransparentImagePath(item.image);

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "absolute left-1/2 top-1/2 w-[min(66vw,300px)] sm:w-[min(62vw,340px)] md:w-[min(54vw,380px)] origin-center",
                      "transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "motion-reduce:transition-none",
                    )}
                    style={{
                      transform: `
                        translate(-50%, -50%)
                        translateX(calc(${offset} * clamp(58px, 17vw, 170px)))
                        translateY(${isCenter ? "-1%" : depth === 1 ? "2.2%" : "4.2%"})
                        translateZ(${isCenter ? 116 : -depth * 128}px)
                        scale(${isCenter ? 1.03 : depth === 1 ? 0.86 : 0.72})
                        rotateY(${offset * -22}deg)
                      `,
                      opacity: isCenter ? 1 : depth === 1 ? 0.62 : 0.28,
                      zIndex: 20 - depth,
                      filter: isCenter
                        ? "drop-shadow(0 28px 34px rgb(0 0 0 / 0.24))"
                        : depth === 1
                          ? "brightness(0.76) saturate(0.92) blur(0.2px)"
                          : "brightness(0.58) saturate(0.8) blur(0.6px)",
                    }}
                  >
                    <Link
                      href={href}
                      scroll
                      onClick={(e) => {
                        if (suppressNextClick.current) {
                          e.preventDefault();
                          suppressNextClick.current = false;
                          return;
                        }
                      }}
                      className={cn(
                        "block outline-none rounded-2xl",
                        !isCenter && "cursor-pointer",
                      )}
                      aria-current={isCenter ? "true" : undefined}
                    >
                      <article className="group relative">
                        <div
                          className={cn(
                            "overflow-visible rounded-2xl bg-card/95 border shadow-sm transition-[box-shadow,transform] duration-500",
                            isCenter &&
                              "shadow-2xl ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                          )}
                        >
                          <div className="relative aspect-square min-h-[135px] overflow-visible bg-transparent sm:min-h-[155px] md:min-h-[175px]">
                            <Image
                              src={transparentImage}
                              alt={item.name}
                              fill
                              sizes="(min-width: 768px) 140px, 32vw"
                              className="object-contain object-top -translate-y-16 scale-[0.92] opacity-100 transition-transform duration-700 ease-out group-hover:scale-[0.96]"
                              draggable={false}
                              priority={index < 3}
                            />
                          </div>

                          <div className="p-2 sm:p-3 -mt-20 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="capitalize">
                                {item.type}
                              </Badge>
                              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                              <span className="line-clamp-1">
                                {item.temperament.slice(0, 3).join(" · ")}
                              </span>
                            </div>
                            <h3
                              className={cn(
                                "font-serif text-[17px] sm:text-lg font-bold text-foreground transition-colors",
                                isCenter && "group-hover:text-primary",
                              )}
                            >
                              {item.name}
                            </h3>
                            {item.price && (
                              <p className="text-primary font-semibold mt-1">
                                {item.price}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.temperament.slice(3, 6).join(" · ") ||
                                "Loving, loyal, and ready for cuddles."}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-0 sm:px-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="pointer-events-auto h-11 w-11 rounded-full border-border bg-background/95 shadow-md backdrop-blur-sm hover:bg-background cursor-pointer"
              onClick={goPrev}
              aria-label="Previous breed"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="pointer-events-auto h-11 w-11 rounded-full border-border bg-background/95 shadow-md backdrop-blur-sm hover:bg-background cursor-pointer"
              onClick={goNext}
              aria-label="Next breed"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            className="mt-6 flex justify-center gap-2"
            role="tablist"
            aria-label="Carousel slides"
          >
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Show ${item.name}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  i === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/35 hover:bg-muted-foreground/55",
                )}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
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
