import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, Lightbulb, RotateCcw, ArrowRight, Star } from 'lucide-react';
import type { Word, WordAttempt, PronunciationResult, StudentProfile, UserStats } from '../types';
import { speechService } from '../services/speechService';
import { adaptiveEngine } from '../services/adaptiveEngine';
import { soundFX } from '../utils/soundFx';
import { LessonProgress } from '../components/LessonProgress';

interface SpellingModeProps {
  profile: StudentProfile;
  stats: UserStats;
  onCompleteLesson: (attempts: WordAttempt[]) => void;
  onExit: () => void;
}

export const SpellingMode: React.FC<SpellingModeProps> = ({
  profile,
  stats,
  onCompleteLesson,
  onExit
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [attempts, setAttempts] = useState<WordAttempt[]>([]);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentResult, setCurrentResult] = useState<PronunciationResult | null>(null);

  useEffect(() => {
    const lessonWords = adaptiveEngine.getLessonWords(profile, stats);
    setWords(lessonWords);
  }, [profile, stats]);

  useEffect(() => {
    if (words.length > 0 && !currentResult) {
      speechService.speak(words[currentIndex].word);
    }
  }, [words, currentIndex, currentResult]);

  if (words.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl shadow-card">
        <p className="text-slate-600 dark:text-slate-300 font-bold">Loading spelling lesson words...</p>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  const handlePlayWord = (rate: 'normal' | 'slow' = 'normal') => {
    soundFX.playClick();
    speechService.speak(currentWord.word, rate);
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!typedAnswer.trim()) return;

    const normalizedTarget = currentWord.word.toLowerCase().trim();
    const normalizedInput = typedAnswer.toLowerCase().trim();
    const isExactMatch = normalizedTarget === normalizedInput;

    if (isExactMatch) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }

    const newAttemptsCount = attemptsCount + 1;
    setAttemptsCount(newAttemptsCount);

    const score = isExactMatch ? 100 : Math.max(0, 100 - (newAttemptsCount * 25));
    const xpEarned = isExactMatch ? 10 : 2;

    const result: PronunciationResult = {
      score,
      rating: isExactMatch ? 'Perfect' : (score >= 75 ? 'Very Good' : 'Try Again'),
      stars: isExactMatch ? 5 : (score >= 75 ? 4 : 2),
      feedback: isExactMatch ? '🎉 CORRECT! Excellent spelling!' : '❌ Not quite! Listen again and try one more time.',
      isMatch: isExactMatch,
      targetWord: currentWord.word,
      recognizedWord: typedAnswer.trim(),
      xpEarned
    };

    setCurrentResult(result);

    const attempt: WordAttempt = {
      id: `att_${Date.now()}`,
      wordId: currentWord.id,
      wordString: currentWord.word,
      mode: 'spelling',
      score,
      targetWord: currentWord.word,
      userInput: typedAnswer.trim(),
      correct: isExactMatch,
      attemptsCount: newAttemptsCount,
      xpEarned,
      createdAt: new Date().toISOString()
    };

    setAttempts(prev => [...prev, attempt]);
  };

  const handleNextWord = () => {
    soundFX.playClick();
    setCurrentResult(null);
    setTypedAnswer('');
    setAttemptsCount(0);
    setShowHint(false);

    if (currentIndex + 1 < words.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      soundFX.playVictory();
      onCompleteLesson(attempts);
    }
  };

  const handleRetry = () => {
    soundFX.playClick();
    setCurrentResult(null);
    setShowHint(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 pb-24 animate-pop">
      
      {/* Lesson Progress Bar */}
      <LessonProgress
        currentStep={currentIndex + 1}
        totalSteps={words.length}
        mode="spelling"
        onExit={() => {
          soundFX.playClick();
          onExit();
        }}
      />

      {/* Main Instruction Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 text-center space-y-5">
        
        <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs uppercase tracking-wider">
          Spelling Exercise
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          "Listen to the word and type what you hear."
        </h2>

        {/* Large PLAY WORD Button */}
        <div className="py-2 flex flex-col items-center justify-center">
          <button
            onClick={() => handlePlayWord('normal')}
            className="btn-game btn-game-indigo py-4 px-8 rounded-3xl text-base flex items-center gap-3 shadow-lg"
          >
            <Volume2 className="w-6 h-6" />
            <span>PLAY WORD</span>
          </button>
        </div>

        {/* Feedback vs Typing Input Form */}
        {currentResult ? (
          <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 animate-pop space-y-4">
            
            {currentResult.isMatch ? (
              <div>
                <div className="text-4xl mb-1">🎉</div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  CORRECT!
                </h3>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  "Excellent spelling!"
                </p>

                <div className="my-3">
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    {currentWord.word}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-black text-sm mb-5 border border-amber-300">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>+10 XP Earned!</span>
                </div>

                <button
                  onClick={handleNextWord}
                  className="btn-game btn-game-green w-full py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2"
                >
                  <span>NEXT WORD →</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Not quite!
                </h3>
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  "Listen again and try one more time."
                </p>

                {attemptsCount >= 2 && (
                  <div className="my-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 text-xs font-bold border border-amber-200">
                    <span className="font-black">Hint:</span> The word starts with <span className="font-mono text-base font-black text-indigo-600 dark:text-indigo-400 uppercase">{currentWord.word[0]}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handlePlayWord('normal')}
                    className="btn-game py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs flex-1 flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-500" />
                    <span>PLAY AGAIN</span>
                  </button>

                  <button
                    onClick={handleRetry}
                    className="btn-game btn-game-indigo py-3.5 px-4 rounded-2xl text-xs flex-1 flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>TRY AGAIN</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <form onSubmit={handleCheckAnswer} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                <span>What word did you hear?</span>
                {showHint && (
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-xs font-black">
                    Hint: /{currentWord.phonetic}/
                  </span>
                )}
              </label>

              <input
                type="text"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Type the word..."
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                className="w-full px-5 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border-4 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black text-3xl tracking-widest outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-center uppercase shadow-inner"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handlePlayWord('normal')}
                className="py-4 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-black flex items-center gap-1.5 transition-all text-xs border-2 border-slate-200 dark:border-slate-700"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span>PLAY AGAIN</span>
              </button>

              <button
                type="submit"
                disabled={!typedAnswer.trim()}
                className="btn-game btn-game-green flex-1 py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2"
              >
                <span>CHECK ANSWER</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>

            {!showHint && (
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setShowHint(true);
                  }}
                  className="text-xs text-amber-600 dark:text-amber-400 font-black hover:underline inline-flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Need a hint?</span>
                </button>
              </div>
            )}
          </form>
        )}

      </div>

    </div>
  );
};
