import React, { useState } from 'react';
import { Code, Database, BarChart, ArrowRight } from 'lucide-react';
import Modal from './Modal';

interface ProjectDetails {
  title: string;
  content: React.ReactNode;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const projects = [
    {
      title: "Projet Hackathon MIKANA",
      description: "Système IA de planification de livraison et maintenance prédictive",
      icon: <BarChart className="w-6 h-6" />,
      tags: ["IA", "Python", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=500",
      details: {
        title: "Projet Hackathon MIKANA",
        content: (
          <div className="space-y-4">
            <p>Projet innovant développé lors d'un hackathon :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Développement d'algorithmes de prédiction pour la maintenance</li>
              <li>Implémentation d'un système de planification intelligent</li>
              <li>Intégration avec des APIs externes</li>
              <li>Interface utilisateur intuitive</li>
            </ul>
            <p>Technologies : Python, TensorFlow, FastAPI, React</p>
            <p>Résultat : 2ème place au hackathon</p>
          </div>
        )
      }
    },
    {
      title: "Site de Gestion de Jeux",
      description: "Plateforme complète utilisant PHPMyAdmin, VS Code et GIT",
      icon: <Code className="w-6 h-6" />,
      tags: ["PHP", "MySQL", "Git"],
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500",
      details: {
        title: "Site de Gestion de Jeux",
        content: (
          <div className="space-y-4">
            <p>Plateforme web complète pour la gestion de jeux :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Système d'authentification sécurisé</li>
              <li>Gestion des utilisateurs et des rôles</li>
              <li>Interface d'administration</li>
              <li>Système de notation et commentaires</li>
            </ul>
            <p>Stack technique : PHP, MySQL, JavaScript, Bootstrap</p>
          </div>
        )
      }
    },
    {
      title: "Outil de Gestion des Absences",
      description: "Solution entreprise avec SQL Developer et Eclipse",
      icon: <Database className="w-6 h-6" />,
      tags: ["Java", "SQL", "Eclipse"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500",
      details: {
        title: "Outil de Gestion des Absences",
        content: (
          <div className="space-y-4">
            <p>Application de gestion des absences pour entreprise :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Système de validation multi-niveaux</li>
              <li>Génération de rapports automatisés</li>
              <li>Interface utilisateur Java Swing</li>
              <li>Base de données relationnelle optimisée</li>
            </ul>
            <p>Technologies : Java, Oracle SQL, JasperReports</p>
          </div>
        )
      }
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Projets Académiques
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {project.icon}
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project.details)}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Plus de détails
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject?.content}
      </Modal>
    </section>
  );
}