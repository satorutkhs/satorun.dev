// iPhone から AirDrop した写真 (HEIC/JPEG/PNG) を、ブログ用に webp へ変換する。
//
//   node scripts/optimize-blog-images.mjs <slug> <画像ファイル...>
//
// 例:
//   node scripts/optimize-blog-images.mjs stores-tech-conf-2026-world-2 ~/Desktop/IMG_1234.HEIC ~/Desktop/IMG_1235.HEIC
//   node scripts/optimize-blog-images.mjs stores-tech-conf-2026-world-2 ~/Desktop/*.HEIC
//
// - 出力先: public/blog/<slug>/<元ファイル名を小文字化>.webp
// - 長辺 1600px に縮小 (拡大はしない) / 画質 80 / Exif・GPS は除去
// - 変換後、本文に貼り付ける Markdown の ![](...) 行を表示する
//
// 前提: ImageMagick 7 (`magick`) が PATH にあること。macOS なら `brew install imagemagick`。
// 個人名の写った名札などは、AirDrop する前に iPhone の「マークアップ」で塗りつぶしておくこと。

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const LONG_EDGE = 1600;
const QUALITY = 80;

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function assertMagick() {
  try {
    execFileSync("magick", ["-version"], { stdio: "ignore" });
  } catch {
    fail(
      "`magick` (ImageMagick 7) が見つかりません。\n" +
        "  macOS: brew install imagemagick\n" +
        "  確認 : magick -version"
    );
  }
}

function slugify(basename) {
  return basename
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniquePath(dir, name, ext) {
  let candidate = path.join(dir, `${name}${ext}`);
  let i = 2;
  while (existsSync(candidate)) {
    candidate = path.join(dir, `${name}-${i}${ext}`);
    i += 1;
  }
  return candidate;
}

const [slug, ...files] = process.argv.slice(2);

if (!slug || files.length === 0) {
  fail(
    "使い方: node scripts/optimize-blog-images.mjs <slug> <画像ファイル...>\n" +
      "  例  : node scripts/optimize-blog-images.mjs stores-tech-conf-2026-world-2 ~/Desktop/*.HEIC"
  );
}

assertMagick();

const outDir = path.join(ROOT, "public", "blog", slug);
mkdirSync(outDir, { recursive: true });

const markdownLines = [];

for (const file of files) {
  const src = path.resolve(file);
  if (!existsSync(src)) {
    console.warn(`- skip (見つからない): ${file}`);
    continue;
  }

  const name = slugify(path.basename(src)) || "image";
  const dest = uniquePath(outDir, name, ".webp");

  execFileSync("magick", [
    src,
    "-auto-orient",
    "-strip",
    "-resize",
    `${LONG_EDGE}x${LONG_EDGE}>`,
    "-quality",
    String(QUALITY),
    dest,
  ]);

  const rel = `/blog/${slug}/${path.basename(dest)}`;
  console.log(`✓ ${path.basename(src)}  ->  public${rel}`);
  markdownLines.push(`![](${rel})`);
}

if (markdownLines.length > 0) {
  console.log("\n本文に貼り付け:\n");
  console.log(markdownLines.join("\n\n"));
  console.log("");
}
