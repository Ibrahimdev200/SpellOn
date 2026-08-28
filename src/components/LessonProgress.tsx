import React from 'react';
import { Mic, Keyboard, X } from 'lucide-react';
import type { PracticeMode } from '../types';

interface LessonProgressProps {
  currentStep: number;
  totalSteps: number;
  mode: PracticeMode;
  onExit: () => void;
}

export const LessonProgress: React.FC<LessonProgressProps> = ({
  currentStep,
  totalSteps,
  mode,
  onExit
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-extrabold flex items-center gap-1">
            {mode === 'pronunciation' ? (
              <>
                <Mic className="w-3.5 h-3.5 text-brand-500" />
                <span>Pronunciation</span>
              </>
            ) : (
              <>
                <Keyboard className="w-3.5 h-3.5 text-indigo-500" />
                <span>Spelling</span>
              </>
            )}
          </span>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Word {currentStep} of {totalSteps}
          </span>
        </div>

        <button
          onClick={onExit}
          title="Exit lesson"
          className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
        <div 
          className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
