"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { breeds, breedTypes } from "@/lib/breeds-data";

interface FiltersContentProps {
  selectedTypes: string[];
  selectedSizes: string[];
  selectedTemperaments: string[];
  minPrice: string;
  maxPrice: string;
  activeFiltersCount: number;
  uniqueSizes: string[];
  uniqueTemperaments: string[];
  toggleType: (slug: string) => void;
  toggleSize: (size: string) => void;
  toggleTemperament: (temperament: string) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  clearFilters: () => void;
}

export function FiltersContent({
  selectedTypes,
  selectedSizes,
  selectedTemperaments,
  minPrice,
  maxPrice,
  activeFiltersCount,
  uniqueSizes,
  uniqueTemperaments,
  toggleType,
  toggleSize,
  toggleTemperament,
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

      {/* Breed Type Filter */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Breed Type</h4>
        <div className="space-y-2">
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
      </div>

      <Separator />

      {/* Size Filter */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Size</h4>
        <div className="space-y-2">
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
                ({breeds.filter((b) => b.size === size).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Filter */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Price Range (₹)</h4>
        <div className="space-y-3">
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
            Range: ₹5,000 - ₹50,000
          </p>
        </div>
      </div>

      <Separator />

      {/* Temperament Filter */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Temperament</h4>
        <div className="max-h-48 space-y-2 overflow-y-auto">
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
      </div>
    </div>
  );
}
