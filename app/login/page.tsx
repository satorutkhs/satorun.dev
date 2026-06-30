"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import Link from "next/link";

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.push("/research");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "認証に失敗しました";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/research");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google ログインに失敗しました";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jal-bg">
        <div className="card-elevated p-8 max-w-md w-full mx-4 text-center">
          <span className="material-symbols-outlined text-jal-red text-4xl mb-4 select-none">
            check_circle
          </span>
          <h1 className="text-xl font-bold text-jal-dark mb-2">ログイン済み</h1>
          <p className="text-sm text-jal-text-secondary mb-6">
            {user.displayName || user.email}
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/research" className="btn-primary justify-center">
              <span className="material-symbols-outlined text-lg select-none">science</span>
              研究資料へ
            </Link>
            <button onClick={signOut} className="btn-secondary justify-center cursor-pointer">
              <span className="material-symbols-outlined text-lg select-none">logout</span>
              ログアウト
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-jal-bg">
      <div className="w-full max-w-md mx-4">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-jal-text-secondary hover:text-jal-red transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[16px] select-none">arrow_back</span>
          トップページに戻る
        </Link>

        <div className="card-elevated p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-jal-red rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold text-jal-dark mb-1">
              {isSignUp ? "アカウント作成" : "ログイン"}
            </h1>
            <p className="text-sm text-jal-text-muted">
              研究資料の閲覧にはログインが必要です
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-jal-border rounded-lg text-sm font-medium text-jal-text hover:bg-jal-bg transition-colors mb-6 cursor-pointer disabled:opacity-50"
          >
            <i className="devicon-google-plain colored text-lg" />
            Google でログイン
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-jal-border" />
            <span className="text-xs text-jal-text-muted">or</span>
            <div className="flex-1 h-px bg-jal-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-jal-text-secondary mb-1.5">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm border border-jal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-jal-red/20 focus:border-jal-red transition-all bg-white text-jal-text"
                placeholder="example@university.ac.jp"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-jal-text-secondary mb-1.5">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 text-sm border border-jal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-jal-red/20 focus:border-jal-red transition-all bg-white text-jal-text"
                placeholder="6文字以上"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 cursor-pointer disabled:opacity-50"
            >
              {loading ? "処理中..." : isSignUp ? "アカウント作成" : "ログイン"}
            </button>
          </form>

          {/* Toggle sign up / sign in */}
          <p className="text-center text-xs text-jal-text-muted mt-6">
            {isSignUp ? "すでにアカウントをお持ちですか？" : "アカウントをお持ちでないですか？"}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
              className="text-jal-red font-medium hover:underline ml-1 cursor-pointer"
            >
              {isSignUp ? "ログイン" : "新規登録"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
