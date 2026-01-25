"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type Breed } from "@/lib/breeds-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersContent } from "./filters-content";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

interface BreedsGridClientProps {
  breeds: Breed[];
  uniqueSizes: string[];
  uniqueTemperaments: string[];
  uniqueCoatTypes: string[];
  uniqueRunClimate: string[];
}

export function BreedsGridClient({
  breeds,
  uniqueSizes,
  uniqueTemperaments,
  uniqueCoatTypes,
  uniqueRunClimate,
}: BreedsGridClientProps) {
  const searchParams = useSearchParams();

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.get("size") ? [searchParams.get("size")!] : [],
  );
  const [selectedTemperaments, setSelectedTemperaments] = useState<string[]>(
    [],
  );
  const [selectedCoatTypes, setSelectedCoatTypes] = useState<string[]>(
    searchParams.get("coat") ? [searchParams.get("coat")!] : [],
  );
  const [selectedClimates, setSelectedClimates] = useState<string[]>(
    searchParams.get("climate") ? [searchParams.get("climate")!] : [],
  );
  const [showHypoallergenic, setShowHypoallergenic] = useState(false);

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [showFilters, setShowFilters] = useState(false);

  // Sync with URL params if they change
  useEffect(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam) setSelectedSizes([sizeParam]);

    const coatParam = searchParams.get("coat");
    if (coatParam) setSelectedCoatTypes([coatParam]);

    const climateParam = searchParams.get("climate");
    if (climateParam) setSelectedClimates([climateParam]);
  }, [searchParams]);

  // Helper function to extract numeric price from price string
  const extractPrice = (priceStr: string): number => {
    const match = priceStr.match(/[\d,]+/);
    if (match) {
      return parseInt(match[0].replace(/,/g, ""));
    }
    return 0;
  };

  // Filter and sort breeds
  const filteredBreeds = useMemo(() => {
    let filtered = breeds;

    // Apply type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((breed) =>
        selectedTypes.includes(breed.typeSlug),
      );
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((breed) =>
        selectedSizes.includes(breed.sizeCategory),
      ); // Updated to sizeCategory
    }

    // Apply coat filter
    if (selectedCoatTypes.length > 0) {
      filtered = filtered.filter((breed) =>
        selectedCoatTypes.includes(breed.coatType),
      );
    }

    // Apply climate filter
    if (selectedClimates.length > 0) {
      filtered = filtered.filter((breed) =>
        breed.climateSuitability.some((c) => selectedClimates.includes(c)),
      );
    }

    // Apply hypoallergenic filter
    if (showHypoallergenic) {
      filtered = filtered.filter((breed) => breed.hypoallergenic);
    }

    // Apply temperament filter
    if (selectedTemperaments.length > 0) {
      filtered = filtered.filter((breed) =>
        breed.temperament.some((t) => selectedTemperaments.includes(t)),
      );
    }

    // Apply price filter
    if (minPrice || maxPrice) {
      filtered = filtered.filter((breed) => {
        const breedPrice = extractPrice(breed.price);
        const min = minPrice ? parseInt(minPrice) : 0;
        const max = maxPrice ? parseInt(maxPrice) : Infinity;
        return breedPrice >= min && breedPrice <= max;
      });
    }

    // Sort breeds
    const sorted = [...filtered];
    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => {
          const priceA = extractPrice(a.price);
          const priceB = extractPrice(b.price);
          return priceA - priceB;
        });
        break;
      case "price-desc":
        sorted.sort((a, b) => {
          const priceA = extractPrice(a.price);
          const priceB = extractPrice(b.price);
          return priceB - priceA;
        });
        break;
    }

    return sorted;
  }, [
    selectedTypes,
    selectedSizes,
    selectedTemperaments,
    selectedCoatTypes,
    selectedClimates,
    showHypoallergenic,
    minPrice,
    maxPrice,
    sortBy,
    breeds,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedTemperaments([]);
    setSelectedCoatTypes([]);
    setSelectedClimates([]);
    setShowHypoallergenic(false);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("name-asc");
  };

  const activeFiltersCount =
    selectedTypes.length +
    selectedSizes.length +
    selectedTemperaments.length +
    selectedCoatTypes.length +
    selectedClimates.length +
    (showHypoallergenic ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  // Toggle filter functions
  const toggleType = (typeSlug: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeSlug)
        ? prev.filter((t) => t !== typeSlug)
        : [...prev, typeSlug],
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleCoatType = (coat: string) => {
    setSelectedCoatTypes((prev) =>
      prev.includes(coat) ? prev.filter((c) => c !== coat) : [...prev, coat],
    );
  };

  const toggleClimate = (climate: string) => {
    setSelectedClimates((prev) =>
      prev.includes(climate)
        ? prev.filter((c) => c !== climate)
        : [...prev, climate],
    );
  };

  const toggleTemperament = (temperament: string) => {
    setSelectedTemperaments((prev) =>
      prev.includes(temperament)
        ? prev.filter((t) => t !== temperament)
        : [...prev, temperament],
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="sticky top-20 z-40 bg-background border-b border-border lg:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredBreeds.length}{" "}
            {filteredBreeds.length === 1 ? "breed" : "breeds"} found
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="border-t border-border bg-background p-4 max-h-[60vh] overflow-y-auto">
            <FiltersContent
              selectedTypes={selectedTypes}
              selectedSizes={selectedSizes}
              selectedTemperaments={selectedTemperaments}
              selectedCoatTypes={selectedCoatTypes}
              selectedClimates={selectedClimates}
              showHypoallergenic={showHypoallergenic}
              minPrice={minPrice}
              maxPrice={maxPrice}
              activeFiltersCount={activeFiltersCount}
              uniqueSizes={uniqueSizes}
              uniqueTemperaments={uniqueTemperaments}
              uniqueCoatTypes={uniqueCoatTypes}
              uniqueRunClimate={uniqueRunClimate}
              toggleType={toggleType}
              toggleSize={toggleSize}
              toggleTemperament={toggleTemperament}
              toggleCoatType={toggleCoatType}
              toggleClimate={toggleClimate}
              setShowHypoallergenic={setShowHypoallergenic}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <FiltersContent
                  selectedTypes={selectedTypes}
                  selectedSizes={selectedSizes}
                  selectedTemperaments={selectedTemperaments}
                  selectedCoatTypes={selectedCoatTypes}
                  selectedClimates={selectedClimates}
                  showHypoallergenic={showHypoallergenic}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  activeFiltersCount={activeFiltersCount}
                  uniqueSizes={uniqueSizes}
                  uniqueTemperaments={uniqueTemperaments}
                  uniqueCoatTypes={uniqueCoatTypes}
                  uniqueRunClimate={uniqueRunClimate}
                  toggleType={toggleType}
                  toggleSize={toggleSize}
                  toggleTemperament={toggleTemperament}
                  toggleCoatType={toggleCoatType}
                  toggleClimate={toggleClimate}
                  setShowHypoallergenic={setShowHypoallergenic}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  clearFilters={clearFilters}
                />
              </div>
            </aside>

            {/* Breeds Grid */}
            <div className="flex-1">
              {/* Sort and Count */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-muted-foreground hidden lg:block">
                  Showing {filteredBreeds.length} of {breeds.length} breeds
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Sort by:
                  </label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="price-asc">
                        Price (Low to High)
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price (High to Low)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Breeds Grid */}
              {filteredBreeds.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredBreeds.map((breed) => (
                    <Link
                      key={breed.id}
                      href={`/breeds/${breed.typeSlug}/${breed.id}`}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="relative h-56 overflow-hidden bg-secondary/40">
                        <Image
                          src={breed.image}
                          alt={breed.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                          {breed.size}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="capitalize text-xs"
                          >
                            {breed.type}
                          </Badge>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                          {breed.name}
                        </h3>

                        <div className="flex flex-wrap gap-1.5">
                          {breed.temperament.slice(0, 3).map((trait, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-primary font-semibold">
                            {breed.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {breed.lifespan}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-secondary p-12 text-center">
                  <p className="text-muted-foreground mb-2">
                    No breeds match your current filters.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
