import React from 'react';
import { motion } from 'framer-motion';
import { useGitHubProfileStats } from '../hooks/useGitHubProfileStats';
import { useLanguage } from '../i18n/LanguageContext';
import { FaGithub, FaStar, FaFolder, FaUsers, FaCodeBranch, FaCalendarAlt } from 'react-icons/fa';
import '../styles/githubstats.scss';

const GitHubStats = () => {
  const { t } = useLanguage();
  const { profileStats, loading, error } = useGitHubProfileStats('SKDEV-05');

  // Translation helpers
  const getTrans = (key, defaultText) => {
    const val = t(`githubStats.${key}`);
    return val && !val.startsWith('githubStats.') ? val : defaultText;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="section github-stats-section" id="github">
      {/* Section Header */}
      <motion.div
        className="github-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{getTrans('title', 'GitHub Activity')}</h2>
        <p className="github-subtitle">
          {getTrans('subtitle', 'Real-time statistics and contribution history directly from my GitHub profile.')}
        </p>
      </motion.div>

      {loading ? (
        <div className="github-loading">
          <div className="spinner"></div>
          <p>{getTrans('loading', 'Loading GitHub data…')}</p>
        </div>
      ) : error ? (
        <div className="github-error">
          <p>{getTrans('error', 'Could not load GitHub stats. View my profile directly:')}</p>
          <a href="https://github.com/SKDEV-05" target="_blank" rel="noopener noreferrer" className="github-link-btn">
            <FaGithub /> SKDEV-05
          </a>
        </div>
      ) : (
        <motion.div
          className="github-dashboard"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Stats Cards Grid */}
          <div className="stats-cards-grid">
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon"><FaFolder /></div>
              <div className="stat-info">
                <h3>{profileStats.publicRepos}</h3>
                <p>{getTrans('repositories', 'Repositories')}</p>
              </div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon"><FaStar /></div>
              <div className="stat-info">
                <h3>{profileStats.totalStars}</h3>
                <p>{getTrans('stars', 'Stars')}</p>
              </div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon"><FaCodeBranch /></div>
              <div className="stat-info">
                <h3>{profileStats.totalForks}</h3>
                <p>{getTrans('forks', 'Forks')}</p>
              </div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon"><FaUsers /></div>
              <div className="stat-info">
                <h3>{profileStats.followers}</h3>
                <p>{getTrans('followers', 'Followers')}</p>
              </div>
            </motion.div>
          </div>

          {/* Contribution Graph & Top Languages */}
          <div className="github-details-layout">
            {/* Contribution Calendar Card */}
            <motion.div className="details-card contribution-card" variants={itemVariants}>
              <div className="card-header">
                <FaCalendarAlt />
                <h4>{getTrans('contributionTitle', 'Contribution Calendar')}</h4>
              </div>
              <div className="contributions-graph-wrapper">
                <img
                  src="https://ghchart.rshah.org/00ff88/SKDEV-05"
                  alt="SKDEV-05 GitHub Contribution Chart"
                  className="contribution-chart-img"
                  loading="lazy"
                />
              </div>
              <div className="graph-footer">
                <span>{getTrans('joined', 'Joined GitHub')} {profileStats.createdAt}</span>
                <a href="https://github.com/SKDEV-05" target="_blank" rel="noopener noreferrer" className="view-profile-link">
                  {getTrans('viewProfile', 'View GitHub Profile')} <FaGithub />
                </a>
              </div>
            </motion.div>

            {/* Top Languages Card */}
            <motion.div className="details-card languages-card" variants={itemVariants}>
              <div className="card-header">
                <FaGithub />
                <h4>{getTrans('languagesTitle', 'Top Languages')}</h4>
              </div>
              <div className="languages-list">
                {profileStats.topLanguages.map((lang, idx) => (
                  <div key={idx} className="lang-bar-item">
                    <div className="lang-bar-info">
                      <span className="lang-name">{lang.name}</span>
                      <span className="lang-percentage">{lang.percentage}%</span>
                    </div>
                    <div className="lang-bar-track">
                      <motion.div
                        className="lang-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GitHubStats;
