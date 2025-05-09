import React from 'react';
import { Database, Server, Brain, Download } from 'lucide-react';
import HeroBackground3D from './HeroBackground3D';

export default function Hero() {
  return (
    <section id="home" className="h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <HeroBackground3D />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Database className="w-12 h-12 text-blue-200 dark:text-blue-400" />
        </div>
        <div className="absolute top-1/4 right-1/4 animate-float-delayed">
          <Server className="w-12 h-12 text-purple-200 dark:text-purple-400" />
        </div>
        <div className="absolute bottom-1/4 left-3/4 animate-float">
          <Brain className="w-12 h-12 text-indigo-200 dark:text-indigo-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          {/* Photo de profil */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="w-full h-auto max-h-[300px] md:max-h-[600px] overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-0">
              <img
                src="Images/profil_abdoul.jpg"
                alt="Abdoul Ahad Mbacké Diouf"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Informations du profil */}
          <div className="w-full md:w-2/3 text-center md:text-left md:flex md:flex-col md:justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
              Abdoul Ahad <br></br>Mbacké DIOUF
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-4 animate-fade-in-delayed">
              Ingénieur Big Data pour la Transformation Numérique
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 animate-fade-in-delayed">
              "Data is the new oil. It's valuable, but if unrefined it cannot really be used." – Clive Humby
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-4 animate-fade-in-delayed">
              <div className="flex items-center relative">  
                <a
                  href="/portfolio_last_version/Documents/CV_AAMD_Alternance_BAC+6.pdf"
                  download="CV_AbdoulAhadMbackeDiouf.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Download className="w-5 h-5" /> Télécharger le CV
                </a>
                <div className="relative ml-2 group">
                  <div className="w-6 h-6 rounded-full bg-transparent border border-white flex items-center justify-center cursor-help">
                    <span className="text-white font-bold text-xs">!</span>
                  </div>
                  <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 w-max max-w-xs">
                    <div className="bg-gray-800 text-white text-sm rounded-lg py-2 px-3 shadow-lg">
                      CV mis à jour le 08/05/2025
                      <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Ce composant était précédemment défini mais n'était pas utilisé