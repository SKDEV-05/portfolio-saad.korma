import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/projects.scss';
import { PROJECTS } from '../data/index.jsx';
import ProjectCard from './ProjectCard.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import { HiSparkles } from 'react-icons/hi2';
import { FaCode, FaChevronDown } from 'react-icons/fa';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 }
  }
};

const Projects = () => {
  const { t } = useLanguage();
  const [showOthers, setShowOthers] = useState(false);

  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects    = PROJECTS.filter(p => !p.featured);

  return (
    <section className="section projects-section" id="projects">

      {/* ── Section Header ──────────────────────────────── */}
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="projects-subtitle">{t('projects.subtitle')}</p>
      </motion.div>

      {/* ── Featured Projects ────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <>
          <motion.div
            className="projects-divider"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="divider-icon"><HiSparkles /></span>
            <span className="divider-label">{t('projects.featuredLabel')}</span>
            <div className="divider-line"></div>
          </motion.div>

          <div className="projects-container">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </>
      )}

      {/* ── Other Projects — collapsed by default ────────── */}
      {otherProjects.length > 0 && (
        <>
          {/* Show More / Show Less toggle */}
          <div className="projects-show-more">
            <button
              className={`show-more-btn ${showOthers ? 'expanded' : ''}`}
              onClick={() => setShowOthers(v => !v)}
            >
              <FaCode />
              <span>
                {showOthers
                  ? t('projects.hidePrevious') || 'Hide Previous Projects'
                  : `${t('projects.showPrevious') || 'Show Previous Projects'} (${otherProjects.length})`}
              </span>
              <FaChevronDown />
            </button>
          </div>

          <AnimatePresence>
            {showOthers && (
              <motion.div
                key="others"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div
                  className="projects-divider"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <span className="divider-icon"><FaCode /></span>
                  <span className="divider-label">{t('projects.otherLabel')}</span>
                  <div className="divider-line"></div>
                </motion.div>

                <motion.div
                  className="projects-container"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {otherProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
};

export default Projects;
