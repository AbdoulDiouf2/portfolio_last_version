import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    // Set default theme to dark mode
    document.documentElement.classList.add('dark');
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
      </div>
    </ThemeProvider>
  );
}

export default App;