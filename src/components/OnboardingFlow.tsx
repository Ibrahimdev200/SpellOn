import React, { useState } from 'react';
import { Volume2, Mic, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

interface OnboardingFlowProps {
  onFinishOnboarding: () => void;
}

const STEPS = [
  {
    id: 1,
    title: 'Welcome to SPELLON',
    subtitle: 'Your personal English learning companion.',
    description: 'Master English pronunciation, spelling, vocabulary, and listening one word at a time.',
    icon: Sparkles,
    gradient: 'from-indigo-600 to-purple-600',
  },
  {
    id: 2,
    title: 'LISTEN',
    subtitle: 'Listen carefully and learn how words sound.',
    description: 'Hear natural audio pronunciations with adjustable speech speeds tailored to your speed.',
    icon: Volume2,
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 3,
    title: 'SPEAK',
    subtitle: 'Speak the word and improve your pronunciation.',
    description: 'Use your microphone to practice speaking and receive instant accuracy feedback.',
    icon: Mic,
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 4,
    title: 'IMPROVE',
    subtitle: 'Practice, track your progress and become more confident.',
    description: 'Build your daily streak, earn XP rewards, unlock badges, and master challenging words.',
    icon: TrendingUp,
    gradient: 'from-emerald-600 to-teal-600',
  }
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onFinishOnboarding }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    soundFX.playClick();
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      soundFX.playSuccess();
      onFinishOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-pop">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 text-center relative overflow-hidden flex flex-col justify-between min-h-[500px]">
        
        <div className={`absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-tr ${currentStep.gradient} opacity-20 rounded-full blur-3xl pointer-events-none transition-all duration-500`} />

        <div className="flex items-center justify-center gap-2 pt-2">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => {
                soundFX.playClick();
                setCurrentStepIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex 
                  ? 'w-8 bg-indigo-600 dark:bg-indigo-400 shadow-md' 
                  : 'w-2.5 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="py-8 flex flex-col items-center">
          <div className={`w-28 h-28 rounded-4xl bg-gradient-to-tr ${currentStep.gradient} text-white flex items-center justify-center shadow-xl shadow-indigo-500/25 mb-6 border-4 border-white/20 animate-float-slow`}>
            <StepIcon className="w-14 h-14" />
          </div>

          <span className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs uppercase tracking-wider mb-2 border border-indigo-200 dark:border-indigo-800">
            Step {currentStepIndex + 1} of 4
          </span>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            {currentStep.title}
          </h2>

          <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1 max-w-xs">
            "{currentStep.subtitle}"
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed mt-3 max-w-sm">
            {currentStep.description}
          </p>
        </div>

        <div className="pb-2">
          <button
            onClick={handleNext}
            className="btn-game btn-game-indigo w-full py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{currentStepIndex === STEPS.length - 1 ? 'Get Started →' : 'Next Step →'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
