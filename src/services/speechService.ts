export class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.default)
    );
    this.selectedVoice = englishVoice || voices[0] || null;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public setVoice(voiceURI: string): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const found = voices.find((v) => v.voiceURI === voiceURI);
    if (found) {
      this.selectedVoice = found;
    }
  }

  public speak(
    text: string, 
    rate: 'slow' | 'normal' | 'fast' = 'normal',
    onEnd?: () => void,
    onError?: () => void
  ): void {
    if (!this.synth) {
      if (onError) onError();
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    if (rate === 'slow') {
      utterance.rate = 0.65;
    } else if (rate === 'fast') {
      utterance.rate = 1.15;
    } else {
      utterance.rate = 0.9;
    }

    utterance.pitch = 1.0;

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
