"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import { getResearchMaterials, type ResearchMaterial } from "@/app/lib/research";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ResearchCard from "@/app/components/ResearchCard";

export default function ResearchPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [materials, setMaterials] = useState<ResearchMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load materials if authenticated
  useEffect(() => {
    if (user) {
      getResearchMaterials()
        .then(setMaterials)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex flex-col min-h-dvh">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24 bg-jal-bg">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-jal-text-muted animate-spin select-none">
              progress_activity
            </span>
            <p className="text-sm text-jal-text-muted mt-3">認証を確認中...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Type filter helper
  const uniqueTypes = Array.from(new Set(materials.map((m) => m.type)));
  const filteredMaterials = selectedType
    ? materials.filter((m) => m.type === selectedType)
    : materials;

  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 bg-jal-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Page header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div>
                <p className="text-jal-red text-xs font-semibold tracking-[0.2em] uppercase mb-1">
                  Research Dashboard
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-jal-dark">
                  研究資料 & 輪講スライド
                </h1>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-jal-blue-light text-jal-blue text-xs font-semibold rounded-md border border-blue-100">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                研究室メンバー専用アクセス
              </div>
            </div>
            <div className="section-divider mb-4" />
            <p className="text-sm text-jal-text-secondary max-w-xl">
              輪講資料、スライド、研究計画書、論文ドラフトなどの資料をアップロード・共有しています。
            </p>
          </div>

          {/* Type Filter */}
          {materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedType(null)}
                className={`tag cursor-pointer transition-colors ${
                  !selectedType
                    ? "bg-jal-red text-white border-jal-red"
                    : "hover:border-jal-red hover:text-jal-red"
                }`}
              >
                All
              </button>
              {uniqueTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type === selectedType ? null : type)}
                  className={`tag cursor-pointer transition-colors uppercase ${
                    type === selectedType
                      ? "bg-jal-red text-white border-jal-red"
                      : "hover:border-jal-red hover:text-jal-red"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* Materials Grid */}
          {loading ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-4xl text-jal-text-muted animate-spin select-none">
                progress_activity
              </span>
              <p className="text-sm text-jal-text-muted mt-3">データを取得中...</p>
            </div>
          ) : filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMaterials.map((material) => (
                <ResearchCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 card-elevated bg-white">
              <span className="material-symbols-outlined text-5xl text-jal-text-muted/30 select-none mb-3">
                science
              </span>
              <p className="text-jal-text-secondary font-medium mb-1">
                公開された研究資料がありません
              </p>
              <p className="text-xs text-jal-text-muted">
                Firestore の research_materials コレクションにレコードを追加してください。
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
