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
      <article className="card-premium interactive-press overflow-hidden h-full flex flex-col bg-white">
        {/* Cover image */}
        {post.coverImageUrl ? (
          <div className="h-44 bg-jal-bg overflow-hidden border-b border-jal-border-light">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-44 bg-jal-bg flex items-center justify-center border-b border-jal-border-light relative">
            {/* Minimal decorator */}
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-jal-red/20 group-hover:bg-jal-red transition-colors duration-300" />
            <span className="material-symbols-outlined text-3xl text-jal-text-muted/30 select-none">
              edit_note
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag text-[9px] uppercase tracking-wider font-semibold">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-jal-dark mb-2 leading-snug group-hover:text-jal-red transition-colors line-clamp-2 tracking-wide">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-jal-text-secondary leading-[1.7] mb-5 line-clamp-2 flex-1 tracking-wide">
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-[10px] text-jal-text-muted border-t border-jal-border-light pt-4 mt-auto">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[13px] select-none">calendar_today</span>
              {dateStr}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[13px] select-none">visibility</span>
              {post.viewCount} Views
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
