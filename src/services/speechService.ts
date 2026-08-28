import type { SpeechRate } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    const englishVoice = this.voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];

    if (englishVoice) {
      this.selectedVoice = englishVoice;
    }
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }
    return this.voices.filter(v => v.lang.startsWith('en'));
  }

  public setVoice(voiceURI: string): void {
    const voice = this.voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      this.selectedVoice = voice;
    }
  }

  public speak(text: string, rate: SpeechRate = 'normal', onEnd?: () => void, onError?: () => void): void {
    if (!this.synth) {
      if (onError) onError();
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    switch (rate) {
      case 'slow':
        utterance.rate = 0.7;
        break;
      case 'fast':
        utterance.rate = 1.2;
        break;
      case 'normal':
      default:
        utterance.rate = 0.95;
        break;
    }

    utterance.pitch = 1.05;

    if (onEnd) utterance.onend = () => onEnd();
    if (onError) utterance.onerror = () => onError();

    this.synth.speak(utterance);
  }

  public cancel(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();
