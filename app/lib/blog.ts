import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

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

function timestampToDate(ts: Timestamp | { seconds: number } | Date | null): Date {
  if (!ts) return new Date();
  if (ts instanceof Date) return ts;
  if ("toDate" in ts && typeof ts.toDate === "function") return ts.toDate();
  if ("seconds" in ts) return new Date(ts.seconds * 1000);
  return new Date();
}

export async function getPublishedPosts(maxCount = 50): Promise<BlogPost[]> {
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
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
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
}
