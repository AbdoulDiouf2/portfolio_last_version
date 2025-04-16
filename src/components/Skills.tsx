import React, { useState } from 'react';
import { Code, Database, Wrench, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const skillCategories = [
    {
      title: "Langages de programmation",
      icon: <Code className="w-6 h-6" />,
      category: 'programming',
      skills: ["C", "Java", "Python", "C#", "R", "SQL", "HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      title: "BI & Data",
      icon: <Database className="w-6 h-6" />,
      category: 'data',
      skills: ["Power BI", "Looker Studio", "SAP BI 4", "R Studio", "SQL Developer", "Talend", "MySQL, PL/SQL", "NoSQL"]
    },
    {
      title: "Développement & DevOps",
      icon: <Wrench className="w-6 h-6" />,
      category: 'devops',
      skills: ["Docker","Docker-Compose","DockerHub","ArcGIS", "MongoDB", "NEO4J", "GIT", "Visual Studio Code", "Trello (Kanban)"]
    },
    {
      title: "Autres outils",
      icon: <Monitor className="w-6 h-6" />,
      category: 'tools',
      skills: ["Google Workspace", "Jupyter Notebook", "Excel avancé", "Eclipse", "Streamlit"]
    }
  ];

  const filters = [
    { name: 'all', label: 'Tout' },
    { name: 'programming', label: 'Programmation' },
    { name: 'data', label: 'Data' },
    { name: 'devops', label: 'DevOps' },
    { name: 'tools', label: 'Outils' },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Compétences Techniques
        </h2>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Grille de compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center">
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

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