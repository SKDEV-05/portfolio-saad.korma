import React, { useState, useEffect } from 'react';
import '../styles/contact.scss';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaWhatsapp, FaEnvelope, FaGithub, FaInstagram, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section contact-section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="contact-title">
          {t('contact.title')}
        </h2>
        
        <div className="contact-container-centered">
          <div className="info-column">
            <div className="info-card clock-card">
              <div className="card-header">
                <FaClock className="card-icon glow-icon-green" />
                <h3>{t('contact.localTime')}</h3>
              </div>
              <div className="clock-display">{time}</div>
              <span className="timezone-label">{t('contact.timezone')}</span>
              <div className="status-badge">
                <span className="ping-dot"></span>
                <span>{t('contact.available')}</span>
              </div>
            </div>

            <div className="info-card location-card">
              <div className="card-header">
                <FaMapMarkerAlt className="card-icon glow-icon-blue" />
                <h3>{t('contact.location')}</h3>
              </div>
              <p className="location-text">{t('contact.morocco')}</p>
            </div>

            <div className="info-card quick-connect-card">
              <h3>{t('contact.quickConnect')}</h3>
              <div className="social-links-grid">
                <a href="https://wa.me/212670955826" target="_blank" rel="noopener noreferrer" className="social-badge whatsapp">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:saadkorma84@gmail.com" className="social-badge email">
                  <FaEnvelope />
                  <span>Email</span>
                </a>
                <a href="https://github.com/SKDEV-05" target="_blank" rel="noopener noreferrer" className="social-badge github">
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a href="https://www.instagram.com/saadkorma_dev/" target="_blank" rel="noopener noreferrer" className="social-badge instagram">
                  <FaInstagram />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
