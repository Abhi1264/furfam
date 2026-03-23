import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CharacteristicBar } from "@/components/characteristic-bar";
import { breeds, getBreedById, getBreedTypeBySlug } from "@/lib/breeds-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSiteUrl } from "@/lib/site-url";
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
  ShieldCheck,
  Truck,
  HeartHandshake,
  PawPrint,
  Gift,
  CalendarRange,
  Thermometer,
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

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/breeds/${breed.typeSlug}/${breed.id}`;
  const climateHint =
    breed.climateSuitability?.length > 0
      ? ` Climate fit: ${breed.climateSuitability.join(", ")}.`
      : "";
  const rawDescription = `${breed.name} (${breed.type}) — ${breed.description.slice(0, 120)}... Size ${breed.sizeCategory}, ${breed.coatType} coat.${climateHint} Trusted breed guide for dog owners in India.`;

  return {
    title: `${breed.name} Dog Breed in India | ${breed.type} | FurFam`,
    description: rawDescription.slice(0, 160),
    keywords: `${breed.name}, ${breed.name} India, ${breed.type} dog India, ${breed.sizeCategory} dog, ${breed.coatType} coat, ${breed.temperament.slice(0, 3).join(", ")}, FurFam`,
    alternates: { canonical },
    openGraph: {
      title: `${breed.name} | FurFam India`,
      description: rawDescription.slice(0, 160),
      url: canonical,
      locale: "en_IN",
      type: "website",
      images: breed.image
        ? [
            {
              url: breed.image.startsWith("/")
                ? breed.image
                : `/${breed.image}`,
            },
          ]
        : [],
    },
  };
}

export default async function BreedDetailPage({ params }: Props) {
  const { type, breed: breedId } = await params;
  const breed = getBreedById(breedId);
  const breedType = getBreedTypeBySlug(type);
  const priceDisclaimer =
    "Price may vary based on size, coat, color, bloodline, availability, and location.";

  if (!breed || !breedType) {
    notFound();
  }

  // Calculate similar breeds based on multi-dimensional matching
  const similarBreeds = breeds
    .filter((b) => b.id !== breedId)
    .map((b) => {
      let score = 0;
      // Weight: Type (highest affinity)
      if (b.typeSlug === breed.typeSlug) score += 3;
      // Weight: Size Category
      if (b.sizeCategory === breed.sizeCategory) score += 2;
      // Weight: Temperament overlap
      const sharedTraits = b.temperament.filter((t) =>
        breed.temperament.includes(t),
      ).length;
      score += sharedTraits;
      // Weight: Coat Type
      if (b.coatType === breed.coatType) score += 1;
      // Weight: Climate
      if (
        b.climateSuitability.some((c) => breed.climateSuitability.includes(c))
      )
        score += 1;

      return { breed: b, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.breed);

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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                  draggable={false}
                />
              </div>

              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-primary border-primary/30"
                    >
                      {breed.type}
                    </Badge>
                    <Badge variant="secondary">{breed.sizeCategory} Size</Badge>
                    <Badge variant="secondary">{breed.coatType} Coat</Badge>
                    {breed.hypoallergenic && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-200 border-transparent"
                      >
                        Hypoallergenic
                      </Badge>
                    )}
                  </div>
                  <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
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

                {/* Highlights */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Climate Fit
                      </p>
                      <p className="font-semibold text-card-foreground">
                        {breed.climateSuitability.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <HeartHandshake className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Family Friendly
                      </p>
                      <p className="font-semibold text-card-foreground">
                        Great with kids &amp; other pets
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Delivery Options
                      </p>
                      <p className="font-semibold text-card-foreground">
                        Home drop-off or kennel pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                    <PawPrint className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Starter Kit Included
                      </p>
                      <p className="font-semibold text-card-foreground">
                        Toys, starter food &amp; crate guide
                      </p>
                    </div>
                  </div>
                </div>

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
                    <p className="mt-2 text-xs text-muted-foreground">
                      {priceDisclaimer}
                    </p>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="/contact">Inquire Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Purchase Experience */}
        <section className="border-t border-border bg-background py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-2xl bg-card p-6 shadow-sm lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarRange className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    Adoption & Delivery Experience
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/70 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Reserve
                    </p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      Secure with 20% deposit
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Lock your puppy while we prep health checks and starter
                      pack.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Prepare
                    </p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      Vet-cleared, microchipped
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Vaccination booklet, deworming records, temperament notes
                      tailored to {breed.name}.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Meet &amp; Deliver
                    </p>
                    <p className="mt-1 font-semibold text-card-foreground">
                      Pickup or assisted delivery
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Schedule a video meet, then choose home delivery or kennel
                      handoff.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl bg-primary/5 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="text-2xl font-bold text-foreground">
                      {breed.price}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {priceDisclaimer}
                    </p>
                  </div>
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
                    <span>
                      Health guarantee &amp; vaccination booklet included.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="mt-1 h-4 w-4 text-primary" />
                    <span>
                      Doorstep delivery in major cities; climate-controlled
                      transit.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HeartHandshake className="mt-1 h-4 w-4 text-primary" />
                    <span>
                      Post-adoption support and training check-ins for 30 days.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/contact">Book a call</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/contact">Reserve now</Link>
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

        {/* Included with every puppy */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Included with every {breed.name}
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Health &amp; Safety
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Full vaccination &amp; deworming records</li>
                  <li>Microchip registration assistance</li>
                  <li>Vet health certificate</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Starter Essentials
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Premium starter food for 7 days</li>
                  <li>Crate &amp; potty training guide</li>
                  <li>Comfort toy with litter scent</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Support &amp; Training
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>30-day new-family support line</li>
                  <li>Virtual training starter session</li>
                  <li>Socialization checklist</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle fit */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Is the {breed.name} right for you?
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h3 className="mb-3 font-semibold text-card-foreground">
                  Best for
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Active families seeking a loyal companion</li>
                  <li>
                    Homes that can provide{" "}
                    {breed.careInfo.exercise.toLowerCase()}
                  </li>
                  <li>Owners who enjoy training and engagement</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h3 className="mb-3 font-semibold text-card-foreground">
                  Keep in mind
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Regular grooming: {breed.careInfo.grooming}</li>
                  <li>Consistent nutrition: {breed.careInfo.nutrition}</li>
                  <li>Training focus: {breed.careInfo.training}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Breeds */}
        {similarBreeds.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  Similar Breeds You Might Like
                </h2>
                <Button variant="outline" asChild>
                  <Link href={`/breeds/${type}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to {breedType.name}
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similarBreeds.map((relatedBreed) => (
                  <Link
                    key={relatedBreed.id}
                    href={`/breeds/${relatedBreed.typeSlug}/${relatedBreed.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedBreed.image}
                        alt={relatedBreed.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex flex-wrap gap-1">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-5"
                        >
                          {relatedBreed.sizeCategory}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-5"
                        >
                          {relatedBreed.type}
                        </Badge>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-card-foreground group-hover:text-primary">
                        {relatedBreed.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {relatedBreed.description}
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
