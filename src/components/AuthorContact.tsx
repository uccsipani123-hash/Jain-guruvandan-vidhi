import React from 'react';
import { Phone, MessageCircle, MapPin, HeartHandshake, Printer, Mail, ShieldCheck } from 'lucide-react';
import { AUTHOR_INFO } from '../data/vidhiData';

export const AuthorContact: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/40 rounded-3xl border border-amber-300/80 shadow-md p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative Jain motif backdrop element */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none select-none">
          <svg width="320" height="320" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#D97706" strokeWidth="8" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#D97706" strokeWidth="4" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Info (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>जिनशासन प्रभावना एवं धर्म-शिक्षा प्रकल्प</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-950 font-serif leading-tight">
              सिपानी जैन एजुकेशन, मानसरोवर, जयपुर
            </h2>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              यह डिजिटल गुरु वंदन विधि मार्गदर्शिका <strong>श्री संजीव सिपानी</strong> (संस्थापक: सिपानी जैन एजुकेशन, मानसरोवर, जयपुर) द्वारा श्रावक-श्राविकाओं एवं युवा पीढ़ी के सुलभ अभ्यास हेतु समर्पित भाव से तैयार की गई है।
            </p>

            {/* Mission Statement */}
            <div className="p-4 bg-white/90 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-stone-700 space-y-1">
              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-700" />
                <span>हमारा पावन ध्येय:</span>
              </div>
              <p>{AUTHOR_INFO.mission}</p>
            </div>

            {/* Michhami Dukkadam Note */}
            <p className="text-xs text-stone-500 italic">
              {AUTHOR_INFO.appeal}
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={AUTHOR_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>व्हाट्सएप संदेश भेजें ({AUTHOR_INFO.whatsapp})</span>
              </a>

              <a
                href={`tel:${AUTHOR_INFO.mobile}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>सीधा कॉल करें ({AUTHOR_INFO.mobile})</span>
              </a>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                title="विधि पत्रक प्रिंट करें"
              >
                <Printer className="w-4 h-4 text-amber-700" />
                <span>विधि पत्रक प्रिंट / PDF</span>
              </button>
            </div>

          </div>

          {/* Right Contact Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-amber-950 font-serif border-b border-amber-100 pb-2">
              संपर्क एवं मार्गदर्शन विवरण
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <span className="font-serif font-bold text-amber-900 text-xs">सं.</span>
                </div>
                <div>
                  <div className="text-stone-500 text-[11px]">संस्थापक व प्रणेता</div>
                  <div className="font-bold text-stone-900 text-base">{AUTHOR_INFO.name}</div>
                  <div className="text-amber-800 text-xs font-medium">{AUTHOR_INFO.title}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-stone-500 text-[11px]">स्थान व केंद्र</div>
                  <div className="font-medium text-stone-800">{AUTHOR_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-stone-500 text-[11px]">व्हाट्सएप (WhatsApp Support)</div>
                  <a 
                    href={AUTHOR_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    +91 {AUTHOR_INFO.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-stone-500 text-[11px]">मोबाइल संपर्क (Direct Call)</div>
                  <a 
                    href={`tel:${AUTHOR_INFO.mobile}`} 
                    className="font-bold text-amber-900 hover:underline"
                  >
                    +91 {AUTHOR_INFO.mobile}
                  </a>
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 text-center">
              जैन पाठशाला, सूत्र शिक्षण एवं धार्मिक क्रियाओं हेतु संपर्क करें।
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
