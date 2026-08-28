import type { Word, StudentProfile, UserStats } from '../types';
import { INITIAL_WORDS } from '../data/wordsData';
import { storageService } from './storageService';

export const adaptiveEngine = {
  getLessonWords(profile: StudentProfile, stats: UserStats): Word[] {
    const classWords = INITIAL_WORDS.filter(w => w.classLevel === profile.classLevel);
    const availablePool = classWords.length >= 10 ? classWords : INITIAL_WORDS;

    const weakWordsList = stats.wordsToPractice || [];
    const selectedWords: Word[] = [];
    const selectedIds = new Set<string>();

    if (weakWordsList.length > 0) {
      for (const wordStr of weakWordsList) {
        const found = availablePool.find(w => w.word.toLowerCase() === wordStr.toLowerCase());
        if (found && !selectedIds.has(found.id)) {
          selectedWords.push(found);
          selectedIds.add(found.id);
          if (selectedWords.length >= 2) break;
        }
      }
    }

    const filteredPool = availablePool.filter(w => !selectedIds.has(w.id));
    
    filteredPool.sort((a, b) => {
      const diffA = Math.abs(a.difficulty - profile.currentDifficulty);
      const diffB = Math.abs(b.difficulty - profile.currentDifficulty);
      return diffA - diffB;
    });

    const shuffled = [...filteredPool].sort(() => 0.5 - Math.random());

    for (const word of shuffled) {
      if (selectedWords.length >= 10) break;
      selectedWords.push(word);
      selectedIds.add(word.id);
    }

    if (selectedWords.length < 10) {
      const fallbackShuffled = [...INITIAL_WORDS].sort(() => 0.5 - Math.random());
      for (const word of fallbackShuffled) {
        if (selectedWords.length >= 10) break;
        if (!selectedIds.has(word.id)) {
          selectedWords.push(word);
          selectedIds.add(word.id);
        }
      }
    }

    return selectedWords.slice(0, 10);
  },

  updateAdaptiveDifficulty(profile: StudentProfile, lessonScore: number): StudentProfile {
    let newDifficulty = profile.currentDifficulty;

    if (lessonScore >= 90) {
      newDifficulty = Math.min(3, profile.currentDifficulty + 1);
    } else if (lessonScore < 60) {
      newDifficulty = Math.max(1, profile.currentDifficulty - 1);
    }

    if (newDifficulty !== profile.currentDifficulty) {
      const updatedProfile: StudentProfile = {
        ...profile,
        currentDifficulty: newDifficulty,
        updatedAt: new Date().toISOString()
      };
      storageService.saveProfile(updatedProfile);
      return updatedProfile;
    }

    return profile;
  }
};
