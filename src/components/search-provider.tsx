"use client";

import * as React from "react";
import { SearchCommand } from "./search-command";

interface SearchProviderProps {
  children: React.ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
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

  return (
    <>
      {children}
      <SearchCommand open={open} onOpenChange={setOpen} />
    </>
  );
}

// Hook to open search programmatically
export function useSearch() {
  const [open, setOpen] = React.useState(false);

  const openSearch = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeSearch = React.useCallback(() => {
    setOpen(false);
  }, []);

  const toggleSearch = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    openSearch,
    closeSearch,
    toggleSearch,
    setOpen,
  };
}

// Create a context for search control
const SearchContext = React.createContext<{
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
} | null>(null);

export function SearchProviderWithContext({ children }: SearchProviderProps) {
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
    <SearchContext.Provider value={{ openSearch, closeSearch, toggleSearch }}>
      {children}
      <SearchCommand open={open} onOpenChange={setOpen} />
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
}
