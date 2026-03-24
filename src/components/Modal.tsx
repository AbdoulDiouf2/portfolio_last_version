import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  illustration?: string; // URL of the illustration image, now optional
  skills?: string[]; // badges
  links?: { label: string; href: string; external?: boolean; type?: 'github' | 'pdf' | 'website' | 'external' | 'image' | 'doc' }[]; // CTA
}

export default function Modal({ isOpen, onClose, title, children, illustration, skills, links }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle keyboard interactions when open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        // Basic focus trap
        const focusableSelectors = [
          'a[href]',
          'area[href]',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          'button:not([disabled])',
          'iframe',
          'object',
          'embed',
          '*[tabindex]:not([tabindex="-1"])',
          '*[contenteditable=true]'
        ];
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            (last as HTMLElement).focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Set initial focus
    const id = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0"
              style={{ background: 'rgba(9,13,26,0.8)' }}
              onClick={onClose}
              aria-hidden="true"
            />

            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px' }}
              className="relative inline-block w-full my-8 overflow-hidden text-left align-middle shadow-2xl max-w-2xl lg:max-w-4xl"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 2rem 0' }}>
                <h3 id="modal-title" style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text)', paddingRight: '2.5rem' }}>
                  {title}
                </h3>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {illustration && (
                <div style={{ padding: '1rem 2rem 0' }}>
                  <img
                    src={illustration}
                    alt=""
                    style={{ width: '100%', maxHeight: '14rem', objectFit: 'contain', background: 'var(--color-bg)', borderRadius: '2px', mixBlendMode: 'luminosity' }}
                  />
                </div>
              )}

              <div style={{ padding: '1.5rem 2rem 2rem', maxHeight: '70vh', overflowY: 'auto', borderTop: '1px solid var(--color-border)', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>{children}</div>

                {skills && skills.length > 0 && (
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', display: 'block', marginBottom: '0.75rem' }}>
                      STACK
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {skills.map((s, i) => (
                        <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '3px 8px', letterSpacing: '0.03em' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {links && links.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {links.map((l, i) => {
                        const isExternal = l.external ?? /^https?:\/\//i.test(l.href);
                        const type = l.type || (/github\.com/i.test(l.href) ? 'github' : /\.pdf$/i.test(l.href) ? 'pdf' : /\.(png|jpe?g|gif|webp|svg)$/i.test(l.href) ? 'image' : isExternal ? 'external' : 'website');
                        const Icon = type === 'github' ? Github : type === 'pdf' ? FileText : type === 'image' ? ImageIcon : type === 'external' ? ExternalLink : LinkIcon;
                        return (
                          <a key={i} href={l.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="btn-ghost"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                          >
                            <Icon className="w-3 h-3" />
                            {l.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}