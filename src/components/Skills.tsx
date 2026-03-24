import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  titleFr: string;
  titleEn: string;
  category: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    titleFr: "Langages de programmation",
    titleEn: "Programming languages",
    category: 'programming',
    skills: [
      { name: "Python", level: 4 },
      { name: "SQL", level: 4 },
      { name: "Java", level: 3 },
      { name: "C", level: 3 },
      { name: "JavaScript", level: 2 },
      { name: "HTML/CSS", level: 2 },
      { name: "C#", level: 2 },
      { name: "R", level: 2 },
    ]
  },
  {
    titleFr: "BI & Data",
    titleEn: "BI & Data",
    category: 'data',
    skills: [
      { name: "Hadoop/HDFS", level: 4 },
      { name: "Power BI", level: 4 },
      { name: "SQL Developer", level: 4 },
      { name: "MySQL, PL/SQL", level: 4 },
      { name: "Looker Studio", level: 3 },
      { name: "Talend", level: 2 },
      { name: "NoSQL", level: 2 },
      { name: "SPARK", level: 2 },
      { name: "SAP BI 4", level: 2 },
    ]
  },
  {
    titleFr: "Développement & DevOps",
    titleEn: "Development & DevOps",
    category: 'devops',
    skills: [
      { name: "Docker", level: 4 },
      { name: "Docker-Compose", level: 4 },
      { name: "DockerHub", level: 4 },
      { name: "GIT", level: 4 },
      { name: "Trello (Kanban)", level: 4 },
      { name: "Visual Studio Code", level: 4 },
      { name: "MongoDB", level: 2 },
      { name: "ArcGIS", level: 2 },
      { name: "NEO4J", level: 2 },
    ]
  },
  {
    titleFr: "Autres outils",
    titleEn: "Other tools",
    category: 'tools',
    skills: [
      { name: "Jupyter Notebook", level: 4 },
      { name: "Google Workspace", level: 4 },
      { name: "Pack Microsoft", level: 4 },
      { name: "Eclipse", level: 3 },
      { name: "Streamlit", level: 2 },
      { name: "Elastic Search", level: 2 },
      { name: "Scala", level: 2 },
      { name: "LLM", level: 2 },
    ]
  }
];

function levelLabel(level: number, t: (k: string) => string): string {
  switch (level) {
    case 1: return t('skills.level_beginner');
    case 2: return t('skills.level_intermediate');
    case 3: return t('skills.level_advanced');
    case 4: return t('skills.level_expert');
    case 5: return t('skills.level_expert');
    default: return '';
  }
}

function levelColor(level: number): string {
  if (level >= 4) return 'var(--color-accent-gold)';
  if (level === 3) return 'var(--color-text-muted)';
  return 'var(--color-border)';
}

const qualities = ['Rigueur', 'Dynamisme', "Esprit d'équipe", "Capacité d'adaptation", "Amélioration continue"];
const qualitiesEn = ['Rigour', 'Drive', 'Team spirit', 'Adaptability', 'Continuous improvement'];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const filters = [
    { name: 'all', label: t('skills.filter_all') },
    { name: 'programming', label: t('skills.filter_programming') },
    { name: 'data', label: t('skills.filter_data') },
    { name: 'devops', label: t('skills.filter_dev') },
    { name: 'tools', label: t('skills.filter_tools') },
  ];

  const visible = skillCategories.filter(c => activeFilter === 'all' || c.category === activeFilter);

  return (
    <section
      id="skills"
      style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
      className="py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.75rem'
        }}>
          03 —
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem'
        }}>
          {t('skills.title')}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          {t('skills.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {filters.map(f => (
          <button
            key={f.name}
            onClick={() => setActiveFilter(f.name)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              padding: '6px 14px',
              border: `1px solid ${activeFilter === f.name ? 'var(--color-accent-gold)' : 'var(--color-border)'}`,
              borderRadius: '2px',
              background: activeFilter === f.name ? 'transparent' : 'transparent',
              color: activeFilter === f.name ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Skill grid */}
      <div className={`grid grid-cols-1 ${activeFilter === 'all' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 max-w-2xl'} gap-6 mb-12`}>
        <AnimatePresence mode="wait">
          {visible.map(cat => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '1.5rem'
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--color-border)'
              }}>
                {isEn ? cat.titleEn : cat.titleFr}
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cat.skills.map(skill => (
                  <li key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text)', letterSpacing: '0.02em' }}>
                        {skill.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>
                        {levelLabel(skill.level, t)}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ width: '100%', height: '2px', background: 'var(--color-border)', borderRadius: '1px' }}>
                      <div style={{
                        height: '2px',
                        borderRadius: '1px',
                        width: `${skill.level * 20}%`,
                        background: levelColor(skill.level),
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Personal qualities */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '1rem'
        }}>
          {t('skills.qualities_title')}
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {(isEn ? qualitiesEn : qualities).map((q) => (
            <span key={q} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '4px 10px',
              letterSpacing: '0.04em'
            }}>
              {q}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
