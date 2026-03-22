import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogFaqEntry {
  question: string;
  answer: string;
}

function parseFaqsFromMatter(data: Record<string, unknown>): BlogFaqEntry[] | undefined {
  const raw = data.faqs;
  if (!Array.isArray(raw) || raw.length === 0) {
    return undefined;
  }
  const out: BlogFaqEntry[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const q = typeof rec.question === "string" ? rec.question.trim() : "";
    const a = typeof rec.answer === "string" ? rec.answer.trim() : "";
    if (q.length > 0 && a.length > 0) {
      out.push({ question: q, answer: a });
    }
  }
  return out.length > 0 ? out : undefined;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  keywords: string;
  image?: string;
  content: string;
  readingTime?: number;
  faqs?: BlogFaqEntry[];
}

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Calculate reading time (average 200 words per minute)
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);

      const matterData = data as Record<string, unknown>;
      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "FurFam Team",
        category: data.category || "General",
        tags: data.tags || [],
        keywords: data.keywords || "",
        image: data.image,
        content,
        readingTime,
        faqs: parseFaqsFromMatter(matterData),
      } as BlogPost;
    });

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    const matterData = data as Record<string, unknown>;
    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "FurFam Team",
      category: data.category || "General",
      tags: data.tags || [],
      keywords: data.keywords || "",
      image: data.image,
      content,
      readingTime,
      faqs: parseFaqsFromMatter(matterData),
    } as BlogPost;
  } catch {
    return null;
  }
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.tags.includes(tag));
}
