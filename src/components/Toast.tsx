import React, { useEffect } from 'react';
import { Trophy, X } from 'lucide-react';
import type { Achievement } from '../types';

interface ToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-16 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-4 shadow-2xl flex items-center justify-between animate-pop">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
          <Trophy className="w-6 h-6 animate-bounce-gentle" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-100">
            Achievement Unlocked!
          </span>
          <h4 className="font-extrabold text-sm leading-tight">{achievement.title}</h4>
          <p className="text-xs text-amber-50 leading-snug">{achievement.description}</p>
        </div>
      </div>
      <button 
        onClick={onClose}
        className="text-white/80 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
