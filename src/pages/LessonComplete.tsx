import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Flame, 
  Target, 
  RotateCcw, 
  ArrowRight, 
  Home, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';
import type { StudentProfile, UserStats, PracticeSession } from '../types';
import { soundFX } from '../utils/soundFx';

interface LessonCompleteProps {
  profile: StudentProfile;
  stats: UserStats;
  session: PracticeSession;
  onPracticeAgain: () => void;
  onNextLesson: () => void;
  onBackToDashboard: () => void;
}

export const LessonComplete: React.FC<LessonCompleteProps> = ({
  profile,
  stats,
  session,
  onPracticeAgain,
  onNextLesson,
  onBackToDashboard
}) => {
  useEffect(() => {
    soundFX.playVictory();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 }
      });
    } catch {
      // Fallback
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24 animate-pop">
      
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-glow relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-4 border border-white/30 shadow-inner">
          <Trophy className="w-10 h-10 text-amber-300 animate-bounce-gentle" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
          🎉 Lesson Complete!
        </h2>
        <p className="text-brand-100 font-bold text-base mt-1">
          Great job, {profile.name}!
        </p>

        <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-extrabold text-xs border border-white/20">
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Current Streak: {stats.currentStreak} days</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-500" />
          <span>Your Results</span>
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Words Completed</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{session.wordsCompletedCount}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Overall Accuracy</span>
            <p className="text-2xl font-black text-brand-600 dark:text-brand-400">{session.accuracy}%</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Correct
            </span>
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{session.correctCount}</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40">
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              Needs Practice
            </span>
            <p className="text-2xl font-black text-rose-700 dark:text-rose-300">{session.incorrectCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-800/60 flex items-center justify-between">
          <span className="text-xs font-bold text-brand-700 dark:text-brand-300 capitalize">
            {session.mode} Score Average
          </span>
          <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
            {session.mode === 'pronunciation' ? session.pronunciationScore : session.spellingScore}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => {
            soundFX.playClick();
            onNextLesson();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 text-base transition-all btn-tactile"
        >
          <span>Next Lesson</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onPracticeAgain();
            }}
            className="py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center gap-2 transition-colors text-sm shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Again</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onBackToDashboard();
            }}
            className="py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center gap-2 transition-colors text-sm shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

    </div>
  );
};
