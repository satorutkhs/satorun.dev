"use client";

import { useEffect, useState } from "react";
import { getPublishedPosts, type BlogPost } from "@/app/lib/blog";
import BlogCard from "@/app/components/BlogCard";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 bg-jal-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Page header */}
          <div className="mb-10">
            <p className="text-jal-red text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Blog
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-jal-dark mb-3">
              ブログ
            </h1>
            <div className="section-divider mb-4" />
            <p className="text-sm text-jal-text-secondary max-w-lg">
              技術的な知見、プロジェクトの振り返り、研究メモなどを発信しています。
            </p>
          </div>

          {/* Tag filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedTag(null)}
                className={`tag cursor-pointer transition-colors ${
                  !selectedTag
                    ? "bg-jal-red text-white border-jal-red"
                    : "hover:border-jal-red hover:text-jal-red"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`tag cursor-pointer transition-colors ${
                    tag === selectedTag
                      ? "bg-jal-red text-white border-jal-red"
                      : "hover:border-jal-red hover:text-jal-red"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Blog grid */}
          {loading ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-4xl text-jal-text-muted animate-spin select-none">
                progress_activity
              </span>
              <p className="text-sm text-jal-text-muted mt-3">読み込み中...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 card-elevated">
              <span className="material-symbols-outlined text-5xl text-jal-text-muted/30 select-none mb-3">
                edit_note
              </span>
              <p className="text-jal-text-secondary font-medium mb-1">
                まだ記事がありません
              </p>
              <p className="text-xs text-jal-text-muted">
                Firestore の blog_posts コレクションに記事を追加してください。
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
