import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Server, Database, Github, GraduationCap } from 'lucide-react';

const AboutBackground: React.FC = () => {
  // Définir différentes icônes qui représentent le parcours académique et les centres d'intérêt
  const icons = [
    { Icon: BookOpen, color: 'text-green-600 dark:text-green-300', size: 'w-10 h-10', position: 'top-1/4 left-1/4', delay: 0 },
    { Icon: Code, color: 'text-blue-600 dark:text-blue-300', size: 'w-12 h-12', position: 'top-1/3 right-1/3', delay: 1 },
    { Icon: Server, color: 'text-purple-600 dark:text-purple-300', size: 'w-8 h-8', position: 'bottom-1/4 left-1/3', delay: 2 },
    { Icon: Database, color: 'text-indigo-600 dark:text-indigo-300', size: 'w-14 h-14', position: 'top-1/2 right-1/4', delay: 1.5 },
    { Icon: Github, color: 'text-gray-600 dark:text-gray-300', size: 'w-10 h-10', position: 'bottom-1/3 right-1/5', delay: 0.5 },
    { Icon: GraduationCap, color: 'text-yellow-600 dark:text-yellow-300', size: 'w-12 h-12', position: 'bottom-1/5 left-1/5', delay: 2.5 }
  ];

  // Définir des cercles et formes géométriques pour l'arrière-plan
  const shapes = [
    { type: 'circle', color: 'border-blue-400 dark:border-blue-200', size: 'w-32 h-32', position: 'top-1/4 -left-10', delay: 0.2 },
    { type: 'circle', color: 'border-purple-400 dark:border-purple-200', size: 'w-40 h-40', position: 'bottom-1/3 -right-12', delay: 1.2 },
    { type: 'square', color: 'border-green-400 dark:border-green-200', size: 'w-24 h-24', position: 'top-1/2 right-1/4', delay: 0.8 },
    { type: 'square', color: 'border-indigo-400 dark:border-indigo-200', size: 'w-36 h-36', position: 'bottom-1/4 left-1/5', delay: 1.8 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-80 dark:opacity-70">
      {/* Cercles et formes géométriques */}
      {shapes.map((shape, index) => (
        <motion.div
          key={`shape-${index}`}
          className={`absolute ${shape.position} ${shape.size} border-2 ${shape.color} rounded-${shape.type === 'circle' ? 'full' : 'xl'} opacity-60 dark:opacity-40`}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            rotate: [0, shape.type === 'circle' ? 360 : 45, 0] 
          }}
          transition={{ 
            duration: 15, 
            ease: "easeInOut", 
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}

      {/* Icônes flottantes */}
      {icons.map((IconItem, index) => (
        <motion.div
          key={`icon-${index}`}
          className={`absolute ${IconItem.position}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            delay: IconItem.delay,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <IconItem.Icon className={`${IconItem.size} ${IconItem.color} opacity-80`} />
        </motion.div>
      ))}

      {/* Lignes diagonales décoratives */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-100 to-transparent dark:via-blue-900 opacity-50 dark:opacity-20"></div>
      
      {/* Effet de grille subtile */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10"></div>
    </div>
  );
};

export default AboutBackground;
