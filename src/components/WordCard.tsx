import React, { useState } from 'react';
import { Volume2, Volume1, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import type { Word } from '../types';
import { speechService } from '../services/speechService';

interface WordCardProps {
  word: Word;
  hideWord?: boolean;
  showMeaning?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  hideWord = false,
  showMeaning = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSentence, setShowSentence] = useState(false);

  const handlePlayAudio = (rate: 'normal' | 'slow' = 'normal') => {
    setIsPlaying(true);
    speechService.speak(
      word.word,
      rate,
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all">
      
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-bold text-xs border border-brand-200/60 dark:border-brand-800/60 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          {word.category}
        </span>
        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium text-xs">
          {word.classLevel}
        </span>
      </div>

      <div className="text-center py-4">
        {hideWord ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-3 animate-pulse">
              <Volume2 className="w-10 h-10" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-bold text-base">
              Listen carefully and type what you hear
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-2">
              {word.word}
            </h2>
            {word.phonetic && (
              <div className="inline-block px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-sm font-semibold mb-3">
                /{word.phonetic}/
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 my-2">
        <button
          onClick={() => handlePlayAudio('normal')}
          disabled={isPlaying}
          className={`py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold shadow-md flex items-center gap-2 transition-all btn-tactile ${
            isPlaying ? 'opacity-70 scale-95' : ''
          }`}
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span>Listen</span>
        </button>

        <button
          onClick={() => handlePlayAudio('slow')}
          disabled={isPlaying}
          title="Pronounce slowly"
          className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 transition-all text-xs"
        >
          <Volume1 className="w-4 h-4 text-brand-500" />
          <span>Slow</span>
        </button>
      </div>

      {showMeaning && !hideWord && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium flex items-center justify-center sm:justify-start gap-1.5">
            <BookOpen className="w-4 h-4 text-brand-500 shrink-0" />
            <span>{word.meaning}</span>
          </p>

          <div>
            <button
              onClick={() => setShowSentence(!showSentence)}
              className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1 mx-auto sm:mx-0 mt-1"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showSentence ? 'Hide Example' : 'Show Example Sentence'}</span>
            </button>

            {showSentence && (
              <p className="mt-2 p-3 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 text-slate-700 dark:text-slate-200 text-xs italic font-medium border border-brand-100 dark:border-brand-900/40">
                "{word.exampleSentence}"
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
