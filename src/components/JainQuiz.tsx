import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/vidhiData';
import { audioEngine } from '../utils/audioEngine';

export const JainQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    audioEngine.playStepChime();
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score >= 4) {
      audioEngine.playTempleBell();
    }
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <section id="quiz-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="text-xs font-semibold text-amber-800 tracking-wider">
          स्व-मूल्यांकन · JAIN VIDHI KNOWLEDGE CHECK
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif mt-1">
          गुरु वंदन विधि ज्ञान परख
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600">
          गुरु वंदन विधि, सूत्रों के अर्थ एवं शास्त्रीय मर्यादाओं से संबंधित ५ प्रश्नों के उत्तर देकर अपनी समझ जांचें।
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-xs space-y-6">
        
        {/* Questions list */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-stone-50/40">
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {q.question}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle = 'border-stone-200 hover:border-amber-400 bg-white text-stone-800';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                      } else {
                        optionStyle = 'opacity-60 border-stone-200 bg-white';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-amber-700 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-500';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        disabled={showResults}
                        className={`w-full p-2.5 text-left rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after results */}
                {showResults && (
                  <div className="mt-3 pl-8 text-xs text-stone-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
                    <span className="font-bold text-amber-950">स्पष्टीकरण: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button & Score Card */}
        <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all ${
                allAnswered
                  ? 'bg-amber-700 hover:bg-amber-800 text-white'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {allAnswered ? 'उत्तर जांचें (Submit Answers)' : `कृपया सभी ५ प्रश्नों के उत्तर दें (${Object.keys(selectedAnswers).length}/५)`}
            </button>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-700" />
                <div>
                  <div className="text-base font-bold text-amber-950">
                    आपका परिणाम: {score} / {QUIZ_QUESTIONS.length} अंक
                  </div>
                  <div className="text-xs text-stone-600">
                    {score === 5 
                      ? 'उत्कृष्ट! आपको गुरु वंदन विधि का संपूर्ण शास्त्रीय ज्ञान है।'
                      : score >= 3
                      ? 'सराहनीय! विधि का अभ्यास निरंतर जारी रखें।'
                      : 'विधि व अर्थ को पुनः ध्यानपूर्वक पढ़कर अभ्यास करें।'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>पुनः क्विज दें</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
