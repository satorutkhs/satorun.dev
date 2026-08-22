import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPublishedPosts } from "@/app/lib/blog";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// content/blog にある記事だけを静的生成し、それ以外の slug は 404 にする。
// これで Workers 側のランタイムで記事を読みにいく経路が完全になくなる。
export const dynamicParams = false;

// 本文中の画像は Markdown 側に寸法情報がないため next/image は使えない。
// /_next/image を通さない代わりに遅延読み込みと幅制限だけ付ける。
const markdownComponents: Components = {
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="max-w-full h-auto rounded-lg" />
    ) : null,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts(Number.MAX_SAFE_INTEGER);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "記事が見つかりません" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags,
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
    twitter: {
      card: post.coverImageUrl ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const dateStr = post.createdAt.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 bg-jal-bg">
        <article className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-jal-text-muted mb-8">
            <Link href="/" className="hover:text-jal-red transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-jal-red transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-jal-text-secondary truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Cover image */}
          {post.coverImageUrl && (
            <div className="relative h-56 md:h-72 rounded-lg overflow-hidden mb-8 shadow-sm">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="tag text-[10px]">{tag}</span>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-jal-dark leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-jal-text-muted">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] select-none">person</span>
                {post.authorName}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] select-none">calendar_today</span>
                {dateStr}
              </span>
            </div>

            <div className="section-divider mt-6" />
          </header>

          {/* Body */}
          <div className="card-elevated p-6 md:p-10">
            <div className="prose-jal">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link href="/blog" className="btn-secondary">
              <span className="material-symbols-outlined text-lg select-none">arrow_back</span>
              ブログ一覧に戻る
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
