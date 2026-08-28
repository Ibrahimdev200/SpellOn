import type { PronunciationResult } from '../types';

export class PronunciationService {
  private recognition: any = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return this.isSupported;
  }

  public startRecording(
    onResult: (transcript: string) => void,
    onError: (error: string) => void,
    onStart?: () => void
  ): void {
    if (!this.isSupported || !this.recognition) {
      onError('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    try {
      this.recognition.onstart = () => {
        if (onStart) onStart();
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        let msg = 'Speech recognition error. Please try again.';
        if (event.error === 'not-allowed') {
          msg = 'Microphone permission denied. Please allow mic access or use typing practice.';
        } else if (event.error === 'no-speech') {
          msg = 'No speech detected. Please speak clearly into your microphone.';
        }
        onError(msg);
      };

      this.recognition.start();
    } catch (e) {
      onError('Could not start recording. Please try again.');
    }
  }

  public stopRecording(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignored
      }
    }
  }

  public calculateSimilarity(target: string, input: string): number {
    const s1 = target.toLowerCase().trim();
    const s2 = input.toLowerCase().trim();

    if (s1 === s2) return 100;

    const track = Array(s2.length + 1).fill(null).map(() =>
      Array(s1.length + 1).fill(null)
    );

    for (let i = 0; i <= s1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= s2.length; j += 1) {
      track[j][0] = j;
    }

    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }

    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    const score = Math.max(0, Math.round((1 - distance / maxLength) * 100));

    return score;
  }

  public assessPronunciation(targetWord: string, recognizedSpeech: string): PronunciationResult {
    const score = this.calculateSimilarity(targetWord, recognizedSpeech);
    const xpEarned = score >= 80 ? 10 : 2;

    if (score === 100) {
      return {
        score: 100,
        rating: 'Perfect',
        stars: 5,
        feedback: '🎉 PERFECT! Outstanding pronunciation!',
        isMatch: true,
        targetWord,
        recognizedWord: recognizedSpeech,
        xpEarned
      };
    } else if (score >= 90) {
      return {
        score,
        rating: 'Excellent',
        stars: 5,
        feedback: '🎉 EXCELLENT! Your pronunciation is super clear!',
        isMatch: true,
        targetWord,
        recognizedWord: recognizedSpeech,
        xpEarned
      };
    } else if (score >= 75) {
      return {
        score,
        rating: 'Very Good',
        stars: 4,
        feedback: '👍 VERY GOOD! Good attempt, keep it up!',
        isMatch: true,
        targetWord,
        recognizedWord: recognizedSpeech,
        xpEarned
      };
    } else if (score >= 60) {
      return {
        score,
        rating: 'Keep Practicing',
        stars: 3,
        feedback: '🔄 KEEP PRACTICING! Listen to the audio and speak again.',
        isMatch: false,
        targetWord,
        recognizedWord: recognizedSpeech,
        xpEarned
      };
    } else {
      return {
        score,
        rating: 'Try Again',
        stars: 2,
        feedback: '❌ TRY AGAIN! Listen carefully to the word sound.',
        isMatch: false,
        targetWord,
        recognizedWord: recognizedSpeech,
        xpEarned
      };
    }
  }
}

export const pronunciationService = new PronunciationService();
