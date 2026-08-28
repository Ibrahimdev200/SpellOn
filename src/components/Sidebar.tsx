import React from 'react';
import { Home, Target, BarChart3, User, Settings, Sparkles, Flame, Star, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import type { StudentProfile, UserStats, AppSettings } from '../types';
import { soundFX } from '../utils/soundFx';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  profile: StudentProfile | null;
  stats: UserStats;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  profile,
  stats,
  settings,
  onUpdateSettings
}) => {
  const navItems = [
    { id: '/dashboard', label: 'Home', icon: Home },
    { id: '/practice', label: 'Practice Hub', icon: Target },
    { id: '/progress', label: 'My Progress', icon: BarChart3 },
    { id: '/profile', label: 'Profile', icon: User },
    { id: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-6 z-30 shrink-0">
      
      <div>
        {/* Brand Header */}
        <div 
          onClick={() => {
            soundFX.playClick();
            onNavigate('/dashboard');
          }}
          className="flex items-center gap-3 cursor-pointer group mb-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-widest uppercase text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              SPELLON
            </h1>
            <p className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              Learn. Speak. Improve.
            </p>
          </div>
        </div>

        {/* Player Mini Status Pill */}
        {profile && (
          <div className="mb-6 p-3.5 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👦</span>
              <div>
                <span className="font-black text-slate-900 dark:text-white text-xs block leading-tight">
                  {profile.name}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {profile.classLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-400/20 text-amber-500 font-black text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{profile.xp || 320} XP</span>
            </div>
          </div>
        )}

        {/* Navigation Menu Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id === '/practice' && (currentRoute === '/pronunciation' || currentRoute === '/spelling'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  onNavigate(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Audio / Dark Mode Quick Toggles */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ soundEnabled: !settings.soundEnabled });
            }}
            title="Toggle Sound"
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
            }}
            title="Toggle Dark Mode"
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {settings.theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-1 font-black text-xs text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800">
          <Flame className="w-4 h-4 fill-amber-500" />
          <span>{stats.currentStreak}d</span>
        </div>
      </div>

    </aside>
  );
};
