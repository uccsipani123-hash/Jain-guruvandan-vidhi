import React from 'react';
import { AUTHOR_INFO, VIDHI_STEPS, THIRTY_TWO_DOSHAS } from '../data/vidhiData';

export const PrintableVidhi: React.FC = () => {
  return (
    <div className="hidden print:block text-stone-900 bg-white p-6 font-serif">
      
      {/* Printable Header */}
      <div className="text-center border-b-2 border-stone-800 pb-4 mb-6">
        <div className="text-xs uppercase tracking-widest font-sans font-bold">॥ ॐ श्री वीतरागाय नमः ॥</div>
        <h1 className="text-2xl font-bold mt-1">जैन श्वेतांबर गुरु वंदन विधि (बे खमासमण)</h1>
        <div className="text-xs font-sans mt-1">
          प्रस्तुति: <strong>सिपानी जैन एजुकेशन, मानसरोवर, जयपुर</strong> · संस्थापक: <strong>संजीव सिपानी</strong>
        </div>
        <div className="text-xs font-sans text-stone-700">
          मोबाइल: {AUTHOR_INFO.mobile} · व्हाट्सएप: {AUTHOR_INFO.whatsapp}
        </div>
      </div>

      {/* 7 Steps in full detail */}
      <div className="space-y-4">
        {VIDHI_STEPS.map((s) => (
          <div key={s.id} className="border border-stone-300 p-3 rounded text-xs break-inside-avoid">
            <div className="flex justify-between items-baseline font-bold border-b border-stone-200 pb-1 mb-1.5">
              <span>चरण {s.stepNumber}: {s.titleHi}</span>
              <span className="font-normal italic">({s.postureName})</span>
            </div>

            {s.lines.map((l) => (
              <div key={l.id} className="mb-2">
                <div className="font-bold text-sm text-stone-950">{l.prakrit}</div>
                <div className="text-stone-700 mt-0.5"><strong>अर्थ:</strong> {l.hindiMeaning}</div>
              </div>
            ))}

            <div className="text-[10px] text-stone-600 bg-stone-50 p-1.5 rounded mt-1">
              <strong>नियम/सावधानी:</strong> {s.importantRules.join(' · ')}
            </div>
          </div>
        ))}
      </div>

      {/* Panchang Pranipat Summary */}
      <div className="mt-4 border border-stone-400 p-3 rounded text-xs break-inside-avoid bg-stone-50">
        <div className="font-bold text-sm mb-1">पंचांग प्रणिपात के ५ स्पर्श अंग:</div>
        <p>१. वाम जानु (बायाँ घुटना) · २. दक्षिण जानु (दायाँ घुटना) · ३. वाम हस्त/कोहनी · ४. दक्षिण हस्त/कोहनी · ५. मस्तक (ललाट)</p>
      </div>

      {/* 32 Doshas brief list */}
      <div className="mt-4 text-[10px] break-inside-avoid">
        <div className="font-bold mb-1 text-xs">गुरु वंदन के ३२ दोष परिहार (बचने योग्य दोष):</div>
        <div className="grid grid-cols-4 gap-1 text-[9px] leading-tight">
          {THIRTY_TWO_DOSHAS.map(d => (
            <div key={d.id}>
              {d.id}. {d.nameHi}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-3 border-t border-stone-300 text-center text-[10px] font-sans text-stone-500">
        यह पत्रक नियमित गुरु वंदन अभ्यास हेतु मुद्रित है। किसी भी त्रुटि के लिए "मिच्छा मि दुक्कडं"।
      </div>

    </div>
  );
};
