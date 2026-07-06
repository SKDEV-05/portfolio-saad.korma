import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MyJourney from './components/MyJourney';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import SwimmingIcons from './components/SwimmingIcons';
import LoadingScreen from './components/LoadingScreen';
// import CustomCursor from './components/CustomCursor';

import PageProgressBar from './components/PageProgressBar';
import BackToTop from './components/BackToTop';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize theme on mount (for loading screen and initial render)
  useEffect(() => {
    const getInitialTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    };
    document.documentElement.setAttribute('data-theme', getInitialTheme());
  }, []);
  
  // Basic SEO setup in useEffect or Helmet (if installed, but native DOM maniup is fine for simple portfolio)
  useEffect(() => {
    document.title = "Saad Korma | Full-Stack Developer";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Full-Stack Web & Mobile Developer - Backend, Frontend, APIs, Databases. Building real projects for real clients.");
    } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = "Full-Stack Web & Mobile Developer - Backend, Frontend, APIs, Databases. Building real projects for real clients.";
        document.head.appendChild(meta);
    }
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="App">
      <PageProgressBar />
      {/* Custom cursor removed - not good */}
      <SwimmingIcons />
      <ThreeBackground />
      <Navbar />
      <Hero />
      <About />
      <MyJourney />
      <Services />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
