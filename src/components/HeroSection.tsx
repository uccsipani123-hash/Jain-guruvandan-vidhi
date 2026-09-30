import React, { useState } from 'react';
import { Volume2, Play, Bell, Radio, CheckCircle2, BookOpen } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { AUTHOR_INFO } from '../data/vidhiData';

interface HeroSectionProps {
  onStartVidhi: () => void;
  onViewMeanings: () => void;
  onViewDoshas: () => void;
  onOpenGlossary: (termId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartVidhi,
  onViewMeanings,
  onViewDoshas,
  onOpenGlossary,
}) => {
  const [droneOn, setDroneOn] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  const handleRingBell = () => {
    setBellRinging(true);
    audioEngine.playTempleBell();
    setTimeout(() => setBellRinging(false), 3000);
  };

  const handleToggleDrone = () => {
    const isNowPlaying = audioEngine.toggleDrone();
    setDroneOn(isNowPlaying);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-transparent border-b border-amber-200/60 pt-8 pb-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle, unboxed metadata row with typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-amber-900/80 mb-3 tracking-wide">
          <span>जैन श्वेतांबर परंपरा</span>
          <span aria-hidden="true">·</span>
          <span>बे खमासमण विधि</span>
          <span aria-hidden="true">·</span>
          <span>पंक्तिवार अर्थ एवं भावार्थ</span>
          <span aria-hidden="true">·</span>
          <span>३२ दोष परिहार</span>
        </div>

        {/* Primary Heading with text-wrap: balance */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-amber-950 font-serif leading-tight text-balance">
            जैन श्वेतांबर गुरु वंदन विधि
          </h1>
          <p className="mt-3 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            सद्गुरु भगवंतों के चरणों में पंचांग प्रणिपात, अभुट्ठिओमि क्षमायाचना व स्वाध्याय आज्ञा की शास्त्रीय विधि—सचित्र, शुद्ध ऑडियो पाठ एवं प्रत्येक पंक्ति के अर्थ सहित।
          </p>

          {/* Attribution statement honoring user brief */}
          <div className="mt-4 pt-3 border-t border-amber-200/80 max-w-xl mx-auto text-xs sm:text-sm text-amber-900/90 font-medium">
            प्रणेता: <span className="font-bold text-amber-950">{AUTHOR_INFO.name}</span> (संस्थापक - {AUTHOR_INFO.title}, {AUTHOR_INFO.address})
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={onStartVidhi}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>सचित्र विधि प्रारंभ करें</span>
            </button>

            <button
              onClick={onViewMeanings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-medium text-sm shadow-xs transition-colors"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>पंक्तिवार अर्थ</span>
            </button>

            <button
              onClick={() => onOpenGlossary()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-semibold text-sm shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>शब्दावली कोश (Glossary)</span>
            </button>

            <button
              onClick={onViewDoshas}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 border border-amber-200 font-medium text-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-800" />
              <span>३२ दोष नियम</span>
            </button>
          </div>

          {/* Ambient Spiritual Audio Controls (Bell & Tanpura) */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 p-1.5 px-4 bg-white/80 backdrop-blur-xs rounded-xl border border-amber-200 shadow-xs text-xs text-stone-600">
            <span className="font-semibold text-amber-950">आध्यात्मिक वातावरण:</span>
            
            <button
              onClick={handleRingBell}
              disabled={bellRinging}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                bellRinging
                  ? 'bg-amber-200 text-amber-900 ring-2 ring-amber-400'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
              title="मंदिर का घंटा नाद बजाएं"
            >
              <Bell className={`w-3.5 h-3.5 ${bellRinging ? 'animate-bounce text-amber-700' : 'text-amber-600'}`} />
              <span>{bellRinging ? 'घंटा नाद गूंज रहा है...' : 'घंटा नाद बजाएं'}</span>
            </button>

            <button
              onClick={handleToggleDrone}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                droneOn
                  ? 'bg-emerald-600 text-white font-medium shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
              title="तंबूरा ओंकार नाद (Backdrop Meditative Drone)"
            >
              <Radio className={`w-3.5 h-3.5 ${droneOn ? 'animate-pulse text-white' : 'text-emerald-700'}`} />
              <span>{droneOn ? 'ध्यान नाद: चालू' : 'ध्यान नाद चालू करें'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
