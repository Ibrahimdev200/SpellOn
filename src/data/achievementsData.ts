import type { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Lesson',
    description: 'Complete your very first lesson session.',
    icon: 'Trophy',
    category: 'lesson',
    requiredValue: 1,
    unlocked: false
  },
  {
    id: 'streak-3',
    title: '3 Day Streak',
    description: 'Practice for 3 consecutive days.',
    icon: 'Flame',
    category: 'streak',
    requiredValue: 3,
    unlocked: false
  },
  {
    id: 'words-50',
    title: '50 Words Mastered',
    description: 'Practice and complete 50 words.',
    icon: 'Star',
    category: 'vocabulary',
    requiredValue: 50,
    unlocked: false
  },
  {
    id: 'accuracy-90',
    title: 'Precision Master',
    description: 'Achieve an average accuracy score of 90% or higher.',
    icon: 'Target',
    category: 'accuracy',
    requiredValue: 90,
    unlocked: false
  },
  {
    id: 'vocab-builder',
    title: 'Vocabulary Builder',
    description: 'Practice 100 words across pronunciation & spelling.',
    icon: 'BookOpen',
    category: 'vocabulary',
    requiredValue: 100,
    unlocked: false
  },
  {
    id: 'pronounce-star',
    title: 'Pronunciation Star',
    description: 'Score over 85% in a pronunciation lesson.',
    icon: 'Mic',
    category: 'lesson',
    requiredValue: 85,
    unlocked: false
  },
  {
    id: 'spelling-bee',
    title: 'Spelling Champion',
    description: 'Get a perfect 100% score on a spelling lesson.',
    icon: 'Award',
    category: 'accuracy',
    requiredValue: 100,
    unlocked: false
  }
];
