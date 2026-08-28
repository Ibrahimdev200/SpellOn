import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, Lightbulb } from 'lucide-react';
import type { Word, WordAttempt, PronunciationResult, StudentProfile, UserStats } from '../types';
import { speechService } from '../services/speechService';
import { adaptiveEngine } from '../services/adaptiveEngine';
import { soundFX } from '../utils/soundFx';
import { WordCard } from '../components/WordCard';
import { ScoreDisplay } from '../components/ScoreDisplay';
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

    const result: PronunciationResult = {
      score,
      rating: isExactMatch ? 'Perfect' : (score >= 75 ? 'Very Good' : 'Try Again'),
      stars: isExactMatch ? 5 : (score >= 75 ? 4 : 2),
      feedback: isExactMatch ? '🎉 Correct! Excellent spelling!' : '❌ Not quite. Check your spelling and try again!',
      isMatch: isExactMatch,
      targetWord: currentWord.word,
      recognizedWord: typedAnswer.trim()
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
    <div className="max-w-xl mx-auto space-y-4 pb-24 animate-pop">
      
      <LessonProgress
        currentStep={currentIndex + 1}
        totalSteps={words.length}
        mode="spelling"
        onExit={() => {
          soundFX.playClick();
          onExit();
        }}
      />

      <WordCard word={currentWord} hideWord={!currentResult} />

      {currentResult ? (
        <ScoreDisplay
          result={currentResult}
          onNext={handleNextWord}
          onRetry={handleRetry}
          isLastWord={currentIndex + 1 === words.length}
        />
      ) : (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          
          <form onSubmit={handleCheckAnswer} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Type the word you heard</span>
                {showHint && (
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold">
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
                placeholder="Type the word here..."
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black text-2xl tracking-widest outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center uppercase shadow-inner"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handlePlayWord('normal')}
                className="py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1.5 transition-all text-sm"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span>Listen Again</span>
              </button>

              <button
                type="submit"
                disabled={!typedAnswer.trim()}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 text-white font-extrabold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all btn-tactile text-base"
              >
                <span>Check Answer</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </form>

          {!showHint && (
            <div className="text-center pt-1">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setShowHint(true);
                }}
                className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Need a hint?</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
