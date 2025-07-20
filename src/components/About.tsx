import React from 'react';
import { GraduationCap, MapPin, Heart, Target, Users, Lightbulb, Brain, Code, Globe, Database, Gamepad2, Trophy, Github, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import AboutBackground from './AboutBackground';

export default function About() {
  // Timeline géographique
  const geographicJourney = [
    {
      location: "Dakar, Sénégal",
      period: "2019-2022",
      phase: "Formation initiale",
      description: "Baccalauréat S2 et Classes Préparatoires Scientifiques",
      coordinates: { lat: 14.7167, lng: -17.4677 },
      color: "from-orange-500 to-red-500"
    },
    {
      location: "Rouen, France",
      period: "2022-2025",
      phase: "Ingénierie Big Data",
      description: "Formation d'ingénieur spécialisé en Big Data et Transformation Numérique",
      coordinates: { lat: 49.4431, lng: 1.0993 },
      color: "from-blue-500 to-indigo-500"
    },
    {
      location: "Nantes, France",
      period: "2025-2026",
      phase: "Mastère IA",
      description: "Spécialisation en Intelligence Artificielle et Data Science",
      coordinates: { lat: 48.8566, lng: 2.3522 },
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Philosophie et valeurs
  const philosophy = {
    quote: "La data n'est pas juste des chiffres, c'est l'art de transformer l'information en impact positif.",
    author: "Abdoul Ahad Mbacké Diouf",
    values: [
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Innovation",
        description: "Toujours chercher des solutions créatives aux défis complexes"
      },
      {
        icon: <Heart className="w-6 h-6" />,
        title: "Durabilité",
        description: "Développer des solutions tech respectueuses de l'environnement"
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Collaboration",
        description: "Croire en la force du travail d'équipe et du partage de connaissances"
      },
      {
        icon: <Target className="w-6 h-6" />,
        title: "Excellence",
        description: "Viser la qualité dans chaque projet et chaque ligne de code"
      }
    ]
  };

  // Centres d'intérêt interactifs
  const interests = [
    {
      category: "Data & Intelligence Artificielle",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      items: [
        { name: "Modélisation prédictive", tech: "Prophet, XGBoost" },
        { name: "Analyse & Visualisation", tech: "Flask, Looker Studio" },
        { name: "Machine Learning", tech: "Scikit-learn, TensorFlow" }
      ]
    },
    {
      category: "Technologies Innovantes",
      icon: <Database className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      items: [
        { name: "Big Data", tech: "Hadoop, Hive, Talend" },
        { name: "Cloud Computing", tech: "Azure, Docker" },
        { name: "Bases de données", tech: "SQL, NoSQL, MongoDB, Neo4j" }
      ]
    },
    {
      category: "Développement Web",
      icon: <Code className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      items: [
        { name: "Frontend", tech: "HTML, CSS, JavaScript" },
        { name: "Frameworks", tech: "React, Bootstrap" },
        { name: "Dashboards", tech: "Interactifs & Responsifs" }
      ]
    },
    {
      category: "SIG & Géomatique",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      items: [
        { name: "Cartographie", tech: "ArcGIS, QGIS" },
        { name: "Analyse spatiale", tech: "Projets concrets" },
        { name: "Géovisualisation", tech: "Données géographiques" }
      ]
    },
    {
      category: "Sports & Loisirs",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      items: [
        { name: "Football", tech: "Esprit d'équipe" },
        { name: "Scrabble", tech: "Stratégie & Famille" },
        { name: "Hackathons", tech: "Med'ING Hack" }
      ]
    },
    {
      category: "Culture Open Source",
      icon: <Github className="w-8 h-8" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50 dark:bg-gray-800/20",
      items: [
        { name: "Développement", tech: "GitHub, Git" },
        { name: "Collaboration", tech: "Trello, Docker" },
        { name: "Partage", tech: "Projets communautaires" }
      ]
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <AboutBackground />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          À Propos de Moi
        </h2>

        {/* Timeline Géographique */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-200">
            Mon Parcours Géographique
          </h3>
          
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 transform hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {geographicJourney.map((journey, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative"
                >
                  {/* Point sur la timeline */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${journey.color} border-4 border-white dark:border-gray-900 shadow-lg`} />
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${journey.color} text-white`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {journey.location}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {journey.period}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${journey.color} mb-3`}>
                      {journey.phase}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {journey.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section Ma Philosophie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-200">
            Ma Philosophie
          </h3>
          
          {/* Citation principale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center mb-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl font-medium italic mb-4 leading-relaxed">
                "{philosophy.quote}"
              </blockquote>
              <cite className="text-blue-200 font-semibold">
                — {philosophy.author}
              </cite>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute top-4 left-4 text-6xl text-white opacity-20">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-white opacity-20 rotate-180">"</div>
          </motion.div>

          {/* Valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {value.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Centres d'intérêt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-200">
            Centres d'intérêt
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${interest.bgColor} text-center group`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {interest.icon}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {interest.category}
                </h4>
                
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {interest.items.map((item, index) => (
                    <li key={index}>
                      {item.name} ({item.tech})
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grille en deux colonnes */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colonne de gauche */}
          <div className="space-y-8">
            {/* Résumé professionnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Résumé professionnel</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  🎓 Étudiant ingénieur en Big Data & Transformation Numérique, je conçois des solutions autour de la donnée, avec une appétence forte pour la visualisation, les outils cloud et les projets concrets.
                </p>
                <p>
                  💡 Curieux, rigoureux et adaptable, j’ai développé une approche agile et orientée utilisateur, avec un intérêt pour les projets data utiles, durables et collaboratifs.
                </p>
                <p>
                  🧩 En dehors du code, j’aime les jeux de logique comme le Scrabble, et je m’inspire des enjeux environnementaux pour penser la data autrement.
                </p>
              </div>
            </motion.div>

            {/* Informations personnelles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Informations personnelles</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Date de naissance :</span> 12 novembre 2001
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    <span className="font-medium">Permis :</span> Permis B (Non véhiculé)
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Langues :</span>
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-1">
                    <li>Français (courant)</li>
                    <li>Anglais (TOEIC B2)</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-8">
            {/* Formation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Formation</h3>
              <div className="relative border-l border-gray-200 dark:border-gray-700">
                {/* ESIGELEC */}
                <div className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800">
                    <GraduationCap className="w-3 h-3 text-white" />
                  </span>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">ESIGELEC - Rouen, France</h4>
                  <time className="block mb-2 text-sm text-gray-600 dark:text-gray-400">2022 - 2025</time>
                  <p className="text-base text-gray-600 dark:text-gray-300"><strong>Diplôme BAC+5</strong> : Ingénieur Big Data pour la Transformation Numérique</p>
                  <ul className="list-disc list-inside mt-2 ml-4 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>C# et Cloud Azure</li>
                    <li>Gestion de projet Data</li>
                    <li>SQL, Talend, PL/SQL, Power BI</li>
                    <li>Python, Hadoop, Hive, HiveQL, R, SIG, d3.js</li>
                  </ul>
                </div>

                {/* ESMT */}
                <div className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800">
                    <GraduationCap className="w-3 h-3 text-white" />
                  </span>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">ESMT - Dakar, Sénégal</h4>
                  <time className="block mb-2 text-sm text-gray-600 dark:text-gray-400">2020 - 2022</time>
                  <p className="text-base text-gray-600 dark:text-gray-300"><strong>Formation BAC+2</strong> : Classes Préparatoires Scientifiques (CPS)</p>
                  <ul className="list-disc list-inside mt-2 ml-4 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Mathématiques</li>
                    <li>Physique</li>
                    <li>Sciences de l'Ingénieur</li>
                  </ul>
                </div>

                {/* Lycée */}
                <div className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800">
                    <GraduationCap className="w-3 h-3 text-white" />
                  </span>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lycée d'Excellence Privé Birago DIOP - Dakar</h4>
                  <time className="block mb-2 text-sm text-gray-600 dark:text-gray-400">2019 - 2020</time>
                  <p className="text-base text-gray-600 dark:text-gray-300"><strong>Baccalauréat Scientifique</strong> : Série Scientifiques S2</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
