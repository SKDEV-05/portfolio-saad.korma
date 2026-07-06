import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaGraduationCap, FaLaptopCode, FaBriefcase } from 'react-icons/fa';
import '../styles/myjourney.scss';

const MyJourney = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineItems = [
    {
      key: 'bac',
      icon: FaGraduationCap,
      tags: ['Physics', 'Chemistry', 'Honors (Assez Bien)'],
      color: '#00ff88' // Green
    },
    {
      key: 'digitalDev',
      icon: FaLaptopCode,
      tags: ['React', 'Laravel', 'Full-Stack', 'Web Dev'],
      color: '#00d4ff' // Cyan
    },
    {
      key: 'internship',
      icon: FaBriefcase,
      tags: ['React Native', 'Mobile Dev', 'Expo', 'Toovago App'],
      color: '#ff00ff' // Magenta
    }
  ];

  return (
    <section className="journey-section" id="journey" ref={containerRef}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('journey.title')}
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('journey.subtitle')}
        </motion.p>

        <div className="timeline-container">
          {/* Central Vertical Line */}
          <div className="timeline-line-bg">
            <motion.div 
              className="timeline-line-progress" 
              style={{ scaleY, transformOrigin: 'top' }}
            />
          </div>

          {timelineItems.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon = item.icon;

            return (
              <div key={item.key} className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
                {/* Timeline Dot/Node */}
                <div className="timeline-node" style={{ borderColor: item.color }}>
                  <Icon className="node-icon" style={{ color: item.color }} />
                  <span className="node-pulse" style={{ backgroundColor: item.color }}></span>
                </div>

                {/* Timeline Card */}
                <motion.div 
                  className="timeline-card"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: `0 15px 35px rgba(${item.key === 'bac' ? '0, 255, 136' : item.key === 'digitalDev' ? '0, 212, 255' : '255, 0, 255'}, 0.15)`,
                    borderColor: item.color
                  }}
                >
                  <div className="card-header">
                    <span className="year-badge" style={{ background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}44 100%)`, color: item.color, border: `1px solid ${item.color}44` }}>
                      {t(`journey.${item.key}.date`)}
                    </span>
                    <h3>{t(`journey.${item.key}.title`)}</h3>
                    <h4 className="institution">{t(`journey.${item.key}.institution`)}</h4>
                  </div>
                  
                  <p>{t(`journey.${item.key}.description`)}</p>
                  
                  <div className="card-tags">
                    {item.tags.map(tag => (
                      <span key={tag} className="tag" style={{ border: `1px solid ${item.color}15`, background: `${item.color}07` }}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyJourney;
