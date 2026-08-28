import React, { useState, useEffect } from 'react';
import { Mic, Volume2, AlertTriangle, Keyboard } from 'lucide-react';
import type { Word, WordAttempt, PronunciationResult, StudentProfile, UserStats } from '../types';
import { pronunciationService } from '../services/pronunciationService';
import { adaptiveEngine } from '../services/adaptiveEngine';
import { soundFX } from '../utils/soundFx';
import { WordCard } from '../components/WordCard';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { LessonProgress } from '../components/LessonProgress';

interface PronunciationModeProps {
  profile: StudentProfile;
  stats: UserStats;
  onCompleteLesson: (attempts: WordAttempt[]) => void;
  onExit: () => void;
  onSwitchToSpelling: () => void;
}

export const PronunciationMode: React.FC<PronunciationModeProps> = ({
  profile,
  stats,
  onCompleteLesson,
  onExit,
  onSwitchToSpelling
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<WordAttempt[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<PronunciationResult | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);

  useEffect(() => {
    const lessonWords = adaptiveEngine.getLessonWords(profile, stats);
    setWords(lessonWords);
  }, [profile, stats]);

  if (words.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl shadow-card">
        <p className="text-slate-600 dark:text-slate-300 font-bold">Loading pronunciation lesson words...</p>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  const handleStartSpeaking = () => {
    soundFX.playClick();
    setMicError(null);
    setIsRecording(true);

    pronunciationService.startRecording(
      (recognizedSpeech) => {
        setIsRecording(false);
        setIsAssessing(true);

        setTimeout(() => {
          const result = pronunciationService.assessPronunciation(currentWord.word, recognizedSpeech);
          setCurrentResult(result);
          setIsAssessing(false);

          if (result.isMatch) {
            soundFX.playSuccess();
          } else {
            soundFX.playError();
          }

          const attempt: WordAttempt = {
            id: `att_${Date.now()}`,
            wordId: currentWord.id,
            wordString: currentWord.word,
            mode: 'pronunciation',
            score: result.score,
            targetWord: currentWord.word,
            userInput: recognizedSpeech,
            correct: result.isMatch,
            attemptsCount: 1,
            createdAt: new Date().toISOString()
          };

          setAttempts(prev => [...prev, attempt]);
        }, 400);
      },
      (errorMsg) => {
        setIsRecording(false);
        setMicError(errorMsg);
        soundFX.playError();
      },
      () => {
        setIsRecording(true);
      }
    );
  };

  const handleStopSpeaking = () => {
    soundFX.playClick();
    pronunciationService.stopRecording();
    setIsRecording(false);
  };

  const handleNextWord = () => {
    soundFX.playClick();
    setCurrentResult(null);
    setMicError(null);

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
    setMicError(null);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 pb-24 animate-pop">
      
      <LessonProgress
        currentStep={currentIndex + 1}
        totalSteps={words.length}
        mode="pronunciation"
        onExit={() => {
          soundFX.playClick();
          onExit();
        }}
      />

      <WordCard word={currentWord} />

      {micError && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-semibold space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{micError}</span>
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={() => {
                soundFX.playClick();
                onSwitchToSpelling();
              }}
              className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Use Typing Mode Instead</span>
            </button>
          </div>
        </div>
      )}

      {currentResult ? (
        <ScoreDisplay
          result={currentResult}
          onNext={handleNextWord}
          onRetry={handleRetry}
          isLastWord={currentIndex + 1 === words.length}
        />
      ) : (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 dark:border-slate-800 text-center space-y-4">
          
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            {isRecording ? "Listening to your voice... Speak clearly!" : "Listen carefully and pronounce the word."}
          </p>

          <div className="py-2 flex justify-center">
            {isRecording ? (
              <button
                onClick={handleStopSpeaking}
                className="w-24 h-24 rounded-full bg-rose-500 text-white flex flex-col items-center justify-center shadow-xl pulsing-mic transition-all"
              >
                <Mic className="w-10 h-10 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">Tap to Stop</span>
              </button>
            ) : (
              <button
                onClick={handleStartSpeaking}
                disabled={isAssessing}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white flex flex-col items-center justify-center shadow-xl shadow-brand-500/30 transition-transform active:scale-95 group"
              >
                <Mic className="w-10 h-10 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">Tap & Speak</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button
              onClick={() => {
                soundFX.playClick();
                pronunciationService.speakWord(currentWord.word);
              }}
              className="flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-brand-500" />
              <span>Listen again</span>
            </button>
            <span>•</span>
            <button
              onClick={() => {
                soundFX.playClick();
                onSwitchToSpelling();
              }}
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <Keyboard className="w-4 h-4 text-indigo-500" />
              <span>Switch to Spelling</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
