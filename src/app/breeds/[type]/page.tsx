import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  breedTypes,
  getBreedsByType,
  getBreedTypeBySlug,
} from "@/lib/breeds-data";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return breedTypes.map((type) => ({
    type: type.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const breedType = getBreedTypeBySlug(type);

  if (!breedType) {
    return {
      title: "Breed Type Not Found | FurFam",
    };
  }

  return {
    title: `${breedType.name} | FurFam Pet Shop`,
    description: `Explore our ${breedType.name.toLowerCase()} collection. ${breedType.description}`,
    keywords: `${breedType.name}, dog breeds, puppies, pet shop, ${breedType.name.toLowerCase()} for sale`,
  };
}

export default async function BreedTypePage({ params }: Props) {
  const { type } = await params;
  const breedType = getBreedTypeBySlug(type);

  if (!breedType) {
    notFound();
  }

  const breeds = getBreedsByType(type);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <Link
              href="/#breeds"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Breeds
            </Link>
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  {breeds.length} Breeds Available
                </span>
                <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
                  {breedType.name}
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
                  {breedType.description}
                </p>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-xl lg:h-80 lg:w-80">
                  <Image
                    src={breedType.image || "/placeholder.svg"}
                    alt={breedType.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breeds Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Available {breedType.name}
            </h2>

            {breeds.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {breeds.map((breed) => (
                  <Link
                    key={breed.id}
                    href={`/breeds/${type}/${breed.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={breed.image || "/placeholder.svg"}
                        alt={breed.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                        {breed.size}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 font-serif text-xl font-bold text-card-foreground group-hover:text-primary">
                        {breed.name}
                      </h3>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {breed.temperament.slice(0, 3).map((trait, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {breed.lifespan}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-primary">
                          View Details <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-secondary p-12 text-center">
                <p className="text-muted-foreground">
                  No breeds available in this category at the moment. Please
                  check back soon!
                </p>
                <Button asChild className="mt-4">
                  <Link href="/#breeds">Explore Other Breeds</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Explore Other Categories
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {breedTypes
                .filter((t) => t.slug !== type)
                .map((t) => (
                  <Link
                    key={t.id}
                    href={`/breeds/${t.slug}`}
                    className="flex items-center gap-3 rounded-xl bg-card p-4 transition-all hover:shadow-md"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={t.image || "/placeholder.svg"}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.breedCount} breeds
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
