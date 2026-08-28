import React, { useState } from 'react';
import { Volume2, Volume1, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import type { Word } from '../types';
import { speechService } from '../services/speechService';
import { soundFX } from '../utils/soundFx';

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
    soundFX.playClick();
    setIsPlaying(true);
    speechService.speak(
      word.word,
      rate,
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-xl border-4 border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all">
      
      {/* Category Tag Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-black text-xs border border-brand-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-brand-500" />
          {word.category}
        </span>
        <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs border border-slate-200 dark:border-slate-700">
          {word.classLevel}
        </span>
      </div>

      {/* Target Word Display */}
      <div className="text-center py-4">
        {hideWord ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-brand-100 dark:bg-brand-950/80 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-3 shadow-inner">
              {isPlaying ? (
                <div className="flex items-center gap-1.5 h-10">
                  <div className="visualizer-wave" />
                  <div className="visualizer-wave" />
                  <div className="visualizer-wave" />
                  <div className="visualizer-wave" />
                  <div className="visualizer-wave" />
                </div>
              ) : (
                <Volume2 className="w-12 h-12" />
              )}
            </div>
            <p className="text-slate-700 dark:text-slate-200 font-black text-lg">
              Listen carefully and type what you hear
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-2">
              {word.word}
            </h2>
            {word.phonetic && (
              <div className="inline-block px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-base font-bold border border-slate-200 dark:border-slate-700 mb-3">
                /{word.phonetic}/
              </div>
            )}
          </div>
        )}
      </div>

      {/* Audio Play Buttons */}
      <div className="flex items-center justify-center gap-3 my-2">
        <button
          onClick={() => handlePlayAudio('normal')}
          disabled={isPlaying}
          className={`btn-game btn-game-purple py-3.5 px-7 rounded-2xl text-sm flex items-center gap-2 ${
            isPlaying ? 'opacity-70 scale-95' : ''
          }`}
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span>Listen Word</span>
        </button>

        <button
          onClick={() => handlePlayAudio('slow')}
          disabled={isPlaying}
          title="Pronounce slowly"
          className="btn-game py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-black text-xs flex items-center gap-1.5"
        >
          <Volume1 className="w-4 h-4 text-brand-500" />
          <span>Slow</span>
        </button>
      </div>

      {/* Meaning & Example Sentence Drawer */}
      {showMeaning && !hideWord && (
        <div className="mt-6 pt-4 border-t-2 border-slate-100 dark:border-slate-800 space-y-2 text-center sm:text-left">
          <p className="text-sm text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center sm:justify-start gap-2">
            <BookOpen className="w-4 h-4 text-brand-500 shrink-0" />
            <span>{word.meaning}</span>
          </p>

          <div>
            <button
              onClick={() => {
                soundFX.playClick();
                setShowSentence(!showSentence);
              }}
              className="text-xs text-brand-600 dark:text-brand-400 font-black hover:underline flex items-center gap-1 mx-auto sm:mx-0 mt-1"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showSentence ? 'Hide Example' : 'Show Example Sentence'}</span>
            </button>

            {showSentence && (
              <p className="mt-2 p-3.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-slate-800 dark:text-slate-200 text-xs italic font-bold border-2 border-brand-200 dark:border-brand-900/60">
                "{word.exampleSentence}"
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
