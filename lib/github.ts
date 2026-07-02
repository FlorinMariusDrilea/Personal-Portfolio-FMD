import { profile, projects, type Project } from "@/lib/data";

/**
 * Server-side enrichment of the static project list with live GitHub data
 * (stars, primary language, last push). Fetches are cached with ISR and any
 * failure — rate limit, renamed repo, network — falls back to the static
 * entry, so the page never breaks or blocks on GitHub.
 */

export type GithubMeta = {
  stars: number;
  language: string | null;
  // Pre-formatted on the server ("updated 3 days ago") so the client
  // component renders the exact string it was hydrated with.
  updatedLabel: string;
};

export type ProjectWithMeta = Project & { github?: GithubMeta };

const owner = profile.github.split("/").filter(Boolean).pop();

function updatedLabel(pushedAt: string): string {
  const days = Math.floor(
    (Date.now() - new Date(pushedAt).getTime()) / 86_400_000,
  );
  if (days <= 0) return "updated today";
  if (days === 1) return "updated yesterday";
  if (days < 7) return `updated ${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `updated ${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `updated ${months} month${months > 1 ? "s" : ""} ago`;
  }
  const years = Math.floor(days / 365);
  return `updated ${years} year${years > 1 ? "s" : ""} ago`;
}

async function fetchRepoMeta(name: string): Promise<GithubMeta | undefined> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: {
        Accept: "application/vnd.github+json",
        // Optional: raises the rate limit from 60 to 5000 req/h. A classic
        // token with no scopes (public repo read) is enough.
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return undefined;

    const repo: {
      stargazers_count?: number;
      language?: string | null;
      pushed_at?: string;
    } = await res.json();
    if (!repo.pushed_at) return undefined;

    return {
      stars: repo.stargazers_count ?? 0,
      language: repo.language ?? null,
      updatedLabel: updatedLabel(repo.pushed_at),
    };
  } catch {
    return undefined;
  }
}

export async function getProjectsWithGithub(): Promise<ProjectWithMeta[]> {
  return Promise.all(
    projects.map(async (p) => {
      const github = await fetchRepoMeta(p.name);
      return github ? { ...p, github } : { ...p };
    }),
  );
}
