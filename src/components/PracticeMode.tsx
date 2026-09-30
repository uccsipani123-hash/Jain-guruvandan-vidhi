import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Check, Sparkles, Volume2, Award } from 'lucide-react';
import { VIDHI_STEPS } from '../data/vidhiData';
import { audioEngine } from '../utils/audioEngine';

export const PracticeMode: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [loopCount, setLoopCount] = useState(3);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [isPracticingLine, setIsPracticingLine] = useState(false);

  const step = VIDHI_STEPS[activeStepIdx];

  const handleToggleComplete = (stepNumber: number) => {
    audioEngine.playStepChime();
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(n => n !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  const handleStartLoopRecitation = async () => {
    if (isPracticingLine) {
      audioEngine.stopSpeaking();
      setIsPracticingLine(false);
      setIsLooping(false);
      setCurrentLoop(0);
      return;
    }

    setIsPracticingLine(true);
    setIsLooping(true);

    const firstLine = step.lines[0];
    if (!firstLine) return;

    for (let i = 1; i <= loopCount; i++) {
      setCurrentLoop(i);
      await new Promise<void>((resolve) => {
        audioEngine.speakLine(firstLine.prakrit, {
          rate: 0.88,
          onEnd: () => resolve(),
          onError: () => resolve()
        });
      });
      // 1.5 seconds pause for devotee to recite along
      if (i < loopCount) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }

    setIsPracticingLine(false);
    setIsLooping(false);
    setCurrentLoop(0);
    audioEngine.playTempleBell();
  };

  const isAllComplete = completedSteps.length === VIDHI_STEPS.length;

  return (
    <section id="practice-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="text-xs font-semibold text-amber-800 tracking-wider">
          कंठस्थीकरण एवं दैनिक अभ्यास साधन
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif mt-1">
          दैनिक गुरु वंदन अभ्यास चेकलिस्ट
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600">
          प्रत्येक चरण को ध्यानपूर्वक संपन्न करते हुए टिक करें। सूत्रों को कंठस्थ करने हेतु दोहराव साधन (Loop Player) का उपयोग करें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Checklist (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-lg font-bold text-amber-950 font-serif">
              अभ्यास प्रगति: {completedSteps.length} / {VIDHI_STEPS.length} चरण
            </h3>
            <button
              onClick={() => setCompletedSteps([])}
              className="text-xs text-stone-500 hover:text-amber-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>रीसेट करें</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / VIDHI_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step items */}
          <div className="space-y-3 pt-2">
            {VIDHI_STEPS.map((s, idx) => {
              const isChecked = completedSteps.includes(s.stepNumber);
              const isSelected = idx === activeStepIdx;

              return (
                <div
                  key={s.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-300/60 bg-amber-50/50'
                      : 'border-stone-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(s.stepNumber);
                      }}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-stone-300 hover:border-amber-600 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <div>
                      <div className="text-xs text-amber-800 font-semibold font-mono">
                        चरण {s.stepNumber}
                      </div>
                      <div className={`text-sm font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {s.titleHi}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-stone-500 hidden sm:inline">
                    {s.postureName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Congratulations Card */}
          {isAllComplete && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-center animate-fadeIn">
              <Sparkles className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
              <div className="text-base font-bold text-emerald-950 font-serif">
                अनुमोदना! विधि पूर्ण रूप से संपन्न हुई।
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                आपने गुरु वंदन के समस्त ७ चरणों का अभ्यास पूर्ण किया। जिनशासन की सेवा में निरंतर ज्ञान व विनय की वृद्धि हो।
              </p>
            </div>
          )}

        </div>

        {/* Right: Focused Memorization / Repetition Deck (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-6">
          
          <div className="pb-3 border-b border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-800">कंठस्थीकरण साधन:</span>
              <h3 className="text-xl font-bold text-amber-950 font-serif">
                चरण {step.stepNumber}: {step.titleHi}
              </h3>
            </div>
            <span className="text-xs font-mono bg-amber-100 px-2.5 py-1 rounded text-amber-900 font-bold">
              {step.postureName}
            </span>
          </div>

          {/* Primary Sutra Line to Memorize */}
          {step.lines[0] && (
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80">
              <div className="text-xs font-semibold text-amber-900 mb-1">अभ्यास हेतु सूत्र:</div>
              <div className="text-lg sm:text-xl font-bold text-amber-950 font-serif leading-relaxed">
                {step.lines[0].prakrit}
              </div>
              <div className="text-xs text-stone-500 italic mt-1">
                {step.lines[0].transliteration}
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-amber-200/60 text-xs sm:text-sm text-stone-700">
                <span className="font-semibold text-amber-900">अर्थ: </span>
                {step.lines[0].hindiMeaning}
              </div>
            </div>
          )}

          {/* Loop Count Selector */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-700">
              <span className="font-bold text-stone-900">दोहराव संख्या (कंठस्थ करने के लिए):</span>
              <div className="flex items-center gap-1.5">
                {[3, 5, 10].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setLoopCount(cnt)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      loopCount === cnt
                        ? 'bg-amber-700 text-white'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {cnt} बार
                  </button>
                ))}
              </div>
            </div>

            {/* Loop Recitation Button */}
            <button
              onClick={handleStartLoopRecitation}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                isLooping
                  ? 'bg-rose-700 text-white animate-pulse'
                  : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
            >
              {isLooping ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>दोहराव रोकें ({currentLoop} / {loopCount})</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>दोहराव वाचन प्रारंभ करें ({loopCount} बार)</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-stone-500 text-center">
              ऑडियो बोलेगा, फिर आपके बोलने के लिए 1.5 सेकंड का विराम होगा।
            </p>
          </div>

          {/* Key Rule Reminder */}
          <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 text-xs text-stone-700">
            <div className="font-bold text-amber-950 mb-1">अभ्यास टिप:</div>
            <p>
              वंदन के समय शब्दों को मन में नहीं, बल्कि स्पष्ट एवं मध्यम स्वर में बोलना चाहिए ताकि स्वयं को सुनाई दे और अक्षरों का लोप न हो।
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
