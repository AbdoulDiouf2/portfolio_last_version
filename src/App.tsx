import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import ScrollButton from './components/ScrollButton';
import ChatbotAssistant from './components/ChatbotAssistant';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ReactGA from 'react-ga4';

function App() {
  useEffect(() => {
    // Set default theme to dark mode
    document.documentElement.classList.add('dark');
    
    // Envoyer un événement de page vue à Google Analytics
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
    // Fonction pour suivre les vues des sections
    const trackSectionView = () => {
      const sections = document.querySelectorAll('section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ReactGA.event({
              category: 'Section',
              action: 'view',
              label: entry.target.id
            });
          }
        });
      }, { threshold: 0.6 }); // Déclencher lorsque 60% de la section est visible
      
      sections.forEach(section => {
        observer.observe(section);
      });
    };
    
    // Initialiser le suivi des sections
    trackSectionView();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <Hero />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <About />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <Skills />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <Experience />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <Contact />
        </motion.div>
        <ThemeToggle />
        <ScrollButton />
        <ChatbotAssistant />
      </div>
    </ThemeProvider>
  );
}

export default App;