import type { 
  StudentProfile, 
  UserStats, 
  Achievement, 
  AppSettings, 
  PracticeSession,
  WeeklyActivityDay
} from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/achievementsData';

const KEYS = {
  PROFILE: 'spellon_profile',
  STATS: 'spellon_stats',
  ACHIEVEMENTS: 'spellon_achievements',
  SETTINGS: 'spellon_settings',
  SESSIONS: 'spellon_sessions'
};

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  voiceURI: null,
  speechRate: 'normal',
  theme: 'light',
  notificationsEnabled: true
};

const INITIAL_WEEKLY: WeeklyActivityDay[] = [
  { day: 'MON', wordsCount: 6, isToday: false },
  { day: 'TUE', wordsCount: 10, isToday: false },
  { day: 'WED', wordsCount: 8, isToday: false },
  { day: 'THU', wordsCount: 12, isToday: false },
  { day: 'FRI', wordsCount: 10, isToday: true },
  { day: 'SAT', wordsCount: 0, isToday: false },
  { day: 'SUN', wordsCount: 0, isToday: false },
];

const DEFAULT_STATS: UserStats = {
  totalWordsPracticed: 0,
  totalLessonsCompleted: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  averageAccuracy: 85,
  averagePronunciationScore: 82,
  averageSpellingScore: 91,
  averageVocabularyScore: 74,
  totalXP: 320,
  currentStreak: 4,
  longestStreak: 7,
  lastPracticeDate: null,
  wordsToPractice: [],
  weeklyActivity: INITIAL_WEEKLY
};

export const storageService = {
  // PROFILE
  getProfile(): StudentProfile | null {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveProfile(profile: StudentProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  clearProfile(): void {
    localStorage.removeItem(KEYS.PROFILE);
  },

  // STATS
  getStats(): UserStats {
    try {
      const data = localStorage.getItem(KEYS.STATS);
      return data ? { ...DEFAULT_STATS, ...JSON.parse(data) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  },

  saveStats(stats: UserStats): void {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  },

  // SETTINGS
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  // ACHIEVEMENTS
  getAchievements(): Achievement[] {
    try {
      const data = localStorage.getItem(KEYS.ACHIEVEMENTS);
      if (!data) return INITIAL_ACHIEVEMENTS;
      
      const saved: Achievement[] = JSON.parse(data);
      return INITIAL_ACHIEVEMENTS.map(initial => {
        const found = saved.find(s => s.id === initial.id);
        return found ? { ...initial, unlocked: found.unlocked, unlockedAt: found.unlockedAt } : initial;
      });
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  },

  saveAchievements(achievements: Achievement[]): void {
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  },

  // SESSIONS & ATTEMPTS
  getSessions(): PracticeSession[] {
    try {
      const data = localStorage.getItem(KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveSession(session: PracticeSession): void {
    const sessions = this.getSessions();
    sessions.unshift(session);
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));

    this.updateStatsFromSession(session);
  },

  updateStatsFromSession(session: PracticeSession): void {
    const stats = this.getStats();
    const profile = this.getProfile();
    
    const newTotalWords = stats.totalWordsPracticed + session.wordsCompletedCount;
    const newLessonsCompleted = stats.totalLessonsCompleted + 1;
    const newCorrect = stats.correctAnswers + session.correctCount;
    const newIncorrect = stats.incorrectAnswers + session.incorrectCount;
    const newAccuracy = Math.round((newCorrect / (newCorrect + newIncorrect || 1)) * 100);
    const newTotalXP = stats.totalXP + session.xpEarned;

    // Update Profile XP
    if (profile) {
      this.saveProfile({
        ...profile,
        xp: (profile.xp || 0) + session.xpEarned,
        updatedAt: new Date().toISOString()
      });
    }

    const sessions = this.getSessions();
    const pronSessions = sessions.filter(s => s.mode === 'pronunciation');
    const spellSessions = sessions.filter(s => s.mode === 'spelling');

    const avgPron = pronSessions.length > 0
      ? Math.round(pronSessions.reduce((acc, s) => acc + s.accuracy, 0) / pronSessions.length)
      : stats.averagePronunciationScore;

    const avgSpell = spellSessions.length > 0
      ? Math.round(spellSessions.reduce((acc, s) => acc + s.accuracy, 0) / spellSessions.length)
      : stats.averageSpellingScore;

    const today = new Date().toISOString().split('T')[0];
    let newStreak = stats.currentStreak;

    if (stats.lastPracticeDate) {
      const lastDate = new Date(stats.lastPracticeDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1 && stats.lastPracticeDate !== today) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const longestStreak = Math.max(stats.longestStreak, newStreak);

    const weakWordsSet = new Set(stats.wordsToPractice);
    session.attempts.forEach(attempt => {
      if (!attempt.correct) {
        weakWordsSet.add(attempt.targetWord);
      } else {
        weakWordsSet.delete(attempt.targetWord);
      }
    });

    const updatedStats: UserStats = {
      ...stats,
      totalWordsPracticed: newTotalWords,
      totalLessonsCompleted: newLessonsCompleted,
      correctAnswers: newCorrect,
      incorrectAnswers: newIncorrect,
      averageAccuracy: newAccuracy,
      averagePronunciationScore: avgPron,
      averageSpellingScore: avgSpell,
      totalXP: newTotalXP,
      currentStreak: newStreak,
      longestStreak: longestStreak,
      lastPracticeDate: today,
      wordsToPractice: Array.from(weakWordsSet)
    };

    this.saveStats(updatedStats);
    this.checkAndUnlockAchievements(updatedStats, session);
  },

  checkAndUnlockAchievements(stats: UserStats, latestSession?: PracticeSession): Achievement[] {
    const achievements = this.getAchievements();
    let updated = false;
    const newUnlockedList: Achievement[] = [];

    achievements.forEach(ach => {
      if (ach.unlocked) return;

      let shouldUnlock = false;

      switch (ach.id) {
        case 'first-lesson':
          shouldUnlock = stats.totalLessonsCompleted >= 1;
          break;
        case 'streak-3':
          shouldUnlock = stats.currentStreak >= 3;
          break;
        case 'words-50':
          shouldUnlock = stats.totalWordsPracticed >= 50;
          break;
        case 'accuracy-90':
          shouldUnlock = stats.averageAccuracy >= 90 && stats.totalWordsPracticed >= 10;
          break;
        case 'vocab-builder':
          shouldUnlock = stats.totalWordsPracticed >= 100;
          break;
        case 'pronounce-star':
          if (latestSession && latestSession.mode === 'pronunciation' && latestSession.accuracy >= 85) {
            shouldUnlock = true;
          }
          break;
        case 'spelling-bee':
          if (latestSession && latestSession.mode === 'spelling' && latestSession.accuracy === 100) {
            shouldUnlock = true;
          }
          break;
      }

      if (shouldUnlock) {
        ach.unlocked = true;
        ach.unlockedAt = new Date().toISOString();
        updated = true;
        newUnlockedList.push(ach);
      }
    });

    if (updated) {
      this.saveAchievements(achievements);
    }

    return newUnlockedList;
  },

  resetAllData(): void {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.STATS);
    localStorage.removeItem(KEYS.ACHIEVEMENTS);
    localStorage.removeItem(KEYS.SETTINGS);
    localStorage.removeItem(KEYS.SESSIONS);
  }
};
