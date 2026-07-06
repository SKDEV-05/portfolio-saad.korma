import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useLanguage } from '../i18n/LanguageContext';
import { FaGithub, FaPlay } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// ── Image with skeleton ─────────────────────────────────
const ImageWithSkeleton = ({ src, alt, style }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="img-skeleton-wrap">
      {!loaded && <div className="skeleton-loader" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, ...style }}
      />
    </div>
  );
};

// ── Native video player ─────────────────────────────────
const VideoPlayer = ({ src, poster }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const handleToggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video-wrapper" onClick={handleToggle}>
      {!playing && (
        <div className="video-overlay">
          <div className="play-btn-circle"><FaPlay /></div>
          <span>Watch Demo</span>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
};



// ── Main ProjectCard ────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const isReversed = index % 2 !== 0;
  const { t } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Alternate slide direction: even ← left, odd → right
  const slideX = isReversed ? 80 : -80;

  // Translations
  const tk = project.translationKey || '';
  const rawTitle = tk ? t(`projects.${tk}.title`) : '';
  const rawDesc  = tk ? t(`projects.${tk}.description`) : '';
  const title       = rawTitle && !rawTitle.startsWith('projects.') ? rawTitle : project.title;
  const description = rawDesc  && !rawDesc.startsWith('projects.')  ? rawDesc  : project.description;

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rX = -((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * 5;
    const rY =  ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * 5;
    setTilt({ x: rX, y: rY });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      className={`project-card ${isReversed ? 'reversed' : ''} ${project.featured ? 'project-card--featured' : ''}`}
      initial={{ opacity: 0, x: slideX, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        '--badge-color': project.badgeColor || 'var(--color-accent)'
      }}
    >
      {/* ── Info panel ─────────────────────────────────── */}
      <div className="project-content" style={{ transform: 'translateZ(30px)' }}>

        {/* Badges */}
        <div className="project-badges">
          {project.featured && (
            <span className="badge badge--featured">
              <HiSparkles /> Featured
            </span>
          )}
          {project.badge && (
            <span className="badge badge--category" style={{ '--badge-bg': project.badgeColor }}>
              {project.badge}
            </span>
          )}
        </div>

        <h3>{title}</h3>
        <p className="description">{description}</p>

        {/* Tech stack */}
        <div className="stack">
          {project.stack.map((tech, i) => <span key={i}>{tech}</span>)}
        </div>

        {/* GitHub action */}
        <div className="project-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn project-btn--github"
              onClick={e => e.stopPropagation()}
            >
              <FaGithub /><span>View Code</span>
            </a>
          )}
        </div>


      </div>

      {/* ── Browser mockup ─────────────────────────────── */}
      <div className="mock-browser" dir="ltr" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
        <div className="browser-header">
          <div className="window-dots">
            <span className="dot dot-close" /><span className="dot dot-minimize" /><span className="dot dot-maximize" />
          </div>
          <div className="browser-address">
            <span>https://{project.domain || 'saadkorma.dev'}</span>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="browser-github-icon"
              onClick={e => e.stopPropagation()}
            >
              <FaGithub />
            </a>
          )}
        </div>

        <div className="project-media">
          {project.type === 'video' && (
            <VideoPlayer src={project.video} poster={project.assets[0]} />
          )}
          {project.type === 'slider' && (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              className="project-slider"
              observer
              observeParents
            >
              {project.assets.map((img, i) => (
                <SwiperSlide key={i}>
                  <ImageWithSkeleton src={img} alt={`${title} screenshot ${i + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {project.type === 'scroll-reveal' && (
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
              <ImageWithSkeleton src={project.assets[0]} alt={title} style={{ borderRadius: '0 0 12px 12px' }} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
