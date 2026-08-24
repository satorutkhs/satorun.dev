// content/blog/*.md を読み、app/lib/blog-data.generated.ts に焼き込む。
// Cloudflare Workers ランタイムには実ファイルシステムがなく、
// next build 後の再検証(ISR)経路で node:fs による実行時読み込みが失敗するため、
// ビルド時にプレーンな JS モジュールへ変換して読み込み専用にしている。
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "blog");
const OUT_FILE = path.join(ROOT, "app", "lib", "blog-data.generated.ts");

const DEFAULT_AUTHOR = "髙橋 慧流";

function toIso(value, fallback) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return fallback;
}

function toStringArray(value) {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
}

async function main() {
  const entries = await readdir(POSTS_DIR);
  const slugs = entries
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .map((name) => name.replace(/\.md$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readFile(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
      const { data, content } = matter(raw);
      const createdAt = toIso(data.date, new Date(0).toISOString());

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
        updatedAt: data.updated ? toIso(data.updated, createdAt) : createdAt,
      };
    })
  );

  posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const banner = `// このファイルは scripts/generate-blog-data.mjs によって自動生成されます。
// content/blog/*.md を編集したら \`npm run build\`（または \`node scripts/generate-blog-data.mjs\`）で再生成してください。
// 直接編集しないでください。
`;

  const body = `${banner}
export interface RawBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  status: "draft" | "published";
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export const rawBlogPosts: RawBlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

  await writeFile(OUT_FILE, body, "utf-8");
  console.log(`generated ${OUT_FILE} (${posts.length} posts)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
