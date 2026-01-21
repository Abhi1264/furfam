import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { breeds } from "@/lib/breeds-data";
import { Sparkles } from "lucide-react";
import { BreedsGridClient } from "@/components/breeds/breeds-grid-client";

export default function BreedsPage() {
  const uniqueSizes = Array.from(new Set(breeds.map((b) => b.size))).sort();
  const uniqueTemperaments = Array.from(
    new Set(breeds.flatMap((b) => b.temperament)),
  ).sort();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-secondary via-secondary/50 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                Complete Collection
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2">
                Explore All Dog Breeds
              </h1>
              <p className="text-muted-foreground mt-3 text-lg">
                Discover the perfect companion from our complete collection of{" "}
                {breeds.length} dog breeds. Use filters to find breeds that
                match your lifestyle and preferences.
              </p>
            </div>
          </div>
        </section>

        <BreedsGridClient
          breeds={breeds}
          uniqueSizes={uniqueSizes}
          uniqueTemperaments={uniqueTemperaments}
        />
      </main>
      <Footer />
    </div>
  );
}
