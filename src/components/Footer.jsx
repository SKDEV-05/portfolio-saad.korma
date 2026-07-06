import React from 'react';
import '../styles/footer.scss';
import { PROFILE } from '../data/index.jsx';
import { FaInstagram, FaGithub, FaPhone, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Saad Korma</h3>
          <p>
            Building high-performance web and mobile applications with a focus on real-world solutions and exceptional user experiences.
          </p>
          <div className="social-links">
            {PROFILE.social.github && (
              <motion.a 
                href={PROFILE.social.github} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
            )}
            {PROFILE.social.instagram && (
              <motion.a 
                href={PROFILE.social.instagram} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
            )}
            {PROFILE.social.tiktok && (
              <motion.a 
                href={PROFILE.social.tiktok} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTiktok />
              </motion.a>
            )}
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Me</h3>
          <div className="contact-info">
            <div><FaPhone /> {PROFILE.social.phone}</div>
            <div><FaEnvelope /> saadkorma84@gmail.com</div>
            <div>Available for Worldwide Projects</div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Location</h3>
          <div className="contact-info">
            <div>Casablanca, Morocco</div>
            <p>Based in Morocco, working with clients globally.</p>
          </div>
        </div>
      </div>

      <div className="copyright-section">
        <div className="logo">SK.</div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>
        <div className="designer">
          Designed with ❤️ by Saad Korma 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
