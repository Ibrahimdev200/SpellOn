import React from 'react';
import { Flame, Sparkles, Volume2, VolumeX, Moon, Sun, Settings, Star } from 'lucide-react';
import type { StudentProfile, UserStats, AppSettings } from '../types';
import { soundFX } from '../utils/soundFx';

interface HeaderProps {
  profile: StudentProfile | null;
  stats: UserStats;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  stats,
  settings,
  onUpdateSettings,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 transition-all lg:hidden">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            soundFX.playClick();
            onNavigate('/dashboard');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-extrabold text-base leading-none tracking-wider uppercase text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              SPELLON
            </h1>
            <p className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Learn. Speak. Improve.
            </p>
          </div>
        </div>

        {/* Action Badges */}
        <div className="flex items-center gap-2">
          
          {/* XP Badge */}
          {profile && (
            <div 
              title="Player XP"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/15 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-300/30"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{profile.xp || 320} XP</span>
            </div>
          )}

          {/* Streak Counter */}
          <div 
            title="Current Practice Streak"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200/60 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 font-bold text-xs"
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-bounce-gentle" />
            <span>{stats.currentStreak}d</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ soundEnabled: !settings.soundEnabled });
            }}
            title={settings.soundEnabled ? "Mute sound effects" : "Enable sound effects"}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
            }}
            title="Toggle theme"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {settings.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onNavigate('/settings');
            }}
            title="Settings"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
