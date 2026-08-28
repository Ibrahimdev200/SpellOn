import React from 'react';
import { 
  Mic, 
  Keyboard, 
  BookOpen, 
  Flame, 
  Star, 
  Sparkles, 
  ArrowRight, 
  Zap
} from 'lucide-react';
import type { StudentProfile, UserStats } from '../types';
import { soundFX } from '../utils/soundFx';
import { ProgressRing } from '../components/ProgressRing';

interface DashboardProps {
  profile: StudentProfile;
  stats: UserStats;
  onStartPractice: (mode: 'pronunciation' | 'spelling' | 'vocabulary') => void;
  onNavigate: (route: string) => void;
  onEditProfile: () => void;
}

const MOTIVATIONAL_MESSAGES = [
  "You're doing great! Ready to practice?",
  "You're almost at today's goal!",
  "Your pronunciation is improving!",
  "Keep your streak alive!",
  "One more word to level up!"
];

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  stats,
  onStartPractice
}) => {
  const todayWordsCount = Math.min(10, stats.totalWordsPracticed % 10 || (stats.totalWordsPracticed > 0 ? 10 : 0));
  const todayGoalTarget = 10;
  const motivationalMessage = MOTIVATIONAL_MESSAGES[stats.totalWordsPracticed % MOTIVATIONAL_MESSAGES.length];

  return (
    <div className="space-y-6 pb-24 animate-pop max-w-5xl mx-auto">
      
      {/* Sleek Hero Greeting Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10 border border-white/10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            
            {/* Student Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/20 shrink-0">
              <span>👦</span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold mb-1 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.classLevel} Student</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Good morning, {profile.name} 👋
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm font-medium mt-0.5">
                "Ready to learn something new today?"
              </p>
            </div>

          </div>

          {/* Player XP & Streak Counters */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 self-start sm:self-auto">
            <div className="text-center px-3">
              <span className="text-[10px] font-bold uppercase text-indigo-200 block">Streak</span>
              <span className="text-xl font-black text-amber-300 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                {stats.currentStreak}d
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <div className="text-center px-3">
              <span className="text-[10px] font-bold uppercase text-indigo-200 block">Player XP</span>
              <span className="text-xl font-black text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-300" />
                {profile.xp || 320}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* TODAY'S PROGRESS - Circular Ring Indicator + Hero CTA */}
      <div className="modern-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing current={todayWordsCount} total={todayGoalTarget} size={120} strokeWidth={10} />

          <div className="text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
              Today's Goal
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              {todayWordsCount >= 10 ? '🎉 Daily Goal Complete!' : `${10 - todayWordsCount} words left to reach goal`}
            </h3>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>{motivationalMessage}</span>
            </p>
          </div>
        </div>

        {/* Hero CTA: CONTINUE LEARNING */}
        <button
          onClick={() => {
            soundFX.playClick();
            onStartPractice('pronunciation');
          }}
          className="btn-modern btn-modern-primary py-3.5 px-7 rounded-2xl text-sm flex items-center justify-center gap-2.5 shrink-0"
        >
          <span>CONTINUE LEARNING</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* CHOOSE YOUR PRACTICE SECTION */}
      <div>
        <h3 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight mb-4 flex items-center gap-2">
          <span>CHOOSE YOUR PRACTICE</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 🎤 PRONUNCIATION */}
          <div className="modern-card modern-card-hover p-6 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 mb-4 group-hover:scale-105 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                PRONUNCIATION
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                Listen, speak and improve your English pronunciation with real-time feedback.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartPractice('pronunciation');
                }}
                className="btn-modern btn-modern-purple w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <span>Start Practice →</span>
              </button>
            </div>
          </div>

          {/* ⌨️ SPELLING */}
          <div className="modern-card modern-card-hover p-6 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4 group-hover:scale-105 transition-transform">
                <Keyboard className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                SPELLING
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                Listen to spoken words and type what you hear to master spelling rules.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartPractice('spelling');
                }}
                className="btn-modern btn-modern-primary w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <span>Start Practice →</span>
              </button>
            </div>
          </div>

          {/* 📚 VOCABULARY */}
          <div className="modern-card modern-card-hover p-6 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                VOCABULARY
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                Discover new words, definitions, phonetics, and example sentences.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartPractice('vocabulary');
                }}
                className="btn-modern btn-modern-green w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <span>Explore →</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
