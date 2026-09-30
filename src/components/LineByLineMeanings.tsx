import React, { useState } from 'react';
import { Volume2, Play, Pause, Repeat, BookOpen, Search, Copy, Check } from 'lucide-react';
import { VIDHI_STEPS } from '../data/vidhiData';
import { SutraLine } from '../types/vidhi';
import { audioEngine } from '../utils/audioEngine';

interface LineByLineMeaningsProps {
  onOpenGlossary?: (termId?: string) => void;
}

export const LineByLineMeanings: React.FC<LineByLineMeaningsProps> = ({ onOpenGlossary }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'khamasaman' | 'ichchhakar' | 'abhutthio' | 'sajjhay'>('all');
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);
  const [repeatModeId, setRepeatModeId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all lines with step context
  const allLines = VIDHI_STEPS.flatMap(step => 
    step.lines.map(line => ({
      ...line,
      stepTitle: step.titleHi,
      stepNumber: step.stepNumber
    }))
  );

  const filteredLines = allLines.filter(line => {
    // Category filter
    if (activeFilter === 'khamasaman' && line.stepNumber !== 3 && line.stepNumber !== 6) return false;
    if (activeFilter === 'ichchhakar' && line.stepNumber !== 4) return false;
    if (activeFilter === 'abhutthio' && line.stepNumber !== 5) return false;
    if (activeFilter === 'sajjhay' && line.stepNumber !== 7) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchPrakrit = line.prakrit.toLowerCase().includes(q);
      const matchMeaning = line.hindiMeaning.toLowerCase().includes(q);
      const matchTrans = line.transliteration.toLowerCase().includes(q);
      if (!matchPrakrit && !matchMeaning && !matchTrans) return false;
    }

    return true;
  });

  const handlePlayLine = async (line: SutraLine, repeatCount = 1) => {
    if (playingLineId === line.id) {
      audioEngine.stopSpeaking();
      setPlayingLineId(null);
      setRepeatModeId(null);
      return;
    }

    setPlayingLineId(line.id);
    if (repeatCount > 1) {
      setRepeatModeId(line.id);
    } else {
      setRepeatModeId(null);
    }

    for (let c = 0; c < repeatCount; c++) {
      await new Promise<void>((resolve) => {
        audioEngine.speakLine(line.prakrit, {
          rate: 0.9,
          onStart: () => setPlayingLineId(line.id),
          onEnd: () => resolve(),
          onError: () => resolve()
        });
      });
      if (c < repeatCount - 1) {
        await new Promise(r => setTimeout(r, 600));
      }
    }

    setPlayingLineId(null);
    setRepeatModeId(null);
  };

  const handleCopyText = (line: SutraLine) => {
    const textToCopy = `${line.prakrit}\nउच्चारण: ${line.transliteration}\nहिंदी अर्थ: ${line.hindiMeaning}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(line.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="line-by-line-meanings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-amber-50/20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="text-xs font-semibold text-amber-800 tracking-wider">
          प्राकृत मूल · पदच्छेद · शब्दार्थ · भावार्थ
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif mt-1">
          पंक्तिवार अर्थ एवं विशद व्याख्या
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600">
          गुरु वंदन के प्रत्येक सूत्र की प्राकृत पंक्ति, रोमन लिप्यांतर, प्रत्येक शब्द का अलग-अलग अर्थ एवं ध्वनि पाठ।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-50/80 rounded-xl border border-amber-200/60 w-full md:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            सभी सूत्र ({allLines.length})
          </button>
          <button
            onClick={() => setActiveFilter('khamasaman')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'khamasaman'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            खमासमण सूत्र
          </button>
          <button
            onClick={() => setActiveFilter('ichchhakar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'ichchhakar'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            इच्छाकार सूत्र
          </button>
          <button
            onClick={() => setActiveFilter('abhutthio')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'abhutthio'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            अभुट्ठिओमि (क्षमायाचना)
          </button>
          <button
            onClick={() => setActiveFilter('sajjhay')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'sajjhay'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            स्वाध्याय आज्ञा व स्तुति
          </button>
          {onOpenGlossary && (
            <button
              onClick={() => onOpenGlossary()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 flex items-center gap-1"
              title="पारिभाषिक शब्दावली शब्द-कोश खोलें"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>शब्दावली कोश</span>
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="सूत्र या अर्थ खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

      </div>

      {/* Lines Grid */}
      <div className="space-y-4">
        {filteredLines.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-amber-200 text-stone-500 text-sm">
            कोई पंक्ति नहीं मिली। कृपया खोज शब्द बदलें।
          </div>
        ) : (
          filteredLines.map((line) => {
            const isPlaying = playingLineId === line.id;
            const isRepeating = repeatModeId === line.id;
            const isCopied = copiedId === line.id;

            return (
              <div
                key={line.id}
                className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
                  isPlaying
                    ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/40'
                    : 'border-amber-200/90 hover:border-amber-300'
                }`}
              >
                {/* Top line header: step tag + actions */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 gap-2">
                  <div className="text-xs font-medium text-amber-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>चरण {line.stepNumber}: {line.stepTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Repeat 3x for memorization */}
                    <button
                      onClick={() => handlePlayLine(line, 3)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                        isRepeating
                          ? 'bg-amber-700 text-white'
                          : 'bg-stone-100 hover:bg-amber-100 text-stone-700'
                      }`}
                      title="कंठस्थ करने के लिए ३ बार दोहराएं"
                    >
                      <Repeat className="w-3 h-3" />
                      <span>{isRepeating ? '३ बार वाचन जारी...' : '३ बार दोहराएं'}</span>
                    </button>

                    {/* Single Play */}
                    <button
                      onClick={() => handlePlayLine(line, 1)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                        isPlaying && !isRepeating
                          ? 'bg-amber-700 text-white'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                      title="ध्वनि सुनें"
                    >
                      {isPlaying && !isRepeating ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-white" />
                          <span>विराम</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>ध्वनि पाठ</span>
                        </>
                      )}
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopyText(line)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
                      title="पंक्ति कॉपी करें"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Prakrit Original Text */}
                <div className="mt-3">
                  <div className="text-lg sm:text-xl font-bold text-amber-950 font-serif leading-relaxed">
                    {line.prakrit}
                  </div>
                  <div className="text-xs text-stone-500 italic mt-0.5">
                    {line.transliteration}
                  </div>
                </div>

                {/* Word-by-word Breakdown Pills/Chips in Table layout */}
                {line.words && line.words.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-amber-100">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">
                      पदच्छेद एवं व्यक्तिगत शब्दार्थ:
                    </span>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {line.words.map((w, wIdx) => (
                        <div
                          key={wIdx}
                          className="bg-amber-50/50 p-2 rounded-lg border border-amber-200/60 text-xs"
                        >
                          <div className="font-bold text-amber-950">{w.prakritWord}</div>
                          <div className="text-stone-600 mt-0.5">{w.hindiMeaning}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Complete Hindi Sentence Meaning */}
                <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed">
                  <span className="font-bold text-amber-900">हिंदी भावार्थ: </span>
                  {line.hindiMeaning}
                </div>

                {/* Deep Spiritual Bhavartha */}
                {line.bhavartha && (
                  <div className="mt-2.5 text-xs text-stone-600 pl-3 border-l-2 border-amber-400">
                    <span className="font-semibold text-amber-950">आध्यात्मिक रहस्य: </span>
                    {line.bhavartha}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </section>
  );
};
