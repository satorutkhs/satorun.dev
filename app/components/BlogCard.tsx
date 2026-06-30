import Link from "next/link";
import type { BlogPost } from "@/app/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const dateStr = post.createdAt.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="card-elevated overflow-hidden h-full flex flex-col">
        {/* Cover image */}
        {post.coverImageUrl ? (
          <div className="h-44 bg-jal-bg overflow-hidden">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-44 bg-gradient-to-br from-jal-bg to-jal-border-light flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-jal-text-muted/30 select-none">
              article
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag text-[10px]">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-jal-dark mb-2 leading-snug group-hover:text-jal-red transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-jal-text-secondary leading-relaxed mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-[11px] text-jal-text-muted">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] select-none">calendar_today</span>
              {dateStr}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] select-none">visibility</span>
              {post.viewCount}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
