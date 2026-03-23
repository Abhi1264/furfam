"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, Dog, FileText, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createSearchIndex,
  getSuggestedContent,
  searchContent,
} from "@/lib/search-data";
import { useSearchData } from "@/components/search-provider";

export function HeroSearchButton() {
  const router = useRouter();
  const searchData = useSearchData();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const searchIndex = React.useMemo(
    () => createSearchIndex(searchData),
    [searchData],
  );

  const results = React.useMemo(() => {
    if (searchData.length === 0) {
      return [];
    }

    if (query.trim().length === 0) {
      return getSuggestedContent(searchData);
    }

    return searchContent(query, searchIndex);
  }, [query, searchData, searchIndex]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedPanel = panelRef.current?.contains(target);
      const clickedButton = buttonRef.current?.contains(target);
      if (!clickedPanel && !clickedButton) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen]);

  const handleSelect = React.useCallback(
    (url: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(url);
    },
    [router],
  );

  const getCategoryIcon = (category: "breed" | "blog" | "page") => {
    switch (category) {
      case "breed":
        return <Dog className="h-4 w-4 text-primary" />;
      case "blog":
        return <FileText className="h-4 w-4 text-primary" />;
      case "page":
        return <Layout className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <>
      <Button
        ref={buttonRef}
        size="lg"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="hero-search-panel"
      >
        <Search className="h-4 w-4" />
        Search Popular Breeds
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" />
          <div
            ref={panelRef}
            id="hero-search-panel"
            className="fixed left-1/2 top-24 z-50 w-[min(46rem,calc(100%-2rem))] -translate-x-1/2 rounded-xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search breeds, pages, and blogs..."
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-[58vh] overflow-y-auto p-3">
              {results.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </p>
              ) : (
                <div className="space-y-3">
                  {results.map((group) => (
                    <div key={group.name}>
                      <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {group.name}
                      </p>
                      <div className="space-y-1">
                        {group.results.map((result) => (
                          <button
                            key={result.id}
                            type="button"
                            onClick={() => handleSelect(result.url)}
                            className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                          >
                            {getCategoryIcon(result.category)}
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-foreground">
                                {result.title}
                              </span>
                              <span className="block truncate text-xs text-muted-foreground">
                                {result.description}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
