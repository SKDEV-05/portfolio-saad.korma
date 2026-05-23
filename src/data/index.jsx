import profileImg from '../assets/profile/profile.jpeg';

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
import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaPython, FaReact, FaLaravel, FaNodeJs, FaGlobe, FaJava } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiTailwindcss, SiExpo } from 'react-icons/si';

export const PROFILE = {
  name: "Saad Korma",
  title: "Full-Stack Web & Mobile Developer",
  description: "I build full-stack web and mobile applications, from backend APIs to frontend interfaces, focusing on performance and real-world solutions. I turn complex problems into smooth, efficient code.",
  image: profileImg,
  social: {
    instagram: "https://www.instagram.com/saadkorma_dev/",
    tiktok: "#",
    github: "https://github.com/SKDEV-05",
    phone: "0670955826"
  }
};

export const TECH_STACK = [
  { name: "HTML", icon: FaHtml5, category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", icon: FaCss3Alt, category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", icon: FaJs, category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "PHP", icon: FaPhp, category: "backend", link: "https://www.php.net/docs.php" },
  { name: "Python", icon: FaPython, category: "backend", link: "https://docs.python.org/3/" },
  { name: "Java", icon: FaJava, category: "backend", link: "https://docs.oracle.com/en/java/" },
  { name: "React", icon: FaReact, category: "frontend", link: "https://react.dev/" },
  { name: "Laravel", icon: FaLaravel, category: "backend", link: "https://laravel.com/docs" },
  { name: "MongoDB", icon: SiMongodb, category: "database", link: "https://www.mongodb.com/docs/" },
  { name: "Inertia.js", icon: FaGlobe, category: "frontend", link: "https://inertiajs.com/" },
  { name: "Express.js", icon: FaNodeJs, category: "backend", link: "https://expressjs.com/" },
  { name: "MySQL", icon: SiMysql, category: "database", link: "https://dev.mysql.com/doc/" },
  { name: "React Native", icon: SiExpo, category: "mobile", link: "https://reactnative.dev/docs/getting-started" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce solution with product management, cart functionality, and secure checkout as well as an admin dashboard.",
    stack: ["HTML", "CSS", "Topography SCSS", "JavaScript", "PHP", "MySQL"],
    type: "slider",
    assets: [ecommerce1, ecommerce2]
  },
  {
    id: 2,
    title: "School Management System",
    description: "Comprehensive management system for educational institutions, handling students, grades, and administrative tasks efficiently.",
    stack: ["HTML", "CSS", "SCSS", "JavaScript", "PHP", "MySQL"],
    type: "scroll-reveal",
    assets: [schoolImg]
  },
  {
    id: 3,
    title: "Social Media Application",
    description: "Real-time social platform featuring live chat, posts, and user interactions without page refreshes, powered by WebSockets.",
    stack: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "Laravel Reverb"],
    type: "slider",
    assets: [social1, social2, socialChat]
  }
];
