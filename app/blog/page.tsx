import type { Metadata } from "next";
import { getPublishedPosts } from "@/app/lib/blog";
import BlogList from "@/app/components/BlogList";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "技術的な知見、プロジェクトの振り返り、研究メモなどを発信しています。",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="flex flex-col min-h-dvh">
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

          <BlogList posts={posts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
