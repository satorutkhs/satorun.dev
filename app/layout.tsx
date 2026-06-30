import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "髙橋 慧流 | Satoru Takahashi",
  description:
    "髙橋 慧流（Satoru Takahashi）のポートフォリオサイト。公立はこだて未来大学 システム情報科学部 複雑系コース所属。プロジェクト・スキル・ブログ・研究資料を公開。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-screen bg-jal-bg text-jal-text">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
