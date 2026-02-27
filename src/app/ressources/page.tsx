"use client";

import { useState } from "react";
import { contentData } from "@/data/contentData";

export default function RessourcesPage() {
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Données Sources - Vulcain</h1>
        <p className="text-gray-600">
          Tu peux lire les résumés de chaque chapitre, en dessous, et aussi, si tu cliques sur le lien, avoir des résumés plus "poussés".
          <br />
          <a 
            href="https://www.lesresumes.com/litterature/danielle-martinigol-les-oublies-de-vulcain-resume-presentation-des-personnages-et-analyse/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm inline-block mt-2"
          >
            Résumés plus longs, si ça t'interesse, pour chaque cahpitre
          </a>
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">📚</span>
          Résumés par Chapitres
        </h2>
        <div className="space-y-3">
          {contentData.chapitres.map((chap) => (
            <div
              key={chap.numero}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:border-blue-200"
            >
              <button
                onClick={() => setOpenChapter(openChapter === chap.numero ? null : chap.numero)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-700">
                  Chapitre {chap.numero} – {chap.titre}
                </span>
                <span className={`transform transition-transform ${openChapter === chap.numero ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {openChapter === chap.numero && (
                <div className="p-4 border-t border-gray-100 text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50">
                  {chap.contenu}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg">👤</span>
          Analyse des Personnages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentData.personnages.map((perso) => (
            <div
              key={perso.nom}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <h3 className="text-xl font-bold text-blue-600 border-b border-blue-50 pb-2">
                {perso.nom}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{perso.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Symboles / Thèmes</h4>
                  <p className="text-gray-600 italic">{perso.symboles}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
