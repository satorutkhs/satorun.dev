import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers 上では OpenNext が /_next/image を IMAGES binding
    // (wrangler.jsonc) に委譲して最適化する。
    formats: ["image/avif", "image/webp"],
    // 最適化対象は public/ 配下の自前の画像だけに限定する。
    localPatterns: [{ pathname: "/blog/**" }],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
