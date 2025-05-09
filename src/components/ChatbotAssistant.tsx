import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface pour les messages
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Message de bienvenue lors de l'ouverture du chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        text: "Bonjour ! Je suis l'assistant virtuel d'Abdoul Ahad. Comment puis-je vous aider ?",
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
    setInputValue('');
    
    // Répondre après un court délai (simulation de traitement)
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 600);
  };
  
  // Fonction pour générer des réponses basées sur les mots-clés
  const generateResponse = (question: string): string => {
    const lower = question.toLowerCase();
  
    if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) {
      return "Bonjour ! Je suis l'assistant virtuel d'Abdoul Ahad Mbacké Diouf. Posez-moi une question sur son profil, ses compétences, ses expériences ou ses projets.";
    }
  
    if (lower.includes('qui es-tu') || lower.includes('présente toi') || lower.includes('présentation')) {
      return "Je suis l'assistant d'Abdoul Ahad Mbacké Diouf, ingénieur en alternance spécialisé en Big Data et Intelligence Artificielle, formé à l’ESIGELEC et actuellement en Mastère à Sup de Vinci.";
    }
  
    if (lower.includes('formation') || lower.includes('études') || lower.includes('parcours')) {
      return "Abdoul suit un Mastère 2 Big Data & IA à Sup de Vinci (2025-2026) et est diplômé de l’ESIGELEC (2022-2025) en Big Data. Il a aussi étudié à l'ESMT de Dakar (prépa) et au lycée Birago Diop (série S).";
    }
  
    if (lower.includes('expérience') || lower.includes('stage') || lower.includes('professionnel') || lower.includes('orange') || lower.includes('dalkia')) {
      return "Abdoul a été stagiaire Data Engineer chez Orange Sénégal en 2025 (catalogage, lineage, Cloudera). Avant cela, Assistant Chargé Méthodes chez DALKIA EN en 2024 (KPI, GMAO, Looker Studio). Il a aussi travaillé à La POSTE en 2023.";
    }
  
    if (lower.includes('compétence') || lower.includes('technologie') || lower.includes('technique') || lower.includes('outil')) {
      return "Abdoul maîtrise : Python, Java, SQL, PL/SQL, R, C, Hadoop, Spark, Oozie, Talend, Power BI, Looker Studio, Docker, MongoDB, Git, ArcGIS, et Azure. Il parle aussi anglais niveau B2 (TOEIC validé).";
    }
  
    if (lower.includes('projet') || lower.includes('réalisation') || lower.includes('hackathon') || lower.includes('mikana') || lower.includes('analyse vidéo')) {
      return "Ses projets incluent MIKANA (solution IA logistique, Hackathon Med’ING), un outil d’analyse vidéo pour l’aviron (MediaPipe, OpenCV), et des dashboards décisionnels dans ses stages.";
    }
  
    if (lower.includes('langue') || lower.includes('parle') || lower.includes('anglais') || lower.includes('toeic')) {
      return "Abdoul parle français couramment et possède un niveau B2 en anglais (TOEIC validé).";
    }
  
    if (lower.includes('cv') || lower.includes('curriculum')) {
      return "Le CV d'Abdoul Ahad est disponible dans la section d'accueil du site ou via son portfolio : https://abdouldiouf2.github.io/portfolio_last_version/";
    }
  
    if (lower.includes('contact') || lower.includes('email') || lower.includes('téléphone')) {
      return "Vous pouvez contacter Abdoul par email à aad.mbacke691@gmail.com ou au +33 7 49 05 18 79. Il est basé à Nantes et disponible partout en France.";
    }
  
    if (lower.includes('loisir') || lower.includes('passion') || lower.includes('intérêt') || lower.includes('hobby') || lower.includes('sport')) {
      return "En dehors de la data, Abdoul aime le football entre amis, le Scrabble en famille, les jeux de stratégie et participer à des hackathons.";
    }
  
    if (lower.includes('merci') || lower.includes('thanks') || lower.includes('thank')) {
      return "Avec plaisir ! Je reste à votre disposition pour toute autre question sur le profil d'Abdoul Ahad.";
    }
  
    // Filtrage hors sujet
    const sujetProfessionnel = [
      "formation", "étude", "expérience", "stage", "projet", "compétence",
      "skill", "langue", "cv", "contact", "travail", "mikana", "big data", "ia"
    ];
    const concernePortfolio = sujetProfessionnel.some(word => lower.includes(word));
    if (!concernePortfolio) {
      return "Cette question ne semble pas concerner le profil professionnel d'Abdoul Ahad. Je vous invite à utiliser le formulaire de contact dans la section 'Message' de son portfolio.";
    }
  
    // Réponse par défaut
    return "Je n'ai pas d'information exacte à ce sujet. Vous pouvez poser une question sur sa formation, ses expériences, ses compétences ou ses projets.";
  };
  
  
  return (
    <>
      {/* Bouton pour ouvrir/fermer le chat */}
      <motion.button
        onClick={toggleChat}
        className="fixed right-6 bottom-[5rem] p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 z-[9999] opacity-50 hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
      
      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-6 bottom-[10rem] w-80 md:w-[350px] h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-300 dark:border-gray-700 z-[9999]"
            initial={{ opacity: 0, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, originY: 1, originX: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* En-tête du chat */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-semibold">Assistant AAMD</h3>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Zone de saisie */}
            <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Posez une question sur Abdoul Ahad..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
