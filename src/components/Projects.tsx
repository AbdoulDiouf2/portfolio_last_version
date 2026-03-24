import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Mission {
  kind: 'mission';
  number: string;
  title: string;
  contextFr: string;
  contextEn: string;
  problemFr: string;
  problemEn: string;
  stack: string[];
  resultFr: string;
  resultEn: string;
  link?: { label: string; href: string };
}

interface AcademicProject {
  kind: 'academic';
  title: string;
  organization: string;
  date: string;
  stack: string[];
}

type ProjectItem = Mission | AcademicProject;

const missions: Mission[] = [
  {
    kind: 'mission',
    number: '01',
    title: 'PillTrack',
    contextFr: 'Projet personnel — pharmacie',
    contextEn: 'Personal project — pharmacy',
    problemFr: 'Gestion des stocks de médicaments et alertes de péremption en temps réel dans les officines.',
    problemEn: 'Medication stock management and real-time expiry alerts in pharmacies.',
    stack: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'Chart.js'],
    resultFr: 'En développement actif.',
    resultEn: 'Actively in development.',
  },
  {
    kind: 'mission',
    number: '02',
    title: 'Nafaka SaaS Backend — Cockpit',
    contextFr: 'Mission freelance — client anonyme',
    contextEn: 'Freelance mission — anonymous client',
    problemFr: 'Concevoir un backend sécurisé pour plateforme SaaS B2B : authentification OAuth2/JWT, RBAC, API dashboards, Widget Store.',
    problemEn: 'Design a secure backend for a B2B SaaS platform: OAuth2/JWT authentication, RBAC, API dashboards, Widget Store.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    resultFr: 'Mission active — 16 tâches livrées.',
    resultEn: 'Active mission — 16 tasks delivered.',
  },
  {
    kind: 'mission',
    number: '03',
    title: 'Touba Aviation & Tours',
    contextFr: 'Mission freelance — agence de voyage',
    contextEn: 'Freelance mission — travel agency',
    problemFr: "Concevoir et développer le site web de l'agence.",
    problemEn: 'Design and develop the agency website.',
    stack: ['WordPress', 'Elementor', 'PHP', 'SEO'],
    resultFr: 'Livré.',
    resultEn: 'Delivered.',
  },
  {
    kind: 'mission',
    number: '04',
    title: 'MAAD Sphere',
    contextFr: 'Projet fondateur',
    contextEn: 'Founder project',
    problemFr: 'Centraliser clients, projets, finances et documents pour consultants freelance en une seule plateforme.',
    problemEn: 'Centralize clients, projects, finances and documents for freelance consultants in a single platform.',
    stack: ['React', 'TypeScript', 'Fastify', 'PostgreSQL', 'Prisma', 'Docker'],
    resultFr: 'Terminé — déployé en production.',
    resultEn: 'Complete — deployed to production.',
    link: { label: 'maad-sphere.vercel.app', href: 'https://maad-sphere.vercel.app' },
  },
  {
    kind: 'mission',
    number: '05',
    title: 'Jangàt — Q&R App',
    contextFr: 'Mission Sonatel',
    contextEn: 'Sonatel mission',
    problemFr: "Analyser et gérer les questions/réponses des rencontres de Direction Générale.",
    problemEn: 'Analyze and manage Q&A sessions from executive meetings.',
    stack: ['React', 'TypeScript', 'Node.js', 'SQLite', 'Gemini', 'Docker'],
    resultFr: 'En pause.',
    resultEn: 'On hold.',
  },
  {
    kind: 'mission',
    number: '06',
    title: 'Job Tracker',
    contextFr: 'Projet personnel',
    contextEn: 'Personal project',
    problemFr: "Suivi de candidatures avec intelligence artificielle — démontrer des compétences Full-Stack et AI Engineering.",
    problemEn: 'AI-powered job application tracker — showcasing Full-Stack and AI Engineering skills.',
    stack: ['Python', 'Flask', 'SQLite', 'Chart.js', 'Gemini Pro', 'GPT-3.5', 'Docker'],
    resultFr: 'En développement actif.',
    resultEn: 'Actively in development.',
  },
];

const academicProjects: AcademicProject[] = [
  {
    kind: 'academic',
    title: "Hackaton Med'ING Hack — Projet MIKANA",
    organization: "ESIGELEC",
    date: "Oct. 2024",
    stack: ['Prototypage', 'Innovation', 'Santé'],
  },
  {
    kind: 'academic',
    title: "Approche Métier — Ingénieur R&D",
    organization: "ESIGELEC",
    date: "Nov. 2024",
    stack: ['Analyse vidéo', "Traitement d'images", 'Python'],
  },
  {
    kind: 'academic',
    title: "Site de gestion de jeux de plateau",
    organization: "ESIGELEC",
    date: "Nov. — Déc. 2023",
    stack: ['PHP', 'MySQL', 'Git'],
  },
  {
    kind: 'academic',
    title: "Outil de gestion des absences",
    organization: "ESIGELEC",
    date: "Mars — Mai 2023",
    stack: ['Java', 'SQL', 'Eclipse'],
  },
  {
    kind: 'academic',
    title: "Projet Initiative et Créativité (PIC)",
    organization: "ESIGELEC",
    date: "Nov. 2022 — Mai 2023",
    stack: ['Gestion de projet', 'Travail en équipe'],
  },
  {
    kind: 'academic',
    title: "Prévention et Secours Civique de Niveau 1 (PSC1)",
    organization: "ESIGELEC — FNMNS",
    date: "Déc. 2022",
    stack: ['Premiers secours', "Gestion d'urgence"],
  },
];

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [filter, setFilter] = useState<'missions' | 'academic'>('missions');

  const filterButtons = [
    { key: 'missions' as const, labelFr: 'Réalisations', labelEn: 'Deliverables' },
    { key: 'academic' as const, labelFr: 'Formations & Labs', labelEn: 'Education & Labs' },
  ];

  return (
    <section
      id="projects"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      className="py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>
          05 —
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          {t('projects.title')}
        </h2>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3.5rem' }}>
        {filterButtons.map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              padding: '6px 14px',
              border: `1px solid ${filter === btn.key ? 'var(--color-accent-gold)' : 'var(--color-border)'}`,
              borderRadius: '2px',
              background: 'transparent',
              color: filter === btn.key ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isEn ? btn.labelEn : btn.labelFr}
          </button>
        ))}
      </div>

      {/* Missions — format éditorial complet */}
      {filter === 'missions' && (
        <div>
          {missions.map((project, idx) => (
            <div key={project.number}>
              <article style={{ padding: '2.5rem 0', display: 'grid', gridTemplateColumns: '4rem 1fr', gap: '0 2rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-gold)', fontSize: '1.5rem', fontWeight: 500, lineHeight: 1 }}>
                    {project.number}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.35rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                    {isEn ? project.contextEn : project.contextFr}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '640px' }}>
                    {isEn ? project.problemEn : project.problemFr}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {project.stack.map(tech => (
                      <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '3px 8px', letterSpacing: '0.04em' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    → {isEn ? project.resultEn : project.resultFr}
                  </p>
                </div>
              </article>
              {idx < missions.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Académique — format liste compacte */}
      {filter === 'academic' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {academicProjects.map((project, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '8rem 1fr',
                gap: '0 1.5rem',
                alignItems: 'start',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(28,37,64,0.6)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.03em', paddingTop: '2px', opacity: 0.7 }}>
                {project.date}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontWeight: 400, fontSize: '0.875rem', marginBottom: '0.2rem' }}>
                  {project.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '0.4rem', opacity: 0.8 }}>
                  {project.organization}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {project.stack.map(tech => (
                    <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1px 6px', letterSpacing: '0.04em', opacity: 0.7 }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
