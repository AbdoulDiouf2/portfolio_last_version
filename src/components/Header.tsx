import React from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#home' },
    { label: 'À Propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full top-0 z-50 transition-colors duration-300 dark:bg-gray-900 bg-white/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AAMD
          </a>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4 bg-white dark:bg-gray-800 rounded-lg p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex justify-center space-x-4 pt-4">
                <SocialLinks />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

const SocialLinks = () => (
  <div className="flex items-center space-x-4">
    <a href="https://github.com/AbdoulDiouf2" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300">
      <Github size={20} />
    </a>
    <a href="www.linkedin.com/in/abdoul-ahad-mbacké-diouf-5b04b4213" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300">
      <Linkedin size={20} />
    </a>
    <a href="mailto:aad.mbacke691@gmail.com" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300">
      <Mail size={20} />
    </a>
    <a href="tel:+33749051879" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300">
      <Phone size={20} />
    </a>
  </div>
);