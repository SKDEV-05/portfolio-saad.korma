import React, { useState } from 'react';
import '../styles/techstack.scss';
import { TECH_STACK } from '../data/index.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import TechGlobe from './TechGlobe.jsx';

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('3d');
  const { t } = useLanguage();

  // Duplicate the stack to create seamless loop for scrolling section
  const displayStack = [...TECH_STACK, ...TECH_STACK];

  // List of categories for filtering
  const categories = ['all', 'frontend', 'backend', 'database', 'mobile'];

  // Filter tech stack based on active category
  const filteredStack = activeCategory === 'all' 
    ? TECH_STACK 
    : TECH_STACK.filter(tech => tech.category === activeCategory);

  return (
    <section className="tech-stack-section" id="stack">
      <div className="container">
        <h2 className="section-title">{t('techStack.title')}</h2>
        
        {/* Scrolling Tech Icons */}
        <div className="scroll-wrapper" dir="ltr">
          <div className="track">
            {displayStack.map((tech, index) => (
              <a 
                href={tech.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="tech-card" 
                key={index}
              >
                <tech.icon className="icon" />
                <span>{tech.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* View Switcher */}
        <div className="view-switcher" dir="ltr">
          <button
            className={`switcher-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            {t('techStack.views.globe')}
          </button>
          <button
            className={`switcher-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            {t('techStack.views.grid')}
          </button>
        </div>

        {/* Category Filters */}
        <div className="category-filters" dir="ltr">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {t(`techStack.categories.${category}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.div
              key="globe-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TechGlobe activeCategory={activeCategory} />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Skills Grid */}
              <motion.div className="skills-grid" layout>
                <AnimatePresence mode="popLayout">
                  {filteredStack.map((tech) => (
                    <motion.a 
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skill-item"
                      key={tech.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.25 }}
                      style={{ textDecoration: 'none', display: 'block' }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                      <div className="skill-card-content">
                        <div className="skill-info">
                          <tech.icon className="skill-icon" />
                          <span className="skill-name">{tech.name}</span>
                        </div>
                        <span className="skill-category-tag">
                          {t(`techStack.categories.${tech.category}`)}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;
