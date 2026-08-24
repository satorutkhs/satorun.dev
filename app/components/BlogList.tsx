"use client";

import { useState } from "react";
import BlogCard from "@/app/components/BlogCard";
import type { BlogPost } from "@/app/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <>
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
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
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
            content/blog に Markdown ファイルを追加してください。
          </p>
        </div>
      )}
    </>
  );
}
