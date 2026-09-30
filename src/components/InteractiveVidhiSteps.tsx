import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  AlertCircle, 
  Heart,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { VIDHI_STEPS } from '../data/vidhiData';
import { VidhiStep, SutraLine } from '../types/vidhi';
import { audioEngine } from '../utils/audioEngine';
import { 
  GuruBhagwantIllustration, 
  PanchangPranipatIllustration, 
  MuhapattiPadilehanIllustration, 
  JainUpakaranIllustration, 
  AbhutthioSukhsataIllustration,
  IchchhakarIllustration 
} from './JainIllustrations';

interface InteractiveVidhiStepsProps {
  onOpenGlossary?: (termId?: string) => void;
}

export const InteractiveVidhiSteps: React.FC<InteractiveVidhiStepsProps> = ({ onOpenGlossary }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activePlayingLineId, setActivePlayingLineId] = useState<string | null>(null);
  const [isStepAudioPlaying, setIsStepAudioPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.92);

  const step: VidhiStep = VIDHI_STEPS[currentStepIndex];

  const handleNextStep = () => {
    audioEngine.stopSpeaking();
    audioEngine.playStepChime();
    setActivePlayingLineId(null);
    setIsStepAudioPlaying(false);
    if (currentStepIndex < VIDHI_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    audioEngine.stopSpeaking();
    audioEngine.playStepChime();
    setActivePlayingLineId(null);
    setIsStepAudioPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handlePlayLine = (line: SutraLine) => {
    if (activePlayingLineId === line.id) {
      audioEngine.stopSpeaking();
      setActivePlayingLineId(null);
      return;
    }

    setActivePlayingLineId(line.id);
    audioEngine.speakLine(line.prakrit, {
      rate: playbackSpeed,
      onStart: () => setActivePlayingLineId(line.id),
      onEnd: () => setActivePlayingLineId(null),
      onError: () => setActivePlayingLineId(null)
    });
  };

  const handlePlayEntireStep = async () => {
    if (isStepAudioPlaying) {
      audioEngine.stopSpeaking();
      setIsStepAudioPlaying(false);
      setActivePlayingLineId(null);
      return;
    }

    setIsStepAudioPlaying(true);
    const lines = step.lines;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      setActivePlayingLineId(line.id);

      await new Promise<void>((resolve) => {
        audioEngine.speakLine(line.prakrit, {
          rate: playbackSpeed,
          onStart: () => setActivePlayingLineId(line.id),
          onEnd: () => resolve(),
          onError: () => resolve()
        });
      });

      // Small pause between lines
      await new Promise((r) => setTimeout(r, 450));
    }

    setIsStepAudioPlaying(false);
    setActivePlayingLineId(null);
  };

  // Render illustration corresponding to the current step
  const renderIllustration = () => {
    switch (step.illustrationType) {
      case 'upakaran':
        return <JainUpakaranIllustration className="w-full h-72 sm:h-80" />;
      case 'padilehan':
        return <MuhapattiPadilehanIllustration className="w-full h-72 sm:h-80" />;
      case 'khamasaman':
        return <PanchangPranipatIllustration className="w-full h-72 sm:h-80" />;
      case 'ichchhakara':
        return <IchchhakarIllustration className="w-full h-72 sm:h-80" />;
      case 'sukhsata':
        return <AbhutthioSukhsataIllustration className="w-full h-72 sm:h-80" />;
      case 'sajjhay':
        return <GuruBhagwantIllustration className="w-full h-72 sm:h-80" />;
      default:
        return <GuruBhagwantIllustration className="w-full h-72 sm:h-80" />;
    }
  };

  return (
    <section id="vidhi-steps" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-amber-800 tracking-wider">
            चरणबद्ध सचित्र विधि · STEP BY STEP PRACTICE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif">
            गुरु वंदन के ७ प्रामाणिक चरण
          </h2>
        </div>

        {/* Speed adjustment controls */}
        <div className="flex items-center gap-2 text-xs text-stone-600 bg-white p-1.5 rounded-lg border border-amber-200 self-start md:self-auto">
          <span className="font-medium text-amber-900">उच्चारण गति:</span>
          <button
            onClick={() => setPlaybackSpeed(0.8)}
            className={`px-2 py-0.5 rounded ${playbackSpeed === 0.8 ? 'bg-amber-700 text-white font-semibold' : 'hover:bg-amber-100 text-stone-700'}`}
          >
            धीमी (0.8x)
          </button>
          <button
            onClick={() => setPlaybackSpeed(0.92)}
            className={`px-2 py-0.5 rounded ${playbackSpeed === 0.92 ? 'bg-amber-700 text-white font-semibold' : 'hover:bg-amber-100 text-stone-700'}`}
          >
            सामान्य (1.0x)
          </button>
          <button
            onClick={() => setPlaybackSpeed(1.15)}
            className={`px-2 py-0.5 rounded ${playbackSpeed === 1.15 ? 'bg-amber-700 text-white font-semibold' : 'hover:bg-amber-100 text-stone-700'}`}
          >
            शीघ्र (1.2x)
          </button>
        </div>
      </div>

      {/* Step Tabs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
        {VIDHI_STEPS.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isCompleted = idx < currentStepIndex;
          return (
            <button
              key={s.id}
              onClick={() => {
                audioEngine.stopSpeaking();
                audioEngine.playStepChime();
                setActivePlayingLineId(null);
                setIsStepAudioPlaying(false);
                setCurrentStepIndex(idx);
              }}
              className={`p-3 text-left rounded-xl transition-all border ${
                isActive
                  ? 'bg-amber-700 text-white border-amber-800 shadow-md ring-2 ring-amber-400/50'
                  : isCompleted
                  ? 'bg-amber-50/80 text-amber-950 border-amber-300 hover:bg-amber-100/80'
                  : 'bg-white text-stone-700 border-amber-100 hover:border-amber-200 hover:bg-amber-50/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-200' : 'text-amber-800'}`}>
                  चरण {s.stepNumber}
                </span>
                {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div className="text-xs sm:text-sm font-semibold line-clamp-1">
                {s.titleHi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Two-Zone Display: Visual Stage on Left / Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Stage: Visual Posture & Diagram (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-amber-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-100">
            <div>
              <span className="text-xs font-semibold text-amber-800">मुद्रा व शारीरिक स्थिति:</span>
              <h3 className="text-base font-bold text-amber-950">{step.postureName}</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md font-bold">
              चरण {step.stepNumber}/७
            </span>
          </div>

          {/* SVG Illustration Container */}
          {renderIllustration()}

          {/* Posture Description */}
          <div className="mt-4 p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p className="font-semibold text-amber-950 mb-1">विधि एवं शारीरिक निर्देश:</p>
            <p>{step.postureDetail}</p>
          </div>

          {/* Key Bhav */}
          <div className="mt-3 p-3 bg-orange-50/60 rounded-xl border border-orange-200/70 text-xs text-orange-950 flex items-start gap-2">
            <Heart className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">आंतरिक भाव: </span>
              {step.keyBhav}
            </div>
          </div>
        </div>

        {/* Right Stage: Sutras, Line-by-Line Meaning & Audio Recitation (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-6">
          
          {/* Header of Step with Audio Reciter Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-100">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-950 font-serif">
                {step.stepNumber}. {step.titleHi}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">{step.subtitleHi}</p>
              {step.sutraTitle && (
                <div className="mt-1 text-xs font-medium text-amber-800">
                  मूल सूत्र: <span className="font-bold">{step.sutraTitle}</span>
                </div>
              )}
            </div>

            {/* Play entire step audio */}
            <button
              onClick={handlePlayEntireStep}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isStepAudioPlaying
                  ? 'bg-rose-700 text-white animate-pulse'
                  : 'bg-amber-700 hover:bg-amber-800 text-white shadow-xs'
              }`}
              title="इस चरण का संपूर्ण ऑडियो पाठ सुनें"
            >
              {isStepAudioPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>ऑडियो रोकें</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>संपूर्ण चरण ऑडियो</span>
                </>
              )}
            </button>
          </div>

          {/* Contextual Glossary Trigger Bar */}
          {onOpenGlossary && (
            <div className="flex flex-wrap items-center gap-2 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/70 text-xs">
              <span className="font-semibold text-amber-950 flex items-center gap-1 shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>शब्दावली कोश:</span>
              </span>
              {step.stepNumber === 1 && (
                <>
                  <button onClick={() => onOpenGlossary('katasanu')} className="hover:underline text-amber-900 font-medium">कटआसण</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('charavala-ogho')} className="hover:underline text-amber-900 font-medium">चरवला/ओघो</button>
                </>
              )}
              {step.stepNumber === 2 && (
                <>
                  <button onClick={() => onOpenGlossary('muhapatti')} className="hover:underline text-amber-900 font-medium">मुहपत्ति</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('padilehan')} className="hover:underline text-amber-900 font-medium">पड़िलेहण</button>
                </>
              )}
              {(step.stepNumber === 3 || step.stepNumber === 6) && (
                <>
                  <button onClick={() => onOpenGlossary('khamasamana')} className="hover:underline text-amber-900 font-medium">खमासमण (Khamasaman)</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('nisihi')} className="hover:underline text-amber-900 font-medium">निसीहि</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('matthaen-vandami')} className="hover:underline text-amber-900 font-medium">मत्थएण वंदामि</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('panchang-pranipat')} className="hover:underline text-amber-900 font-medium">पंचांग प्रणिपात</button>
                </>
              )}
              {step.stepNumber === 4 && (
                <>
                  <button onClick={() => onOpenGlossary('icchakar')} className="hover:underline text-amber-900 font-medium">इच्छाकार</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('suhorai-bhatpani')} className="hover:underline text-amber-900 font-medium">सुहोराई / भात-पाणीनो लाभ</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('rayee-devasia-pakkhia')} className="hover:underline text-amber-900 font-medium">सुहदेवसी / दिवसो</button>
                </>
              )}
              {step.stepNumber === 5 && (
                <>
                  <button onClick={() => onOpenGlossary('icchakar')} className="hover:underline text-amber-900 font-medium">इच्छाकार</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('abhutthiomi')} className="hover:underline text-amber-900 font-medium">अभुट्ठिओमि</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('rayee-devasia-pakkhia')} className="hover:underline text-amber-900 font-medium">राइअं / देवसिअं</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('khasum-khameh')} className="hover:underline text-amber-900 font-medium">खाsum / खामेह</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('michhami-dukkadam')} className="hover:underline text-amber-900 font-medium">मिच्छा मि दुक्कडं</button>
                </>
              )}
              {step.stepNumber === 7 && (
                <>
                  <button onClick={() => onOpenGlossary('sajjhaya')} className="hover:underline text-amber-900 font-medium">सज्झाय (स्वाध्याय)</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('icchakar')} className="hover:underline text-amber-900 font-medium">इच्छाकार</button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <button onClick={() => onOpenGlossary('ichchham')} className="hover:underline text-amber-900 font-medium">इच्छं</button>
                </>
              )}
              <button 
                onClick={() => onOpenGlossary()} 
                className="ml-auto text-[11px] text-amber-800 hover:text-amber-950 font-bold underline whitespace-nowrap"
              >
                संपूर्ण शब्द-कोश देखें →
              </button>
            </div>
          )}

          {/* Complete Authentic Sutra Presentation Card */}
          {step.fullSutraDevanagari && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 p-5 rounded-2xl border-2 border-amber-300 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-amber-200">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 font-serif">
                  <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
                  चरण {step.stepNumber} का संपूर्ण मूल सूत्र (Unbroken Sacred Sutra)
                </span>
                <span className="text-[11px] font-medium text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">
                  अखंड पाठ
                </span>
              </div>

              {/* Sutra in Devanagari */}
              <div className="text-base sm:text-lg font-bold text-amber-950 font-serif leading-relaxed whitespace-pre-line">
                {step.fullSutraDevanagari}
              </div>

              {/* Sutra in Roman Transliteration */}
              {step.fullSutraTransliteration && (
                <div className="text-xs sm:text-sm text-stone-600 font-mono italic mt-2.5 pt-2 border-t border-amber-200/70 leading-relaxed whitespace-pre-line">
                  {step.fullSutraTransliteration}
                </div>
              )}

              {/* Sutra Hindi Summary */}
              {step.fullSutraHindiSummary && (
                <div className="text-xs sm:text-sm text-amber-950 mt-2.5 pt-2 border-t border-amber-200/70 font-medium leading-relaxed bg-amber-50/60 p-2.5 rounded-lg">
                  <strong className="text-amber-900">सरल हिंदी अर्थ: </strong>
                  {step.fullSutraHindiSummary}
                </div>
              )}
            </div>
          )}

          {/* Line by line display */}
          <div className="space-y-4">
            {step.lines.map((line) => {
              const isPlaying = activePlayingLineId === line.id;
              const isGuruSpeaking = line.speaker === 'guru';

              return (
                <div
                  key={line.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isPlaying
                      ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-300'
                      : isGuruSpeaking
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-stone-50/50 border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      
                      {/* Speaker indicator */}
                      <div className="text-[11px] font-semibold tracking-wide uppercase mb-1">
                        {isGuruSpeaking ? (
                          <span className="text-emerald-800 font-bold">पूज्य गुरु भगवंत का प्रत्युत्तर:</span>
                        ) : (
                          <span className="text-amber-800 font-bold">विनीत श्रावक / भक्त:</span>
                        )}
                      </div>

                      {/* Original Prakrit Chanting Text */}
                      <div className="text-base sm:text-lg font-bold text-amber-950 font-serif leading-relaxed">
                        {line.prakrit}
                      </div>

                      {/* Transliteration */}
                      <div className="text-xs text-stone-500 italic mt-0.5 font-sans">
                        {line.transliteration}
                      </div>

                    </div>

                    {/* Play Line Audio Button */}
                    <button
                      onClick={() => handlePlayLine(line)}
                      className={`p-2 rounded-full transition-all shrink-0 ${
                        isPlaying
                          ? 'bg-amber-700 text-white ring-2 ring-amber-400'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      }`}
                      title="इस पंक्ति का उच्चारण सुनें"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-amber-900" />
                      )}
                    </button>
                  </div>

                  {/* Word by word breakdown (पदच्छेद व शब्दार्थ) */}
                  {line.words && line.words.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-amber-200/60">
                      <div className="text-xs font-semibold text-amber-900 mb-1.5">
                        पदच्छेद एवं शब्दार्थ:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {line.words.map((w, wIdx) => (
                          <div
                            key={wIdx}
                            className="text-xs bg-white px-2.5 py-1 rounded border border-amber-100 text-stone-700"
                          >
                            <span className="font-bold text-amber-950">{w.prakritWord}:</span>{' '}
                            <span>{w.hindiMeaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Complete Hindi Meaning */}
                  <div className="mt-3 p-2.5 bg-white rounded-lg border border-amber-100 text-xs sm:text-sm text-stone-800">
                    <span className="font-bold text-amber-900">हिंदी भावार्थ: </span>
                    {line.hindiMeaning}
                  </div>

                  {/* Spiritual Deep Bhavartha */}
                  {line.bhavartha && (
                    <div className="mt-2 text-xs text-stone-600 italic">
                      <span className="font-semibold text-stone-700">गहन रहस्य: </span>
                      {line.bhavartha}
                    </div>
                  )}

                  {line.postureDescription && (
                    <div className="mt-2 text-[11px] text-amber-800 font-medium">
                      मुद्रा निर्देश: {line.postureDescription}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Important Rules / Doshas for this step */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>इस चरण के अनिवार्य नियम व सावधानियां:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside">
              {step.importantRules.map((rule, rIdx) => (
                <li key={rIdx}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Navigation Controls: Prev / Next / Reset */}
          <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentStepIndex === 0
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>पिछला चरण</span>
            </button>

            <button
              onClick={() => {
                audioEngine.stopSpeaking();
                setActivePlayingLineId(null);
                setIsStepAudioPlaying(false);
                setCurrentStepIndex(0);
                audioEngine.playStepChime();
              }}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-800"
              title="प्रारंभ से शुरू करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">पुनः प्रारंभ</span>
            </button>

            {currentStepIndex < VIDHI_STEPS.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium shadow-xs transition-colors"
              >
                <span>अगला चरण</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>विधि संपन्न हुई</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
