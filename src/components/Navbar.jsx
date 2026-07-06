import React, { useState, useEffect } from 'react';
import '../styles/navbar.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const Navbar = () => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <>
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        <div className="logo" onClick={() => scrollToSection('hero')}>SK.</div>
        
        <ul className="nav-links">
          <li><a onClick={() => scrollToSection('hero')}>{t('nav.home')}</a></li>
          <li><a onClick={() => scrollToSection('about')}>{t('nav.about')}</a></li>
          <li><a onClick={() => scrollToSection('journey')}>{t('nav.journey')}</a></li>
          <li><a onClick={() => scrollToSection('services')}>{t('nav.services')}</a></li>
          <li><a onClick={() => scrollToSection('stack')}>{t('nav.skills')}</a></li>
          <li><a onClick={() => scrollToSection('projects')}>{t('nav.projects')}</a></li>
          <li><a onClick={() => scrollToSection('contact')}>{t('nav.contact')}</a></li>
        </ul>

        <div className="controls">
          <div className="language-switcher">
            <button 
              className="lang-btn" 
              onClick={() => setShowLangMenu(!showLangMenu)}
              title="Change Language"
            >
              <span className="flag">{currentLang.flag}</span>
              <FaGlobe />
            </button>
            
            {showLangMenu && (
              <div className="lang-menu">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`lang-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                  >
                    <span className="flag">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>


          {/* Hamburger Menu Toggler */}
          <button 
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="drawer-content">
              <ul className="drawer-links">
                <li><a onClick={() => scrollToSection('hero')}>{t('nav.home')}</a></li>
                <li><a onClick={() => scrollToSection('about')}>{t('nav.about')}</a></li>
                <li><a onClick={() => scrollToSection('journey')}>{t('nav.journey')}</a></li>
                <li><a onClick={() => scrollToSection('services')}>{t('nav.services')}</a></li>
                <li><a onClick={() => scrollToSection('stack')}>{t('nav.skills')}</a></li>
                <li><a onClick={() => scrollToSection('projects')}>{t('nav.projects')}</a></li>
                <li><a onClick={() => scrollToSection('contact')}>{t('nav.contact')}</a></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
