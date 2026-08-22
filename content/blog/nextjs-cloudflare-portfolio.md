---
title: Next.js 16 + Cloudflare Workers で構築するポートフォリオ
excerpt: このポートフォリオサイト（satorun.dev）の構成について解説します。Next.js の最新バージョンと Cloudflare のエッジコンピューティングを組み合わせることで、極めて高速な読み込みを実現しています。
tags:
  - Next.js
  - Cloudflare
  - Web
status: published
author: 髙橋 慧流
date: 2026-06-25
updated: 2026-06-25
coverImage: ""
---

# Next.js 16 + Cloudflare Workers

本サイト（satorun.dev）は、最新の Next.js と Cloudflare Workers を使ってデプロイされています。

## アーキテクチャのメリット

1. **エッジでの実行**: 世界中のエッジサーバーから即座に配信されるため、TTFBが極めて高速です。
2. **コスト効率**: 無料枠が非常に大きく、個人開発に最適です。
3. **開発体験**: Turbopack による高速な HMR が動作します。

今後も、Firebase との連携を進め、さらに動的な機能を実装していく予定です。
