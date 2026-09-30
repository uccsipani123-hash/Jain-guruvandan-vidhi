/**
 * Jain Devotional Audio Engine
 * Supports:
 * 1. Web Audio API synthesized Temple Bell (घंटा नाद)
 * 2. Meditative Tanpura / Omkar drone resonance
 * 3. Line-by-line Devotional Speech Synthesis (Prakrit & Hindi) with synchronized callbacks
 */

class JainAudioEngine {
  private audioCtx: AudioContext | null = null;
  private droneOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isDronePlaying = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Plays a realistic Jain temple bell chime (घंटा नाद)
   */
  public playTempleBell() {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Frequencies for a rich bronze temple bell
      const freqs = [440, 880, 1320, 1760, 2200];
      const gains = [0.4, 0.25, 0.15, 0.08, 0.04];

      freqs.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        // subtle detuning for sacred bronze bell shimmer
        osc.frequency.setValueAtTime(freq + (idx * 1.5), now);

        gain.gain.setValueAtTime(gains[idx], now);
        // Exponential decay
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5 + (idx * 0.4));

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 4.5);
      });
    } catch {
      // AudioContext fallback handled silently
    }
  }

  /**
   * Plays a soft wooden clapper / kartal / ghunghroo chime for step completion
   */
  public playStepChime() {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // ignore
    }
  }

  /**
   * Starts peaceful Tanpura drone resonance (Sa-Pa meditative ambiance)
   */
  public toggleDrone(): boolean {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return false;

      if (this.isDronePlaying) {
        this.stopDrone();
        return false;
      }

      const baseFreq = 138.59; // C#3 (traditional Indian classical Sa)
      const harmonics = [
        { mult: 1, gainVal: 0.08 },    // Sa (Root)
        { mult: 1.5, gainVal: 0.06 },  // Pa (Fifth)
        { mult: 2, gainVal: 0.04 },    // High Sa
        { mult: 3, gainVal: 0.02 }     // High Pa
      ];

      this.droneOscillators = [];
      const now = this.audioCtx.currentTime;

      harmonics.forEach(({ mult, gainVal }) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq * mult, now);

        // Lowpass filter for warm acoustic tanpura feel
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(gainVal, now + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        this.droneOscillators.push({ osc, gain });
      });

      this.isDronePlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stopDrone() {
    if (!this.audioCtx || !this.isDronePlaying) return;
    const now = this.audioCtx.currentTime;

    this.droneOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        osc.stop(now + 0.85);
      } catch {
        // ignore
      }
    });

    this.droneOscillators = [];
    this.isDronePlaying = false;
  }

  public getIsDronePlaying(): boolean {
    return this.isDronePlaying;
  }

  /**
   * Speaks a line with Web Speech API with highlight callbacks
   */
  public speakLine(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (!('speechSynthesis' in window)) {
      if (options.onStart) options.onStart();
      setTimeout(() => {
        if (options.onEnd) options.onEnd();
      }, 2000);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text of non-pronounceable markers for smoother recitation
    const cleanText = text
      .replace(/॥/g, '')
      .replace(/।/g, ' ')
      .replace(/[\(\)]/g, '')
      .replace(/खाsum/g, 'खामेउं')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = options.rate || 0.92;
    utterance.pitch = options.pitch || 0.98;

    // Pick best Hindi / Indian English voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('sa')) 
      || voices.find(v => v.lang.includes('IN')) 
      || voices[0];

    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onstart = () => {
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (options.onError) options.onError();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }
}

export const audioEngine = new JainAudioEngine();
