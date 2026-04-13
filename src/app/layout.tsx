import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Vulcain",
  description: "Quiz interactif sur l'univers de Vulcain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24 items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  VULCAIN{" "}
                  <span className="font-semibold">: LE LIVRE</span>
                </Link>
              </div>
              <div className="flex space-x-8">
                <Link
                  href="/quiz"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Quiz
                </Link>
                <Link
                  href="/ressources"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Résumés
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
            © 2026 Quiz Vulcain - Tramelle - Tous droits réservés
          </div>
        </footer>
      </body>
    </html>
  );
}
