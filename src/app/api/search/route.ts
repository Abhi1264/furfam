import { NextResponse } from "next/server";
import { breeds, breedTypes } from "@/lib/breeds-data";
import { getAllBlogPosts } from "@/lib/blog-utils";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "breed" | "blog" | "page";
  tags?: string[];
}

// Static pages
const pages: SearchResult[] = [
  {
    id: "home",
    title: "Home",
    description: "Find your perfect furry companion at FurFam",
    url: "/",
    category: "page",
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about our commitment to ethical breeding and pet care",
    url: "/about",
    category: "page",
  },
  {
    id: "services",
    title: "Services",
    description: "Explore our comprehensive pet care services",
    url: "/services",
    category: "page",
  },
  {
    id: "blogs",
    title: "Blogs",
    description: "Read expert advice and guides on dog care and breeds",
    url: "/blogs",
    category: "page",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team for personalized guidance",
    url: "/contact",
    category: "page",
  },
  {
    id: "faqs",
    title: "FAQs",
    description: "Frequently asked questions about our services and breeds",
    url: "/faqs",
    category: "page",
  },
  {
    id: "breeds",
    title: "All Breeds",
    description: "Browse all dog breeds by type",
    url: "/breeds/sporting",
    category: "page",
  },
];

export async function GET() {
  try {
    // Get breed types
    const breedTypeResults: SearchResult[] = breedTypes.map((type) => ({
      id: `breed-type-${type.id}`,
      title: type.name,
      description: type.description,
      url: `/breeds/${type.slug}`,
      category: "page" as const,
    }));

    // Get all breeds
    const breedResults: SearchResult[] = breeds.map((breed) => ({
      id: breed.id,
      title: breed.name,
      description: breed.description,
      url: `/breeds/${breed.typeSlug}/${breed.id}`,
      category: "breed" as const,
      tags: [breed.type, breed.size, ...breed.temperament],
    }));

    // Get blog posts
    const posts = getAllBlogPosts();
    const blogResults: SearchResult[] = posts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.description,
      url: `/blogs/${post.slug}`,
      category: "blog" as const,
      tags: [post.category, ...post.tags],
    }));

    const allContent = [
      ...pages,
      ...breedTypeResults,
      ...breedResults,
      ...blogResults,
    ];

    return NextResponse.json({ data: allContent });
  } catch (error) {
    console.error("Error fetching search data:", error);
    return NextResponse.json(
      { error: "Failed to fetch search data" },
      { status: 500 }
    );
  }
}
