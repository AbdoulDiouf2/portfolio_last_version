import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CTABanner from './components/CTABanner';
import Contact from './components/Contact';
import ScrollButton from './components/ScrollButton';
import ChatbotAssistant from './components/ChatbotAssistant';
import ReactGA from 'react-ga4';

function App() {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ReactGA.event({ category: 'Section', action: 'view', label: entry.target.id });
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CTABanner />
      <Contact />
      <ScrollButton />
      <ChatbotAssistant />
    </div>
  );
}

export default App;
