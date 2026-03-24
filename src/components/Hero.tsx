import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      style={{ background: 'var(--color-bg)' }}
      className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 pt-14"
    >
      <div className="max-w-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={lineVariants}
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent-gold)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '1.5rem'
            }}
          >
            {t('hero.index')}
          </motion.span>

          <motion.h1
            variants={lineVariants}
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}
          >
            Abdoul Ahad<br />Mbacké DIOUF
          </motion.h1>

          <motion.hr
            variants={lineVariants}
            style={{
              border: 'none',
              borderTop: '1px solid var(--color-border)',
              width: '60px',
              marginBottom: '1.5rem'
            }}
          />

          <motion.p
            variants={lineVariants}
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
              marginBottom: '2.5rem'
            }}
          >
            {t('hero.accroche')}
          </motion.p>

          <motion.div variants={lineVariants}>
            <a href="#projects" className="btn-primary">
              {t('hero.cta')}
            </a>
          </motion.div>

          <motion.div
            variants={lineVariants}
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {(t('hero.stats', { returnObjects: true }) as { value: string; label: string }[]).map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 300,
                  color: 'var(--color-accent-gold)',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
