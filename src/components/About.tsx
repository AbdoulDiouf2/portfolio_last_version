import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          À Propos de Moi
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Résumé professionnel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Résumé professionnel</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Étudiant en cycle Ingénieur Généraliste à l'ESIGELEC (Rouen), spécialisé en Big Data pour la Transformation Numérique. 
              Passionné par les données, les technologies émergentes et la visualisation, avec une expertise en gestion de projets data et analyse décisionnelle.
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <li>Anglais (B2)</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Centres d'intérêt */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Centres d'intérêt</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Data visualisation et amélioration continue</li>
              <li>Environnement : traitement de l'eau, gestion des déchets</li>
              <li>Activité personnelle : Scrabble</li>
            </ul>
          </motion.div>

          {/* Formation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Formation</h3>
            
            <div className="relative border-l border-gray-200 dark:border-gray-700">
              <div className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800">
                  <GraduationCap className="w-3 h-3 text-white" />
                </span>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">ESIGELEC - Rouen, France</h4>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">2022 - 2025</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">Diplôme : Ingénieur Big Data pour la Transformation Numérique</p>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Compétences acquises :</span> SQL, Talend, PL/SQL, Power BI, Python, 
                  Hadoop, Hive, HiveQL, R, Modélisation décisionnelle, SIG, Cloud Azure, d3.js, C#
                </p>
              </div>

              <div className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800">
                  <GraduationCap className="w-3 h-3 text-white" />
                </span>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">ESMT - Dakar, Sénégal</h4>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">2020 - 2022</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">Classes Préparatoires Scientifiques (CPS)</p>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">
                  Mathématiques, Physique, Sciences de l'Ingénieur
                </p>
              </div>

              <div className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800">
                  <GraduationCap className="w-3 h-3 text-white" />
                </span>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Université Cheikh Anta Diop - Dakar, Sénégal</h4>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">2018 - 2020</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">Licence en Sciences et Technologies</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}