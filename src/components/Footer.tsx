import React from 'react';
import { ArrowUp, Phone, MessageCircle } from 'lucide-react';
import { AUTHOR_INFO } from '../data/vidhiData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t-4 border-amber-600 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navkar Mantra Blessing */}
        <div className="text-center pb-8 border-b border-stone-800">
          <div className="text-amber-400 font-serif text-lg sm:text-xl font-bold tracking-wide">
            ॥ नमो अरिहंताणं · नमो सिद्धाणं · नमो आयरियाणं · नमो उवज्झायाणं · नमो लोए सव्वसाहूणं ॥
          </div>
          <div className="text-xs text-stone-400 mt-1">
            एसो पंच णमोक्कारो सव्वपावप्पणासणो। मंगलाणं च सव्वेसिं पढमं हवइ मंगलं॥
          </div>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 text-xs sm:text-sm">
          
          {/* Col 1: About the Project */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-amber-300 font-serif">
              जैन श्वेतांबर गुरु वंदन विधि
            </h4>
            <p className="text-stone-400 leading-relaxed text-xs">
              श्वेतांबर परंपरा अनुसार गुरु वंदन (बे खमासमण) की प्रामाणिक, सचित्र एवं सार्थ मार्गदर्शिका। शुद्ध उच्चारण एवं विनय भाव के साथ आत्म-कल्याण की साधना।
            </p>
            <div className="text-[11px] text-amber-500 font-medium">
              "विणओ धम्मस्स मूलं" — विनय ही धर्म का मूल है।
            </div>
          </div>

          {/* Col 2: Author & Institution (Sanjeev Sipani) */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-amber-300 font-serif">
              प्रणेता एवं शिक्षण केंद्र
            </h4>
            <div className="text-stone-300 font-medium">
              {AUTHOR_INFO.name}
            </div>
            <div className="text-xs text-stone-400">
              {AUTHOR_INFO.title}
            </div>
            <div className="text-xs text-stone-400">
              {AUTHOR_INFO.address}
            </div>
            <div className="pt-1 flex flex-wrap gap-3">
              <a
                href={`tel:${AUTHOR_INFO.mobile}`}
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
              >
                <Phone className="w-3 h-3" />
                <span>{AUTHOR_INFO.mobile}</span>
              </a>
              <a
                href={AUTHOR_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="w-3 h-3" />
                <span>{AUTHOR_INFO.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Key Links & Back to Top */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-amber-300 font-serif">
                जिनवाणी विनय
              </h4>
              <p className="text-stone-400 text-xs leading-relaxed">
                इस डिजिटल मंच पर समस्त सामग्री शास्त्रों के अनुसार प्रस्तुत की गई है। अज्ञानवश कोई भी पद या अर्थ विरुद्ध लिखा गया हो तो त्रिविधे त्रिविधे "मिच्छा मि दुक्कडं"।
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>शीर्ष पर जाएं (Back to Top)</span>
            </button>
          </div>

        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <div>
            © {new Date().getFullYear()} सिपानी जैन एजुकेशन, मानसरोवर, जयपुर | सर्व अधिकार धर्मार्थ समर्पित
          </div>
          <div>
            Website Prepared by <strong>Sanjeev Sipani</strong> · Mansarovar, Jaipur
          </div>
        </div>

      </div>
    </footer>
  );
};
