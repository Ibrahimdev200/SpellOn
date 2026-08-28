import React, { useState, useEffect } from 'react';
import { Mic, Volume2, AlertTriangle, Keyboard, Star, ArrowRight, RotateCcw, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import type { Word, WordAttempt, PronunciationResult, StudentProfile, UserStats } from '../types';
import { pronunciationService } from '../services/pronunciationService';
import { speechService } from '../services/speechService';
import { adaptiveEngine } from '../services/adaptiveEngine';
import { soundFX } from '../utils/soundFx';
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
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [failCount, setFailCount] = useState(0);

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

  const handleListenWord = () => {
    soundFX.playClick();
    speechService.speak(currentWord.word);
  };

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
          const xpEarned = result.isMatch ? 10 : 2;

          setCurrentResult({ ...result, xpEarned });
          setIsAssessing(false);

          if (result.isMatch) {
            soundFX.playSuccess();
            setFailCount(0);
          } else {
            soundFX.playError();
            setFailCount(prev => prev + 1);
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
            xpEarned,
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
    setShowLearnMore(false);

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
    <div className="max-w-xl mx-auto space-y-5 pb-24 animate-pop">
      
      {/* Top Bar Progress */}
      <LessonProgress
        currentStep={currentIndex + 1}
        totalSteps={words.length}
        mode="pronunciation"
        onExit={() => {
          soundFX.playClick();
          onExit();
        }}
      />

      {/* MAIN WORD CARD */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
        
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black text-xs uppercase tracking-wider">
            {currentWord.category}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs">
            {currentWord.classLevel}
          </span>
        </div>

        {/* Giant Learning Word Display */}
        <div className="py-4">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-2 leading-none">
            {currentWord.word}
          </h1>
          
          <div className="inline-block px-4 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-lg font-black border border-indigo-200 dark:border-indigo-800 mb-3">
            /{currentWord.phonetic}/
          </div>

          <p className="text-xs font-black text-slate-500 dark:text-slate-400">
            "Listen carefully, then say the word."
          </p>
        </div>

        {/* Audio LISTEN Button */}
        <div className="flex justify-center my-3">
          <button
            onClick={handleListenWord}
            className="btn-game btn-game-indigo py-3.5 px-8 rounded-2xl text-sm flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            <span>LISTEN WORD</span>
          </button>
        </div>

        {/* Expandable "Learn More" Section */}
        <div className="mt-4 pt-4 border-t-2 border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              soundFX.playClick();
              setShowLearnMore(!showLearnMore);
            }}
            className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showLearnMore ? 'Hide Details' : 'Learn More'}</span>
            {showLearnMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showLearnMore && (
            <div className="mt-3 p-4 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/60 text-left text-xs font-bold space-y-2 border border-indigo-200 dark:border-indigo-800">
              <p className="text-slate-800 dark:text-slate-200">
                <span className="font-black text-indigo-700 dark:text-indigo-300">Meaning:</span> "{currentWord.meaning}"
              </p>
              <p className="text-slate-800 dark:text-slate-200 italic">
                <span className="font-black text-indigo-700 dark:text-indigo-300 not-italic">Example:</span> "{currentWord.exampleSentence}"
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Mic Error Notice */}
      {micError && (
        <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold space-y-2">
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
              className="btn-game btn-game-amber py-2 px-4 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Keyboard className="w-4 h-4" />
              <span>USE TYPING MODE</span>
            </button>
          </div>
        </div>
      )}

      {/* PRONUNCIATION RESULT FEEDBACK SCREEN */}
      {currentResult ? (
        <div className="w-full bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 text-center animate-pop">
          
          {currentResult.isMatch ? (
            <div>
              <div className="text-4xl mb-1">🎉</div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                EXCELLENT!
              </h3>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                "You pronounced the word correctly."
              </p>

              <div className="my-4">
                <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                  {currentResult.score}%
                </span>
                <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider mt-1">
                  PRONUNCIATION SCORE
                </span>
              </div>

              {/* Stars & XP */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-8 h-8 ${s <= currentResult.stars ? 'fill-amber-400 text-amber-400 star-pop' : 'text-slate-200 dark:text-slate-700'}`}
                  />
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-black text-sm mb-6 border border-amber-300">
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
                Almost there!
              </h3>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                "Listen again and give it another try."
              </p>

              <div className="my-4">
                <span className="text-4xl font-black text-amber-600 dark:text-amber-400">
                  Your score: {currentResult.score}%
                </span>
              </div>

              {/* Repeated fail hint */}
              {failCount >= 2 && (
                <div className="my-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 text-xs font-bold border border-amber-200">
                  <span className="font-black block">Here's a little help:</span>
                  <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">/{currentWord.phonetic}/</span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={handleListenWord}
                  className="btn-game py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs flex-1 flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-indigo-500" />
                  <span>🔊 Listen Again</span>
                </button>

                <button
                  onClick={handleRetry}
                  className="btn-game btn-game-purple py-3.5 px-4 rounded-2xl text-xs flex-1 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>🎤 Try Again</span>
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* MICROPHONE RECORDING CONTROLS */
        <div className="w-full bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 text-center space-y-4">
          
          <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {isRecording ? "🎤 Listening... Speak clearly!" : "TAP THE MICROPHONE & SPEAK"}
          </p>

          <div className="py-2 flex justify-center">
            {isRecording ? (
              <button
                onClick={handleStopSpeaking}
                className="w-28 h-28 rounded-full bg-rose-500 text-white flex flex-col items-center justify-center shadow-2xl pulsing-mic transition-all border-4 border-rose-300"
              >
                <Mic className="w-12 h-12 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">Tap to Stop</span>
              </button>
            ) : (
              <button
                onClick={handleStartSpeaking}
                disabled={isAssessing}
                className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-700 hover:to-purple-700 text-white flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/40 transition-transform active:scale-95 group border-4 border-white/30"
              >
                <Mic className="w-12 h-12 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">TAP TO SPEAK</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 pt-2">
            <button
              onClick={handleListenWord}
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-indigo-500" />
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
