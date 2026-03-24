import React from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.contact', href: '#contact' }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const id = targetId.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      if (isOpen) setIsOpen(false);
      window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  return (
    <header
      style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}
      className="fixed w-full top-0 z-50"
    >
      <nav className="container mx-auto px-6 py-3 md:py-3 lg:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              fontSize: '1.25rem',
              fontWeight: 400,
              textDecoration: 'none',
              letterSpacing: '0.05em'
            }}
          >
            AAMD
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <div className="flex gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                padding: '2px 0'
              }}
              aria-label="Toggle language"
            >
              <span style={{ color: lang === 'fr' ? 'var(--color-accent-gold)' : 'var(--color-text-muted)' }}>FR</span>
              <span style={{ color: 'var(--color-border)', margin: '0 4px' }}>/</span>
              <span style={{ color: lang === 'en' ? 'var(--color-accent-gold)' : 'var(--color-text-muted)' }}>EN</span>
            </button>

            <div className="hidden lg:flex">
              <SocialLinks />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px' }}
            className="md:hidden mt-4 p-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                  }}
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                <SocialLinks />
                <button
                  onClick={toggleLang}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem'
                  }}
                >
                  <span style={{ color: lang === 'fr' ? 'var(--color-accent-gold)' : 'var(--color-text-muted)' }}>FR</span>
                  <span style={{ color: 'var(--color-border)', margin: '0 4px' }}>/</span>
                  <span style={{ color: lang === 'en' ? 'var(--color-accent-gold)' : 'var(--color-text-muted)' }}>EN</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    <a href="https://maadec.vercel.app/" target="_blank" rel="noopener noreferrer" title="MAADEC"
      style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-gold)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      <Briefcase size={18} />
    </a>
    <a href="https://github.com/AbdoulDiouf2" target="_blank" rel="noopener noreferrer"
      style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      <Github size={18} />
    </a>
    <a href="https://www.linkedin.com/in/abdoul-ahad-mback%C3%A9-diouf-5b04b4213/" target="_blank" rel="noopener noreferrer"
      style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      <Linkedin size={18} />
    </a>
    <a href="mailto:aad.mbacke691@gmail.com"
      style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      <Mail size={18} />
    </a>
    <a href="tel:+33749051879"
      style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      <Phone size={18} />
    </a>
  </div>
);
