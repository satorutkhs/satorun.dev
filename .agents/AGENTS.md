<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# アイコン使用ルール / Icon Usage Rules

- **一般アイコン (General Icons)**:
  - アイコンを使用する際は原則として **Google Material Symbols** に統一してください。
  - `globals.css` にて Google Fonts の Material Symbols CSS をインポートし、`material-symbols-outlined` クラスを利用してください。
- **スキル・ブランドアイコン (Skill & Brand Icons)**:
  - 技術スタックやブランドロゴなどのアイコンは、**Devicon** に統一してください。
  - `globals.css` にて Devicon の CDN CSS をインポートし、公式のクラス名（例: `devicon-react-original colored`）使用してください。
  - インラインの自作SVGや個別のSVGファイル、他のアイコンパッケージを混在させないでください。

# 文言表現ルール / Wording Rules

- **オマージュ・モデル元の非明示**:
  - Netflix や JAL など、デザインの参考にしている特定のブランドやサービスオマージュを示唆する文言（例: `Designed with inspiration from ...` や `Inspired by ...`）は、ソースコードおよびページ上に明示的に残さないでください。

