import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Award, Calendar, Building } from 'lucide-react';
import BackgroundAnimation from './BackgroundAnimation';
import Modal from './Modal';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'project';
  title: string;
  organization: string;
  date: string;
  description: string[];
  icon: JSX.Element;
  illustration?: string; // URL de l'image d'illustration (optionnelle)
}

export default function Experience() {
  const [selectedType, setSelectedType] = useState<'all' | 'work' | 'education' | 'project'>('all');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      title: "Stage Assistant Chargé Méthodes - Pilotage Zone NE",
      organization: "DALKIA EN",
      date: "08 avril 2024 - 04 octobre 2024",
      description: [
        "Développement de la GMAO du client",
        "Automatisation des calculs KPI pour les prestataires",
        "Création d'outils de visualisation et rapports sur Looker Studio"
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 2,
      type: 'work',
      title: "Stagiaire Agent de Production",
      organization: "La POSTE - PIC de Rouen Madrillet",
      date: "Juin 2023 - Juillet 2023",
      description: [
        "Triage du courrier automatisé",
        "Manutention",
        "Gestion logistique"
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 3,
      type: 'work',
      title: "Stagiaire à la Direction des Opérateurs et des Opérations Internationales (DOI)",
      organization: "Orange Sénégal",
      date: "Juillet 2022 - Août 2022",
      description: [
        "Assistance à la gestion des opérations internationales",
        "Suivi des indicateurs de performance",
        "Participation à l'élaboration de rapports"
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 4,
      type: 'work',
      title: "Stagiaire à la Direction des Systèmes d'Information (DSI)",
      organization: "Orange Sénégal",
      date: "Juillet 2021 - Août 2021",
      description: [
        "Configuration de machines",
        "Activation de BitLocker",
        " Maintenance et dépannage des machines",
        "Support bureautique"
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 5,
      type: 'project',
      title: "Hackaton Med'ING Hack : Projet MIKANA",
      organization: "ESIGELEC",
      date: "17 octobre 2024 - 18 octobre 2024",
      description: [
        "Développement d'une solution innovante pour la santé",
        "Collaboration avec des étudiants et professionnels de divers domaines",
        "Présentation du projet devant un jury de professionnels"
      ],
      icon: <Award className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 6,
      type: 'project',
      title: "Conception d'un outil de gestion des absences",
      organization: "ESIGELEC",
      date: "Septembre 2023 - Décembre 2023",
      description: [
        "Développement d'une application web pour la gestion des absences",
        "Intégration de fonctionnalités de suivi et de reporting",
        "Collaboration avec une équipe de développeurs"
      ],
      icon: <Code className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 7,
      type: 'project',
      title: "Développement d'un site de gestion de jeux de plateau",
      organization: "ESIGELEC",
      date: "Septembre 2024 - Décembre 2024",
      description: [
        ""
      ],
      icon: <Code className="w-6 h-6" />,
      illustration: "/Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 8,
      type: 'education',
      title: "Prévention et Secours Civique de Niveau 1 (PSC1)",
      organization: "Fédération Nationale des Métiers de la Natation et du Sport",
      date: "03/12/2022",
      description: [
        ""
      ],
      icon: <Award className="w-6 h-6" />,
      illustration: "../../public/Images/Certificat_PSC1.jpg"
    }
  ];

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const filterButtons = [
    { type: 'all', label: 'Tout' },
    { type: 'work', label: 'Expériences Professionnelles' },
    { type: 'education', label: 'Certifications' },
    { type: 'project', label: 'Projets Académiques' }
  ];

  const filteredItems = timelineItems.filter(
    item => selectedType === 'all' || item.type === selectedType
  );

  return (
    <section id="experience" className="py-20 section-bg">
      <BackgroundAnimation variant="data" />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Expériences & Projets
        </h2>

        {/* Filtres */}
        <div className="flex justify-center gap-4 mb-12">
          {filterButtons.map((button) => (
            <motion.button
              key={button.type}
              onClick={() => setSelectedType(button.type as 'all' | 'work' | 'education' | 'project')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedType === button.type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {button.label}
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />

          {/* Items */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Point sur la timeline */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                      whileHover={{ scale: 1.5 }}
                      onClick={() => handleItemClick(item.id)}
                    />
                  </div>

                  {/* Contenu */}
                  <motion.div
                    className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="card p-6">
                      <div className="flex items-center gap-4 mb-4 justify-start">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedItem !== null ? timelineItems.find(item => item.id === selectedItem)?.title || '' : ''}
          illustration={selectedItem !== null ? timelineItems.find(item => item.id === selectedItem)?.illustration : undefined}
        >
          {selectedItem !== null && (
            <div className="space-y-4">
              {timelineItems.find(item => item.id === selectedItem)?.description.map((desc, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300">{desc}</p>
              ))}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}