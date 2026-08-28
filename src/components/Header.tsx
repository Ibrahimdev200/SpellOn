import React from 'react';
import { Flame, Sparkles, Volume2, VolumeX, Moon, Sun, Settings } from 'lucide-react';
import type { StudentProfile, UserStats, AppSettings } from '../types';
import { soundFX } from '../utils/soundFx';

interface HeaderProps {
  profile: StudentProfile | null;
  stats: UserStats;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onNavigate: (route: string) => void;
}

const AVATAR_EMOJIS: Record<string, string> = {
  lion: '🦁',
  owl: '🦉',
  rocket: '🚀',
  star: '⭐',
  bear: '🐻'
};

export const Header: React.FC<HeaderProps> = ({
  profile,
  stats,
  settings,
  onUpdateSettings,
  onNavigate
}) => {
  const avatarEmoji = profile ? AVATAR_EMOJIS[profile.avatarId || 'rocket'] || '🚀' : '🚀';

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Brand & App Title */}
        <div 
          onClick={() => {
            soundFX.playClick();
            onNavigate('/dashboard');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-black text-lg leading-none tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
              Lerafin<span className="text-brand-500">Speak</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              Learn. Speak. Improve.
            </p>
          </div>
        </div>

        {/* Right Action Badges */}
        <div className="flex items-center gap-2">
          
          {/* Streak Counter */}
          <div 
            title="Current Practice Streak"
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 font-black text-xs shadow-xs"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce-gentle" />
            <span>{stats.currentStreak}d</span>
          </div>

          {/* Student Profile Mascot Badge */}
          {profile && (
            <div 
              onClick={() => {
                soundFX.playClick();
                onNavigate('/profile');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 font-bold text-xs cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors"
            >
              <span>{avatarEmoji} {profile.name}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-brand-200 dark:bg-brand-800 text-[10px]">
                {profile.classLevel}
              </span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ soundEnabled: !settings.soundEnabled });
            }}
            title={settings.soundEnabled ? "Mute sound effects" : "Enable sound effects"}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-brand-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
            }}
            title="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
