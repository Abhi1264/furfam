import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CharacteristicBar } from "@/components/characteristic-bar";
import {
  breeds,
  getBreedById,
  getBreedTypeBySlug,
  getBreedsByType,
} from "@/lib/breeds-data";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  Ruler,
  Weight,
  MapPin,
  Sparkles,
  Dumbbell,
  Scissors,
  Apple,
  GraduationCap,
} from "lucide-react";

interface Props {
  params: Promise<{ type: string; breed: string }>;
}

export async function generateStaticParams() {
  return breeds.map((breed) => ({
    type: breed.typeSlug,
    breed: breed.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { breed: breedId } = await params;
  const breed = getBreedById(breedId);

  if (!breed) {
    return {
      title: "Breed Not Found | FurFam",
    };
  }

  return {
    title: `${breed.name} | ${breed.type} | FurFam Pet Shop`,
    description: `Learn about ${breed.name}: ${breed.description.slice(
      0,
      150,
    )}...`,
    keywords: `${breed.name}, ${
      breed.type
    }, dog breed, puppy, ${breed.temperament.join(", ")}, pet shop`,
  };
}

export default async function BreedDetailPage({ params }: Props) {
  const { type, breed: breedId } = await params;
  const breed = getBreedById(breedId);
  const breedType = getBreedTypeBySlug(type);

  if (!breed || !breedType) {
    notFound();
  }

  const relatedBreeds = getBreedsByType(type)
    .filter((b) => b.id !== breedId)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="bg-secondary pb-12 pt-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href={`/breeds/${type}`} className="hover:text-primary">
                {breedType.name}
              </Link>
              <span>/</span>
              <span className="text-foreground">{breed.name}</span>
            </nav>

            <div className="grid items-start gap-8 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={breed.image}
                  alt={breed.name}
                  fill
                  className="object-cover"
                  priority
                  draggable={false}
                />
              </div>

              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {breed.type}
                  </span>
                  <h1 className="mt-3 font-serif text-4xl font-bold text-foreground md:text-5xl">
                    {breed.name}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-2">
                  {breed.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {breed.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Lifespan
                      </div>
                      <div className="font-semibold text-card-foreground">
                        {breed.lifespan}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <Ruler className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Height
                      </div>
                      <div className="font-semibold text-card-foreground">
                        {breed.height}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <Weight className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Weight
                      </div>
                      <div className="font-semibold text-card-foreground">
                        {breed.weight}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Origin
                      </div>
                      <div className="font-semibold text-card-foreground">
                        {breed.origin}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col gap-4 rounded-xl bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Price Range
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {breed.price}
                    </div>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Characteristics */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Breed Characteristics
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-5 rounded-2xl bg-card p-6 shadow-sm">
                <CharacteristicBar
                  label="Friendliness"
                  value={breed.characteristics.friendliness}
                />
                <CharacteristicBar
                  label="Energy Level"
                  value={breed.characteristics.energyLevel}
                />
                <CharacteristicBar
                  label="Trainability"
                  value={breed.characteristics.trainability}
                />
                <CharacteristicBar
                  label="Grooming Needs"
                  value={breed.characteristics.groomingNeeds}
                />
                <CharacteristicBar
                  label="Health Issues"
                  value={breed.characteristics.healthIssues}
                />
              </div>

              <div className="rounded-2xl bg-primary/5 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Fun Facts</h3>
                </div>
                <ul className="space-y-3">
                  {breed.funFacts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Care Information */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Care Guide
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Exercise
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {breed.careInfo.exercise}
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Grooming
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {breed.careInfo.grooming}
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Apple className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Nutrition
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {breed.careInfo.nutrition}
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Training
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {breed.careInfo.training}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Breeds */}
        {relatedBreeds.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  Other {breedType.name}
                </h2>
                <Button variant="outline" asChild>
                  <Link href={`/breeds/${type}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBreeds.map((relatedBreed) => (
                  <Link
                    key={relatedBreed.id}
                    href={`/breeds/${type}/${relatedBreed.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedBreed.image}
                        alt={relatedBreed.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-bold text-card-foreground group-hover:text-primary">
                        {relatedBreed.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedBreed.lifespan}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
