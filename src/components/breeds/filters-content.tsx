"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { breeds, breedTypes } from "@/lib/breeds-data";

const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface FiltersContentProps {
  selectedTypes: string[];
  selectedSizes: string[];
  selectedLetters: string[];
  selectedTemperaments: string[];
  selectedCoatTypes: string[];
  selectedClimates: string[];
  showHypoallergenic: boolean;
  minPrice: string;
  maxPrice: string;
  activeFiltersCount: number;
  uniqueSizes: string[];
  uniqueTemperaments: string[];
  uniqueCoatTypes: string[];
  uniqueRunClimate: string[];
  toggleType: (slug: string) => void;
  toggleSize: (size: string) => void;
  toggleLetter: (letter: string) => void;
  toggleTemperament: (temperament: string) => void;
  toggleCoatType: (coat: string) => void;
  toggleClimate: (climate: string) => void;
  setShowHypoallergenic: (show: boolean) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  clearFilters: () => void;
}

export function FiltersContent({
  selectedTypes,
  selectedSizes,
  selectedLetters,
  selectedTemperaments,
  selectedCoatTypes,
  selectedClimates,
  showHypoallergenic,
  minPrice,
  maxPrice,
  activeFiltersCount,
  uniqueSizes,
  uniqueTemperaments,
  uniqueCoatTypes,
  uniqueRunClimate,
  toggleType,
  toggleSize,
  toggleLetter,
  toggleTemperament,
  toggleCoatType,
  toggleClimate,
  setShowHypoallergenic,
  setMinPrice,
  setMaxPrice,
  clearFilters,
}: FiltersContentProps) {
  return (
    <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-foreground">
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-sm text-primary hover:text-primary/80"
          >
            Clear All
          </Button>
        )}
      </div>

      <Separator />

      {/* Hypoallergenic Toggle */}
      <div className="flex items-center justify-between space-x-2">
        <Label
          htmlFor="hypoallergenic-mode"
          className="font-semibold text-foreground"
        >
          Hypoallergenic Only
        </Label>
        <Switch
          id="hypoallergenic-mode"
          checked={showHypoallergenic}
          onCheckedChange={setShowHypoallergenic}
        />
      </div>

      <Separator />

      <Accordion
        type="multiple"
        defaultValue={["breed-type", "size", "price"]}
        className="w-full"
      >
        {/* Breed Type Filter */}
        <AccordionItem value="breed-type">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Breed Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {breedTypes.map((type) => (
                <label
                  key={type.slug}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.slug)}
                    onChange={() => toggleType(type.slug)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-muted-foreground">{type.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    ({breeds.filter((b) => b.typeSlug === type.slug).length})
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {uniqueSizes.map((size) => (
                <label
                  key={size}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-muted-foreground">{size}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    ({breeds.filter((b) => b.sizeCategory === size).length})
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Alphabet Filter */}
        <AccordionItem value="alphabet">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Name Starts With
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-6 gap-2 pt-1">
              {alphabetLetters.map((letter) => {
                const breedCount = breeds.filter(
                  (breed) =>
                    breed.name.trim().charAt(0).toUpperCase() === letter,
                ).length;

                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={breedCount === 0}
                    onClick={() => toggleLetter(letter)}
                    className={`flex h-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                      selectedLetters.includes(letter)
                        ? "border-primary bg-primary text-primary-foreground"
                        : breedCount === 0
                          ? "cursor-not-allowed border-border bg-muted text-muted-foreground/60"
                          : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Coat Type Filter */}
        <AccordionItem value="coat-type">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Coat Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {uniqueCoatTypes.map((coat) => (
                <label
                  key={coat}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedCoatTypes.includes(coat)}
                    onChange={() => toggleCoatType(coat)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-muted-foreground">{coat}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    ({breeds.filter((b) => b.coatType === coat).length})
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Climate Suitability Filter */}
        <AccordionItem value="climate">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Climate Suitability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {uniqueRunClimate.map((climate) => (
                <label
                  key={climate}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedClimates.includes(climate)}
                    onChange={() => toggleClimate(climate)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-muted-foreground">{climate}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    (
                    {
                      breeds.filter((b) =>
                        b.climateSuitability.includes(
                          climate as "Hot" | "Cold" | "Moderate" | "Adaptable",
                        ),
                      ).length
                    }
                    )
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Price Range (₹)
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Range: ₹5,000 - ₹100,000+
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Temperament Filter */}
        <AccordionItem value="temperament">
          <AccordionTrigger className="text-foreground hover:no-underline font-semibold">
            Temperament
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 space-y-2 overflow-y-auto pt-1">
              {uniqueTemperaments.map((temperament) => (
                <label
                  key={temperament}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedTemperaments.includes(temperament)}
                    onChange={() => toggleTemperament(temperament)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-muted-foreground">{temperament}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
