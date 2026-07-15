"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug, type BlogPost } from "@/app/lib/blog";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-dvh">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24 bg-jal-bg">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-jal-text-muted animate-spin select-none">
              progress_activity
            </span>
            <p className="text-sm text-jal-text-muted mt-3">読み込み中...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-dvh">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24 bg-jal-bg">
          <div className="text-center card-elevated p-10 mx-4">
            <span className="material-symbols-outlined text-5xl text-jal-text-muted/30 select-none mb-3">
              search_off
            </span>
            <h1 className="text-xl font-bold text-jal-dark mb-2">記事が見つかりません</h1>
            <p className="text-sm text-jal-text-secondary mb-6">
              お探しの記事は削除されたか、URLが正しくない可能性があります。
            </p>
            <Link href="/blog" className="btn-primary">
              <span className="material-symbols-outlined text-lg select-none">arrow_back</span>
              ブログ一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <div className="rounded-lg overflow-hidden mb-8 shadow-sm">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-56 md:h-72 object-cover"
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
                {post.authorName || "Author"}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] select-none">calendar_today</span>
                {dateStr}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] select-none">visibility</span>
                {post.viewCount} views
              </span>
            </div>

            <div className="section-divider mt-6" />
          </header>

          {/* Body */}
          <div className="card-elevated p-6 md:p-10">
            <div className="prose-jal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
