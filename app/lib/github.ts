export interface CommitLog {
  hash: string;
  date: string;
  branch: string;
  message: string;
  description: string;
  type: "feature" | "bugfix" | "style" | "docs" | "merge";
}

export interface CommitActivity {
  commits: CommitLog[];
  dailyCounts: Record<string, number>;
}

const REPO = "satorutkhs/satorun.dev";
const ACTIVITY_DAYS = 180;

function classifyType(message: string): CommitLog["type"] {
  const first = message.split("\n")[0].toLowerCase();
  if (first.startsWith("merge")) return "merge";
  if (first.startsWith("fix")) return "bugfix";
  if (first.startsWith("style")) return "style";
  if (first.startsWith("docs")) return "docs";
  return "feature";
}

interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: { date: string } | null;
  };
}

export async function getCommitActivity(): Promise<CommitActivity> {
  const since = new Date();
  since.setDate(since.getDate() - ACTIVITY_DAYS);

  const empty: CommitActivity = { commits: [], dailyCounts: {} };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits?per_page=100&since=${since.toISOString()}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return empty;

    const data = (await res.json()) as GitHubCommitResponse[];

    const dailyCounts: Record<string, number> = {};
    const commits: CommitLog[] = [];

    for (const item of data) {
      const isoDate = item.commit.author?.date;
      if (!isoDate) continue;
      const date = isoDate.split("T")[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;

      const [message, ...rest] = item.commit.message.split("\n\n");
      commits.push({
        hash: item.sha.slice(0, 7),
        date,
        branch: "main",
        message,
        description: rest.join("\n\n"),
        type: classifyType(message),
      });
    }

    return { commits, dailyCounts };
  } catch {
    return empty;
  }
}
