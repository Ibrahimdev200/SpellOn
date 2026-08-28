import React, { useEffect } from 'react';
import { Star, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import type { PronunciationResult } from '../types';
import { soundFX } from '../utils/soundFx';

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

  useEffect(() => {
    if (isMatch) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }
  }, [isMatch]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 text-center animate-pop">
      
      <div className="mb-3 flex justify-center">
        {isMatch ? (
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 border-4 border-emerald-300">
            <CheckCircle2 className="w-12 h-12 animate-bounce-gentle" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 border-4 border-amber-300">
            <XCircle className="w-12 h-12" />
          </div>
        )}
      </div>

      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
        {rating === 'Perfect' && '🎉 PERFECT!'}
        {rating === 'Excellent' && '🎉 EXCELLENT!'}
        {rating === 'Very Good' && '👍 VERY GOOD!'}
        {rating === 'Keep Practicing' && '🔄 KEEP PRACTICING!'}
        {rating === 'Try Again' && '❌ NOT QUITE!'}
      </h3>

      <p className="text-base font-bold text-slate-600 dark:text-slate-300 mt-1">
        {feedback}
      </p>

      <div className="flex items-center justify-center gap-2 my-5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-9 h-9 transition-all ${
              s <= stars 
                ? 'fill-amber-400 text-amber-400 star-pop' 
                : 'text-slate-200 dark:text-slate-700'
            }`}
            style={{ animationDelay: `${s * 0.1}s` }}
          />
        ))}
      </div>

      <div className="my-5 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3 text-left">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Target Word</span>
          <p className="text-lg font-black text-slate-900 dark:text-white uppercase">{targetWord}</p>
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Your Answer</span>
          <p className={`text-lg font-black uppercase ${isMatch ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {recognizedWord || '(No speech)'}
          </p>
        </div>
        <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs font-black text-slate-500 dark:text-slate-400">Match Accuracy</span>
          <span className="text-xl font-black text-brand-600 dark:text-brand-400">{score}%</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => {
            soundFX.playClick();
            onRetry();
          }}
          className="btn-game py-3.5 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm flex items-center justify-center gap-2 flex-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onNext();
          }}
          className="btn-game btn-game-green py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 flex-1"
        >
          <span>{isLastWord ? 'Finish Lesson 🎉' : 'Next Word'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
