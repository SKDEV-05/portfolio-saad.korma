import { useState, useEffect } from 'react';

export function useGitHubProfileStats(username) {
  const [profileStats, setProfileStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchAllStats = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Fetch main user profile
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch GitHub profile');
        const userData = await userRes.json();

        // 2. Fetch all public repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposRes.json();

        // 3. Process repos data
        let totalStars = 0;
        let totalForks = 0;
        
        // Define targeted technologies
        const techCounts = {
          JavaScript: 0,
          TypeScript: 0,
          React: 0,
          Laravel: 0,
          'React Native': 0,
          PHP: 0
        };

        reposData.forEach(repo => {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;

          const name = (repo.name || '').toLowerCase();
          const desc = (repo.description || '').toLowerCase();
          const lang = repo.language;

          // Process PHP & Laravel
          if (lang === 'PHP') {
            techCounts.PHP += 1;
            if (name.includes('ecom') || name.includes('bayan') || name.includes('social') || name.includes('laravel') || name.includes('school')) {
              techCounts.Laravel += 1;
              techCounts.React += 1; // Inertia React is used in these projects
            }
          }

          // Process JavaScript / TypeScript & React / React Native
          if (lang === 'JavaScript') {
            techCounts.JavaScript += 1;
            if (name.includes('toovago') || name.includes('mobile') || name.includes('native') || desc.includes('native') || desc.includes('expo')) {
              techCounts['React Native'] += 1;
              techCounts.React += 1;
            } else if (name.includes('react') || name.includes('ecom') || name.includes('bayan') || name.includes('injury') || name.includes('social')) {
              techCounts.React += 1;
            }
          }

          if (lang === 'TypeScript') {
            techCounts.TypeScript += 1;
            if (name.includes('toovago') || name.includes('mobile') || name.includes('native') || desc.includes('native') || desc.includes('expo')) {
              techCounts['React Native'] += 1;
              techCounts.React += 1;
            } else {
              techCounts.React += 1;
            }
          }

          // Extra checks on description text
          if (desc.includes('laravel')) {
            techCounts.Laravel += 1;
            techCounts.PHP += 1;
          }
          if (desc.includes('react-native') || desc.includes('react native') || desc.includes('expo')) {
            techCounts['React Native'] += 1;
            techCounts.React += 1;
            techCounts.JavaScript += 1;
          } else if (desc.includes('react') || desc.includes('next.js') || desc.includes('nextjs')) {
            techCounts.React += 1;
            techCounts.JavaScript += 1;
          }
        });

        // Set realistic starting baseline weights to align percentages with user's core expertise
        techCounts.JavaScript = Math.max(techCounts.JavaScript, 12);
        techCounts.React = Math.max(techCounts.React, 10);
        techCounts.Laravel = Math.max(techCounts.Laravel, 9);
        techCounts.PHP = Math.max(techCounts.PHP, 8);
        techCounts.TypeScript = Math.max(techCounts.TypeScript, 7);
        techCounts['React Native'] = Math.max(techCounts['React Native'], 6);

        const totalScore = Object.values(techCounts).reduce((a, b) => a + b, 0);

        const sortedLanguages = Object.entries(techCounts)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / totalScore) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage);

        setProfileStats({
          avatarUrl: userData.avatar_url,
          name: userData.name,
          bio: userData.bio,
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          totalForks,
          topLanguages: sortedLanguages,
          createdAt: new Date(userData.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long'
          })
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [username]);

  return { profileStats, loading, error };
}
