import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'project';
  badge?: string;
  title: string;
  organization: string;
  date: string;
  description: string[];
  icon: JSX.Element;
  illustration?: string;
  skills?: string[];
  links?: { label: string; href: string; external?: boolean; type?: 'github' | 'pdf' | 'website' | 'external' | 'image' | 'doc' }[];
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: "Développement d'un outil de Data Catalog et Data Lineage",
    organization: "ORANGE SONATEL – Pôle Data",
    date: "Mai 2025 — Sept. 2025",
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
      "- Visualisation: Neo4j",
    ],
    icon: <Briefcase className="w-5 h-5" />,
    illustration: "Images/logo_sonatel.jpg",
    skills: ['Cloudera', 'Hadoop', 'HDFS', 'NiFi', 'Oozie', 'Spark', 'Scala', 'Python', 'SQL', 'Elasticsearch', 'Grafana', 'React', 'REST', 'LLM', 'Neo4j'],
    links: [{ label: 'Voir le logo', href: 'Images/logo_sonatel.jpg', type: 'image' }]
  },
  {
    id: 2,
    type: 'work',
    title: "Stage Assistant Chargé Méthodes - Pilotage Zone NE",
    organization: "DALKIA EN",
    date: "Avr. 2024 — Oct. 2024",
    description: [
      "Missions:",
      "- Participation au développement de la GMAO",
      "- Conception de rapports analytiques sur Looker Studio",
      "- Optimisation des scripts d'import de données",
      "- Automatisation de tâches via macros pour l'équipe pilotage",
      "- Mise en place d'indicateurs de performance (KPI) des prestataires",
      "Résultats:",
      "- Amélioration de la fiabilité du reporting",
      "- Réduction du temps de préparation des rapports",
    ],
    icon: <Briefcase className="w-5 h-5" />,
    illustration: "Images/dalkia.jpg",
    skills: ['GMAO', 'Looker Studio', 'Automatisation', 'Macros', 'KPI', 'Data Visualization', 'Reporting'],
    links: [{ label: "Voir l'illustration", href: 'Images/dalkia.jpg', type: 'image' }]
  },
  {
    id: 3,
    type: 'work',
    title: "Stagiaire Agent de Production",
    organization: "La POSTE - PIC de Rouen Madrillet",
    date: "Juin 2023 — Juil. 2023",
    description: [
      "Missions:",
      "- Triage automatisé du courrier",
      "- Manutention et organisation des flux",
      "- Support aux opérations logistiques",
    ],
    icon: <Briefcase className="w-5 h-5" />,
    illustration: "Images/poste.jpg",
    skills: ['Tri automatisé', 'Manutention', 'Organisation', 'Logistique', 'Rigueur'],
    links: [{ label: "Voir l'illustration", href: 'Images/poste.jpg', type: 'image' }]
  },
  {
    id: 4,
    type: 'work',
    title: "Stagiaire à la Direction des Opérateurs et des Opérations Internationales (DOI)",
    organization: "Orange Sénégal",
    date: "Juil. 2022 — Août 2022",
    description: [
      "Missions:",
      "- Appui à la gestion des opérations internationales",
      "- Suivi des indicateurs de performance",
      "- Contribution à l'élaboration de rapports",
    ],
    icon: <Briefcase className="w-5 h-5" />,
    illustration: "Images/logo_sonatel.jpg",
    skills: ['Opérations internationales', 'KPI', 'Reporting', 'Communication', 'Organisation'],
    links: [{ label: 'Voir le logo', href: 'Images/logo_sonatel.jpg', type: 'image' }]
  },
  {
    id: 5,
    type: 'work',
    title: "Stagiaire à la Direction des Systèmes d'Information (DSI)",
    organization: "Orange Sénégal",
    date: "Juil. 2021 — Août 2021",
    description: [
      "Missions:",
      "- Configuration de postes de travail",
      "- Activation et gestion de BitLocker",
      "- Maintenance et dépannage des machines",
      "- Support bureautique aux utilisateurs",
    ],
    icon: <Briefcase className="w-5 h-5" />,
    illustration: "Images/logo_sonatel.jpg",
    skills: ['Support IT', 'Configuration postes', 'BitLocker', 'Maintenance', 'Dépannage'],
    links: [{ label: 'Voir le logo', href: 'Images/logo_sonatel.jpg', type: 'image' }]
  },
];

export default function Experience() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleItemClick = useCallback((id: number) => {
    setSelectedItem(id);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedItem(null);
  }, []);

  const renderDescription = (desc: string[]) => {
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = (key: string) => {
      if (listBuffer.length) {
        elements.push(
          <div key={`ul-${key}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', margin: '0.25rem 0' }}>
            {listBuffer.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent-gold)', flexShrink: 0 }}>—</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{item}</span>
              </div>
            ))}
          </div>
        );
        listBuffer = [];
      }
    };

    desc.forEach((raw, idx) => {
      const line = raw.trim();
      const key = `${idx}`;
      if (!line) { flushList(key); elements.push(<div key={`sp-${key}`} style={{ height: '0.5rem' }} />); return; }
      if (line.startsWith('- ')) { listBuffer.push(line.slice(2)); return; }
      if (line.endsWith(':')) {
        flushList(key);
        elements.push(
          <h4 key={`h-${key}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.06em', marginTop: '1rem', marginBottom: '0.25rem' }}>
            {line.slice(0, -1).toUpperCase()}
          </h4>
        );
        return;
      }
      flushList(key);
      elements.push(<p key={`p-${key}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{line}</p>);
    });
    flushList('end');
    return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>{elements}</div>;
  };

  const selected = selectedItem !== null ? timelineItems.find(item => item.id === selectedItem) : undefined;

  return (
    <section
      id="experience"
      style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
      className="py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>
          04 —
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          {t('experience.title')}
        </h2>
      </div>

      {/* Timeline list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <AnimatePresence mode="wait">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <div
                onClick={() => handleItemClick(item.id)}
                className="flex flex-col md:grid md:items-start"
                style={{
                  gridTemplateColumns: '8rem 1fr auto',
                  gap: '0 1.5rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,153,58,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Mobile only — badge + date inline */}
                <div className="flex items-center gap-2 md:hidden" style={{ marginBottom: '0.35rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: item.type === 'work' ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
                    border: `1px solid ${item.type === 'work' ? 'var(--color-accent-gold)' : 'var(--color-border)'}`,
                    borderRadius: '2px',
                    padding: '1px 6px',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.badge ?? (item.type === 'work' ? 'STAGE' : item.type === 'project' ? 'PROJET' : 'CERTIF')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.03em' }}>
                    {item.date}
                  </span>
                </div>

                {/* Desktop only — date column */}
                <span className="hidden md:block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.03em', paddingTop: '2px', lineHeight: 1.5 }}>
                  {item.date}
                </span>

                {/* Title + org — always visible */}
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginTop: '0.25rem' }}>
                    {item.organization}
                  </div>
                </div>

                {/* Desktop only — badge column */}
                <span className="hidden md:inline-block" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: item.type === 'work' ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
                  border: `1px solid ${item.type === 'work' ? 'var(--color-accent-gold)' : 'var(--color-border)'}`,
                  borderRadius: '2px',
                  padding: '2px 7px',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap'
                }}>
                  {item.badge ?? (item.type === 'work' ? 'STAGE' : item.type === 'project' ? 'PROJET' : 'CERTIF')}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selected?.title || ''}
        illustration={selected?.illustration}
        skills={selected?.skills}
        links={selected?.links}
      >
        {selected && renderDescription(selected.description)}
      </Modal>
    </section>
  );
}
