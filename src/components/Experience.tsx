import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Award, Calendar } from 'lucide-react';
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
      title: "Développement d'un outil de Data Catalog et Data Lineage",
      organization: "ORANGE SONATEL – Pôle Data",
      date: "05 mai 2025 - 04 septembre 2025",
      description: [
        "Description des missions:",
        "Conception et développement de deux solutions visant à optimiser la gestion des métadonnées et la traçabilité des données.",
        "",
        "Outil de Data Catalog:",
        "- Remplacement d'un suivi Excel par une application web permettant de centraliser et automatiser la documentation des tables refined",
        "- Détection automatique des nouvelles tables via logs/métadonnées HDFS",
        "- Récupération des métadonnées depuis Cloudera, Elasticsearch et Grafana",
        "- Génération de descriptions sémantiques (LLM) à partir des noms de tables et colonnes",
        "",
        "Outil de Data Lineage:",
        "- Visualisation des dépendances entre tables (trusted, refined, reposting)",
        "- Identification des impacts en cas de modification des sources",
        "- Graphe interactif facilitant la gouvernance des données",
        "",
        "Technologies et outils:",
        "- Big Data: Cloudera (Hadoop, HDFS, NiFi, Oozie), Apache Spark (Scala / Python)",
        "- Bases: Elasticsearch, HDFS, bases relationnelles",
        "- Observabilité: Grafana",
        "- Langages: Python, Scala, SQL",
        "- Frontend/Backend: React.js, REST APIs",
        "- IA / LLM: génération automatique de descriptions",
        "- Visualisation: Neo4j (ou alternative)",
        "",
        "Compétences développées:",
        "- Conception d'architectures Big Data et compréhension des pipelines",
        "- Automatisation de la documentation et gouvernance des données",
        "- Intégration de LLM dans des cas d'usage entreprise",
        "- Développement web full-stack",
        "- Visualisation de graphes et traçabilité",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "Images/logo_sonatel.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 2,
      type: 'work',
      title: "Stage Assistant Chargé Méthodes - Pilotage Zone NE",
      organization: "DALKIA EN",
      date: "08 avril 2024 - 04 octobre 2024",
      description: [
        "Missions:",
        "- Participation au développement de la GMAO",
        "- Conception de rapports analytiques sur Looker Studio (collecte, traitement, analyse)",
        "- Optimisation des scripts d'import de données",
        "- Automatisation de tâches via macros pour l'équipe pilotage",
        "- Mise en place d'indicateurs de performance (KPI) des prestataires",
        "- Création d'outils de visualisation pour les opérationnels",
        "Résultats:",
        "- Amélioration de la fiabilité du reporting",
        "- Réduction du temps de préparation des rapports",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "Images/dalkia.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 3,
      type: 'work',
      title: "Stagiaire Agent de Production",
      organization: "La POSTE - PIC de Rouen Madrillet",
      date: "Juin 2023 - Juillet 2023",
      description: [
        "Missions:",
        "- Triage automatisé du courrier",
        "- Manutention et organisation des flux",
        "- Support aux opérations logistiques",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "Images/poste.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 4,
      type: 'work',
      title: "Stagiaire à la Direction des Opérateurs et des Opérations Internationales (DOI)",
      organization: "Orange Sénégal",
      date: "Juillet 2022 - Août 2022",
      description: [
        "Missions:",
        "- Appui à la gestion des opérations internationales",
        "- Suivi des indicateurs de performance",
        "- Contribution à l'élaboration de rapports",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "Images/logo_sonatel.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 5,
      type: 'work',
      title: "Stagiaire à la Direction des Systèmes d'Information (DSI)",
      organization: "Orange Sénégal",
      date: "Juillet 2021 - Août 2021",
      description: [
        "Missions:",
        "- Configuration de postes de travail",
        "- Activation et gestion de BitLocker",
        "- Maintenance et dépannage des machines",
        "- Support bureautique aux utilisateurs",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "Images/logo_sonatel.jpg" // Chemin vers l'image dans le dossier public
    },
    {
      id: 6,
      type: 'project',
      title: "Hackaton Med'ING Hack : Projet MIKANA",
      organization: "ESIGELEC",
      date: "17 octobre 2024 - 18 octobre 2024",
      description: [
        "Objectif:",
        "- Proposer une solution innovante dans le domaine de la santé",
        "Contributions:",
        "- Développement rapide d'un prototype",
        "- Travail en équipe pluridisciplinaire",
        "- Restitution devant un jury professionnel",
      ],
      icon: <Award className="w-6 h-6" />,
      illustration: "Images/logo_esigelec.png" // Chemin vers l'image dans le dossier public
    },
    {
      id: 7,
      type: 'project',
      title: "Approche Métier - Ingénieur R&D",
      organization: "ESIGELEC",
      date: "27 Novembre 2024 - 29 novembre 2024",
      description: [
        "Objectif:",
        "- Développer un outil d'analyse vidéo pour l'optimisation de la technique d'aviron",
        "Rôle:",
        "- Conception du pipeline d'analyse et préparation des données",
      ],
      icon: <Code className="w-6 h-6" />,
      illustration: "Images/logo_esigelec.png" // Chemin vers l'image dans le dossier public
    },
    {
      id: 8,
      type: 'project',
      title: "Développement d'un site de gestion de jeux de plateau",
      organization: "ESIGELEC",
      date: "24 novembre 2023 - 01 décembre 2023",
      description: [
        "Objectif:",
        "- Créer une application web de gestion de jeux de plateau",
        "Fonctionnalités:",
        "- Gestion des utilisateurs et des parties",
      ],
      icon: <Code className="w-6 h-6" />,
      illustration: "Images/logo_esigelec.png" // Chemin vers l'image dans le dossier public
    },
    {
      id: 9,
      type: 'project',
      title: "Conception d'un outil de gestion des absences",
      organization: "ESIGELEC",
      date: "7 mars 2023 - 22 mai 2023",
      description: [
        "Objectif:",
        "- Développer une application web de gestion des absences",
        "Fonctionnalités:",
        "- Suivi des absences et génération de rapports",
        "- Tableau de bord pour les responsables",
      ],
      icon: <Code className="w-6 h-6" />,
      illustration: "Images/logo_esigelec.png" // Chemin vers l'image dans le dossier public
    },
    {
      id: 10,
      type: 'project',
      title: "Projet Initiative et Créativité (PIC)",
      organization: "ESIGELEC",
      date: "26 novembre 2022 - 7 mai 2023",
      description: [
        "Objectif:",
        "- Mener un projet innovant en équipe dans un cadre académique",
        "Contributions:",
        "- Cadrage, répartition des tâches, suivi",
        "- Démonstration et soutenance",
      ],
      icon: <Code className="w-6 h-6" />,
      illustration: "Images/logo_esigelec.png" // Chemin vers l'image dans le dossier public
    },
    {
      id: 11,
      type: 'education',
      title: "Prévention et Secours Civique de Niveau 1 (PSC1)",
      organization: "Fédération Nationale des Métiers de la Natation et du Sport",
      date: "03/12/2022",
      description: [
        "Compétences attestées:",
        "- Gestes de premier secours",
        "- Réaction en situation d'urgence",
      ],
      icon: <Award className="w-6 h-6" />,
      illustration: "Images/Certificat_PSC1.jpg"
    },
    {
      id: 12,
      type: 'work',
      title: "Développement Plateforme Touba Aviation & Tours",
      organization: "Touba Aviation & Tours",
      date: "Freelance - Début du projet : Mai 2025",
      description: [
        "Objectif:",
        "- Concevoir et développer une plateforme complète pour la gestion des demandes clients et l'administration interne",
        "Architecture & Tech:",
        "- Frontend: React, Vite, TailwindCSS",
        "- Backend: Express.js, Supabase (PostgreSQL, Auth, Storage)",
        "- Sécurité & déploiement: HTTPS, JWT, Netlify/VPS",
        "Fonctionnalités clés:",
        "- Génération de PDF, tableaux de bord, suivi client, gestion documentaire",
      ],
      icon: <Briefcase className="w-6 h-6" />,
      illustration: "Images/touba-aviation.png" // à placer dans le dossier public
    },
  ];

  // Optimisation: Mémoriser le filtrage des items
  const filteredItems = useMemo(() => {
    return timelineItems.filter(item => 
      selectedType === 'all' || item.type === selectedType
    );
  }, [selectedType]);

  const filterButtons = [
    { type: 'all', label: 'Tout' },
    { type: 'work', label: 'Expériences Professionnelles' },
    { type: 'education', label: 'Certifications' },
    { type: 'project', label: 'Projets Académiques' }
  ];

  // Optimisation: Mémoriser les handlers
  const handleItemClick = useCallback((id: number) => {
    setSelectedItem(id);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedItem(null);
  }, []);

  // Rendu professionnel des descriptions: titres (finissant par ':'), listes (lignes commençant par '- '), paragraphes
  const renderDescription = (desc: string[]) => {
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = (key: string) => {
      if (listBuffer.length) {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            {listBuffer.map((item, i) => (
              <li key={`li-${key}-${i}`}>{item}</li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    desc.forEach((raw, idx) => {
      const line = raw.trim();
      const key = `${idx}`;
      if (!line) {
        flushList(key);
        elements.push(<div key={`sp-${key}`} className="h-2" />);
        return;
      }
      if (line.startsWith('- ')) {
        listBuffer.push(line.slice(2));
        return;
      }
      if (line.endsWith(':')) {
        flushList(key);
        elements.push(
          <h4 key={`h-${key}`} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-4">
            {line.slice(0, -1)}
          </h4>
        );
        return;
      }
      flushList(key);
      elements.push(
        <p key={`p-${key}`} className="text-gray-700 dark:text-gray-300">
          {line}
        </p>
      );
    });

    flushList('end');
    return <div className="space-y-2">{elements}</div>;
  };

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
                    <div className="card p-6 cursor-pointer" onClick={() => handleItemClick(item.id)}>
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
          {selectedItem !== null && renderDescription(timelineItems.find(item => item.id === selectedItem)?.description || [])}
        </Modal>
      </div>
    </section>
  );
}