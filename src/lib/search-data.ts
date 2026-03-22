import MiniSearch from "minisearch";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "breed" | "blog" | "page";
  tags?: string[];
}

export interface SearchCategory {
  name: string;
  results: SearchResult[];
}

interface SearchDocument extends SearchResult {
  searchText: string;
}

type RankedSearchResult = SearchResult & { score: number };
export type SearchIndex = MiniSearch<SearchDocument>;

const CATEGORY_BOOST: Record<SearchResult["category"], number> = {
  breed: 25,
  page: 10,
  blog: 0,
};

const SEARCH_OPTIONS = {
  prefix: true,
  fuzzy: 0.2,
  boost: {
    title: 8,
    tags: 5,
    description: 2,
    searchText: 1,
  },
};

function stripScore(result: RankedSearchResult): SearchResult {
  return {
    id: result.id,
    title: result.title,
    description: result.description,
    url: result.url,
    category: result.category,
    tags: result.tags,
  };
}

function toSearchDocuments(allContent: SearchResult[]): SearchDocument[] {
  return allContent.map((item) => ({
    ...item,
    searchText: [item.title, item.description, item.tags?.join(" ")]
      .filter(Boolean)
      .join(" "),
  }));
}

export function createSearchIndex(allContent: SearchResult[]): SearchIndex {
  const index = new MiniSearch<SearchDocument>({
    idField: "id",
    fields: ["title", "description", "tags", "searchText"],
    storeFields: ["id", "title", "description", "url", "category", "tags"],
    searchOptions: SEARCH_OPTIONS,
  });

  if (allContent.length > 0) {
    index.addAll(toSearchDocuments(allContent));
  }

  return index;
}

// Perform indexed search across all content with breed-priority ranking
export function searchContent(query: string, index: SearchIndex): SearchCategory[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const rawResults = index.search(query.trim(), SEARCH_OPTIONS) as unknown as Array<
    SearchResult & { score: number }
  >;

  const deduped = new Map<string, RankedSearchResult>();
  for (const result of rawResults) {
    const ranked: RankedSearchResult = {
      id: result.id,
      title: result.title,
      description: result.description,
      url: result.url,
      category: result.category,
      tags: result.tags,
      score: result.score + CATEGORY_BOOST[result.category],
    };

    const existing = deduped.get(ranked.id);
    if (!existing || existing.score < ranked.score) {
      deduped.set(ranked.id, ranked);
    }
  }

  const sortedResults = [...deduped.values()].sort((a, b) => b.score - a.score);

  const breeds = sortedResults
    .filter((item) => item.category === "breed")
    .slice(0, 6)
    .map(stripScore);
  const pages = sortedResults
    .filter((item) => item.category === "page")
    .slice(0, 4)
    .map(stripScore);
  const blogs = sortedResults
    .filter((item) => item.category === "blog")
    .slice(0, 4)
    .map(stripScore);

  const categories: SearchCategory[] = [];
  if (breeds.length > 0) {
    categories.push({ name: "Dog Breeds", results: breeds });
  }
  if (pages.length > 0) {
    categories.push({ name: "Pages", results: pages });
  }
  if (blogs.length > 0) {
    categories.push({ name: "Blog Posts", results: blogs });
  }

  return categories;
}

// Get suggested/popular content (shown when search is empty)
export function getSuggestedContent(
  allContent: SearchResult[],
): SearchCategory[] {
  // Popular breeds
  const popularBreeds = allContent
    .filter((item) => item.category === "breed")
    .filter((item) =>
      [
        "golden-retriever",
        "labrador-retriever",
        "german-shepherd",
        "french-bulldog",
        "beagle",
      ].includes(item.id),
    )
    .slice(0, 5);

  // Recent/featured blogs
  const featuredBlogs = allContent
    .filter((item) => item.category === "blog")
    .slice(0, 3);

  // Main pages
  const mainPages = allContent
    .filter((item) => item.category === "page")
    .filter((item) =>
      ["breeds", "blogs", "services", "about"].includes(item.id),
    )
    .slice(0, 4);

  const categories: SearchCategory[] = [];

  if (popularBreeds.length > 0) {
    categories.push({ name: "Popular Breeds", results: popularBreeds });
  }

  if (mainPages.length > 0) {
    categories.push({ name: "Explore", results: mainPages });
  }

  if (featuredBlogs.length > 0) {
    categories.push({ name: "Featured Articles", results: featuredBlogs });
  }

  return categories;
}
