import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  type Timestamp,
} from "firebase/firestore";
import { db, isFirebaseMocked } from "./firebase";

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

// サンプルデータ（環境変数未設定時 or 接続エラー時のフォールバック用）
const sampleResearchMaterials: ResearchMaterial[] = [
  {
    id: "research-1",
    title: "公立はこだて未来大学 輪講資料: 複雑系科学の基礎と応用",
    description: "カオス理論および自己組織化に関する基本的なモデル（セルオートマトンなど）とその複雑系研究における意義をまとめたスライド資料。",
    type: "slide",
    fileUrl: "",
    tags: ["複雑系", "セルオートマトン", "輪講"],
    isPublic: false,
    createdAt: new Date("2026-06-15"),
    updatedAt: new Date("2026-06-15"),
    fileSize: 4500000,
  },
  {
    id: "research-2",
    title: "大学ポータルアプリ Dotto におけるシステム設計書",
    description: "Flutter と Go を用いたマルチプラットフォームアプリにおける、疎結合なBFFアーキテクチャ設計およびFirestoreデータベース設計のまとめPDF。",
    type: "pdf",
    fileUrl: "",
    tags: ["システム設計", "BFF", "アーキテクチャ"],
    isPublic: false,
    createdAt: new Date("2026-06-10"),
    updatedAt: new Date("2026-06-10"),
    fileSize: 12500000,
  }
];

function timestampToDate(ts: Timestamp | { seconds: number } | Date | null): Date {
  if (!ts) return new Date();
  if (ts instanceof Date) return ts;
  if ("toDate" in ts && typeof ts.toDate === "function") return ts.toDate();
  if ("seconds" in ts) return new Date(ts.seconds * 1000);
  return new Date();
}

export async function getResearchMaterials(maxCount = 50): Promise<ResearchMaterial[]> {
  if (isFirebaseMocked) {
    return sampleResearchMaterials.slice(0, maxCount);
  }
  try {
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
  } catch (error) {
    console.warn("Firebase fetch failed, falling back to mock data:", error);
    return sampleResearchMaterials.slice(0, maxCount);
  }
}
