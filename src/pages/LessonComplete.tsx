import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Flame, 
  Target, 
  RotateCcw, 
  ArrowRight, 
  Home, 
  Star, 
  Mic, 
  Keyboard
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
        particleCount: 140,
        spread: 90,
        origin: { y: 0.55 }
      });
    } catch {
      // Fallback
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24 animate-pop">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-4xl p-8 text-white text-center shadow-2xl relative overflow-hidden border-4 border-white/20">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-4 border-2 border-white/30 shadow-inner animate-float-slow">
          <Trophy className="w-10 h-10 text-amber-300 animate-bounce-gentle" />
        </div>

        <div className="text-4xl mb-1">🎉</div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
          LESSON COMPLETE!
        </h2>
        <p className="text-indigo-100 font-bold text-base mt-1">
          "You did an amazing job, {profile.name}!"
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-black text-xs border border-white/20">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>🔥 {stats.currentStreak} DAY STREAK</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 font-black text-xs border border-amber-300/30">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>⭐ +{session.xpEarned || 120} XP</span>
          </div>
        </div>
      </div>

      {/* Results Breakdown Grid */}
      <div className="game-panel p-6 shadow-xl space-y-4">
        <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2 uppercase tracking-wide">
          <Target className="w-5 h-5 text-indigo-500" />
          <span>LESSON SUMMARY</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">WORDS</span>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{session.wordsCompletedCount}</p>
          </div>

          <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 block tracking-wider">CORRECT</span>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{session.correctCount}</p>
          </div>

          <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 block tracking-wider">ACCURACY</span>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{session.accuracy}%</p>
          </div>

        </div>

        {/* Pronunciation & Spelling Scores */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-3xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">PRONUNCIATION</span>
            </div>
            <span className="text-xl font-black text-purple-600 dark:text-purple-400">{session.pronunciationScore || session.accuracy}%</span>
          </div>

          <div className="p-4 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">SPELLING</span>
            </div>
            <span className="text-xl font-black text-blue-600 dark:text-blue-400">{session.spellingScore || session.accuracy}%</span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => {
            soundFX.playClick();
            onNextLesson();
          }}
          className="btn-game btn-game-indigo w-full py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg"
        >
          <span>CONTINUE →</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onPracticeAgain();
            }}
            className="btn-game py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PRACTICE AGAIN</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onBackToDashboard();
            }}
            className="btn-game py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>DASHBOARD</span>
          </button>
        </div>
      </div>

    </div>
  );
};
