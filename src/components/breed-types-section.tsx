import { ClassificationBrowser } from "@/components/classification-browser";
import {
  breeds,
  breedTypes,
  sizeClassifications,
  climateClassifications,
  coatClassifications,
  getBreedsCount,
} from "@/lib/breeds-data";

export function BreedTypesSection() {
  // Prepare data with counts on the server
  const groups = breedTypes.map((item) => ({
    ...item,
    dimension: "group" as const,
    breedCount: item.breedCount || getBreedsCount(breeds, "group", item.slug),
  }));

  const sizes = sizeClassifications.map((item) => ({
    ...item,
    breedCount: getBreedsCount(breeds, "size", item.slug),
  }));

  const climates = climateClassifications.map((item) => ({
    ...item,
    breedCount: getBreedsCount(breeds, "climate", item.slug),
  }));

  const coats = coatClassifications.map((item) => ({
    ...item,
    breedCount: getBreedsCount(breeds, "coat", item.slug),
  }));

  return (
    <section id="breeds" className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Explore Our Dog Breeds
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From playful toy breeds to loyal working dogs, find the perfect
            companion that matches your lifestyle and family using our new
            classification system.
          </p>
        </div>

        <ClassificationBrowser
          groups={groups}
          sizes={sizes}
          climates={climates}
          coats={coats}
        />
      </div>
    </section>
  );
}
