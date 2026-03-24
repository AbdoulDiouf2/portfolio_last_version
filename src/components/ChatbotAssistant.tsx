import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// ── Réponses FR ──────────────────────────────────────────────────────────────
const responsesFR = (q: string): string | null => {
  const l = q.toLowerCase();

  if (/bonjour|salut|hello|bonsoir|hi\b/.test(l))
    return "Bonjour. Je connais le parcours, les compétences et les projets d'Abdoul Ahad. Que souhaitez-vous savoir ?";

  if (/qui est|qui es-tu|présente|abdoul/.test(l))
    return "Abdoul Ahad Mbacké Diouf est ingénieur Big Data diplômé de l'ESIGELEC (Rouen, 2025) et fondateur de MAADEC. Consultant IT spécialisé en backend, infrastructure et data engineering.";

  if (/formation|étude|diplôme|école|université|académique/.test(l))
    return "Parcours académique :\n\nIngénieur Big Data & Transformation Numérique — ESIGELEC, Rouen (2022–2025)\nClasses Préparatoires Scientifiques — ESMT, Dakar (2020–2022)\nBaccalauréat S2 — Lycée Birago Diop, Dakar (2019–2020)";

  if (/expérience|stage|travail|professionnel|emploi/.test(l))
    return "Expériences professionnelles :\n\nOrange Sonatel – Data Catalog & Lineage (mai–sept 2025)\nMADEC – Fondateur & consultant IT (2025 →)\nDalkia EN – Assistant Chargé Méthodes (avr–oct 2024)\nLa Poste PIC Rouen – Stagiaire (juin–juil 2023)\nOrange Sénégal DOI – Stagiaire (juil–août 2022)\nOrange Sénégal DSI – Stagiaire (juil–août 2021)";

  if (/maadec/.test(l))
    return "MAADEC est la structure de consulting IT fondée par Abdoul Ahad. Elle intervient sur des missions backend, infrastructure et data engineering pour des clients B2B.";

  if (/compétence|technique|technologie|outil|langage|stack/.test(l))
    return "Stack technique :\n\nPython, SQL, Java, C, JavaScript\nHadoop, HDFS, Apache Spark, Talend\nDocker, Docker-Compose, Git\nPower BI, Looker Studio, Grafana\nMongoDB, Neo4j, Elasticsearch\nReact, Express.js, FastAPI";

  if (/orange|sonatel|data catalog|data lineage/.test(l))
    return "Chez Orange Sonatel (stage 2025) :\n\nDeux outils développés :\n- Data Catalog : remplacement d'un suivi Excel par une app web avec génération automatique de métadonnées via LLM\n- Data Lineage : graphe interactif des dépendances entre tables (Neo4j)\n\nStack : Cloudera, Spark, Elasticsearch, React, Python, Scala";

  if (/dalkia|gmao|kpi/.test(l))
    return "Chez Dalkia EN (avr–oct 2024) :\n\nMissions : développement GMAO, rapports Looker Studio, automatisation macros, mise en place KPI prestataires.\nImpact : fiabilisation du reporting et réduction du temps de préparation.";

  if (/projet|pilltrack|nafaka|docker|vpn|infrastructure/.test(l))
    return "Projets :\n\n01 — PillTrack : gestion de stocks et alertes péremption en pharmacie (Python, FastAPI, PostgreSQL, Docker) — en développement\n02 — Nafaka SaaS : backend API pour plateforme B2B (Node.js, MongoDB, Redis, Docker) — livré en production\n03 — Infrastructure Docker/VPN : déploiement sécurisé sur Windows Server 2022 (Docker, WireGuard, Nginx)";

  if (/intérêt|passion|loisir|sport|hobby/.test(l))
    return "Centres d'intérêt :\n\nData & IA, technologies cloud, développement backend\nFootball, Scrabble\nHackathons, projets open source\nSIG & géomatique";

  if (/langue|anglais|français|wolof/.test(l))
    return "Langues :\n\nFrançais — courant\nAnglais — TOEIC B2\nWolof — natif";

  if (/philosophie|valeur|motivation|vision/.test(l))
    return "\"La data n'est pas juste des chiffres, c'est l'art de transformer l'information en impact positif.\"\n\nValeurs : Innovation, Durabilité, Collaboration, Excellence.";

  if (/contact|email|linkedin|joindre/.test(l))
    return "Contact :\n\nEmail : aad.mbacke691@gmail.com\nTél : +33 7 49 05 18 79\nLinkedIn : linkedin.com/in/abdoul-ahad-mbacké-diouf-5b04b4213\nGitHub : github.com/AbdoulDiouf2\nMADEC : maadec.vercel.app";

  if (/âge|age|naissance/.test(l))
    return "Abdoul Ahad est né le 12 novembre 2001 (23 ans).";

  if (/où|lieu|habite|localisation|rouen|nantes|gif/.test(l))
    return "Basé à Gif-sur-Yvette (France). Originaire de Dakar, Sénégal. A étudié à Rouen (ESIGELEC).";

  if (/python|hadoop|spark|big data|docker/.test(l))
    return "Python et SQL sont ses langages principaux. Il utilise Hadoop/HDFS et Apache Spark pour le traitement Big Data, Docker pour le déploiement. Familier de FastAPI, Express.js et React.";

  if (/merci|thank/.test(l))
    return "Avec plaisir. N'hésitez pas si vous avez d'autres questions.";

  if (/au revoir|bye|à bientôt/.test(l))
    return "Au revoir. Bonne continuation.";

  if (/futur|objectif|ambition|carrière/.test(l))
    return "Abdoul Ahad vise à s'imposer comme consultant IT et data engineer indépendant, tout en développant MAADEC. Ses objectifs : infrastructure cloud, systèmes de données critiques, et contribution à des projets à impact.";

  return null;
};

// ── Réponses EN ──────────────────────────────────────────────────────────────
const responsesEN = (q: string): string | null => {
  const l = q.toLowerCase();

  if (/hello|hi\b|hey|good morning|good evening/.test(l))
    return "Hello. I know Abdoul Ahad's background, skills and projects. What would you like to know?";

  if (/who is|who are you|introduce|abdoul/.test(l))
    return "Abdoul Ahad Mbacké Diouf is a Big Data engineer, graduated from ESIGELEC (Rouen, 2025) and founder of MAADEC. IT consultant specializing in backend, infrastructure and data engineering.";

  if (/education|degree|school|university|academic|studies/.test(l))
    return "Academic background:\n\nBig Data & Digital Transformation Engineer — ESIGELEC, Rouen (2022–2025)\nPreparatory Science Classes — ESMT, Dakar (2020–2022)\nScience Baccalaureate S2 — Lycée Birago Diop, Dakar (2019–2020)";

  if (/experience|internship|work|professional|job/.test(l))
    return "Professional experience:\n\nOrange Sonatel – Data Catalog & Lineage (May–Sep 2025)\nMADEC – Founder & IT consultant (2025 →)\nDalkia EN – Methods Assistant (Apr–Oct 2024)\nLa Poste PIC Rouen – Intern (Jun–Jul 2023)\nOrange Senegal DOI – Intern (Jul–Aug 2022)\nOrange Senegal DSI – Intern (Jul–Aug 2021)";

  if (/maadec/.test(l))
    return "MAADEC is the IT consulting firm founded by Abdoul Ahad. It provides backend, infrastructure and data engineering services to B2B clients.";

  if (/skill|tech|technology|tool|language|stack/.test(l))
    return "Tech stack:\n\nPython, SQL, Java, C, JavaScript\nHadoop, HDFS, Apache Spark, Talend\nDocker, Docker-Compose, Git\nPower BI, Looker Studio, Grafana\nMongoDB, Neo4j, Elasticsearch\nReact, Express.js, FastAPI";

  if (/orange|sonatel|data catalog|data lineage/.test(l))
    return "At Orange Sonatel (internship 2025):\n\nTwo tools built:\n- Data Catalog: replaced Excel tracking with a web app featuring LLM-generated metadata\n- Data Lineage: interactive dependency graph between tables (Neo4j)\n\nStack: Cloudera, Spark, Elasticsearch, React, Python, Scala";

  if (/dalkia|gmao|kpi/.test(l))
    return "At Dalkia EN (Apr–Oct 2024):\n\nMissions: CMMS development, Looker Studio reports, macro automation, KPI dashboards for contractors.\nImpact: improved reporting reliability and reduced preparation time.";

  if (/project|pilltrack|nafaka|docker|vpn|infrastructure/.test(l))
    return "Projects:\n\n01 — PillTrack: stock management and expiry alerts for pharmacies (Python, FastAPI, PostgreSQL, Docker) — in development\n02 — Nafaka SaaS: backend API for B2B SaaS platform (Node.js, MongoDB, Redis, Docker) — deployed to production\n03 — Docker/VPN Infrastructure: secure deployment on Windows Server 2022 (Docker, WireGuard, Nginx)";

  if (/interest|passion|hobby|sport/.test(l))
    return "Interests:\n\nData & AI, cloud technologies, backend development\nFootball, Scrabble\nHackathons, open source projects\nGIS & geomatics";

  if (/language|english|french|wolof/.test(l))
    return "Languages:\n\nFrench — fluent\nEnglish — TOEIC B2\nWolof — native";

  if (/philosophy|value|motivation|vision/.test(l))
    return "\"Data isn't just numbers — it's the art of turning information into positive impact.\"\n\nValues: Innovation, Sustainability, Collaboration, Excellence.";

  if (/contact|email|linkedin|reach/.test(l))
    return "Contact:\n\nEmail: aad.mbacke691@gmail.com\nPhone: +33 7 49 05 18 79\nLinkedIn: linkedin.com/in/abdoul-ahad-mbacké-diouf-5b04b4213\nGitHub: github.com/AbdoulDiouf2\nMADEC: maadec.vercel.app";

  if (/age|born|birth/.test(l))
    return "Abdoul Ahad was born on November 12, 2001 (23 years old).";

  if (/where|location|live|based|rouen|nantes|gif/.test(l))
    return "Based in Gif-sur-Yvette, France. Originally from Dakar, Senegal. Studied in Rouen (ESIGELEC).";

  if (/python|hadoop|spark|big data|docker/.test(l))
    return "Python and SQL are his main languages. He uses Hadoop/HDFS and Apache Spark for Big Data processing, Docker for deployment. Proficient with FastAPI, Express.js and React.";

  if (/thank/.test(l))
    return "You're welcome. Feel free to ask anything else.";

  if (/bye|goodbye|see you/.test(l))
    return "Goodbye. Have a great day.";

  if (/future|goal|ambition|career/.test(l))
    return "Abdoul Ahad aims to establish himself as an independent IT consultant and data engineer, while growing MAADEC. Focus areas: cloud infrastructure, critical data systems, and impact-driven projects.";

  return null;
};

function generateResponse(question: string): string {
  const lang = i18n.language === 'en' ? 'en' : 'fr';
  const result = lang === 'en' ? responsesEN(question) : responsesFR(question);
  if (result) return result;

  return lang === 'en'
    ? "I didn't find a specific answer to your question. You can ask me about: education, experience, MAADEC, projects, skills, contact, philosophy."
    : "Je n'ai pas trouvé de réponse précise. Vous pouvez me poser des questions sur : la formation, l'expérience, MAADEC, les projets, les compétences, le contact, la philosophie.";
}

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, text: t('chatbot.greeting'), sender: 'bot', timestamp: new Date() }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: messages.length + 1, text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const current = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: messages.length + 2, text: generateResponse(current), sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const renderText = (text: string) => (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.65 }}>
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: '0.4rem' }} />;
        return (
          <div key={i} style={{ marginBottom: '1px' }}>
            {line}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          right: '1.5rem',
          bottom: '1.5rem',
          zIndex: 9999,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '10px',
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent-gold)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent-gold)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
        }}
      >
        {isOpen ? <X size={18} /> : <MessageCircle size={18} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              right: '1.5rem',
              bottom: '10rem',
              width: '360px',
              maxWidth: 'calc(100vw - 3rem)',
              height: '480px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 9999
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-bg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={15} style={{ color: 'var(--color-accent-gold)' }} />
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text)' }}>
                    {t('chatbot.title')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-accent-gold)', display: 'block', letterSpacing: '0.06em' }}>
                    {t('chatbot.subtitle')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', transition: 'color 0.2s', padding: '4px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--color-bg)' }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem', alignItems: 'flex-start' }}
                >
                  {msg.sender === 'bot' && (
                    <div style={{ flexShrink: 0, marginTop: '2px' }}>
                      <Bot size={14} style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '82%',
                    padding: '0.6rem 0.8rem',
                    background: msg.sender === 'user' ? 'var(--color-accent-blue)' : 'var(--color-surface)',
                    border: `1px solid ${msg.sender === 'user' ? 'transparent' : 'var(--color-border)'}`,
                    borderRadius: '4px',
                    color: 'var(--color-text)'
                  }}>
                    {msg.sender === 'bot' ? renderText(msg.text) : (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>{msg.text}</span>
                    )}
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-muted)', marginTop: '0.3rem', textAlign: 'right' }}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {msg.sender === 'user' && (
                    <div style={{ flexShrink: 0, marginTop: '2px' }}>
                      <User size={14} style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bot size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <div style={{ display: 'flex', gap: '3px', padding: '0.5rem 0.75rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-text-muted)', animation: 'bounce 1.2s infinite', animationDelay: `${delay}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                disabled={isTyping}
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  color: 'var(--color-text)',
                  outline: 'none'
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-accent-gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '8px 10px',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                  opacity: isTyping ? 0.5 : 1
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent-gold)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent-gold)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
