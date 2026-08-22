import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// 記事は content/blog/<slug>.md に置く。ファイル名がそのまま slug になる。
// 読み込みはビルド時（generateStaticParams / SSG）にのみ走るため、
// Cloudflare Workers のランタイムに node:fs が持ち込まれることはない。
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const DEFAULT_AUTHOR = "髙橋 慧流";

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

// frontmatter は YAML なので、日付は Date に、それ以外は文字列で渡ってくる。
function toDate(value: unknown): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date(0);
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const createdAt = toDate(data.date);

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    content,
    coverImageUrl: typeof data.coverImage === "string" ? data.coverImage : "",
    tags: toStringArray(data.tags),
    status: data.status === "draft" ? "draft" : "published",
    authorName: typeof data.author === "string" ? data.author : DEFAULT_AUTHOR,
    createdAt,
    updatedAt: data.updated ? toDate(data.updated) : createdAt,
  };
}

async function readAllPosts(): Promise<BlogPost[]> {
  const entries = await readdir(POSTS_DIR);
  const slugs = entries
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .map((name) => name.replace(/\.md$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readFile(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
      return parsePost(slug, raw);
    })
  );

  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getPublishedPosts(maxCount = 50): Promise<BlogPost[]> {
  const posts = await readAllPosts();
  return posts.filter((p) => p.status === "published").slice(0, maxCount);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedPosts(Number.MAX_SAFE_INTEGER);
  return posts.find((p) => p.slug === slug) ?? null;
}
