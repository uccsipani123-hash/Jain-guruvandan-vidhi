import React from 'react';

interface IllustrationProps {
  className?: string;
  variant?: 'hero' | 'card' | 'banner';
}

export const GuruBhagwantIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-orange-50/60 border border-amber-200/80 shadow-inner flex items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="auraGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="robeShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FDE68A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Upashray Temple Arch Backdrop */}
        <path d="M 80 280 L 80 120 C 80 60 140 20 200 20 C 260 20 320 60 320 120 L 320 280 Z" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
        <path d="M 100 280 L 100 130 C 100 80 150 45 200 45 C 250 45 300 80 300 130 L 300 280 Z" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="4 3" />

        {/* Sacred Divine Aura behind Head */}
        <circle cx="200" cy="110" r="54" fill="url(#sunHalo)" />
        <circle cx="200" cy="110" r="46" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Subtle 8 Aura Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + Math.cos(rad) * 48;
          const y1 = 110 + Math.sin(rad) * 48;
          const x2 = 200 + Math.cos(rad) * 58;
          const y2 = 110 + Math.sin(rad) * 58;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />;
        })}

        {/* Wooden Patla (Platform) */}
        <rect x="90" y="240" width="220" height="22" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        <rect x="100" y="244" width="200" height="6" fill="#D97706" opacity="0.6" />
        <rect x="110" y="262" width="20" height="16" fill="#78350F" rx="2" />
        <rect x="270" y="262" width="20" height="16" fill="#78350F" rx="2" />

        {/* Guru Seated Body (Jain Sadhu in White Robes) */}
        {/* Lower Robe - Padmasana / Sukhasana drape */}
        <path d="M 120 240 C 120 200 150 180 200 180 C 250 180 280 200 280 240 Z" fill="url(#robeShade)" stroke="#CBD5E1" strokeWidth="1.5" />
        <path d="M 140 240 C 160 215 240 215 260 240" fill="none" stroke="#E2E8F0" strokeWidth="2" />

        {/* Upper Robe Drape (Uttarasanga) */}
        <path d="M 160 150 C 150 180 145 220 155 240 C 185 240 215 240 245 240 C 255 210 250 180 240 150 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <path d="M 170 150 Q 200 185 230 160" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Ogho / Rajoharan held in arm */}
        <g transform="translate(140, 160)">
          {/* Wooden handle */}
          <line x1="0" y1="40" x2="-25" y2="75" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          {/* White woollen threads of Ogho */}
          <path d="M -25 75 Q -35 95 -40 105 Q -25 105 -15 105 Q -18 90 -25 75 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="-30" y1="85" x2="-35" y2="105" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-25" y1="85" x2="-25" y2="105" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-20" y1="85" x2="-15" y2="105" stroke="#CBD5E1" strokeWidth="1" />
        </g>

        {/* Neck & Face */}
        <path d="M 190 142 L 190 132 L 210 132 L 210 142 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
        {/* Head */}
        <circle cx="200" cy="110" r="22" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1" />
        {/* Serene eyes in meditation */}
        <path d="M 192 108 Q 196 112 200 108" fill="none" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 202 108 Q 206 112 210 108" fill="none" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tilak / Divine forehead mark */}
        <circle cx="201" cy="98" r="2" fill="#DC2626" />
        {/* Gentle smile */}
        <path d="M 197 120 Q 201 123 205 120" fill="none" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />

        {/* Ashirwad Mudra (Right Hand blessing) */}
        <g transform="translate(230, 160)">
          <path d="M 0 0 C 10 -5 18 -15 18 -25 C 18 -30 14 -32 10 -28 C 8 -22 6 -10 0 5 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
          {/* Subtle Blessing Aura */}
          <circle cx="12" cy="-20" r="10" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
        </g>

        {/* Sacred Jain Symbols on Top */}
        <g transform="translate(200, 35) scale(0.65)">
          {/* Half Moon (Siddhashila) */}
          <path d="M -20 -10 Q 0 5 20 -10 Q 0 -2 -20 -10 Z" fill="#F59E0B" />
          {/* Bindu (Siddha Bhagwan) */}
          <circle cx="0" cy="-14" r="3" fill="#D97706" />
        </g>

        {/* Bottom Banner Badge */}
        <rect x="110" y="278" width="180" height="18" rx="9" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="200" y="291" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          पूज्य गुरु भगवंत (श्वेतांबर साधु)
        </text>
      </svg>
    </div>
  );
};

export const PanchangPranipatIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-stone-50 border border-amber-200/80 shadow-inner flex flex-col items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 440 280" className="w-full h-full max-h-72 drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="matGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        {/* Katasanu (White Cotton Asana Mat on Ground) */}
        <rect x="40" y="210" width="360" height="26" rx="4" fill="url(#matGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="50" y1="216" x2="390" y2="216" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="6 4" />
        <text x="55" y="228" fill="#94A3B8" fontSize="8" fontWeight="600">कटआसण (पवित्र आसन)</text>

        {/* Prostration Body (Panchang Pranipat Profile) */}
        {/* Feet tucked at back */}
        <circle cx="340" cy="205" r="10" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />

        {/* Knees on Ground (Point 1 & 2: जानु द्वय) */}
        <ellipse cx="280" cy="208" rx="18" ry="12" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.2" />

        {/* Thighs & Torso bowed forward in devotion */}
        <path d="M 280 200 C 280 150 250 145 200 150 C 150 155 120 180 100 205" fill="none" stroke="#FFFFFF" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 280 200 C 280 150 250 145 200 150 C 150 155 120 180 100 205" fill="none" stroke="#CBD5E1" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />

        {/* White Shravak Cloth (Dhoti / Khes drape) */}
        <path d="M 290 208 C 290 140 250 135 190 145 C 140 155 110 185 95 205 L 140 208 C 170 190 220 180 270 208 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Forearms & Elbows on Ground (Point 3 & 4: दोनों हाथ/कोहनी) */}
        <path d="M 150 170 L 110 208 L 70 208" fill="none" stroke="#FED7AA" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 150 170 L 110 208 L 70 208" fill="none" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Folded Muhapatti in hands near face */}
        <rect x="75" y="196" width="34" height="15" rx="3" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="80" y1="202" x2="104" y2="202" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="80" y1="206" x2="104" y2="206" stroke="#CBD5E1" strokeWidth="1" />

        {/* Head / Forehead Touching Ground/Asana (Point 5: मस्तक) */}
        <circle cx="105" cy="188" r="16" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1.2" />
        <path d="M 98 184 Q 102 187 106 184" fill="none" stroke="#78350F" strokeWidth="1" />

        {/* 5 Limb Touch Callout Indicators */}
        {/* 1. Knee Indicator */}
        <g transform="translate(280, 248)">
          <circle cx="0" cy="0" r="11" fill="#DC2626" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">१-२</text>
          <line x1="0" y1="-12" x2="0" y2="-28" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="0" y="24" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="bold">दो घुटने (जानु)</text>
        </g>

        {/* 2. Hands / Elbows Indicator */}
        <g transform="translate(110, 248)">
          <circle cx="0" cy="0" r="11" fill="#DC2626" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">३-४</text>
          <line x1="0" y1="-12" x2="0" y2="-28" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="0" y="24" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="bold">दोनों हाथ/कोहनी</text>
        </g>

        {/* 3. Forehead Indicator */}
        <g transform="translate(60, 140)">
          <circle cx="0" cy="0" r="11" fill="#DC2626" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">५</text>
          <line x1="12" y1="12" x2="35" y2="40" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="0" y="-14" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="bold">मस्तक (ललाट)</text>
        </g>

        {/* Sacred Mantra Text Overlay */}
        <rect x="130" y="30" width="280" height="48" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="270" y="52" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="bold" fontFamily="serif">
          "मत्थएण वंदामि"
        </text>
        <text x="270" y="68" textAnchor="middle" fill="#78350F" fontSize="10">
          पंचांग प्रणिपात: ५ अंगों से भूमि स्पर्श कर अहंकार का विसर्जन
        </text>
      </svg>
    </div>
  );
};

export const MuhapattiPadilehanIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-orange-50/50 border border-amber-200/80 shadow-inner flex flex-col items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 400 280" className="w-full h-full max-h-72 drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        {/* Background glow */}
        <circle cx="200" cy="140" r="90" fill="#FEF3C7" opacity="0.6" />

        {/* Unfolded Muhapatti Cloth */}
        <g transform="translate(200, 130)">
          {/* Main Cloth Body */}
          <path d="M -80 -60 L 80 -60 L 70 60 L -70 60 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Subtle Creases / Folds (12 Bol / 50 Bol inspection) */}
          <line x1="-80" y1="0" x2="80" y2="0" stroke="#E2E8F0" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="0" y1="-60" x2="0" y2="60" stroke="#E2E8F0" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="-40" y1="-60" x2="-35" y2="60" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="-60" x2="35" y2="60" stroke="#F1F5F9" strokeWidth="1" />

          {/* Stitching hem */}
          <path d="M -76 -56 L 76 -56 L 66 56 L -66 56 Z" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />

          {/* Sacred Ahimsa Hand Icon / Gentle symbol in center */}
          <circle cx="0" cy="0" r="18" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1" />
          <path d="M -6 4 L -6 -6 C -6 -9 -2 -9 -2 -6 L -2 4" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M -2 4 L -2 -8 C -2 -11 2 -11 2 -8 L 2 4" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M 2 4 L 2 -6 C 2 -9 6 -9 6 -6 L 6 4" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <circle cx="0" cy="8" r="2" fill="#D97706" />

          {/* Hands holding the Muhapatti gently */}
          {/* Left Hand */}
          <path d="M -90 -20 C -75 -15 -70 10 -85 20 C -95 10 -95 -10 -90 -20 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
          {/* Right Hand */}
          <path d="M 90 -20 C 75 -15 70 10 85 20 C 95 10 95 -10 90 -20 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
        </g>

        {/* Observation eyes symbol above showing careful inspection */}
        <g transform="translate(200, 42)">
          <ellipse cx="-20" cy="0" rx="12" ry="7" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="-20" cy="0" r="4" fill="#92400E" />
          <ellipse cx="20" cy="0" rx="12" ry="7" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="20" cy="0" r="4" fill="#92400E" />
          <text x="0" y="24" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">
            यत्नपूर्वक निरीक्षण (५० बोल पड़िलेहण)
          </text>
        </g>

        {/* Bottom Banner */}
        <rect x="60" y="235" width="280" height="32" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="200" y="255" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">
          मुखवस्त्रिका: वाणी-संयम एवं सूक्ष्म-जीव दया का संकल्प
        </text>
      </svg>
    </div>
  );
};

export const JainUpakaranIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-amber-50/70 border border-amber-200/80 shadow-inner flex flex-col items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 460 280" className="w-full h-full max-h-72 drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        {/* Platform surface */}
        <rect x="20" y="220" width="420" height="20" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />

        {/* 1. Sthapanaji (Sacred Scripture Stand) in Center */}
        <g transform="translate(230, 110)">
          {/* Wooden Folding Stand (त्रिपुटी) */}
          <line x1="-35" y1="90" x2="35" y2="10" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
          <line x1="35" y1="90" x2="-35" y2="10" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
          <circle cx="0" cy="50" r="5" fill="#B45309" stroke="#78350F" strokeWidth="1" />

          {/* Scripture book on top */}
          <rect x="-42" y="-10" width="84" height="24" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <rect x="-38" y="-6" width="76" height="16" fill="#FEF3C7" />
          <line x1="-30" y1="2" x2="30" y2="2" stroke="#D97706" strokeWidth="1.5" />
          {/* Akshat Swastika / Panch Parmesthi Symbol */}
          <circle cx="0" cy="2" r="3" fill="#DC2626" />
          <text x="0" y="105" textAnchor="middle" fill="#78350F" fontSize="9" fontWeight="bold">स्थापना जी</text>
        </g>

        {/* 2. Rajoharan / Ogho (Left) */}
        <g transform="translate(90, 120)">
          {/* Long wooden Danda */}
          <line x1="0" y1="90" x2="25" y2="0" stroke="#B45309" strokeWidth="4.5" strokeLinecap="round" />
          {/* Woollen soft fluffy threads */}
          <path d="M 25 0 Q 45 -10 50 -25 Q 30 -30 15 -20 Q 20 -10 25 0 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
          <path d="M 30 -5 Q 55 -5 60 -15 Q 40 -25 25 -10 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          {/* Thread ties */}
          <rect x="20" y="-3" width="8" height="6" fill="#DC2626" rx="1" />
          <text x="15" y="105" textAnchor="middle" fill="#78350F" fontSize="9" fontWeight="bold">चरवला / ओघो</text>
        </g>

        {/* 3. Folded Muhapatti (Right) */}
        <g transform="translate(360, 160)">
          <path d="M -30 -15 L 30 -15 L 25 15 L -25 15 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="-28" y1="-5" x2="28" y2="-5" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="-26" y1="5" x2="26" y2="5" stroke="#CBD5E1" strokeWidth="1" />
          <text x="0" y="45" textAnchor="middle" fill="#78350F" fontSize="9" fontWeight="bold">मुहपत्ति</text>
        </g>

        {/* 4. Navkar Japamala (108 Beads necklace draped) */}
        <g transform="translate(350, 110)">
          <path d="M -40 0 Q 0 45 40 0" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="3 3" />
          {[-35, -25, -15, -5, 5, 15, 25, 35].map((x, i) => {
            const y = 30 - Math.abs(x) * 0.7;
            return <circle key={i} cx={x} cy={y} r="2.5" fill="#B45309" stroke="#78350F" strokeWidth="0.5" />;
          })}
          {/* Sumeru bead */}
          <circle cx="0" cy="32" r="4.5" fill="#DC2626" />
          <text x="0" y="-10" textAnchor="middle" fill="#78350F" fontSize="8" fontWeight="600">१०८ मनके माला</text>
        </g>

        {/* 5. Katasanu Mat beneath */}
        <rect x="80" y="210" width="300" height="12" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <text x="230" y="219" textAnchor="middle" fill="#64748B" fontSize="8">कटआसण (आसन)</text>

        {/* Top Header */}
        <text x="230" y="32" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="bold">
          श्वेतांबर गुरु वंदन के पावन उपस्कर (उपकरण)
        </text>
      </svg>
    </div>
  );
};

export const AbhutthioSukhsataIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-orange-50/50 border border-amber-200/80 shadow-inner flex flex-col items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 440 280" className="w-full h-full max-h-72 drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        {/* Dialogue Representation between Guru and Shravak */}

        {/* Left Side: Devotee (Shravak) Standing in Anjali Mudra */}
        <g transform="translate(90, 90)">
          {/* Devotee Head */}
          <circle cx="0" cy="0" r="18" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1.2" />
          {/* Eyes looking down respectfully */}
          <line x1="-5" y1="2" x2="2" y2="4" stroke="#78350F" strokeWidth="1.5" />
          {/* Gentle Smile */}
          <path d="M -3 10 Q 0 12 3 10" stroke="#9A3412" strokeWidth="1" fill="none" />

          {/* White traditional Kurta/Dhoti */}
          <path d="M -15 22 L 15 22 L 22 130 L -22 130 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="0" y1="22" x2="0" y2="90" stroke="#E2E8F0" strokeWidth="1" />

          {/* Folded Hands in Anjali Mudra (विनय अंजलि) holding Muhapatti */}
          <g transform="translate(10, 48)">
            <ellipse cx="0" cy="0" rx="10" ry="16" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
            {/* Muhapatti held tucked */}
            <rect x="-8" y="-12" width="16" height="24" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          </g>

          <text x="0" y="148" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">
            विनीत श्रावक (अभुट्ठिओमि)
          </text>
        </g>

        {/* Speech Bubble: Shravak asking Sukha-Sata */}
        <g transform="translate(155, 45)">
          <rect x="0" y="0" width="150" height="50" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
          <path d="M 0 25 L -12 25 L 0 35 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
          <rect x="-1" y="24" width="4" height="12" fill="#FEF3C7" />
          <text x="75" y="20" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold">
            "अभुट्ठिओमि... खाsum?"
          </text>
          <text x="75" y="36" textAnchor="middle" fill="#78350F" fontSize="8">
            (दिन भर के अपराधों की क्षमा याचना)
          </text>
        </g>

        {/* Speech Bubble: Guru replying 'Khameh' */}
        <g transform="translate(175, 120)">
          <rect x="0" y="0" width="120" height="38" rx="8" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
          <path d="M 120 18 L 132 18 L 120 26 Z" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
          <rect x="118" y="17" width="4" height="10" fill="#DCFCE7" />
          <text x="60" y="18" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">
            "खामेह" (क्षमा करावो)
          </text>
          <text x="60" y="30" textAnchor="middle" fill="#15803D" fontSize="8">
            (गुरुदेव का पावन आदेश)
          </text>
        </g>

        {/* Right Side: Seated Guru Bhagwant */}
        <g transform="translate(340, 110)">
          {/* Patla */}
          <rect x="-50" y="100" width="100" height="14" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />

          {/* Aura */}
          <circle cx="0" cy="0" r="32" fill="#FEF08A" opacity="0.6" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />

          {/* Guru Head */}
          <circle cx="0" cy="0" r="18" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1.2" />
          <circle cx="0" cy="-6" r="2" fill="#DC2626" />
          <path d="M -6 4 Q 0 8 6 4" stroke="#B45309" strokeWidth="1.2" fill="none" />

          {/* White Seated Body */}
          <path d="M -30 100 C -30 60 -15 30 0 30 C 15 30 30 60 30 100 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Blessing Hand */}
          <g transform="translate(-18, 50)">
            <ellipse cx="0" cy="0" rx="8" ry="12" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
            <circle cx="0" cy="-6" r="6" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 1" />
          </g>

          <text x="0" y="128" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">
            पूज्य गुरुदेव (वात्सल्य मूर्ति)
          </text>
        </g>

        {/* Bottom Banner */}
        <rect x="70" y="240" width="300" height="28" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="220" y="258" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">
          परस्पर क्षमा और विनय का अलौकिक संवाद (अभुट्ठिओमि सूत्र)
        </text>
      </svg>
    </div>
  );
};

export const IchchhakarIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-orange-50/50 border border-amber-200/80 shadow-inner flex flex-col items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 440 280" className="w-full h-full max-h-72 drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Left Side: Devotee Standing in Anjali Mudra asking Sukha-Sata */}
        <g transform="translate(90, 85)">
          <circle cx="0" cy="0" r="18" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1.2" />
          <line x1="-5" y1="2" x2="2" y2="4" stroke="#78350F" strokeWidth="1.5" />
          <path d="M -3 10 Q 0 12 3 10" stroke="#9A3412" strokeWidth="1" fill="none" />

          {/* White traditional Kurta/Dhoti */}
          <path d="M -15 22 L 15 22 L 22 135 L -22 135 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="0" y1="22" x2="0" y2="95" stroke="#E2E8F0" strokeWidth="1" />

          {/* Folded Hands in Anjali Mudra holding Muhapatti */}
          <g transform="translate(10, 50)">
            <ellipse cx="0" cy="0" rx="10" ry="16" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
            <rect x="-8" y="-12" width="16" height="24" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          </g>

          <text x="0" y="152" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">
            विनीत श्रावक (इच्छाकार)
          </text>
        </g>

        {/* Speech Bubble: Shravak asking Sukha-Sata details */}
        <g transform="translate(140, 30)">
          <rect x="0" y="0" width="180" height="66" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
          <path d="M 0 32 L -12 32 L 0 42 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
          <rect x="-1" y="31" width="4" height="12" fill="#FEF3C7" />
          <text x="90" y="16" textAnchor="middle" fill="#92400E" fontSize="9.5" fontWeight="bold">
            "इच्छाकार, सुहोराई!"
          </text>
          <text x="90" y="29" textAnchor="middle" fill="#78350F" fontSize="8">
            सुख-तप-शरीर निराबाध?
          </text>
          <text x="90" y="42" textAnchor="middle" fill="#78350F" fontSize="8">
            सुख संयम जात्रा निर्वहो छो जी?
          </text>
          <text x="90" y="55" textAnchor="middle" fill="#B45309" fontSize="7.5" fontWeight="bold">
            स्वामी साता छे जी? भात-पाणीनो लाभ देजो जी!
          </text>
        </g>

        {/* Speech Bubble: Guru replying 'Sata chhe ji, labh lejo ji' */}
        <g transform="translate(170, 125)">
          <rect x="0" y="0" width="135" height="42" rx="8" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
          <path d="M 135 18 L 147 18 L 135 26 Z" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
          <rect x="133" y="17" width="4" height="10" fill="#DCFCE7" />
          <text x="67" y="18" textAnchor="middle" fill="#166534" fontSize="9.5" fontWeight="bold">
            "साता छे जी, लाभ लेजो जी!"
          </text>
          <text x="67" y="32" textAnchor="middle" fill="#15803D" fontSize="8">
            (धर्म-लाभ / आरोगा संदिसह)
          </text>
        </g>

        {/* Right Side: Seated Guru Bhagwant */}
        <g transform="translate(345, 105)">
          <rect x="-50" y="105" width="100" height="14" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />
          <circle cx="0" cy="0" r="32" fill="#FEF08A" opacity="0.6" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />

          <circle cx="0" cy="0" r="18" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1.2" />
          <circle cx="0" cy="-6" r="2" fill="#DC2626" />
          <path d="M -6 4 Q 0 8 6 4" stroke="#B45309" strokeWidth="1.2" fill="none" />

          <path d="M -30 105 C -30 65 -15 30 0 30 C 15 30 30 65 30 105 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Blessing Hand */}
          <g transform="translate(-18, 50)">
            <ellipse cx="0" cy="0" rx="8" ry="12" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
            <circle cx="0" cy="-6" r="6" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 1" />
          </g>

          <text x="0" y="133" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">
            पूज्य गुरुदेव (सुख-साता दाता)
          </text>
        </g>

        {/* Bottom Banner */}
        <rect x="60" y="242" width="320" height="28" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="220" y="260" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">
          चरण ४: इच्छाकार सूत्र — गुरु भगवंत की सुख-साता एवं संयम यात्रा पृच्छा
        </text>
      </svg>
    </div>
  );
};
