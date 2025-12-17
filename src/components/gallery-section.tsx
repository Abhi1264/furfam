"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { breeds } from "@/lib/breeds-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

export function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery items from API, fallback to BASE_GALLERY if empty
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          const galleryItems = data.items || [];

          // Use uploaded items if available, otherwise use fallback
          if (galleryItems.length > 0) {
            setItems(galleryItems);
          } else {
            setItems(BASE_GALLERY);
          }
        } else {
          // If API fails, use fallback
          setItems(BASE_GALLERY);
        }
      } catch {
        // On error, use fallback
        setItems(BASE_GALLERY);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-linear-to-b from-background via-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-muted-foreground">Loading gallery...</div>
          </div>
        </div>
      </section>
    );
  }

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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.id}-${index}`}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <article className="group relative">
                  <div className="overflow-hidden rounded-2xl bg-card border shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden bg-secondary/40">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-2 bg-background/90 shadow-sm hover:shadow-md cursor-pointer" />
          <CarouselNext className="-right-4 lg:-right-2 bg-background/90 shadow-sm hover:shadow-md cursor-pointer" />
        </Carousel>

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
