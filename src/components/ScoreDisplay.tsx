import React from 'react';
import { Star, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import type { PronunciationResult } from '../types';

interface ScoreDisplayProps {
  result: PronunciationResult;
  onNext: () => void;
  onRetry: () => void;
  isLastWord?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  result,
  onNext,
  onRetry,
  isLastWord = false
}) => {
  const { score, rating, stars, feedback, isMatch, targetWord, recognizedWord } = result;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 text-center animate-pop">
      
      <div className="mb-3 flex justify-center">
        {isMatch ? (
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 animate-bounce-gentle" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <XCircle className="w-10 h-10" />
          </div>
        )}
      </div>

      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
        {rating === 'Perfect' && '🎉 Perfect!'}
        {rating === 'Excellent' && '🎉 Excellent!'}
        {rating === 'Very Good' && '👍 Very Good!'}
        {rating === 'Keep Practicing' && '🔄 Keep Practicing'}
        {rating === 'Try Again' && '❌ Not Quite!'}
      </h3>

      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
        {feedback}
      </p>

      <div className="flex items-center justify-center gap-1.5 my-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-7 h-7 transition-all ${
              s <= stars 
                ? 'fill-amber-400 text-amber-400 scale-110' 
                : 'text-slate-200 dark:text-slate-700'
            }`}
          />
        ))}
      </div>

      <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 grid grid-cols-2 gap-3 text-left">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Word</span>
          <p className="text-base font-bold text-slate-900 dark:text-white uppercase">{targetWord}</p>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Answer</span>
          <p className={`text-base font-bold uppercase ${isMatch ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {recognizedWord || '(No speech detected)'}
          </p>
        </div>
        <div className="col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Match Score</span>
          <span className="text-lg font-black text-brand-600 dark:text-brand-400">{score}%</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onRetry}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center gap-2 transition-all btn-tactile text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          onClick={onNext}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all btn-tactile text-sm"
        >
          <span>{isLastWord ? 'Finish Lesson 🎉' : 'Next Word'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
