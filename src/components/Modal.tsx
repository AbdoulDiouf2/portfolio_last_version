import React, { useEffect, useRef, useCallback } from 'react';
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
              className="fixed inset-0 bg-gray-900/60 dark:bg-gray-900/60"
              onClick={onClose}
              aria-hidden="true"
            />

            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="relative inline-block w-full my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-2xl lg:max-w-4xl"
            >
              <div className="flex items-center justify-between px-6 pt-6">
                <h3 id="modal-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                  aria-label="Fermer le modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {illustration && (
                <div className="px-6 pt-4">
                  <img
                    src={illustration}
                    alt=""
                    className="w-full max-h-72 object-contain bg-gray-50 dark:bg-gray-900 rounded-lg"
                  />
                </div>
              )}

              <div className="px-6 py-6 text-gray-700 dark:text-gray-300 max-h-[70vh] overflow-y-auto border-t border-gray-100 dark:border-gray-700 space-y-6">
                <div>
                  {children}
                </div>

                {skills && skills.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Compétences</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span
                          key={`skill-${i}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {links && links.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Liens</h4>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {links.map((l, i) => {
                        const isExternal = l.external ?? /^https?:\/\//i.test(l.href);
                        const type = l.type || (
                          /github\.com/i.test(l.href)
                            ? 'github'
                            : /\.pdf$/i.test(l.href)
                            ? 'pdf'
                            : /\.(png|jpe?g|gif|webp|svg)$/i.test(l.href)
                            ? 'image'
                            : isExternal
                            ? 'external'
                            : 'website'
                        );

                        const Icon =
                          type === 'github' ? Github :
                          type === 'pdf' ? FileText :
                          type === 'image' ? ImageIcon :
                          type === 'external' ? ExternalLink :
                          LinkIcon;

                        return (
                          <a
                            key={`link-${i}`}
                            href={l.href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <Icon className="w-4 h-4" />
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