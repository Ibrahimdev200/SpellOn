import React, { useState } from 'react';
import { GraduationCap, Calendar, Flame, Edit, ShieldAlert, RotateCcw } from 'lucide-react';
import type { StudentProfile, UserStats } from '../types';

interface ProfilePageProps {
  profile: StudentProfile;
  stats: UserStats;
  onEditProfile: () => void;
  onResetProgress: () => void;
  onResetProfile: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  stats,
  onEditProfile,
  onResetProgress,
  onResetProfile
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetType, setResetType] = useState<'progress' | 'profile'>('progress');

  const handleConfirmReset = () => {
    if (resetType === 'progress') {
      onResetProgress();
    } else {
      onResetProfile();
    }
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24 animate-pop">
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
        
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-3xl mx-auto flex items-center justify-center shadow-lg shadow-brand-500/25 mb-4 border-4 border-white dark:border-slate-800">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {profile.name}
        </h2>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-xs border border-brand-200/60 dark:border-brand-800/60 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            {profile.classLevel}
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {profile.age} years old
          </span>
        </div>

        <button
          onClick={onEditProfile}
          className="mt-5 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>

      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
          Learner Statistics
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <span className="font-bold text-slate-400 uppercase block">Current Difficulty</span>
            <span className="text-base font-black text-brand-600 dark:text-brand-400">
              Level {profile.currentDifficulty}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <span className="font-bold text-slate-400 uppercase block">Total Words</span>
            <span className="text-base font-black text-slate-900 dark:text-white">
              {stats.totalWordsPracticed}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <span className="font-bold text-slate-400 uppercase block">Average Score</span>
            <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
              {stats.averageAccuracy}%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <span className="font-bold text-slate-400 uppercase block">Longest Streak</span>
            <span className="text-base font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              {stats.longestStreak} days
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-3">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
          Manage Profile & Data
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => {
              setResetType('progress');
              setShowResetConfirm(true);
            }}
            className="w-full py-3 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center justify-between transition-colors"
          >
            <span>Reset Learning Progress Only</span>
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setResetType('profile');
              setShowResetConfirm(true);
            }}
            className="w-full py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-200 font-bold text-xs flex items-center justify-between transition-colors"
          >
            <span>Reset Everything (Full Profile & Data)</span>
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Are you sure?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {resetType === 'progress' 
                ? 'This will clear your words practiced, scores, and streak history.' 
                : 'This will delete your profile and reset the entire app.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
