import React from 'react';
import { 
  Trophy, 
  Flame, 
  BarChart3, 
  CheckCircle2, 
  Mic, 
  Keyboard, 
  Lock, 
  Award,
  AlertCircle,
  Clock
} from 'lucide-react';
import type { StudentProfile, UserStats, Achievement, PracticeSession } from '../types';

interface ProgressPageProps {
  profile: StudentProfile;
  stats: UserStats;
  achievements: Achievement[];
  sessions: PracticeSession[];
  onStartPractice: (mode: 'pronunciation' | 'spelling') => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  stats,
  achievements,
  sessions,
  onStartPractice
}) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6 pb-24 animate-pop">
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Learning Progress & Stats
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your vocabulary growth, streaks, and unlocked badges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Words</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{stats.totalWordsPracticed}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-center">
            <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 block">Streak</span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-300 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              {stats.currentStreak}d
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-center">
            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">Accuracy</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-300">{stats.averageAccuracy}%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-center">
            <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 block">Badges</span>
            <span className="text-xl font-black text-purple-600 dark:text-purple-300">{unlockedCount} / {achievements.length}</span>
          </div>
        </div>
      </div>

      {stats.wordsToPractice.length > 0 && (
        <div className="bg-amber-50/70 dark:bg-amber-950/40 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Words Needing Practice ({stats.wordsToPractice.length})
              </h3>
            </div>
            <button
              onClick={() => onStartPractice('pronunciation')}
              className="py-1.5 px-3 rounded-xl bg-amber-600 text-white font-extrabold text-xs shadow-xs hover:bg-amber-700 transition-colors"
            >
              Practice Now
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {stats.wordsToPractice.map((w, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-200 font-extrabold text-xs border border-amber-200 dark:border-amber-700/60 uppercase shadow-2xs"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Achievements ({unlockedCount}/{achievements.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                ach.unlocked
                  ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/40 opacity-70'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${
                ach.unlocked ? 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-md' : 'bg-slate-300 dark:bg-slate-700'
              }`}>
                {ach.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  {ach.title}
                  {ach.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Clock className="w-5 h-5 text-indigo-500" />
          <span>Recent Practice Sessions</span>
        </h3>

        {sessions.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs font-semibold">
            No practice sessions recorded yet. Start a lesson to see your history!
          </div>
        ) : (
          <div className="space-y-2.5">
            {sessions.slice(0, 5).map((sess) => (
              <div
                key={sess.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl text-white ${sess.mode === 'pronunciation' ? 'bg-brand-600' : 'bg-indigo-600'}`}>
                    {sess.mode === 'pronunciation' ? <Mic className="w-4 h-4" /> : <Keyboard className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white capitalize block">
                      {sess.mode} Practice
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {new Date(sess.createdAt).toLocaleDateString()} • {sess.wordsCompletedCount} Words
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-brand-600 dark:text-brand-400 text-sm block">
                    {sess.accuracy}%
                  </span>
                  <span className="text-[10px] text-slate-400">Accuracy</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
