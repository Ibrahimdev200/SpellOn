import React from 'react';
import { Mic, Keyboard, BookOpen, Zap, Play, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundFx';

interface PracticeHubProps {
  onStartPractice: (mode: 'pronunciation' | 'spelling' | 'vocabulary' | 'challenge') => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({ onStartPractice }) => {
  const cards = [
    {
      id: 'pronunciation',
      title: 'Pronunciation Quest',
      subtitle: 'Listen, speak and improve your pronunciation with live voice assessment.',
      icon: Mic,
      gradient: 'from-purple-600 to-indigo-600',
      badge: 'Interactive Mic',
      cta: 'Start Practice →',
      btnStyle: 'btn-modern-purple'
    },
    {
      id: 'spelling',
      title: 'Spelling Challenge',
      subtitle: 'Listen to the target word and type what you hear to master spelling.',
      icon: Keyboard,
      gradient: 'from-indigo-600 to-sky-500',
      badge: 'Audio Typing',
      cta: 'Start Practice →',
      btnStyle: 'btn-modern-primary'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Explorer',
      subtitle: 'Discover new words, definitions, phonetics, and sentence examples.',
      icon: BookOpen,
      gradient: 'from-emerald-600 to-teal-500',
      badge: 'Word Library',
      cta: 'Explore Words →',
      btnStyle: 'btn-modern-green'
    },
    {
      id: 'challenge',
      title: 'Quick Challenge',
      subtitle: 'Test your English pronunciation & spelling skills under time pressure!',
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
      badge: 'Speed Test',
      cta: 'Start Challenge →',
      btnStyle: 'btn-modern-amber'
    }
  ];

  return (
    <div className="space-y-6 pb-24 animate-pop max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider mb-2 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>SPELLON Practice Hub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
          WHAT WOULD YOU LIKE TO PRACTICE?
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Choose a learning mode below to build vocabulary, pronunciation, and spelling mastery.
        </p>
      </div>

      {/* Grid of Practice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="modern-card modern-card-hover p-7 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${card.gradient} text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                <span className="px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                  {card.badge}
                </span>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">10 Words per lesson</span>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onStartPractice(card.id as any);
                  }}
                  className={`btn-modern ${card.btnStyle} py-3 px-5 rounded-xl text-xs flex items-center gap-1.5`}
                >
                  <span>{card.cta}</span>
                  <Play className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
