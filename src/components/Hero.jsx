import React, { useEffect, useRef, useState } from 'react';
import '../styles/hero.scss';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { PROFILE } from '../data/index.jsx';
// import ThreeBackground from './ThreeBackground.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import cvFile from '../assets/cv/Saad_Korma_CV.pdf';

const Hero = () => {
  const nameRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  
  // Use translation for subtitle
  const fullText = t('hero.subtitle');

  useEffect(() => {
    // GSAP animations
    gsap.set(nameRef.current, { opacity: 1 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(nameRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 0.3 }
    );

    // Letter by letter animation for subtitle
    let currentIndex = 0;
    // Reset typing on language change
    setDisplayedText('');
    
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText]); // Re-run when language changes

  // Mouse movement... (same as before)

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>
      {/* <ThreeBackground /> */}
      
      {/* Animated background elements */}
      <div className="floating-shapes">
        <motion.div 
          className="shape shape-1"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
        <motion.div 
          className="shape shape-2"
          animate={{
            x: -mousePosition.x * 0.5,
            y: -mousePosition.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 30 }}
        />
      </div>

      <div className="container centered-container">
        {/* Centered Content */}
        <motion.div 
          className="hero-content centered-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          {/* Circular Glowing Avatar at the top (Up) */}
          <motion.div 
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
             <img src={PROFILE.image} alt={PROFILE.name} />
          </motion.div>

          {/* Status Badge */}
          <motion.div 
            className="status-badge-hero"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="ping-dot"></span>
            <span>{t('hero.badge')}</span>
          </motion.div>

          <motion.h1
            ref={nameRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-name"
            data-text={`${t('hero.name')} ${t('hero.lastName')}`}
          >
            {t('hero.name')} <span>{t('hero.lastName')}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="#projects" className="btn primary">{t('hero.viewWork')} →</a>
            <a href="#contact" className="btn secondary">{t('hero.letsTalk') || t('nav.contact')}</a>
            <a href={cvFile} download="Saad_Korma_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn cv-btn">{t('hero.downloadCV')}</a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrows">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
