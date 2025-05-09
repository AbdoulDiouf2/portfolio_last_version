import React from 'react';
import { Skill } from './Skills';

interface Skills3DProps {
  skills: Skill[];
  categoryTitle: string;
  categoryColor: string;
}

const Skills3D: React.FC<Skills3DProps> = ({ skills, categoryTitle, categoryColor }) => {
  // Create a color class based on the category
  const getColorClass = () => {
    switch (categoryColor) {
      case '#3b82f6': return 'from-blue-500 to-blue-700';
      case '#8b5cf6': return 'from-purple-500 to-purple-700';
      case '#6366f1': return 'from-indigo-500 to-indigo-700';
      default: return 'from-violet-500 to-violet-700';
    }
  };
  
  // Sort skills by level (highest first)
  const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

  return (
    <div 
      className="w-full relative mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden p-6"
      aria-label={`Visualisation 3D des compétences en ${categoryTitle}`}
      style={{ minHeight: '320px' }}
    >
      <div className="absolute top-0 left-0 p-2 z-10 bg-gray-800 bg-opacity-50 rounded text-white text-sm">
        {categoryTitle} - Visualisation alternative
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
        {sortedSkills.map((skill, index) => {
          const size = 30 + (skill.level * 15); // Size based on skill level
          const delay = index * 0.1; // Staggered animation
          
          return (
            <div 
              key={skill.name}
              className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${getColorClass()} shadow-lg transform hover:scale-110 transition-all cursor-pointer animate-pulse-slow`}
              style={{
                width: `${size}px`, 
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: '3s',
                opacity: 0.5 + (skill.level / 10)
              }}
              title={`${skill.name}: ${skill.level} / 5`}
            >
              <span className="text-xs text-white font-bold p-2 text-center">{skill.name}</span>
              
              {/* Orbit effect */}
              <div 
                className="absolute w-full h-full rounded-full border border-white opacity-30 animate-orbit"
                style={{ animationDuration: `${6 + skill.level}s` }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills3D;
