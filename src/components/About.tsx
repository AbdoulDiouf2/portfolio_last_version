import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

const journey = [
  {
    location: "Dakar, Sénégal",
    period: "2019-2022",
    phaseKey: "about.phases.initial",
    description: "Baccalauréat S2 — Classes Préparatoires Scientifiques (ESMT)",
  },
  {
    location: "Rouen, France",
    period: "2022-2025",
    phaseKey: "about.phases.engineering",
    description: "Diplôme d'ingénieur Big Data — ESIGELEC",
  },
];

const education = [
  {
    school: "ESIGELEC — Rouen, France",
    period: "2022 – 2025",
    degree: "Diplôme d'ingénieur — Big Data & Transformation Numérique",
    items: ["C#, Azure Cloud", "SQL, Talend, PL/SQL, Power BI", "Python, Hadoop, Hive, R, SIG, d3.js"],
  },
  {
    school: "ESMT — Dakar, Sénégal",
    period: "2020 – 2022",
    degree: "Classes Préparatoires Scientifiques (CPS)",
    items: ["Mathématiques", "Physique", "Sciences de l'Ingénieur"],
  },
  {
    school: "Lycée d'Excellence Birago DIOP — Dakar",
    period: "2019 – 2020",
    degree: "Baccalauréat Scientifique — Série S2",
    items: [],
  },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section
      id="about"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      className="py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.75rem'
        }}>
          02 —
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em'
        }}>
          {t('about.title')}
        </h2>
      </div>

      {/* Profile + Journey grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

        {/* Left: photo + personal info */}
        <div>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            aspectRatio: '3/4',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            marginBottom: '2rem'
          }}>
            <img
              src="Images/profil_abdoul.jpg"
              alt="Abdoul Ahad Mbacké Diouf"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Personal info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <Row label={isEn ? "Date of birth" : "Date de naissance"} value="12 novembre 2001" />
            <Row label={isEn ? "Driving licence" : "Permis"} value={isEn ? "Licence B (no vehicle)" : "Permis B (non véhiculé)"} />
            <Row label={isEn ? "Languages" : "Langues"} value={isEn ? "French (fluent) · English (TOEIC B2)" : "Français (courant) · Anglais (TOEIC B2)"} />
            <Row label={isEn ? "Location" : "Localisation"} value="Gif-sur-Yvette, France" />
          </div>

          {/* CV download */}
          <a
            href="/Documents/CV_AAMD_CDI.pdf"
            download="CV_AbdoulAhadMbackeDiouf.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ display: 'inline-flex' }}
          >
            <Download size={15} />
            {t('about.download_cv')}
          </a>
        </div>

        {/* Right: journey + education */}
        <div>
          {/* Geographic journey */}
          <h3 style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            {t('about.journey_title')}
          </h3>

          <div style={{ marginBottom: '3rem' }}>
            {journey.map((step, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '6rem 1fr',
                gap: '0 1.5rem',
                paddingBottom: i < journey.length - 1 ? '1.5rem' : 0,
                borderBottom: i < journey.length - 1 ? '1px solid var(--color-border)' : 'none',
                marginBottom: i < journey.length - 1 ? '1.5rem' : 0
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', paddingTop: '2px' }}>
                  {step.period}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontWeight: 500, marginBottom: '0.2rem' }}>
                    {step.location}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent-gold)', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    {t(step.phaseKey)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <h3 style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            {t('about.education_title')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {education.map((edu, i) => (
              <div key={i} style={{
                borderLeft: '2px solid var(--color-border)',
                paddingLeft: '1.25rem'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent-gold)', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                  {edu.period}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontWeight: 500, marginBottom: '0.2rem' }}>
                  {edu.school}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: edu.items.length ? '0.5rem' : 0 }}>
                  {edu.degree}
                </div>
                {edu.items.length > 0 && (
                  <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                    {edu.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.02em', lineHeight: 1.8 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy quote */}
      <div style={{
        borderLeft: '2px solid var(--color-accent-gold)',
        paddingLeft: '1.5rem',
        maxWidth: '680px',
        marginBottom: '4rem'
      }}>
        <blockquote style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--color-text)',
          lineHeight: 1.5,
          marginBottom: '0.75rem'
        }}>
          "La data n'est pas juste des chiffres, c'est l'art de transformer l'information en impact positif."
        </blockquote>
        <cite style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'normal' }}>
          — Abdoul Ahad Mbacké Diouf
        </cite>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '10rem 1fr',
      gap: '0 1rem',
      paddingBottom: '0.6rem',
      borderBottom: '1px solid var(--color-border)',
      marginBottom: '0.6rem'
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.04em', paddingTop: '1px' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text)' }}>
        {value}
      </span>
    </div>
  );
}
