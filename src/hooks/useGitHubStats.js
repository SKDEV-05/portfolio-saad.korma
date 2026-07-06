import { useState, useEffect } from 'react';

const GITHUB_OWNER = 'SKDEV-05';

// Language → color map (GitHub colors)
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Java: '#b07219',
  Blade: '#f7523f',
};

export function useGitHubStats(repoSlug) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoSlug) return;

    setLoading(true);

    const fetchStats = async () => {
      try {
        // Fetch repo meta (stars, forks, language, size)
        const repoRes = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${repoSlug}`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );
        const repoData = repoRes.ok ? await repoRes.json() : null;

        // Fetch languages breakdown
        const langRes = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${repoSlug}/languages`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );
        const langData = langRes.ok ? await langRes.json() : {};

        // Fetch commit count via contributor stats (faster than paginating commits)
        const contribRes = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${repoSlug}/contributors?per_page=10`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );
        const contribData = contribRes.ok ? await contribRes.json() : [];
        const totalCommits = Array.isArray(contribData)
          ? contribData.reduce((sum, c) => sum + (c.contributions || 0), 0)
          : 0;

        // Top language by byte count
        const sortedLangs = Object.entries(langData).sort((a, b) => b[1] - a[1]);
        const topLang = sortedLangs[0]?.[0] || repoData?.language || null;
        const topLangColor = LANG_COLORS[topLang] || '#8b949e';

        setStats({
          stars: repoData?.stargazers_count ?? 0,
          forks: repoData?.forks_count ?? 0,
          commits: totalCommits,
          topLang,
          topLangColor,
          updatedAt: repoData?.updated_at ?? null,
        });
      } catch (err) {
        // Silently fail — stats are decorative
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [repoSlug]);

  return { stats, loading };
}
