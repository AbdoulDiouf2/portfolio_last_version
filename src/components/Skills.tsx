import React, { useState } from 'react';
import { Code, Database, Wrench, Monitor, BarChart3, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Skills3D from './Skills3D';

// Interface pour représenter une compétence avec son niveau
export interface Skill {
  name: string;
  level: number; // Sur une échelle de 1 à 5
}

// Interface pour les catégories de compétences
interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  category: string;
  skills: Skill[];
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d'); // Utiliser le mode 2D par défaut

  const skillCategories: SkillCategory[] = [
    {
      title: "Langages de programmation",
      icon: <Code className="w-6 h-6" />,
      category: 'programming',
      skills: [
        { name: "C", level: 3 },
        { name: "R", level: 2 },
        { name: "C#", level: 2 },
        { name: "SQL", level: 4 },
        { name: "Java", level: 3 },
        { name: "Python", level: 4 },
        { name: "JavaScript", level: 2 },
        { name: "HTML/CSS", level: 2 }
      ]
    },
    {
      title: "BI & Data",
      icon: <Database className="w-6 h-6" />,
      category: 'data',
      skills: [
        { name: "Talend", level: 2 },
        { name: "NoSQL", level: 2 },
        { name: "SPARK", level: 2 },
        { name: "SAP BI 4", level: 2 },
        { name: "R Studio", level: 2 },
        { name: "Power BI", level: 4 },
        { name: "Hadoop/HDFS", level: 4 },
        { name: "Looker Studio", level: 3 },
        { name: "SQL Developer", level: 4 },
        { name: "MySQL, PL/SQL", level: 4 }
      ]
    },
    {
      title: "Développement & DevOps",
      icon: <Wrench className="w-6 h-6" />,
      category: 'devops',
      skills: [
        { name: "GIT", level: 4 },
        { name: "ArcGIS", level: 2 },
        { name: "NEO4J", level: 2 },
        { name: "Docker", level: 4 },
        { name: "MongoDB", level: 2 },
        { name: "DockerHub", level: 4 },
        { name: "Trello (Kanban)", level: 4 },
        { name: "Docker-Compose", level: 4 },
        { name: "Visual Studio Code", level: 4 }
      ]
    },
    {
      title: "Autres outils",
      icon: <Monitor className="w-6 h-6" />,
      category: 'tools',
      skills: [
        { name: "LLM", level: 2 },
        { name: "Scala", level: 2 },
        { name: "Eclipse", level: 3 },
        { name: "Streamlit", level: 2 },
        { name: "Elastic Search", level: 2 },
        { name: "Pack Microsoft", level: 4 },
        { name: "Jupyter Notebook", level: 4 },
        { name: "Google Workspace", level: 4 },
        { name: "Cloudera/Hortonworks", level: 2 },
      ]
    }
  ];

  const filters = [
    { name: 'all', label: 'Tout' },
    { name: 'programming', label: 'Programmation' },
    { name: 'data', label: 'Big Data' },
    { name: 'devops', label: 'Développement' },
    { name: 'tools', label: 'Outils Divers' },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Compétences Techniques
        </h2>

        {/* Contrôles: Filtres et Toggle de visualisation */}
        <div className="flex flex-col items-center mb-12 space-y-6">
          {/* Toggle de visualisation 2D/3D */}
          <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 mb-4">
            <button
              onClick={() => setViewMode('2d')}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${viewMode === '2d' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              <BarChart3 className="w-4 h-4 mr-2" /> 2D
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${viewMode === '3d' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              <Box className="w-4 h-4 mr-2" /> 3D
            </button>
          </div>
          
          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter.name
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grille de compétences */}
        {viewMode === '2d' ? (
          <div className="w-full">
            <div className={`grid grid-cols-1 ${activeFilter === 'all' ? 'md:grid-cols-2 lg:grid-cols-4' : 'max-w-md mx-auto'} gap-6`}>
              <AnimatePresence mode="wait">
                {skillCategories
                  .filter(category => activeFilter === 'all' || category.category === activeFilter)
                  .map((category) => (
                    <motion.div
                      key={category.title}
                      className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="text-blue-600 dark:text-blue-400">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">{category.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {category.skills.map((skill) => (
                          <li key={skill.name} className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{renderSkillLevel(skill.level)}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${getSkillLevelColor(skill.level)}`} 
                                style={{ width: `${skill.level * 20}%` }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className={`grid grid-cols-1 ${activeFilter === 'all' ? 'md:grid-cols-2' : 'max-w-xl mx-auto'} gap-6`}>
              {skillCategories
                .filter(category => activeFilter === 'all' || category.category === activeFilter)
                .map((category) => (
                  <motion.div
                    key={`3d-${category.title}`}
                    className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-blue-600 dark:text-blue-400">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">{category.title}</h3>
                    </div>
                    
                    <Skills3D 
                      skills={category.skills} 
                      categoryTitle={category.title}
                      categoryColor={category.category === 'programming' ? '#3b82f6' : 
                                     category.category === 'data' ? '#8b5cf6' : 
                                     category.category === 'devops' ? '#6366f1' : '#a78bfa'}
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">Qualités personnelles</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Rigueur", "Dynamisme", "Esprit d'équipe", "Capacité d'adaptation", "Intérêt pour l'amélioration continue"].map((quality, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm"
                >
                  {quality}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Fonction pour afficher le niveau de compétence sous forme textuelle
function renderSkillLevel(level: number): string {
  switch (level) {
    case 1: return "Débutant";
    case 2: return "Intermédiaire";
    case 3: return "Avancé";
    case 4: return "Très avancé";
    case 5: return "Expert";
    default: return "";
  }
}

// Fonction pour obtenir la couleur de la barre de progression en fonction du niveau
function getSkillLevelColor(level: number): string {
  switch (level) {
    case 1: return "bg-blue-300 dark:bg-blue-900";
    case 2: return "bg-blue-400 dark:bg-blue-800";
    case 3: return "bg-blue-500 dark:bg-blue-700";
    case 4: return "bg-gradient-to-r from-blue-500 to-purple-400";
    case 5: return "bg-gradient-to-r from-blue-600 to-purple-600";
    default: return "bg-gray-300";
  }
}