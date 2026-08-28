import React from 'react';
import { Home, Target, BarChart3, User } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

interface BottomNavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentRoute,
  onNavigate
}) => {
  const navItems = [
    { id: '/dashboard', label: 'Home', icon: Home },
    { id: '/practice', label: 'Practice', icon: Target },
    { id: '/progress', label: 'Progress', icon: BarChart3 },
    { id: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-slate-200/80 dark:border-slate-800/80 px-3 py-2 sm:py-2.5 shadow-lg lg:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
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
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400 font-black scale-105' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-100 dark:bg-indigo-950/80' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
