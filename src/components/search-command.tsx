"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, Layout, Dog } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  searchContent,
  getSuggestedContent,
  type SearchResult,
} from "@/lib/search-data";
import { cn } from "@/lib/utils";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const [searchData, setSearchData] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch search data on mount
  React.useEffect(() => {
    setMounted(true);

    async function fetchSearchData() {
      try {
        const response = await fetch("/api/search");
        if (response.ok) {
          const json = await response.json();
          setSearchData(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch search data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchData();
  }, []);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const searchResults = React.useMemo(() => {
    if (loading || searchData.length === 0) {
      return [];
    }

    if (!query || query.trim().length === 0) {
      return getSuggestedContent(searchData);
    }
    return searchContent(query, searchData);
  }, [query, searchData, loading]);

  const handleSelect = React.useCallback(
    (url: string) => {
      onOpenChange(false);
      router.push(url);
    },
    [onOpenChange, router]
  );

  const getCategoryIcon = (category: "breed" | "blog" | "page") => {
    switch (category) {
      case "breed":
        return <Dog className="h-4 w-4 text-muted-foreground" />;
      case "blog":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "page":
        return <Layout className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden p-0 shadow-2xl max-w-3xl w-[calc(100%-2rem)] sm:w-full top-[15%] sm:top-[50%] translate-y-0 sm:-translate-y-1/2"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <Command className="w-full min-w-[360px] max-w-3xl **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 **:[[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search for breeds, blogs, or pages..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-medium opacity-100 sm:flex">
              <span>esc</span>
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            {loading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            ) : (
              <>
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </Command.Empty>

                {searchResults.map((category, idx) => (
                  <Command.Group
                    key={idx}
                    heading={category.name}
                    className="**:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:text-foreground"
                  >
                    {category.results.map((result) => (
                      <Command.Item
                        key={result.id}
                        value={`${result.title} ${result.description}`}
                        onSelect={() => handleSelect(result.url)}
                        className={cn(
                          "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none",
                          "aria-selected:bg-muted aria-selected:text-foreground",
                          "data-disabled:pointer-events-none data-disabled:opacity-50",
                          "hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {getCategoryIcon(result.category)}
                          <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {result.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {result.description}
                            </div>
                          </div>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </>
            )}
          </Command.List>

          <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>
                Navigate with{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-medium opacity-100">
                  ↑↓
                </kbd>
              </span>
              <span>
                Select with{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-medium opacity-100">
                  ↵
                </kbd>
              </span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
