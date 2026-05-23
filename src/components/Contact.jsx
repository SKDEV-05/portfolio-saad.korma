import React, { useState, useEffect } from 'react';
import '../styles/contact.scss';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaWhatsapp, FaEnvelope, FaGithub, FaInstagram, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    telephone: '',
    need: 'Website',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
*New Contact from Portfolio*

👤 Name: ${formData.fullName}
📱 Phone: ${formData.telephone}
🎯 Need: ${formData.need}

💬 Message:
${formData.message}
    `.trim();

    const phoneNumber = '212670955826';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    setFormData({
      fullName: '',
      telephone: '',
      need: 'Website',
      message: ''
    });
  };

  const handleEmailSubmit = () => {
    const subject = `New Contact from Portfolio: ${formData.need}`;
    const body = `Name: ${formData.fullName}\nPhone: ${formData.telephone}\nNeed: ${formData.need}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:saadkorma84@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setFormData({
      fullName: '',
      telephone: '',
      need: 'Website',
      message: ''
    });
  };

  return (
    <section className="section contact-section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="contact-title">
          {t('contact.title')} <span>{t('contact.titleWebsite')}</span> {t('contact.titleOr')} <span>{t('contact.titleApp')}</span>
        </h2>
        
        <div className="contact-grid">
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

          <div className="form-column">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">{t('contact.fullName')} *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.placeholderName')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">{t('contact.telephone')} *</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.placeholderPhone')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="need">{t('contact.need')} *</label>
                <select
                  id="need"
                  name="need"
                  value={formData.need}
                  onChange={handleChange}
                  required
                >
                  <option value="Website">{t('contact.needWebsite')}</option>
                  <option value="Mobile App">{t('contact.needMobile')}</option>
                  <option value="Both">{t('contact.needBoth')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder={t('contact.placeholderMessage')}
                ></textarea>
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn whatsapp">
                  <FaWhatsapp />
                  <span>{t('contact.submit')}</span>
                </button>
                <button type="button" className="submit-btn email" onClick={handleEmailSubmit}>
                  <FaEnvelope />
                  <span>{t('contact.directEmail')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
