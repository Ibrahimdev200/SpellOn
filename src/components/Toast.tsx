import React, { useEffect } from 'react';
import { Award, Sparkles, X } from 'lucide-react';
import type { Achievement } from '../types';

interface ToastProps {
  achievement?: Achievement | null;
  message?: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ achievement, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement && !message) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-pop">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 text-white rounded-3xl p-4 shadow-2xl border-2 border-indigo-400/40 flex items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl shrink-0 shadow-md">
            {achievement ? <span>{achievement.icon}</span> : <Sparkles className="w-6 h-6 text-slate-900" />}
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Award className="w-3 h-3" />
              {achievement ? 'Achievement Unlocked!' : 'SPELLON Notification'}
            </span>
            <h4 className="font-black text-sm text-white leading-tight">
              {achievement ? achievement.title : message}
            </h4>
            {achievement && (
              <p className="text-xs text-indigo-200 font-medium line-clamp-1 mt-0.5">
                {achievement.description}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
