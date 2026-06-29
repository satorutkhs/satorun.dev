interface CommitLog {
  hash: string;
  date: string;
  branch: string;
  message: string;
  description: string;
  type: "feature" | "bugfix" | "style" | "docs" | "merge";
}

const commits: CommitLog[] = [
  {
    hash: "b9c01f7",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: fun-prism-group-report-texの追加とGDGoC-Japan-Hackathonを運営として再掲載",
    description: "ユーザーからの要望に基づき、LaTeX手順書プロジェクトの追加、GDGoCハッカソンにおける運営（Organizer）としての役割説明をプロジェクト欄へ反映。",
    type: "feature",
  },
  {
    hash: "2e3f555",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: プロジェクト欄を実際のGitHubリポジトリ・コントリビューション情報に更新",
    description: "GitHub APIおよび各リポジトリのコントリビューターデータを解析し、実際の開発実績（Dotto, EventPinMap, girlfriend 等）へと置き換え。",
    type: "feature",
  },
  {
    hash: "6fa050c",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: PDFに基づきスキル情報を更新 (Flutter/Go/GCP/Firebase等追加、Docker/Linux削除、Antigravity/Copilotを追加)",
    description: "スキルチェックシートPDFの内容を反映し、保有技術や経験レベル（ドット表記）を完全同期。",
    type: "feature",
  },
  {
    hash: "cf9632a",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "fix: Google Material Symbolsをlayout.tsxのlinkタグで読み込むように修正し表示バグを解決",
    description: "Tailwind v4ビルドによるCDNインポート消失問題を回避するため、HTMLのLinkタグから読み込む方式へ変更。",
    type: "bugfix",
  },
  {
    hash: "f22a595",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: スキルアイコンを公式ロゴ（Devicon）に置き換え、ページ見出しの絵文字をMaterial Symbols化",
    description: "すべてのスキルアイコンを絵文字からDevicon公式ブランドロゴに統一し、一元化。",
    type: "style",
  },
  {
    hash: "d581639",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "style: UIコンポーネント内のSVGアイコンをGoogle Material SymbolsとDeviconに置き換え",
    description: "ナビゲーションの矢印やアクションボタン等のSVGをGoogle Material Symbolsに置き換え。",
    type: "style",
  },
  {
    hash: "3ef012f",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "style: Google Material SymbolsとDeviconのCSSインポートを追加",
    description: "フォントおよびアイコンフォント用のCDNインポートをglobals.cssに追加。",
    type: "style",
  },
  {
    hash: "23cb895",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "docs: アイコン使用ルールをAGENTS.mdに追記",
    description: "今後の機能追加やアイコン選定時の方針となる「Google Material Symbols」および「Devicon」の規約を明記。",
    type: "docs",
  },
  {
    hash: "b551783",
    date: "2026-06-25",
    branch: "main",
    message: "Merge pull request #4 from satorutkhs/cloudflare/workers-autoconfig",
    description: "Cloudflare Workersへの自動デプロイ設定ブランチを本番ブランチへ統合。",
    type: "merge",
  },
  {
    hash: "782b171",
    date: "2026-06-25",
    branch: "cloudflare-config",
    message: "Add Cloudflare Workers configuration",
    description: "Cloudflare Wrangler設定ファイルの追加およびデプロイ用スクリプトの整備。",
    type: "feature",
  },
  {
    hash: "389b23c",
    date: "2026-06-25",
    branch: "main",
    message: "Merge pull request #3 from satorutkhs/issue/1-app",
    description: "Netflixライクなリッチデザインを実装したUIブランチを本番へマージ。",
    type: "merge",
  },
  {
    hash: "0427ff8",
    date: "2026-06-25",
    branch: "issue/1-app",
    message: "Netflixの雰囲気を再現",
    description: "Tailwind CSS、グラデーション、美しいホバー演出を用いたNetflix風デザインのモックアップ実装。",
    type: "style",
  },
];

export default function GitHistorySection() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "bugfix":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "merge":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "docs":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-nf-gray/60 text-nf-light-gray border-nf-gray/50";
    }
  };

  const getBranchBadgeColor = (branch: string) => {
    if (branch === "main") {
      return "bg-nf-red text-white";
    }
    if (branch === "issue/5-icon") {
      return "bg-blue-600 text-white";
    }
    return "bg-nf-gray text-nf-white";
  };

  return (
    <section id="git-history" className="px-6 md:px-16 mb-20">
      <h2 className="text-xl md:text-2xl font-bold mb-8 text-nf-white flex items-center gap-2">
        <span className="material-symbols-outlined text-nf-red select-none">
          timeline
        </span>
        Development Activity & Git History
      </h2>

      <div className="relative max-w-4xl border-l-2 border-nf-gray/40 pl-6 md:pl-10 ml-4 md:ml-8 space-y-12">
        {commits.map((commit, index) => (
          <div key={commit.hash} className="relative group">
            {/* Timeline Dot Indicator */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-nf-black border-2 border-nf-red group-hover:border-white transition-all duration-300 shadow-[0_0_10px_rgba(229,9,20,0.5)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-nf-red group-hover:bg-white transition-colors" />
            </span>

            {/* Commit card */}
            <div className="bg-nf-card-bg rounded-md p-5 border border-nf-gray/20 card-hover group-hover:border-nf-red/30 transition-all duration-300">
              {/* Header meta info */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-nf-light-gray bg-nf-gray/40 px-2 py-0.5 rounded border border-nf-gray/30">
                    {commit.hash}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${getTypeColor(commit.type)}`}>
                    {commit.type}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${getBranchBadgeColor(commit.branch)}`}>
                    {commit.branch}
                  </span>
                </div>
                <div className="text-nf-light-gray flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] select-none">
                    calendar_today
                  </span>
                  {commit.date}
                </div>
              </div>

              {/* Commit Message */}
              <h3 className="text-sm md:text-base font-bold text-white mb-2 leading-snug group-hover:text-nf-red transition-colors duration-300">
                {commit.message}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-nf-light-gray leading-relaxed">
                {commit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
