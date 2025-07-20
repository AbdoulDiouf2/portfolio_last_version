import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface pour les messages
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Base de connaissances complète sur Abdoul Ahad
const knowledgeBase = {
  personal: {
    fullName: "Abdoul Ahad Mbacké Diouf",
    age: 23, // Calculé dynamiquement
    birthDate: "2001-09-15",
    nationality: "Sénégalais",
    languages: ["Français (natif)", "Anglais (B2 - TOEIC validé)", "Wolof (natif)"],
    location: "Actuellement entre Rouen et Nantes, France",
    philosophy: "La data n'est pas juste des chiffres, c'est l'art de transformer l'information en impact positif.",
    values: ["Innovation", "Durabilité", "Collaboration", "Excellence"]
  },
  education: {
    current: {
      degree: "Mastère 2 Big Data & Intelligence Artificielle",
      school: "Sup de Vinci",
      location: "Nantes, France",
      period: "2025-2026",
      status: "En cours"
    },
    previous: [
      {
        degree: "Diplôme d'Ingénieur Big Data et Transformation Numérique",
        school: "ESIGELEC",
        location: "Rouen, France",
        period: "2022-2025",
        status: "Diplômé"
      },
      {
        degree: "Classes Préparatoires Scientifiques (MPSI/MP)",
        school: "École Supérieure Multinationale des Télécommunications (ESMT)",
        location: "Dakar, Sénégal",
        period: "2020-2022"
      },
      {
        degree: "Baccalauréat Série S2",
        school: "Lycée Birago Diop",
        location: "Dakar, Sénégal",
        period: "2019",
        mention: "Bien"
      }
    ]
  },
  experience: {
    current: {
      title: "Data Engineer Stagiaire",
      company: "Orange Sonatel - Pôle Data",
      location: "Dakar, Sénégal",
      period: "Mai 2025 - Septembre 2025",
      missions: [
        "Développement d'un outil de Data Catalog intelligent",
        "Création d'un système de Data Lineage visuel",
        "Automatisation de la documentation des métadonnées",
        "Intégration de LLM pour la génération de descriptions",
        "Développement d'interfaces web modernes"
      ],
      technologies: ["Cloudera", "Hadoop", "HDFS", "Apache Spark", "Elasticsearch", "Grafana", "Python", "Scala", "React.js", "Neo4j"]
    },
    previous: [
      {
        title: "Assistant Chargé Méthodes - Pilotage Zone NE",
        company: "DALKIA EN",
        period: "Avril 2024 - Octobre 2024",
        missions: [
          "Développement de la GMAO",
          "Création de rapports Looker Studio",
          "Optimisation des scripts d'import",
          "Automatisation avec macros",
          "Suivi KPI des prestataires"
        ]
      },
      {
        title: "Stagiaire Agent de Production",
        company: "La POSTE - PIC Rouen Madrillet",
        period: "Juin-Juillet 2023",
        missions: ["Triage automatisé", "Manutention", "Gestion logistique"]
      }
    ]
  },
  skills: {
    programming: ["Python", "Java", "SQL", "PL/SQL", "R", "C", "Scala", "JavaScript"],
    bigData: ["Hadoop", "Apache Spark", "Hive", "Oozie", "Talend", "NiFi"],
    databases: ["SQL Server", "Oracle", "MongoDB", "Neo4j", "Elasticsearch"],
    cloud: ["Microsoft Azure", "Docker"],
    bi: ["Power BI", "Looker Studio", "Grafana"],
    web: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
    tools: ["Git", "GitHub", "ArcGIS", "QGIS", "Trello"],
    methodologies: ["Agile", "DevOps", "Data Governance"]
  },
  interests: [
    {
      category: "Data & IA",
      items: ["Modélisation prédictive", "Machine Learning", "Deep Learning", "NLP"]
    },
    {
      category: "Technologies",
      items: ["Big Data", "Cloud Computing", "IoT", "Blockchain"]
    },
    {
      category: "Sports",
      items: ["Football", "Basketball", "Course à pied"]
    },
    {
      category: "Loisirs",
      items: ["Scrabble", "Hackathons", "Lecture tech", "Projets open source"]
    }
  ],
  projects: [
    {
      name: "Portfolio Personnel Interactif",
      description: "Site web moderne avec animations 3D et chatbot IA",
      technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"]
    },
    {
      name: "Système de Data Catalog",
      description: "Outil intelligent de catalogage automatisé des données",
      technologies: ["Python", "Spark", "React", "LLM"]
    },
    {
      name: "Dashboard KPI Automatisé",
      description: "Tableau de bord pour le suivi de performance",
      technologies: ["Looker Studio", "Python", "SQL"]
    }
  ],
  contact: {
    email: "abdoul.diouf@example.com", // À remplacer par le vrai email
    linkedin: "linkedin.com/in/abdoul-ahad-diouf",
    github: "github.com/abdoul-ahad-diouf",
    location: "France (Rouen/Nantes)"
  }
};

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Message de bienvenue lors de l'ouverture du chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        text: "👋 Bonjour ! Je suis l'assistant virtuel d'Abdoul Ahad Mbacké Diouf. Je connais tout de son parcours, ses compétences, ses expériences et ses projets. N'hésitez pas à me poser toutes vos questions !",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);
  
  // Défilement automatique vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    
    // Répondre après un court délai (simulation de traitement)
    setTimeout(() => {
      const botResponse = generateIntelligentResponse(currentInput);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  // Fonction intelligente pour générer des réponses contextuelles
  const generateIntelligentResponse = (question: string): string => {
    const lower = question.toLowerCase();

    // Salutations
    if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello') || lower.includes('bonsoir')) {
      return "👋 Bonjour ! Je suis ravi de vous parler d'Abdoul Ahad. Que souhaitez-vous savoir sur lui ? Son parcours, ses compétences, ses expériences ou ses projets ?";
    }

    // Questions sur l'identité
    if (lower.includes('qui est') || lower.includes('présente') || lower.includes('qui es-tu') || (lower.includes('qui') && lower.includes('abdoul'))) {
      return `🎓 Abdoul Ahad Mbacké Diouf est un ingénieur spécialisé en Big Data et Intelligence Artificielle de ${knowledgeBase.personal.age} ans. Diplômé de l'ESIGELEC (Rouen), il poursuit actuellement un Mastère 2 IA à Sup de Vinci (Nantes). Passionné par la transformation numérique, il excelle dans l'analyse de données, le développement d'outils intelligents et l'automatisation de processus.`;
    }

    // Formation et études
    if (lower.includes('formation') || lower.includes('étude') || lower.includes('diplôme') || lower.includes('école') || lower.includes('université')) {
      let response = "🎓 **Parcours académique d'Abdoul Ahad :**\n\n";
      response += `**Actuellement :** ${knowledgeBase.education.current.degree} à ${knowledgeBase.education.current.school} (${knowledgeBase.education.current.period})\n\n`;
      response += "**Formations précédentes :**\n";
      knowledgeBase.education.previous.forEach(edu => {
        response += `• ${edu.degree} - ${edu.school} (${edu.period})\n`;
      });
      return response;
    }

    // Expériences professionnelles
    if (lower.includes('expérience') || lower.includes('stage') || lower.includes('travail') || lower.includes('professionnel') || lower.includes('emploi')) {
      let response = "💼 **Expériences professionnelles d'Abdoul Ahad :**\n\n";
      response += `**Actuellement :** ${knowledgeBase.experience.current.title} chez ${knowledgeBase.experience.current.company} (${knowledgeBase.experience.current.period})\n`;
      response += "Missions principales : Développement d'outils de Data Catalog et Data Lineage, automatisation avec IA\n\n";
      response += "**Expériences précédentes :**\n";
      knowledgeBase.experience.previous.forEach(exp => {
        response += `• ${exp.title} chez ${exp.company} (${exp.period})\n`;
      });
      return response;
    }

    // Compétences techniques
    if (lower.includes('compétence') || lower.includes('technique') || lower.includes('technologie') || lower.includes('outil') || lower.includes('langage')) {
      let response = "⚡ **Compétences techniques d'Abdoul Ahad :**\n\n";
      response += `**Programmation :** ${knowledgeBase.skills.programming.join(', ')}\n\n`;
      response += `**Big Data :** ${knowledgeBase.skills.bigData.join(', ')}\n\n`;
      response += `**Bases de données :** ${knowledgeBase.skills.databases.join(', ')}\n\n`;
      response += `**Cloud & DevOps :** ${knowledgeBase.skills.cloud.join(', ')}\n\n`;
      response += `**BI & Visualisation :** ${knowledgeBase.skills.bi.join(', ')}`;
      return response;
    }

    // Questions spécifiques sur Orange/Sonatel
    if (lower.includes('orange') || lower.includes('sonatel') || lower.includes('stage actuel') || lower.includes('data catalog')) {
      return `🍊 Stage actuel chez Orange Sonatel :\n\nAbdoul travaille sur deux projets innovants :\n\n• Data Catalog intelligent : Remplacement d'un système Excel par une application automatisée avec IA pour cataloguer les données\n\n• Data Lineage visuel : Système de visualisation des dépendances entre tables sous forme de graphe interactif\n\nTechnologies utilisées : Cloudera, Spark, Elasticsearch, React, LLM, Neo4j`;
    }

    // Questions sur DALKIA
    if (lower.includes('dalkia') || lower.includes('gmao') || lower.includes('kpi')) {
      return "🏭 Expérience chez DALKIA EN :\n\nAbdoul a travaillé comme Assistant Chargé Méthodes où il a :\n\n• Développé la GMAO (Gestion de Maintenance Assistée par Ordinateur)\n• Créé des rapports automatisés sur Looker Studio\n• Mis en place des KPI de performance des prestataires\n• Optimisé les processus avec des macros et scripts";
    }

    // Projets
    if (lower.includes('projet') || lower.includes('réalisation') || lower.includes('portfolio')) {
      let response = "🚀 **Projets d'Abdoul Ahad :**\n\n";
      knowledgeBase.projects.forEach(project => {
        response += `**${project.name}**\n${project.description}\nTech : ${project.technologies.join(', ')}\n\n`;
      });
      return response;
    }

    // Centres d'intérêt
    if (lower.includes('intérêt') || lower.includes('passion') || lower.includes('loisir') || lower.includes('sport') || lower.includes('hobby')) {
      let response = "🎯 **Centres d'intérêt d'Abdoul Ahad :**\n\n";
      knowledgeBase.interests.forEach(interest => {
        response += `**${interest.category} :** ${interest.items.join(', ')}\n`;
      });
      return response;
    }

    // Langues
    if (lower.includes('langue') || lower.includes('anglais') || lower.includes('français') || lower.includes('wolof')) {
      return `🌍 **Langues parlées par Abdoul Ahad :**\n${knowledgeBase.personal.languages.join('\n')}`;
    }

    // Philosophie et valeurs
    if (lower.includes('philosophie') || lower.includes('valeur') || lower.includes('motivation') || lower.includes('vision')) {
      return `💭 **Philosophie d'Abdoul Ahad :**\n\n"${knowledgeBase.personal.philosophy}"\n\n**Ses valeurs :** ${knowledgeBase.personal.values.join(', ')}`;
    }

    // Contact
    if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin') || lower.includes('joindre')) {
      return `📧 **Contact d'Abdoul Ahad :**\n\n• LinkedIn : ${knowledgeBase.contact.linkedin}\n• GitHub : ${knowledgeBase.contact.github}\n• Localisation : ${knowledgeBase.contact.location}\n\nVous pouvez le contacter via ces plateformes professionnelles !`;
    }

    // Âge
    if (lower.includes('âge') || lower.includes('age') || lower.includes('vieux') || lower.includes('jeune')) {
      return `🎂 Abdoul Ahad a ${knowledgeBase.personal.age} ans (né le 15 septembre 2001). Un jeune ingénieur plein d'ambition !`;
    }

    // Localisation
    if (lower.includes('où') || lower.includes('lieu') || lower.includes('habite') || lower.includes('vit') || lower.includes('rouen') || lower.includes('nantes')) {
      return `📍 Abdoul Ahad évolue entre **Rouen** (où il a étudié à l'ESIGELEC) et **Nantes** (où il fait son Mastère IA). Il est originaire de **Dakar, Sénégal** où il effectue actuellement son stage chez Orange Sonatel.`;
    }

    // Questions sur des technologies spécifiques
    if (lower.includes('python') || lower.includes('java') || lower.includes('sql')) {
      return "💻 Abdoul Ahad maîtrise plusieurs langages de programmation : Python (son préféré pour la data science), Java, SQL/PL-SQL, R, C, Scala et JavaScript. Il les utilise quotidiennement dans ses projets Big Data et IA.";
    }

    if (lower.includes('hadoop') || lower.includes('spark') || lower.includes('big data')) {
      return "🐘 Abdoul Ahad est expert en technologies Big Data : Hadoop, Apache Spark, Hive, Oozie, Talend, NiFi. Il les utilise actuellement chez Orange Sonatel pour traiter des volumes massifs de données.";
    }

    // Remerciements
    if (lower.includes('merci') || lower.includes('thank')) {
      return "😊 Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur Abdoul Ahad. Je suis là pour vous renseigner sur tous les aspects de son profil !";
    }

    // Au revoir
    if (lower.includes('au revoir') || lower.includes('bye') || lower.includes('à bientôt')) {
      return "👋 Au revoir ! J'espère avoir pu vous renseigner sur le profil d'Abdoul Ahad. N'hésitez pas à revenir si vous avez d'autres questions !";
    }

    // Questions sur le futur/objectifs
    if (lower.includes('futur') || lower.includes('objectif') || lower.includes('ambition') || lower.includes('carrière')) {
      return "🎯 Abdoul Ahad vise à devenir un expert reconnu en Intelligence Artificielle et Big Data. Ses objectifs : développer des solutions IA innovantes, contribuer à la transformation numérique des entreprises et avoir un impact positif grâce à la data science.";
    }

    // Réponse par défaut plus intelligente
    const topics = [
      "son parcours académique (ESIGELEC, Sup de Vinci)",
      "ses expériences (Orange Sonatel, DALKIA EN)",
      "ses compétences techniques (Python, Big Data, IA)",
      "ses projets (Data Catalog, Portfolio, KPI)",
      "ses centres d'intérêt",
      "ses valeurs et philosophie",
      "ses informations de contact"
    ];

    return `🤔 Je n'ai pas trouvé d'information spécifique à votre question. Voici ce que je peux vous dire sur Abdoul Ahad :\n\n${topics.map(topic => `• ${topic}`).join('\n')}\n\nPouvez-vous reformuler votre question ou choisir un de ces sujets ?`;
  };

  const renderBotMessage = (text: string) => {
    // Diviser le texte en lignes
    const lines = text.split('\n');
    
    return (
      <div className="text-sm leading-relaxed">
        {lines.map((line, index) => {
          // Ligne vide - espacement
          if (line.trim() === '') {
            return <div key={index} className="h-2" />;
          }
          
          // Titre principal avec emoji (🍊 **Stage actuel chez Orange Sonatel :**)
          if (line.includes('**') && /^[🎓💼⚡🍊🏭🚀🎯🌍💭📧🎂📍💻🐘😊👋🤔]/u.test(line)) {
            const parts = line.split('**');
            if (parts.length >= 3) {
              return (
                <div key={index} className="font-bold text-blue-600 dark:text-blue-400 text-base mb-2">
                  {parts[0]}
                  {parts[1]}
                  {parts[2]}
                </div>
              );
            }
          }
          
          // Sous-titre (**Actuellement :** ou **Expériences précédentes :**)
          if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
            const title = line.slice(2, -2);
            return (
              <div key={index} className="font-semibold text-gray-900 dark:text-gray-100 mt-3 mb-1">
                {title}
              </div>
            );
          }
          
          // Ligne avec du gras au milieu (• **Data Catalog intelligent** : Description)
          if (line.includes('**') && !line.startsWith('**')) {
            const parts = line.split('**');
            return (
              <div key={index} className="mb-1">
                {parts.map((part, partIndex) => (
                  partIndex % 2 === 0 ? (
                    <span key={partIndex}>{part}</span>
                  ) : (
                    <span key={partIndex} className="font-semibold text-gray-900 dark:text-gray-100">
                      {part}
                    </span>
                  )
                ))}
              </div>
            );
          }
          
          // Liste avec puces (• Item de liste)
          if (line.startsWith('• ')) {
            return (
              <div key={index} className="flex items-start mb-1 ml-2">
                <span className="text-blue-500 mr-2 flex-shrink-0 mt-0.5">•</span>
                <span>{line.slice(2)}</span>
              </div>
            );
          }
          
          // Ligne normale
          return (
            <div key={index} className="mb-1">
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Bouton pour ouvrir/fermer le chat */}
      <motion.button
        onClick={toggleChat}
        className="fixed right-6 bottom-[5rem] p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 z-[9999] opacity-60 hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
      
      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-6 bottom-[10rem] w-80 md:w-[400px] h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-300 dark:border-gray-700 z-[9999]"
            initial={{ opacity: 0, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, originY: 1, originX: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* En-tête du chat */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">Assistant AAMD</h3>
                  <p className="text-xs text-blue-100">Expert du profil d'Abdoul Ahad</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                      {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {message.sender === 'bot' ? (
                        renderBotMessage(message.text)
                      ) : (
                        <div className="whitespace-pre-line text-sm leading-relaxed">
                          {message.text}
                        </div>
                      )}
                      <div
                        className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-600">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg rounded-tl-none border border-gray-200 dark:border-gray-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Zone de saisie */}
            <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Posez une question sur Abdoul Ahad..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-shadow disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
