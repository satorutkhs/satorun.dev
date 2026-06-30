import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ResearchMaterial {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "slide" | "paper" | "poster";
  fileUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  fileSize: number;
}

function timestampToDate(ts: Timestamp | { seconds: number } | Date | null): Date {
  if (!ts) return new Date();
  if (ts instanceof Date) return ts;
  if ("toDate" in ts && typeof ts.toDate === "function") return ts.toDate();
  if ("seconds" in ts) return new Date(ts.seconds * 1000);
  return new Date();
}

export async function getResearchMaterials(maxCount = 50): Promise<ResearchMaterial[]> {
  const q = query(
    collection(db, "research_materials"),
    orderBy("createdAt", "desc"),
    limit(maxCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title || "",
      description: data.description || "",
      type: data.type || "pdf",
      fileUrl: data.fileUrl || "",
      thumbnailUrl: data.thumbnailUrl || undefined,
      tags: data.tags || [],
      isPublic: data.isPublic || false,
      createdAt: timestampToDate(data.createdAt),
      updatedAt: timestampToDate(data.updatedAt),
      fileSize: data.fileSize || 0,
    };
  });
}
