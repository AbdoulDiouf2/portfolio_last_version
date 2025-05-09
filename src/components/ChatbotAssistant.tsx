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
    // Convertir la question en minuscules pour une correspondance insensible à la casse
    const lowerQuestion = question.toLowerCase();
    
    // Réponses basées sur des mots-clés
    if (lowerQuestion.includes('bonjour') || lowerQuestion.includes('salut') || lowerQuestion.includes('hello')) {
      return "Bonjour ! Je suis l'assistant virtuel d'Abdoul Ahad. Comment puis-je vous aider ?";
    }
    
    if (lowerQuestion.includes('qui es-tu') || lowerQuestion.includes('qui êtes-vous')) {
      return "Je suis l'assistant virtuel d'Abdoul Ahad Mbacké Diouf, un étudiant ingénieur en Big Data à l'ESIGELEC à Rouen, France.";
    }
    
    if (lowerQuestion.includes('formation') || lowerQuestion.includes('étude') || lowerQuestion.includes('parcours') || lowerQuestion.includes('études')) {
      return "Abdoul Ahad est étudiant en Big Data pour la Transformation Numérique à l'ESIGELEC (Rouen, 2022-2025). Il a également étudié à l'ESMT de Dakar en classes préparatoires (2020-2022) et a obtenu son baccalauréat scientifique au Lycée d'Excellence Privé Birago DIOP à Dakar.";
    }
    
    if (lowerQuestion.includes('compétence') || lowerQuestion.includes('savoir-faire') || lowerQuestion.includes('skill')) {
      return "Abdoul Ahad possède des compétences dans plusieurs domaines : langages de programmation (Python, Java, SQL, C), Big Data (Hadoop, Power BI, Talend), technologies de développement (Git, Docker) et d'autres outils comme Jupyter Notebook et Microsoft Office.";
    }
    
    if (lowerQuestion.includes('expérience') || lowerQuestion.includes('stage') || lowerQuestion.includes('travail') || lowerQuestion.includes('job')) {
      return "Abdoul Ahad a réalisé un stage chez DALKIA EN (2024) comme Assistant Chargé Méthodes où il a travaillé sur la GMAO et Looker Studio. Il a également travaillé à La POSTE (2023) et chez Orange Sénégal (2021-2022) dans différents services.";
    }
    
    if (lowerQuestion.includes('projet') || lowerQuestion.includes('réalisation')) {
      return "Abdoul Ahad a participé à plusieurs projets : le Hackaton Med'ING Hack avec le projet MIKANA, un projet d'analyse vidéo pour l'optimisation de la technique d'aviron, et le développement d'outils de gestion (absences, jeux de plateau).";
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('téléphone')) {
      return "Vous pouvez contacter Abdoul Ahad par email à aad.mbacke691@gmail.com ou par téléphone au +33 7 49 05 18 79. Il est basé à Rouen, France.";
    }
    
    if (lowerQuestion.includes('langue') || lowerQuestion.includes('parle')) {
      return "Abdoul Ahad parle couramment français et a un niveau B2 en anglais (TOEIC).";
    }
    
    if (lowerQuestion.includes('intérêt') || lowerQuestion.includes('passion') || lowerQuestion.includes('hobby') || lowerQuestion.includes('loisir')) {
      return "Abdoul Ahad s'intéresse à la Data & l'Intelligence Artificielle, aux technologies innovantes, au développement web, aux SIG, aux sports collectifs comme le football, aux jeux de réflexion comme le Scrabble, et participe régulièrement à des hackathons.";
    }
    
    if (lowerQuestion.includes('merci') || lowerQuestion.includes('thanks')) {
      return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur Abdoul Ahad Mbacké Diouf.";
    }
    
    if (lowerQuestion.includes('cv') || lowerQuestion.includes('curriculum') || lowerQuestion.includes('résumé')) {
      return "Vous pouvez télécharger le CV d'Abdoul Ahad directement depuis la section d'accueil du site, il a été mis à jour le 08/05/2025.";
    }
    
    // Réponse par défaut si aucun mot-clé n'est détecté
    return "Je n'ai pas toutes les informations sur ce sujet. N'hésitez pas à poser une question sur la formation, les compétences, les expériences professionnelles ou les projets d'Abdoul Ahad.";
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
