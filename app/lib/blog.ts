import { rawBlogPosts } from "./blog-data.generated";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  status: "draft" | "published";
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

const allPosts: BlogPost[] = rawBlogPosts.map((p) => ({
  ...p,
  createdAt: new Date(p.createdAt),
  updatedAt: new Date(p.updatedAt),
}));

export async function getPublishedPosts(maxCount = 50): Promise<BlogPost[]> {
  return allPosts.filter((p) => p.status === "published").slice(0, maxCount);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return allPosts.find((p) => p.slug === slug && p.status === "published") ?? null;
}
