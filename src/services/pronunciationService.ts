import type { PronunciationResult } from '../types';
import { speechService } from './speechService';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class PronunciationService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  public speakWord(word: string, rate: 'slow' | 'normal' | 'fast' = 'normal', onEnd?: () => void): void {
    speechService.speak(word, rate, onEnd);
  }

  public startRecording(
    onResult: (spokenText: string) => void,
    onError: (errorMessage: string) => void,
    onStart?: () => void
  ): void {
    if (!this.recognition) {
      onError('Your browser does not support speech recognition. Try typing mode instead!');
      return;
    }

    if (this.isListening) {
      this.stopRecording();
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStart) onStart();
    };

    this.recognition.onresult = (event: any) => {
      this.isListening = false;
      if (event.results && event.results.length > 0) {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      } else {
        onError('Could not hear clearly. Please try speaking again.');
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      let msg = 'Speech recognition error occurred.';
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        msg = 'Microphone access is unavailable or denied on this device.';
      } else if (event.error === 'no-speech') {
        msg = 'No speech detected. Please speak louder and try again.';
      } else if (event.error === 'network') {
        msg = 'Network issue with speech recognition service.';
      }
      onError(msg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch {
      this.isListening = false;
      onError('Unable to start microphone. Please try again.');
    }
  }

  public stopRecording(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignored
      }
      this.isListening = false;
    }
  }

  public normalizeText(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
      .replace(/\s+/g, ' ');
  }

  private getLevenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  public assessPronunciation(targetWord: string, recognizedSpeech: string): PronunciationResult {
    const target = this.normalizeText(targetWord);
    const recognized = this.normalizeText(recognizedSpeech);

    if (target === recognized) {
      return {
        score: 100,
        rating: 'Perfect',
        stars: 5,
        feedback: '🎉 Perfect! You pronounced the word exactly right!',
        isMatch: true,
        targetWord,
        recognizedWord: recognizedSpeech
      };
    }

    const maxLen = Math.max(target.length, recognized.length);
    const distance = this.getLevenshteinDistance(target, recognized);
    let similarityRatio = (maxLen - distance) / maxLen;

    if (recognized.includes(target)) {
      similarityRatio = Math.max(similarityRatio, 0.92);
    }

    const percentage = Math.max(0, Math.min(100, Math.round(similarityRatio * 100)));

    let rating: PronunciationResult['rating'];
    let stars: number;
    let feedback: string;
    let isMatch = false;

    if (percentage >= 90) {
      rating = 'Excellent';
      stars = 5;
      feedback = '🎉 Excellent! You pronounced the word correctly.';
      isMatch = true;
    } else if (percentage >= 75) {
      rating = 'Very Good';
      stars = 4;
      feedback = '👍 Very Good! Almost perfect pronunciation.';
      isMatch = true;
    } else if (percentage >= 60) {
      rating = 'Keep Practicing';
      stars = 3;
      feedback = '🔄 Keep Practicing! Listen closely to the audio again.';
      isMatch = false;
    } else {
      rating = 'Try Again';
      stars = 2;
      feedback = '❌ Not quite! Listen again and try to pronounce the word.';
      isMatch = false;
    }

    return {
      score: percentage,
      rating,
      stars,
      feedback,
      isMatch,
      targetWord,
      recognizedWord: recognizedSpeech
    };
  }
}

export const pronunciationService = new PronunciationService();
