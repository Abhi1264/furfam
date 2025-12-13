import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breedTypes } from "@/lib/breeds-data";

export function BreedTypesSection() {
  return (
    <section id="breeds" className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Explore Our Dog Breeds
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From playful toy breeds to loyal working dogs, find the perfect
            companion that matches your lifestyle and family.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {breedTypes.map((type) => (
            <Link
              key={type.id}
              href={`/breeds/${type.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={type.image || "/placeholder.svg"}
                  alt={type.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-background">
                      {type.name}
                    </h3>
                    <p className="text-sm text-background/80">
                      {type.breedCount} breeds available
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
