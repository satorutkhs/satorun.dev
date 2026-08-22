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

画像が増えて Git リポジトリが重くなってきたら、置き場所を Cloudflare R2 に移して絶対 URL で参照する形に切り替えられます（本文側の書き換えは URL だけで済みます）。

## 公開

`main` に push するとビルド時に静的化されて配信されます。
