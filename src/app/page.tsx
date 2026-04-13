import Link from "next/link";

export default function Home() {
  return (
    <div className="relative -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/assets/header-bg.png')" }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Bienvenue sur l'Univers de <span className="text-blue-600 block sm:inline">Vulcain</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-900 font-semibold bg-white/40 p-4 rounded-2xl backdrop-blur-md shadow-sm border border-white/50 max-w-2xl mx-auto">
          Tu trouveras le résumé des chapitres, la description des personnages dans l'onglet "résumés" en haut à droite.
          <br className="hidden sm:block" />
          <span className="sm:mt-2 block">Et un quiz pour tester tes connaissances ;)</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/quiz"
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all text-center"
          >
            Commencer le Quiz
          </Link>
          <Link
            href="/ressources"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md border border-blue-100 hover:bg-blue-50 transition-all text-center"
          >
            Consulte les résumés par chapitre
          </Link>
        </div>
      </div>
    </div>
  );
}
