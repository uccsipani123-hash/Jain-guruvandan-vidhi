import React from 'react';
import { Phone, MessageCircle, BookOpen } from 'lucide-react';
import { AUTHOR_INFO } from '../data/vidhiData';

interface HeaderProps {
  onSelectTab: (tabId: string) => void;
  activeTab: string;
  onOpenGlossary: (termId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectTab, activeTab, onOpenGlossary }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand title, single line text element */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onSelectTab('steps'); }}
          className="text-lg sm:text-xl font-bold tracking-tight text-amber-950 font-serif whitespace-nowrap hover:text-amber-800 transition-colors"
        >
          गुरु वंदन विधि <span className="text-amber-700 text-sm font-normal hidden sm:inline">| श्वेतांबर परंपरा</span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('steps')}
            className={`transition-colors hover:text-amber-900 whitespace-nowrap pb-0.5 ${
              activeTab === 'steps' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            सचित्र चरण
          </button>
          <button
            onClick={() => onSelectTab('meanings')}
            className={`transition-colors hover:text-amber-900 whitespace-nowrap pb-0.5 ${
              activeTab === 'meanings' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            पंक्तिवार अर्थ
          </button>
          <button
            onClick={() => onSelectTab('doshas')}
            className={`transition-colors hover:text-amber-900 whitespace-nowrap pb-0.5 ${
              activeTab === 'doshas' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            ३२ दोष
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`transition-colors hover:text-amber-900 whitespace-nowrap pb-0.5 ${
              activeTab === 'practice' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            अभ्यास
          </button>
          <button
            onClick={() => onOpenGlossary()}
            className="transition-colors hover:text-amber-900 text-amber-900 font-semibold flex items-center gap-1 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200 whitespace-nowrap"
            title="पारिभाषिक शब्दावली शब्द-कोश खोलें"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>शब्दावली (Glossary)</span>
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`transition-colors hover:text-amber-900 whitespace-nowrap pb-0.5 ${
              activeTab === 'quiz' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            ज्ञान परख
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className={`transition-colors hover:text-amber-900 whitespace-nowrap pb-0.5 ${
              activeTab === 'contact' ? 'text-amber-900 font-semibold border-b-2 border-amber-600' : ''
            }`}
          >
            संस्थापक
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={AUTHOR_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="व्हाट्सएप पर संपर्क करें"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">व्हाट्सएप:</span> {AUTHOR_INFO.whatsapp}
          </a>
          <a
            href={`tel:${AUTHOR_INFO.mobile}`}
            title="सीधा फोन करें"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">कॉल करें:</span> {AUTHOR_INFO.mobile}
          </a>
        </div>

      </div>

      {/* Mobile Secondary Scrollable Nav */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-amber-100 bg-amber-50/50 text-xs no-scrollbar">
        <button
          onClick={() => onSelectTab('steps')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === 'steps' ? 'bg-amber-700 text-white font-medium' : 'text-stone-700'}`}
        >
          सचित्र चरण
        </button>
        <button
          onClick={() => onSelectTab('meanings')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === 'meanings' ? 'bg-amber-700 text-white font-medium' : 'text-stone-700'}`}
        >
          पंक्तिवार अर्थ
        </button>
        <button
          onClick={() => onOpenGlossary()}
          className="whitespace-nowrap px-2.5 py-1 rounded-md bg-amber-200/80 text-amber-950 font-bold border border-amber-300 flex items-center gap-1"
        >
          <BookOpen className="w-3 h-3 text-amber-800" />
          <span>शब्दावली (Glossary)</span>
        </button>
        <button
          onClick={() => onSelectTab('doshas')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === 'doshas' ? 'bg-amber-700 text-white font-medium' : 'text-stone-700'}`}
        >
          ३२ दोष
        </button>
        <button
          onClick={() => onSelectTab('practice')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === 'practice' ? 'bg-amber-700 text-white font-medium' : 'text-stone-700'}`}
        >
          अभ्यास
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === 'quiz' ? 'bg-amber-700 text-white font-medium' : 'text-stone-700'}`}
        >
          ज्ञान परख
        </button>
        <button
          onClick={() => onSelectTab('contact')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === 'contact' ? 'bg-amber-700 text-white font-medium' : 'text-stone-700'}`}
        >
          संस्थापक
        </button>
      </div>
    </header>
  );
};
