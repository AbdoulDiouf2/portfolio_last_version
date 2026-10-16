import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import Modal from './Modal';
import { missions, academicProjects, hasDetails, type CaseStudy, type Localized } from '../data/projects';

const HASH_PREFIX = '#project-';

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  color: 'var(--color-text-muted)',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '0.6rem',
};

const bodyText: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text)',
  fontSize: '0.92rem',
  lineHeight: 1.65,
};

function ProjectDetails({ project, isEn }: { project: CaseStudy; isEn: boolean }) {
  const { t } = useTranslation();
  const pick = (v: Localized) => (isEn ? v.en : v.fr);
  const features = isEn ? project.features.en : project.features.fr;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
        {pick(project.context)}
        {project.period ? ` · ${project.period}` : ''}
      </p>

      <div>
        <span style={sectionLabel}>{t('projects.details.problem')}</span>
        <p style={bodyText}>{pick(project.problem)}</p>
      </div>

      <div>
        <span style={sectionLabel}>{t('projects.details.built')}</span>
        <ul style={{ ...bodyText, listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {features.map(item => (
            <li key={item} style={{ display: 'grid', gridTemplateColumns: '1rem 1fr', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-accent-gold)' }}>—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span style={sectionLabel}>{t('projects.details.architecture')}</span>
        <p style={bodyText}>{pick(project.architecture)}</p>
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <div>
          <span style={sectionLabel}>{t('projects.details.metrics')}</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
            {project.metrics.map(m => (
              <div key={m.value + m.label.fr} style={{ border: '1px solid var(--color-border)', borderRadius: '2px', padding: '0.85rem 1rem', background: 'var(--color-bg)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-gold)', fontSize: '1.25rem', fontWeight: 500 }}>{m.value}</div>
                <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{pick(m.label)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.dataAngle && (
        <div style={{ borderLeft: '2px solid var(--color-accent-gold)', paddingLeft: '1rem' }}>
          <span style={sectionLabel}>{t('projects.details.data_angle')}</span>
          <p style={bodyText}>{pick(project.dataAngle)}</p>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        → {pick(project.status)}
      </p>
    </div>
  );
}

function MissionRow({ detailed, onOpen, children }: { detailed: boolean; onOpen: () => void; children: React.ReactNode }) {
  const style: React.CSSProperties = { padding: '2.5rem 0', display: 'grid', gridTemplateColumns: '4rem 1fr auto', gap: '0 2rem', width: '100%', textAlign: 'left' };
  if (!detailed) return <article style={style}>{children}</article>;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="project-row"
      aria-haspopup="dialog"
      style={{ ...style, background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [filter, setFilter] = useState<'missions' | 'academic'>('missions');
  const [openId, setOpenId] = useState<string | null>(null);

  const allProjects: CaseStudy[] = [...missions, ...academicProjects].filter(hasDetails);
  const openProject = allProjects.find(p => p.id === openId) ?? null;

  // Lien direct partageable : /#project-<id> ouvre la fiche
  useEffect(() => {
    const fromHash = () => {
      if (!window.location.hash.startsWith(HASH_PREFIX)) return;
      const id = window.location.hash.slice(HASH_PREFIX.length);
      const target = allProjects.find(p => p.id === id);
      if (!target) return;
      setFilter(target.kind === 'academic' ? 'academic' : 'missions');
      setOpenId(id);
      document.getElementById('projects')?.scrollIntoView();
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (id: string) => {
    setOpenId(id);
    window.history.replaceState(null, '', HASH_PREFIX + id);
  };

  const close = useCallback(() => {
    setOpenId(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

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
              transition: 'border-color 0.2s, color 0.2s'
            }}
          >
            {isEn ? btn.labelEn : btn.labelFr}
          </button>
        ))}
      </div>

      {/* Missions — format éditorial, chaque ligne ouvre sa fiche */}
      {filter === 'missions' && (
        <div>
          {missions.map((project, idx) => (
            <div key={project.id}>
              <MissionRow detailed={hasDetails(project)} onOpen={() => open(project.id)}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-gold)', fontSize: '1.5rem', fontWeight: 500, lineHeight: 1 }}>
                    {project.number}
                  </span>
                </div>
                <div>
                  <h3 className="project-row-title" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.35rem', transition: 'color 0.2s' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                    {isEn ? project.context.en : project.context.fr}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '640px' }}>
                    {isEn ? project.pitch.en : project.pitch.fr}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {project.stack.slice(0, 6).map(tech => (
                      <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '3px 8px', letterSpacing: '0.04em' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    → {isEn ? project.status.en : project.status.fr}
                  </p>
                </div>
                {hasDetails(project) ? (
                  <span className="project-row-cta" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.05em', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', alignSelf: 'start', paddingTop: '0.35rem', transition: 'color 0.2s' }}>
                    <span className="hidden md:inline">{t('projects.details.open')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                ) : <span />}
              </MissionRow>
              {idx < missions.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Académique — liste compacte ; les lignes documentées ouvrent une fiche */}
      {filter === 'academic' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {academicProjects.map(project => {
            const detailed = hasDetails(project);
            const content = (
              <>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.03em', paddingTop: '2px', opacity: 0.7 }}>
                  {project.date}
                </span>
                <div>
                  <div className={detailed ? 'project-row-title' : undefined} style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontWeight: 400, fontSize: '0.875rem', marginBottom: '0.2rem', transition: 'color 0.2s' }}>
                    {project.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '0.4rem', opacity: 0.8 }}>
                    {project.organization}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {project.stack.slice(0, 6).map(tech => (
                      <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1px 6px', letterSpacing: '0.04em', opacity: 0.7 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {detailed ? (
                  <span className="project-row-cta" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                ) : <span />}
              </>
            );
            const rowStyle: React.CSSProperties = {
              display: 'grid',
              gridTemplateColumns: '8rem 1fr auto',
              gap: '0 1.5rem',
              alignItems: 'start',
              padding: '1rem 0',
              borderBottom: '1px solid rgba(28,37,64,0.6)',
              width: '100%',
              textAlign: 'left',
            };
            return detailed ? (
              <button
                key={project.id}
                type="button"
                onClick={() => open(project.id)}
                className="project-row"
                aria-haspopup="dialog"
                style={{ ...rowStyle, background: 'none', borderLeft: 'none', borderRight: 'none', borderTop: 'none', cursor: 'pointer' }}
              >
                {content}
              </button>
            ) : (
              <div key={project.id} style={rowStyle}>{content}</div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={openProject !== null}
        onClose={close}
        title={openProject?.title ?? ''}
        skills={openProject?.stack}
        links={openProject?.links}
      >
        {openProject && <ProjectDetails project={openProject} isEn={isEn} />}
      </Modal>
    </section>
  );
}
