import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScrollButton() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [showButton, setShowButton] = useState(false);
  
  // Gestion de l'apparition du bouton en fonction du défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      // Montrer le bouton seulement si on n'est pas tout en haut ou tout en bas
      setShowButton(scrollY > 100 || scrollY + viewportHeight < documentHeight - 10);
      
      // Déterminer si on est plus proche du haut ou du bas de la page
      const scrollProgress = scrollY / (documentHeight - viewportHeight);
      setIsAtTop(scrollProgress < 0.5);
    };
    
    // Ajout et nettoyage de l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérification initiale
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fonction pour aller vers le haut ou le bas selon le contexte
  const handleClick = () => {
    if (isAtTop) {
      // Si on est dans la première moitié de la page, aller en bas
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      // Si on est dans la seconde moitié de la page, aller en haut
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  // Calculer l'opacité en fonction de la visibilité
  const buttonOpacity = showButton ? 1 : 0;
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: buttonOpacity * 0.5, y: buttonOpacity ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed right-6 bottom-[9rem] z-40 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 pointer-events-auto opacity-50 hover:opacity-100" 
      style={{ pointerEvents: showButton ? 'auto' : 'none' }}
      aria-label={isAtTop ? "Défiler vers le bas" : "Remonter en haut"}
    >
      {isAtTop ? <ArrowDown className="w-6 h-6" /> : <ArrowUp className="w-6 h-6" />}
    </motion.button>
  );
}
