# ブログ記事の書き方

1ファイル1記事。**ファイル名がそのまま URL の slug** になります（`fun-project-learning.md` → `/blog/fun-project-learning`）。

## frontmatter

| キー | 必須 | 説明 |
| --- | --- | --- |
| `title` | ✓ | 記事タイトル |
| `excerpt` | ✓ | 一覧カードと OGP description に使う要約 |
| `tags` | ✓ | タグの配列。一覧ページの絞り込みに使われる |
| `status` | ✓ | `published` か `draft`。`draft` はビルド対象から外れる |
| `author` |  | 省略時は `髙橋 慧流` |
| `date` | ✓ | 公開日。一覧はこの降順で並ぶ |
| `updated` |  | 更新日。省略時は `date` と同じ |
| `coverImage` |  | カバー画像のパス。空文字ならプレースホルダー表示 |

## 画像

`public/blog/<slug>/` に置き、`/blog/<slug>/xxx.webp` の絶対パスで参照します。

```markdown
![サンプル](/blog/fun-project-learning/screenshot.webp)
```

### iPhone の写真を使うとき

1. **AirDrop する前に**、個人名の写った名札などは iPhone の「マークアップ」で塗りつぶす。
2. 写真を Mac に AirDrop する（HEIC で届く）。
3. 変換スクリプトで webp 化して `public/blog/<slug>/` に配置する。

   ```sh
   node scripts/optimize-blog-images.mjs <slug> ~/Desktop/IMG_*.HEIC
   ```

   長辺 1600px に縮小・画質 80・Exif/GPS 除去まで一括で行い、貼り付け用の
   `![](...)` 行を出力します（要 `magick` / ImageMagick 7）。
4. 出力された `![](...)` を本文の該当箇所に貼る。カバーにする 1 枚は frontmatter の
   `coverImage` にパスを指定する。

画像が増えて Git リポジトリが重くなってきたら、置き場所を Cloudflare R2 に移して絶対 URL で参照する形に切り替えられます（本文側の書き換えは URL だけで済みます）。

## 公開

`main` に push するとビルド時に静的化されて配信されます。
