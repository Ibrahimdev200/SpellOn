export type ClassLevel = 
  | 'Primary 1'
  | 'Primary 2'
  | 'Primary 3'
  | 'Primary 4'
  | 'Primary 5'
  | 'Primary 6'
  | 'JSS 1'
  | 'JSS 2'
  | 'JSS 3';

export type AvatarChoice = 'lion' | 'owl' | 'rocket' | 'star' | 'bear';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  classLevel: ClassLevel;
  avatarId?: AvatarChoice;
  currentDifficulty: number; // 1 (Easy), 2 (Medium), 3 (Hard)
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  word: string;
  classLevel: ClassLevel;
  difficulty: number; // 1, 2, or 3
  category: string;
  meaning: string;
  phonetic: string;
  exampleSentence: string;
}

export type PracticeMode = 'pronunciation' | 'spelling';

export interface WordAttempt {
  id: string;
  wordId: string;
  wordString: string;
  mode: PracticeMode;
  score: number; // 0 - 100
  targetWord: string;
  userInput: string;
  correct: boolean;
  attemptsCount: number;
  createdAt: string;
}

export interface PracticeSession {
  id: string;
  mode: PracticeMode;
  classLevel: ClassLevel;
  attempts: WordAttempt[];
  wordsCompletedCount: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number; // %
  pronunciationScore: number; // %
  spellingScore: number; // %
  durationSeconds: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'lesson' | 'streak' | 'accuracy' | 'vocabulary';
  requiredValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  totalWordsPracticed: number;
  totalLessonsCompleted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageAccuracy: number;
  averagePronunciationScore: number;
  averageSpellingScore: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  wordsToPractice: string[];
}

export type SpeechRate = 'slow' | 'normal' | 'fast';

export interface AppSettings {
  soundEnabled: boolean;
  voiceURI: string | null;
  speechRate: SpeechRate;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
}

export interface PronunciationResult {
  score: number; // 0 to 100
  rating: 'Perfect' | 'Excellent' | 'Very Good' | 'Keep Practicing' | 'Try Again';
  stars: number; // 1 to 5
  feedback: string;
  isMatch: boolean;
  targetWord: string;
  recognizedWord: string;
}
