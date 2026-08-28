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

export type AvatarStyle = 'Boy' | 'Girl' | 'Student' | 'Explorer' | 'Reader' | 'Speaker';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  classLevel: ClassLevel;
  avatarStyle?: AvatarStyle;
  currentDifficulty: number; // 1 (Easy), 2 (Medium), 3 (Hard)
  xp: number;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  word: string;
  classLevel: ClassLevel;
  difficulty: number;
  category: string;
  meaning: string;
  phonetic: string;
  exampleSentence: string;
}

export type PracticeMode = 'pronunciation' | 'spelling' | 'vocabulary' | 'challenge';

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
  xpEarned: number;
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
  xpEarned: number;
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

export interface WeeklyActivityDay {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  wordsCount: number;
  isToday: boolean;
}

export interface UserStats {
  totalWordsPracticed: number;
  totalLessonsCompleted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageAccuracy: number;
  averagePronunciationScore: number;
  averageSpellingScore: number;
  averageVocabularyScore: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  wordsToPractice: string[];
  weeklyActivity: WeeklyActivityDay[];
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
  score: number;
  rating: 'Perfect' | 'Excellent' | 'Very Good' | 'Keep Practicing' | 'Try Again';
  stars: number;
  feedback: string;
  isMatch: boolean;
  targetWord: string;
  recognizedWord: string;
  xpEarned: number;
}
