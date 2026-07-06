import profileImg from '../assets/profile/profile.jpeg';

// Projects - SKElectronics (NEW - FEATURED)
import skElec1 from '../assets/projects/SKElectronics/screen1.png';
import skElec2 from '../assets/projects/SKElectronics/screen2.png';
import skElec3 from '../assets/projects/SKElectronics/screen3.png';
import skElec4 from '../assets/projects/SKElectronics/screen4.png';

// Projects - EndoTalent (NEW - FEATURED)
import endoTalent1 from '../assets/projects/EndoTalent/screen1.png';
import endoTalent2 from '../assets/projects/EndoTalent/screen2.png';
import endoTalent3 from '../assets/projects/EndoTalent/screen3.png';

// Projects - SafetyAI (NEW - FEATURED)
import safetyAI1 from '../assets/projects/SafetyAI/screen1.png';
import safetyAIVideo from '../assets/projects/SafetyAI/video1.mp4';

// Projects - Ecommerce
import ecommerce1 from '../assets/projects/ecommerce/ecommerce1.png';
import ecommerce2 from '../assets/projects/ecommerce/ecommerce2.png';

// Projects - School
import schoolImg from '../assets/projects/school-management/school_management.png';

// Projects - Social
import social1 from '../assets/projects/social-media/social1.png';
import social2 from '../assets/projects/social-media/social2.png';
import socialChat from '../assets/projects/social-media/chat.png';

// Icons
import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaPython, FaReact, FaLaravel, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiTailwindcss, SiExpo, SiNextdotjs, SiSass, SiTypescript, SiRedux, SiSpringboot, SiC } from 'react-icons/si';

export const PROFILE = {
  name: "Saad Korma",
  title: "Full-Stack Web & Mobile Developer",
  description: "20-year-old Full-Stack Developer from Morocco. Passionate about building fast, scalable web applications.",
  image: profileImg,
  social: {
    instagram: "https://www.instagram.com/saadkorma_dev/",
    tiktok: "#",
    github: "https://github.com/SKDEV-05",
    phone: "0670955826"
  }
};

export const TECH_STACK = [
  // ── Languages ──────────────────────────────────────────────────────────
  { name: "C",           icon: SiC,           category: "language", link: "https://en.cppreference.com/w/c" },
  { name: "Java",        icon: FaJava,        category: "language", link: "https://docs.oracle.com/en/java/" },
  { name: "JavaScript",  icon: FaJs,          category: "language", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "PHP",         icon: FaPhp,         category: "language", link: "https://www.php.net/docs.php" },
  { name: "Python",      icon: FaPython,      category: "language", link: "https://docs.python.org/3/" },
  { name: "TypeScript",  icon: SiTypescript,  category: "language", link: "https://www.typescriptlang.org/docs/" },

  // ── Frontend ────────────────────────────────────────────────────────────
  { name: "React",       icon: FaReact,       category: "frontend", link: "https://react.dev/" },
  { name: "Next.js",     icon: SiNextdotjs,   category: "frontend", link: "https://nextjs.org/docs" },
  { name: "Redux",       icon: SiRedux,       category: "frontend", link: "https://redux.js.org/" },
  { name: "TailwindCSS", icon: SiTailwindcss, category: "frontend", link: "https://tailwindcss.com/docs" },
  { name: "SASS",        icon: SiSass,        category: "frontend", link: "https://sass-lang.com/documentation/" },
  { name: "HTML",        icon: FaHtml5,       category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS",         icon: FaCss3Alt,     category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },

  // ── Mobile ──────────────────────────────────────────────────────────────
  { name: "React Native", icon: FaReact,       category: "mobile", link: "https://reactnative.dev/docs/getting-started" },
  { name: "Expo",         icon: SiExpo,        category: "mobile", link: "https://docs.expo.dev/" },

  // ── Backend ─────────────────────────────────────────────────────────────
  { name: "Laravel",     icon: FaLaravel,     category: "backend", link: "https://laravel.com/docs" },
  { name: "SpringBoot",  icon: SiSpringboot,  category: "backend", link: "https://spring.io/projects/spring-boot" },
  { name: "Express.js",  icon: FaNodeJs,      category: "backend", link: "https://expressjs.com/" },

  // ── Database ─────────────────────────────────────────────────────────────
  { name: "MySQL",       icon: SiMysql,       category: "database", link: "https://dev.mysql.com/doc/" },
  { name: "MongoDB",     icon: SiMongodb,     category: "database", link: "https://www.mongodb.com/docs/" },
];

export const PROJECTS = [
  // ─── FEATURED / NEW PROJECTS ───────────────────────────────────────────
  {
    id: 4,
    featured: true,
    badge: "E-Commerce",
    badgeColor: "#f97316",
    title: "SKElectronics",
    translationKey: "skelectronics",
    description: "Full-stack e-commerce platform for electronics — phones, laptops and more. Features a sleek dark UI, product catalog, shopping cart, multi-language support, and a full admin dashboard.",
    stack: ["React", "Laravel", "Inertia.js", "MySQL", "Tailwind CSS"],
    type: "slider",
    assets: [skElec1, skElec2, skElec3, skElec4],
    github: "https://github.com/SKDEV-05/electronic-ecom",
    domain: "skelectronics.dev",
    repo: "electronic-ecom"
  },
  {
    id: 5,
    featured: true,
    badge: "AI + Sport",
    badgeColor: "#22c55e",
    title: "EndoTalent",
    translationKey: "endotalent",
    description: "AI-powered football talent scouting platform. Uses MediaPipe for real-time body pose detection and Gemini AI to analyze player performance, generate ratings, and classify player profiles.",
    stack: ["React", "Laravel", "Inertia.js", "MediaPipe", "Gemini AI", "MySQL"],
    type: "slider",
    assets: [endoTalent1, endoTalent2, endoTalent3],
    github: "https://github.com/SKDEV-05/bayanMawhibtek",
    domain: "endotalent.dev",
    repo: "bayanMawhibtek"
  },
  {
    id: 6,
    featured: true,
    badge: "AI + Medical",
    badgeColor: "#06b6d4",
    title: "SafetyAI",
    translationKey: "safetyai",
    description: "AI sports medical platform for injury prevention and recovery. Detects body posture using MediaPipe, analyzes injury risks (ACL/MCL), predicts return-to-play timelines, and processes medical images with Gemini AI.",
    stack: ["Next.js", "Flask", "MediaPipe", "Gemini AI", "Python"],
    type: "video",
    assets: [safetyAI1],
    video: safetyAIVideo,
    github: "https://github.com/SKDEV-05/ai-injury",
    domain: "safetyai.dev",
    repo: "ai-injury"
  },
  // ─── PREVIOUS PROJECTS ─────────────────────────────────────────────────
  {
    id: 1,
    featured: false,
    title: "E-commerce Platform",
    translationKey: "ecommerce",
    description: "A full-featured e-commerce solution with product management, cart functionality, and secure checkout as well as an admin dashboard.",
    stack: ["HTML", "CSS", "Topography SCSS", "JavaScript", "PHP", "MySQL"],
    type: "slider",
    assets: [ecommerce1, ecommerce2],
    domain: "ecommerce.dev"
  },
  {
    id: 2,
    featured: false,
    title: "School Management System",
    translationKey: "school",
    description: "Comprehensive management system for educational institutions, handling students, grades, and administrative tasks efficiently.",
    stack: ["HTML", "CSS", "SCSS", "JavaScript", "PHP", "MySQL"],
    type: "scroll-reveal",
    assets: [schoolImg],
    domain: "school.dev"
  },
  {
    id: 3,
    featured: false,
    title: "Social Media Application",
    translationKey: "social",
    description: "Real-time social platform featuring live chat, posts, and user interactions without page refreshes, powered by WebSockets.",
    stack: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "Laravel Reverb"],
    type: "slider",
    assets: [social1, social2, socialChat],
    domain: "social.dev"
  }
];
