import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, Volume2, BookOpen, BookmarkCheck } from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { audioEngine } from '../utils/audioEngine';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTermId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTermId, setActiveTermId] = useState<string>(initialTermId || GLOSSARY_TERMS[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync initialTermId if changed
  useEffect(() => {
    if (initialTermId) {
      setActiveTermId(initialTermId);
      // Also clear search/category if needed so user sees the term
      setSelectedCategory('all');
      setSearchQuery('');
    }
  }, [initialTermId]);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const categories = [
    { id: 'all', label: 'सभी शब्द' },
    { id: 'वंदन सूत्र पद', label: 'वंदन सूत्र पद' },
    { id: 'काल एवं समय', label: 'काल एवं समय' },
    { id: 'आचार व विनय', label: 'आचार व विनय' },
    { id: 'उपकरण व वस्त्र', label: 'उपकरण व वस्त्र' },
    { id: 'दोष व प्रायश्चित', label: 'दोष व प्रायश्चित' }
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item: GlossaryTerm) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchHi = item.termHi.toLowerCase().includes(q);
        const matchEn = item.termEn.toLowerCase().includes(q);
        const matchShort = item.shortMeaning.toLowerCase().includes(q);
        const matchDetail = item.detailedMeaning.toLowerCase().includes(q);
        if (!matchHi && !matchEn && !matchShort && !matchDetail) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Make sure active term exists in filtered list or pick first
  const currentTerm: GlossaryTerm | undefined = useMemo(() => {
    return GLOSSARY_TERMS.find(t => t.id === activeTermId) || filteredTerms[0] || GLOSSARY_TERMS[0];
  }, [activeTermId, filteredTerms]);

  const handlePlayPronunciation = (term: GlossaryTerm) => {
    if (isPlayingAudio) {
      audioEngine.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    // Speak Hindi term name followed by short meaning
    const textToSpeak = `${term.termHi}. ${term.shortMeaning}`;
    audioEngine.speakLine(textToSpeak, {
      rate: 0.88,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      
      {/* Click outside backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="glossary-title"
        className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl border border-amber-300 shadow-2xl flex flex-col overflow-hidden z-10 animate-scaleUp"
      >
        
        {/* Top Header Bar */}
        <div className="px-5 py-4 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-amber-800 tracking-wide uppercase">
                पारिभाषिक शब्दावली एवं अर्थ कोश
              </div>
              <h3 id="glossary-title" className="text-lg sm:text-xl font-bold text-amber-950 font-serif">
                जैन श्वेतांबर गुरु वंदन शब्द-कोश (Glossary)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-white/80 transition-colors"
            title="बंद करें (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-stone-200/80 bg-stone-50/50 space-y-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="शब्द खोजें (उदा: खमासमण, इच्छाकार, राइअं, निसीहि, मुहपत्ति)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-2xs"
            />
          </div>

          {/* Category Filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Modal Body: Left sidebar list & Right detailed explanation */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          
          {/* Left Terms List (5 cols) */}
          <div className="md:col-span-5 border-r border-stone-200 overflow-y-auto p-3 space-y-1.5 bg-stone-50/30 max-h-56 md:max-h-none">
            {filteredTerms.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500">
                कोई शब्द नहीं मिला। कृपया खोज शब्द बदलें।
              </div>
            ) : (
              filteredTerms.map((term) => {
                const isSelected = currentTerm?.id === term.id;
                return (
                  <button
                    key={term.id}
                    onClick={() => {
                      setActiveTermId(term.id);
                      audioEngine.stopSpeaking();
                      setIsPlayingAudio(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left transition-all border flex flex-col ${
                      isSelected
                        ? 'bg-white border-amber-500 ring-2 ring-amber-300/50 shadow-xs'
                        : 'bg-white/70 hover:bg-white border-stone-200/80 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-amber-950 font-serif' : 'text-stone-900'}`}>
                        {term.termHi}
                      </span>
                      {isSelected && (
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {term.shortMeaning}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Detailed View (7 cols) */}
          <div className="md:col-span-7 overflow-y-auto p-5 sm:p-6 bg-white space-y-5">
            {currentTerm ? (
              <div className="space-y-4">
                
                {/* Term Title & Audio Pronunciation */}
                <div className="pb-3 border-b border-amber-100 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-amber-800 font-semibold mb-0.5">
                      श्रेणी: {currentTerm.category}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-amber-950 font-serif leading-tight">
                      {currentTerm.termHi}
                    </h4>
                    <div className="text-xs text-stone-400 mt-0.5">
                      {currentTerm.termEn} {currentTerm.pronunciation && `· उच्चारण: ${currentTerm.pronunciation}`}
                    </div>
                  </div>

                  {/* Audio Speak */}
                  <button
                    onClick={() => handlePlayPronunciation(currentTerm)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                      isPlayingAudio
                        ? 'bg-rose-700 text-white animate-pulse'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300/80 shadow-2xs'
                    }`}
                    title="उच्चारण एवं अर्थ सुनें"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlayingAudio ? 'रोकें' : 'ध्वनि उच्चारण'}</span>
                  </button>
                </div>

                {/* Short Meaning Callout */}
                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <span className="font-bold text-amber-900">संक्षिप्त अर्थ: </span>
                  {currentTerm.shortMeaning}
                </div>

                {/* Detailed Meaning */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-stone-900">
                    विशद व्याख्या (Detailed Explanation):
                  </div>
                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50/60 p-3.5 rounded-xl border border-stone-200/80">
                    {currentTerm.detailedMeaning}
                  </div>
                </div>

                {/* Context in Vidhi */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-stone-900">
                    गुरु वंदन विधि में प्रयोग एवं महत्व:
                  </div>
                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-orange-50/40 p-3 rounded-xl border border-orange-200/70">
                    {currentTerm.contextInVidhi}
                  </div>
                </div>

                {/* Scripture Reference */}
                {currentTerm.scriptureReference && (
                  <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span>आगम संदर्भ: <strong>{currentTerm.scriptureReference}</strong></span>
                    <span>प्रस्तुति: सिपानी जैन एजुकेशन</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 text-sm">
                विवरण देखने हेतु बाईं ओर से कोई शब्द चुनें।
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-600">
          <div className="hidden sm:block">
            टिप: विधि में रेखांकित शब्दों पर क्लिक करके भी यह शब्द-कोश देखा जा सकता है।
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold transition-colors ml-auto"
          >
            बंद करें
          </button>
        </div>

      </div>

    </div>
  );
};
