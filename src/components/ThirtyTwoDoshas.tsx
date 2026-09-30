import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { THIRTY_TWO_DOSHAS } from '../data/vidhiData';
import { DoshaItem } from '../types/vidhi';

export const ThirtyTwoDoshas: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'समस्त ३२ दोष' },
    { id: 'काया (शारीरिक)', label: 'काया (शारीरिक)' },
    { id: 'वचन (उच्चारण)', label: 'वचन (उच्चारण)' },
    { id: 'मन (भाव)', label: 'मन (भाव)' },
    { id: 'उपकरण व काल', label: 'उपकरण व काल' }
  ];

  const filteredDoshas = THIRTY_TWO_DOSHAS.filter((item: DoshaItem) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.nameHi.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
      const matchMeaning = item.meaning.toLowerCase().includes(q) || item.prevention.toLowerCase().includes(q);
      if (!matchName && !matchMeaning) return false;
    }
    return true;
  });

  return (
    <section id="doshas-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="text-xs font-semibold text-amber-800 tracking-wider">
          आगम सम्मत आचार · SHASTRA GUIDELINES
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif mt-1">
          गुरु वंदन के ३२ दोष एवं उनका परिहार
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600">
          वंदन की सार्थकता तभी है जब वह ३२ दोषों से रहित और पूर्ण विनय भाव से युक्त हो। जानिए प्रत्येक दोष का स्वरूप और उससे बचने का उपाय।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-50/80 rounded-xl border border-amber-200/60 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="दोष का नाम या विवरण खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

      </div>

      {/* Doshas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoshas.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-amber-200 text-stone-500 text-sm">
            कोई दोष विवरण नहीं मिला। कृपया खोज शब्द बदलें।
          </div>
        ) : (
          filteredDoshas.map((dosha) => (
            <div
              key={dosha.id}
              className="bg-white rounded-xl border border-amber-200/90 p-5 hover:border-amber-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: ID, Name & Category */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {dosha.id}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-amber-950 font-serif">
                        {dosha.nameHi}
                      </h4>
                      <div className="text-[11px] text-stone-400 font-sans">
                        {dosha.nameEn}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-amber-800 font-medium px-2 py-0.5 bg-amber-50 border border-amber-200/60 rounded">
                    {dosha.category}
                  </span>
                </div>

                {/* Meaning of the Dosha */}
                <div className="mt-3">
                  <div className="flex items-start gap-1.5 text-xs text-stone-700 leading-relaxed">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900">दोष का स्वरूप: </span>
                      {dosha.meaning}
                    </div>
                  </div>
                </div>

                {/* Prevention / Right Method */}
                <div className="mt-3 p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200/60 text-xs text-emerald-950">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900">परिहार (शुद्ध विधि): </span>
                      {dosha.prevention}
                    </div>
                  </div>
                </div>

                {/* Common Mistake Example */}
                <div className="mt-2 text-[11px] text-stone-500 italic flex items-center gap-1">
                  <Info className="w-3 h-3 text-stone-400 shrink-0" />
                  <span>प्रायः भूल: {dosha.example}</span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Shastra Reference Note */}
      <div className="mt-8 p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            शास्त्र संदर्भ: <strong>"दोषमुक्ता वंदना फलाय कल्पते"</strong> — बत्तीस दोषों से रहित होकर की गई वंदना ही अनंत कर्म-निर्जरा का हेतु बनती है।
          </span>
        </div>
        <div className="text-[11px] text-amber-800 font-medium shrink-0">
          प्रस्तुति: सिपानी जैन एजुकेशन, मानसरोवर, जयपुर
        </div>
      </div>

    </section>
  );
};
