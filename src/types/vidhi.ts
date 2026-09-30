export interface SutraLine {
  id: string;
  prakrit: string;
  transliteration: string;
  words: {
    prakritWord: string;
    hindiMeaning: string;
  }[];
  hindiMeaning: string;
  bhavartha?: string;
  speaker: 'shravak' | 'guru' | 'both';
  postureDescription?: string;
}

export interface VidhiStep {
  id: string;
  stepNumber: number;
  titleHi: string;
  subtitleHi: string;
  postureName: string;
  postureDetail: string;
  illustrationType: 'upakaran' | 'padilehan' | 'khamasaman' | 'sukhsata' | 'sajjhay' | 'ichchhakara';
  sutraTitle?: string;
  fullSutraDevanagari?: string;
  fullSutraTransliteration?: string;
  fullSutraHindiSummary?: string;
  lines: SutraLine[];
  importantRules: string[];
  keyBhav: string;
}

export interface DoshaItem {
  id: number;
  nameHi: string;
  nameEn: string;
  category: 'काया (शारीरिक)' | 'वचन (उच्चारण)' | 'मन (भाव)' | 'उपकरण व काल';
  meaning: string;
  prevention: string;
  example: string;
}

export interface AudioPlaybackState {
  isPlaying: boolean;
  currentStepId: string | null;
  currentLineId: string | null;
  rate: number; // 0.75, 1, 1.25
  isLooping: boolean;
  droneActive: boolean;
}
