import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
        Bienvenue sur l'Univers de <span className="text-blue-600">Vulcain</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl">
        Explorez les résumés des chapitres, analysez les personnages et testez vos connaissances avec notre quiz interactif.
        <br />
        Bienvenue Kheiréddine sur l'univers des oubliés de Vulcain.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/quiz"
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
        >
          Commencer le Quiz
        </Link>
        <Link
          href="/ressources"
          className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md border border-blue-100 hover:bg-blue-50 transition-all hover:scale-105"
        >
          Consulter les Ressources
        </Link>
      </div>
    </div>
  );
}
