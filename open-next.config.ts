import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// このサイトは記事を Markdown からビルド時に静的化するだけで、
// リクエスト時の再検証(ISR)は行わない。デフォルトの "dummy" キャッシュだと
// 未知の経路はすべて Worker 関数の再レンダリングに回ってしまい、
// ブログ詳細ページ（dynamicParams=false）が 404 になる。
// prerender 済みのページを Workers Assets から読むだけの
// static-assets-incremental-cache に切り替える。
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
