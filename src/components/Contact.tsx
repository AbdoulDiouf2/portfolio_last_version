import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Briefcase } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        'service_qnm7e7x',
        'template_6ttxhkq',
        { from_name: formData.name, from_email: formData.email, message: formData.message, to_email: 'aad.mbacke691@gmail.com' },
        'l4eGBb6GgLVODJBOf'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section
      id="contact"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      className="py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.75rem'
        }}>
          06 —
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem'
        }}>
          {t('contact.title')}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                  {t('contact.name').toUpperCase()}
                </label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="input" />
              </div>
              <div>
                <label htmlFor="email" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                  {t('contact.email').toUpperCase()}
                </label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="input" />
              </div>
            </div>

            <div>
              <label htmlFor="message" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                {t('contact.message').toUpperCase()}
              </label>
              <textarea id="message" value={formData.message} onChange={handleChange} required rows={6} className="input" style={{ resize: 'vertical' }} />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{ opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
            </div>

            {status === 'success' && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-accent-gold)' }}>
                {t('contact.success')}
              </p>
            )}
            {status === 'error' && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#e05a5a' }}>
                {t('contact.error')}
              </p>
            )}
          </form>
        </div>

        {/* Info column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ContactRow icon={<Mail size={15} />} label="Email" value="aad.mbacke691@gmail.com" href="mailto:aad.mbacke691@gmail.com" />
          <ContactRow icon={<Phone size={15} />} label="Téléphone" value="+33 7 49 05 18 79" href="tel:+33749051879" />
          <ContactRow
            icon={<MapPin size={15} />}
            label="Localisation"
            value="Gif-sur-Yvette, France"
          />

          {/* Social links */}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { href: 'https://maadec.vercel.app/', icon: <Briefcase size={18} />, label: 'MAADEC' },
                { href: 'https://github.com/AbdoulDiouf2', icon: <Github size={18} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/abdoul-ahad-mback%C3%A9-diouf-5b04b4213/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    color: 'var(--color-text-muted)',
                    transition: 'color 0.2s',
                    display: 'flex',
                    padding: '8px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
        <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
          {label.toUpperCase()}
        </span>
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text)',
          textDecoration: 'none',
          transition: 'color 0.2s'
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text)')}
        >
          {value}
        </a>
      ) : (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text)' }}>{value}</span>
      )}
    </div>
  );
}
