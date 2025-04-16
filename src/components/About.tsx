import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          À Propos de Moi
        </h2>

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

            {/* Centres d'intérêt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Centres d'intérêt</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Data & Intelligence Artificielle</strong> : Passionné par la modélisation prédictive, l’analyse et la visualisation (ex. : Prophet, XGBoost, Flask, Looker Studio…)</li>
                <li><strong>Technologies innovantes</strong> : Big Data (Hadoop, Hive, Talend), Cloud (Azure, Docker), Bases de données (SQL, NoSQL, MongoDB, Neo4j)</li>
                <li><strong>Développement Web</strong> : HTML, CSS, JS, Bootstrap, création de dashboards interactifs</li>
                <li><strong>SIG</strong> : Utilisation d’outils comme ArcGIS dans des projets concrets</li>
                <li><strong>Sports collectifs</strong> : Football entre amis, pour le dynamisme et l’esprit d’équipe</li>
                <li><strong>Jeux de réflexion</strong> : Scrabble en famille, stratégie et convivialité</li>
                <li><strong>Hackathons & projets</strong> : Projets comme Med’ING Hack pour résoudre des problèmes réels via la data</li>
                <li><strong>Culture Open Source</strong> : Actif sur GitHub, adepte de Git, Trello, Docker</li>
              </ul>
            </motion.div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-8">
            {/* Informations personnelles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Informations personnelles</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Date de naissance :</span> 12 novembre 2001
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    <span className="font-medium">Permis :</span> Permis B
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

            {/* Formation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lycée Privé Birago DIOP - Dakar</h4>
                  <time className="block mb-2 text-sm text-gray-600 dark:text-gray-400">2019 - 2020</time>
                  <p className="text-base text-gray-600 dark:text-gray-300"><strong>Baccalauréat Scientifique</strong> : Série S2</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
