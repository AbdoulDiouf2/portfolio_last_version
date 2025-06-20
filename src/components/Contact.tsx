import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_qnm7e7x', // Vous devrez remplacer ceci par votre Service ID EmailJS
        'template_6ttxhkq', // Vous devrez remplacer ceci par votre Template ID EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'aad.mbacke691@gmail.com',
        },
        'l4eGBb6GgLVODJBOf' // Vous devrez remplacer ceci par votre Public Key EmailJS
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Me Contacter
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de contact */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 dark:text-green-400 text-center">Message envoyé avec succès!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-center">Une erreur est survenue. Veuillez réessayer.</p>
              )}
            </form>
          </div>

          {/* Photo de contact */}
          <div className="bg-white dark:bg-gray-800 p-0 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <img 
              src="Images/photo_contact.jpg" 
              alt="Abdoul Ahad Mbacké Diouf" 
              className="w-full h-full object-cover min-h-[400px] transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Informations de contact */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Informations de contact</h3>
            
            <div className="space-y-6">
              <ContactItem
                icon={<Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                title="Email"
                content="aad.mbacke691@gmail.com"
                href="mailto:aad.mbacke691@gmail.com"
              />
              
              <ContactItem
                icon={<Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                title="Téléphone"
                content="+33 7 49 05 18 79"
                href="tel:+33749051879"
              />
              
              <ContactItem
                icon={<MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                title="Localisation"
                content="Saint-Etienne-Du-Rouvray, France"
                href="https://www.google.com/maps/place/76800+Saint-%C3%89tienne-du-Rouvray,+France/@49.4013507,1.0692001,2158m/data=!3m1!1e3!4m6!3m5!1s0x47e0df735c487bf1:0x3ffa0ba61519ded0!8m2!3d49.380305!4d1.108209!16zL20vMGQ1MTYy?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
              />
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Réseaux sociaux</h4>
              <div className="flex space-x-4">
                <SocialLink
                  href="https://github.com/AbdoulDiouf2"
                  icon={<Github className="w-6 h-6" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/abdoul-ahad-mback%C3%A9-diouf-5b04b4213/"
                  icon={<Linkedin className="w-6 h-6" />}
                  label="LinkedIn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ContactItem = ({ 
  icon, 
  title, 
  content, 
  href 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  href?: string;
}) => {
  const ContentWrapper = href ? 'a' : 'div';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-200 dark:text-gray-200">{title}</h4>
        <ContentWrapper 
          {...props} 
          className={`text-gray-300 dark:text-gray-300 mt-1 ${href ? 'hover:text-blue-500 dark:hover:text-blue-400 transition-colors' : ''}`}
        >
          {content}
        </ContentWrapper>
      </div>
    </div>
  );
}

const SocialLink = ({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-gray-50 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300"
    aria-label={label}
  >
    {icon}
  </a>
);