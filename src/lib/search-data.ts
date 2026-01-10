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

// Perform search across content
export function searchContent(
  query: string,
  allContent: SearchResult[]
): SearchCategory[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchQuery = query.toLowerCase().trim();

  // Filter and score results
  const scoredResults = allContent
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const tagsLower = item.tags?.map((t) => t.toLowerCase()).join(" ") || "";

      // Exact title match - highest priority
      if (titleLower === searchQuery) {
        score += 100;
      }
      // Title starts with query
      else if (titleLower.startsWith(searchQuery)) {
        score += 50;
      }
      // Title includes query
      else if (titleLower.includes(searchQuery)) {
        score += 30;
      }

      // Description includes query
      if (descLower.includes(searchQuery)) {
        score += 20;
      }

      // Tags include query
      if (tagsLower.includes(searchQuery)) {
        score += 15;
      }

      // Check for word boundaries
      const words = searchQuery.split(" ");
      words.forEach((word) => {
        if (word.length > 2) {
          if (titleLower.includes(word)) score += 10;
          if (descLower.includes(word)) score += 5;
          if (tagsLower.includes(word)) score += 5;
        }
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // Group by category
  const breeds = scoredResults
    .filter((r) => r.category === "breed")
    .slice(0, 5);
  const blogs = scoredResults.filter((r) => r.category === "blog").slice(0, 5);
  const pageResults = scoredResults
    .filter((r) => r.category === "page")
    .slice(0, 5);

  const categories: SearchCategory[] = [];

  if (breeds.length > 0) {
    categories.push({ name: "Dog Breeds", results: breeds });
  }

  if (blogs.length > 0) {
    categories.push({ name: "Blog Posts", results: blogs });
  }

  if (pageResults.length > 0) {
    categories.push({ name: "Pages", results: pageResults });
  }

  return categories;
}

// Get suggested/popular content (shown when search is empty)
export function getSuggestedContent(
  allContent: SearchResult[]
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
      ].includes(item.id)
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
      ["breeds", "blogs", "services", "about"].includes(item.id)
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
