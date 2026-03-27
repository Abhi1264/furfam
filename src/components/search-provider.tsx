"use client";

import * as React from "react";
import { SearchCommand } from "./search-command";
import type { SearchResult } from "@/lib/search-data";

const SearchContext = React.createContext<{
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
} | null>(null);

const SearchDataContext = React.createContext<SearchResult[] | null>(null);

export function SearchProviderWithContext({
  children,
  searchData,
}: {
  children: React.ReactNode;
  searchData: SearchResult[];
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openSearch = React.useCallback(() => setOpen(true), []);
  const closeSearch = React.useCallback(() => setOpen(false), []);
  const toggleSearch = React.useCallback(() => setOpen((prev) => !prev), []);

  return (
    <SearchDataContext.Provider value={searchData}>
      <SearchContext.Provider value={{ openSearch, closeSearch, toggleSearch }}>
        {children}
        <SearchCommand
          open={open}
          onOpenChange={setOpen}
          searchData={searchData}
        />
      </SearchContext.Provider>
    </SearchDataContext.Provider>
  );
}

export function useSearchContext() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within SearchProviderWithContext",
    );
  }
  return context;
}

export function useSearchData(): SearchResult[] {
  const data = React.useContext(SearchDataContext);
  if (data === null) {
    throw new Error(
      "useSearchData must be used within SearchProviderWithContext",
    );
  }
  return data;
}
