import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  type Timestamp,
} from "firebase/firestore/lite";
import { db, isFirebaseMocked } from "./firebase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  status: "draft" | "published";
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

// サンプルデータ（環境変数未設定時 or 接続エラー時のフォールバック用）
const sampleBlogPosts: BlogPost[] = [
  {
    id: "sample-1",
    title: "公立はこだて未来大学のプロジェクト学習について",
    slug: "fun-project-learning",
    excerpt: "未来大学の最大の特徴である「プロジェクト学習」について、私たちのチームが3年間取り組んできた大学ポータルアプリ Dotto の開発プロセスを振り返ります。",
    content: `
# 未来大学のプロジェクト学習について

公立はこだて未来大学の3年次には、「プロジェクト学習」という必修科目があります。これは、学生がチームを組んで1年間かけてリアルな課題を解決する実践的な授業です。

## 私たちのプロジェクト: Dotto

私たちのチームは、大学のポータルサイトがスマホ対応しておらず使いにくいという課題を解決するため、学生向けポータルアプリ **Dotto** を開発しました。

### 使用した技術
- フロントエンド: **Flutter / Dart**
- バックエンド: **Go (BFF)**
- インフラ: **Firebase**

この活動は3年間継続しており、現在も後輩に引き継がれながら開発が進んでいます。
`,
    coverImageUrl: "",
    tags: ["大学生活", "Flutter", "Go"],
    status: "published",
    authorName: "髙橋 慧流",
    createdAt: new Date("2026-06-28"),
    updatedAt: new Date("2026-06-28"),
    viewCount: 142,
  },
  {
    id: "sample-2",
    title: "Next.js 16 + Cloudflare Workers で構築するポートフォリオ",
    slug: "nextjs-cloudflare-portfolio",
    excerpt: "このポートフォリオサイト（satorun.dev）の構成について解説します。Next.js の最新バージョンと Cloudflare のエッジコンピューティングを組み合わせることで、極めて高速な読み込みを実現しています。",
    content: `
# Next.js 16 + Cloudflare Workers

本サイト（satorun.dev）は、最新の Next.js と Cloudflare Workers を使ってデプロイされています。

## アーキテクチャのメリット

1. **エッジでの実行**: 世界中のエッジサーバーから即座に配信されるため、TTFBが極めて高速です。
2. **コスト効率**: 無料枠が非常に大きく、個人開発に最適です。
3. **開発体験**: Turbopack による高速な HMR が動作します。

今後も、Firebase との連携を進め、さらに動的な機能を実装していく予定です。
`,
    coverImageUrl: "",
    tags: ["Next.js", "Cloudflare", "Web"],
    status: "published",
    authorName: "髙橋 慧流",
    createdAt: new Date("2026-06-25"),
    updatedAt: new Date("2026-06-25"),
    viewCount: 98,
  }
];

function timestampToDate(ts: Timestamp | { seconds: number } | Date | null): Date {
  if (!ts) return new Date();
  if (ts instanceof Date) return ts;
  if ("toDate" in ts && typeof ts.toDate === "function") return ts.toDate();
  if ("seconds" in ts) return new Date(ts.seconds * 1000);
  return new Date();
}

export async function getPublishedPosts(maxCount = 50): Promise<BlogPost[]> {
  if (isFirebaseMocked) {
    return sampleBlogPosts.slice(0, maxCount);
  }
  try {
    const q = query(
      collection(db, "blog_posts"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(maxCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        slug: data.slug || d.id,
        excerpt: data.excerpt || "",
        content: data.content || "",
        coverImageUrl: data.coverImageUrl || "",
        tags: data.tags || [],
        status: data.status || "published",
        authorName: data.authorName || "",
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
        viewCount: data.viewCount || 0,
      };
    });
  } catch (error) {
    console.warn("Firebase fetch failed, falling back to mock data:", error);
    return sampleBlogPosts.slice(0, maxCount);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isFirebaseMocked) {
    return sampleBlogPosts.find((p) => p.slug === slug) || null;
  }
  try {
    const q = query(
      collection(db, "blog_posts"),
      where("slug", "==", slug),
      where("status", "==", "published"),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    const data = d.data();
    return {
      id: d.id,
      title: data.title || "",
      slug: data.slug || d.id,
      excerpt: data.excerpt || "",
      content: data.content || "",
      coverImageUrl: data.coverImageUrl || "",
      tags: data.tags || [],
      status: data.status || "published",
      authorName: data.authorName || "",
      createdAt: timestampToDate(data.createdAt),
      updatedAt: timestampToDate(data.updatedAt),
      viewCount: data.viewCount || 0,
    };
  } catch (error) {
    console.warn("Firebase fetch failed, falling back to mock data:", error);
    return sampleBlogPosts.find((p) => p.slug === slug) || null;
  }
}
