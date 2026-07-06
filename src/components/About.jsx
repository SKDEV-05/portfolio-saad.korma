import React from 'react';
import '../styles/about.scss';
import { PROFILE } from '../data/index.jsx';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="section about-section" id="about">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t('about.title')}
      </motion.h2>
      <div className="about-content">
        <motion.div 
          className="profile-img"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ 
            rotateY: 15, 
            rotateX: -10,
            scale: 1.05,
            boxShadow: '0 20px 40px var(--color-accent-glow)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ perspective: 1000 }}
        >
          <img src={PROFILE.image} alt={PROFILE.name} />
        </motion.div>
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('about.p2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('about.p3') }} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
