import { useTranslation } from 'react-i18next';

export default function CTABanner() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--color-text)',
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
        fontWeight: 300,
        letterSpacing: '-0.02em',
        marginBottom: '1rem',
      }}>
        {t('cta.title')}
      </h2>

      <p style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text-muted)',
        fontSize: '1rem',
        lineHeight: 1.7,
        maxWidth: '480px',
        margin: '0 auto 2.5rem',
      }}>
        {t('cta.subtitle')}
      </p>

      <a
        href="#contact"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '0.9rem',
          color: 'var(--color-accent-gold)',
          border: '1px solid var(--color-accent-gold)',
          borderRadius: '4px',
          padding: '12px 28px',
          textDecoration: 'none',
          background: 'transparent',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-accent-gold)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#090D1A';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent-gold)';
        }}
      >
        {t('cta.button')}
      </a>
    </section>
  );
}
