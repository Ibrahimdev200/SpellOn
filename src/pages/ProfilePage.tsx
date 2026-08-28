import React from 'react';
import { 
  Flame, 
  Star, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  RotateCcw,
  Edit3,
  History
} from 'lucide-react';
import type { StudentProfile, UserStats } from '../types';
import { soundFX } from '../utils/soundFx';

interface ProfilePageProps {
  profile: StudentProfile;
  stats: UserStats;
  onEditProfile: () => void;
  onNavigate: (route: string) => void;
  onResetData: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  stats,
  onEditProfile,
  onNavigate,
  onResetData
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-pop">
      
      {/* Profile Header Card */}
      <div className="game-panel p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        
        <div className="w-24 h-24 rounded-4xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white mx-auto flex items-center justify-center text-5xl shadow-xl border-4 border-white/20 mb-4 animate-float-slow">
          <span>👦</span>
        </div>

        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {profile.name}
        </h2>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs border border-indigo-200">
            {profile.classLevel} Student
          </span>
          <span className="px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black text-xs border border-purple-200">
            Level {profile.currentDifficulty}
          </span>
        </div>

      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="game-panel p-5 text-center">
          <BookOpen className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalWordsPracticed || 120}
          </span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Words</span>
        </div>

        <div className="game-panel p-5 text-center">
          <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.averageAccuracy || 82}%
          </span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Accuracy</span>
        </div>

        <div className="game-panel p-5 text-center">
          <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1 fill-orange-500" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.currentStreak || 7}
          </span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Day Streak</span>
        </div>

        <div className="game-panel p-5 text-center">
          <Star className="w-6 h-6 text-amber-400 mx-auto mb-1 fill-amber-400" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {profile.xp || 1240}
          </span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">XP</span>
        </div>

      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <button
          onClick={() => {
            soundFX.playClick();
            onEditProfile();
          }}
          className="btn-game btn-game-indigo p-5 rounded-3xl text-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5" />
            <span>Edit Profile</span>
          </div>
          <span>→</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onNavigate('/progress');
          }}
          className="btn-game btn-game-purple p-5 rounded-3xl text-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5" />
            <span>Achievements</span>
          </div>
          <span>→</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onNavigate('/progress');
          }}
          className="btn-game btn-game-green p-5 rounded-3xl text-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <History className="w-5 h-5" />
            <span>Learning History</span>
          </div>
          <span>→</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onNavigate('/settings');
          }}
          className="btn-game btn-game-amber p-5 rounded-3xl text-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>
          <span>→</span>
        </button>

      </div>

      {/* Danger Zone: Reset Data */}
      <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 flex justify-center">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all profile data and start fresh?")) {
              soundFX.playError();
              onResetData();
            }
          }}
          className="text-xs font-black text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Profile Data</span>
        </button>
      </div>

    </div>
  );
};
