"use client";

import { useState, useMemo } from "react";
import { quizData } from "@/data/quizData";

type QuestionType = "qcm" | "vf";

interface Question {
  type: QuestionType;
  question: string;
  choices?: string[];
  answerIndex?: number;
  answer?: boolean;
  explanation: string;
}

interface ChapterQuiz {
  chapitre: number;
  titre: string;
  questions: Question[];
}

interface CharacterQuiz {
  nom: string;
  questions: Question[];
}

export default function QuizPage() {
  const [activeTab, setActiveTab] = useState<"chapitres" | "personnages">("chapitres");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Flatten questions for the active mode
  const currentQuestions = useMemo(() => {
    if (activeTab === "chapitres") {
      return quizData.chapitres.flatMap((c) =>
        c.questions.map((q) => ({ ...q, chapterInfo: `Chapitre ${c.chapitre} – ${c.titre}` }))
      );
    } else {
      return quizData.personnages.flatMap((p) =>
        p.questions.map((q) => ({ ...q, characterInfo: p.nom }))
      );
    }
  }, [activeTab]);

  const currentQuestion = currentQuestions[currentIndex];

  const handleSelect = (answer: number | boolean) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    
    const isCorrect = currentQuestion.type === "qcm" 
      ? selectedAnswer === currentQuestion.answerIndex 
      : selectedAnswer === currentQuestion.answer;
    
    setScores([...scores, isCorrect]);
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScores([]);
    setIsFinished(false);
  };

  const resetMode = (mode: "chapitres" | "personnages") => {
    setActiveTab(mode);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScores([]);
    setIsFinished(false);
  };

  if (isFinished) {
    const totalScore = scores.filter(Boolean).length;
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-gray-900">Quiz Terminé !</h2>
            <p className="text-xl text-gray-500">Félicitations pour avoir complété ce quiz.</p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative inline-flex items-center justify-center p-8 rounded-full bg-blue-50 border-8 border-blue-100">
              <span className="text-5xl font-black text-blue-600">
                {totalScore} <span className="text-2xl text-blue-300">/ {currentQuestions.length}</span>
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <button
              onClick={handleRestart}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all hover:scale-[1.02]"
            >
              Recommencer ce quiz
            </button>
            <button
              onClick={() => resetMode(activeTab === "chapitres" ? "personnages" : "chapitres")}
              className="w-full py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-md border border-blue-100 hover:bg-blue-50 transition-all"
            >
              Passer au quiz {activeTab === "chapitres" ? "Personnages" : "Chapitres"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => resetMode("chapitres")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "chapitres" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Quiz par chapitres
        </button>
        <button
          onClick={() => resetMode("personnages")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "personnages" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Quiz par personnages
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-50 w-full">
          <div 
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
          />
        </div>

        <div className="p-8 sm:p-12 space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full">
              {activeTab === "chapitres" ? (
                <>
                  {((currentQuestion as any).chapterInfo.split(' – ')[0])} – Question {((currentIndex % 3) + 1)}/3
                </>
              ) : (
                <>
                  {(currentQuestion as any).characterInfo} – Question {((currentIndex % 2) + 1)}/2
                </>
              )}
            </span>
            <span className="text-gray-400 font-medium text-sm">
              Total {currentIndex + 1} / {currentQuestions.length}
            </span>
          </header>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.type === "qcm" ? (
              currentQuestion.choices?.map((choice, idx) => {
                const isCorrect = idx === currentQuestion.answerIndex;
                const isSelected = selectedAnswer === idx;
                let variant = "default";
                
                if (showFeedback) {
                  if (isCorrect) variant = "correct";
                  else if (isSelected) variant = "incorrect";
                  else variant = "dimmed";
                } else if (isSelected) {
                  variant = "selected";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={showFeedback}
                    className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex justify-between items-center ${
                      variant === "default" ? "border-gray-100 hover:border-blue-200 hover:bg-blue-50/30" :
                      variant === "selected" ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md scale-[1.01]" :
                      variant === "correct" ? "border-green-500 bg-green-50 text-green-700" :
                      variant === "incorrect" ? "border-red-500 bg-red-50 text-red-700" :
                      "border-gray-50 bg-gray-50 opacity-50"
                    }`}
                  >
                    <span className="font-semibold">{choice}</span>
                    {showFeedback && isCorrect && <span className="text-2xl font-bold">✓</span>}
                    {showFeedback && isSelected && !isCorrect && <span className="text-2xl font-bold">✗</span>}
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                {[true, false].map((val) => {
                  const isCorrect = val === currentQuestion.answer;
                  const isSelected = selectedAnswer === val;
                  let variant = "default";
                  
                  if (showFeedback) {
                    if (isCorrect) variant = "correct";
                    else if (isSelected) variant = "incorrect";
                    else variant = "dimmed";
                  } else if (isSelected) {
                    variant = "selected";
                  }

                  return (
                    <button
                      key={val.toString()}
                      onClick={() => handleSelect(val)}
                      disabled={showFeedback}
                      className={`flex-1 p-5 text-center rounded-2xl border-2 transition-all font-bold text-lg ${
                        variant === "default" ? "border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 text-gray-600" :
                        variant === "selected" ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md" :
                        variant === "correct" ? "border-green-500 bg-green-50 text-green-700" :
                        variant === "incorrect" ? "border-red-500 bg-red-50 text-red-700" :
                        "border-gray-50 bg-gray-50 opacity-50"
                      }`}
                    >
                      {val ? "VRAI" : "FAUX"}
                      {showFeedback && isCorrect && <span className="ml-2">✓</span>}
                      {showFeedback && isSelected && !isCorrect && <span className="ml-2">✗</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {showFeedback && (
            <div className={`p-6 rounded-2xl border ${
              (currentQuestion.type === "qcm" ? selectedAnswer === currentQuestion.answerIndex : selectedAnswer === currentQuestion.answer)
                ? "bg-green-50 border-green-100 text-green-800"
                : "bg-red-50 border-red-100 text-red-800"
            }`}>
              <p className="font-bold mb-2">
                {(currentQuestion.type === "qcm" ? selectedAnswer === currentQuestion.answerIndex : selectedAnswer === currentQuestion.answer)
                  ? "Excellente réponse !"
                  : `Mauvaise réponse... La bonne réponse était : ${
                      currentQuestion.type === "qcm" 
                        ? currentQuestion.choices![currentQuestion.answerIndex!] 
                        : (currentQuestion.answer ? "VRAI" : "FAUX")
                    }`
                }
              </p>
              <p className="text-sm opacity-90 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}

          <footer className="pt-6 border-t border-gray-100 flex justify-end">
            {!showFeedback ? (
              <button
                onClick={handleValidate}
                disabled={selectedAnswer === null}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:bg-black transition-all hover:scale-[1.02]"
              >
                {currentIndex < currentQuestions.length - 1 ? "Question suivante" : "Voir mon score"}
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
