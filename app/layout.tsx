import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "髙橋 慧流 | Portfolio",
  description:
    "髙橋 慧流（Satoru Takahashi）のポートフォリオサイト。公立はこだて未来大学 システム情報科学部 複雑系コース所属。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-screen bg-nf-black text-nf-white">
        {children}
      </body>
    </html>
  );
}
