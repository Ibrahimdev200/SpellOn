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
      subtitle: 'Listen, speak and improve your pronunciation.',
      icon: Mic,
      gradient: 'from-purple-600 via-indigo-600 to-indigo-700',
      badge: 'Interactive Mic',
      cta: 'Start Practice →',
      btnStyle: 'btn-game-purple'
    },
    {
      id: 'spelling',
      title: 'Spelling Challenge',
      subtitle: 'Listen to the word and type what you hear.',
      icon: Keyboard,
      gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
      badge: 'Audio Typing',
      cta: 'Start Practice →',
      btnStyle: 'btn-game-indigo'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Explorer',
      subtitle: 'Discover new words, definitions, and sentence examples.',
      icon: BookOpen,
      gradient: 'from-emerald-600 via-teal-600 to-green-600',
      badge: 'Word Library',
      cta: 'Explore Words →',
      btnStyle: 'btn-game-green'
    },
    {
      id: 'challenge',
      title: 'Quick Challenge',
      subtitle: 'Test your English pronunciation & spelling skills!',
      icon: Zap,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      badge: 'Speed Test',
      cta: 'Start Challenge →',
      btnStyle: 'btn-game-amber'
    }
  ];

  return (
    <div className="space-y-6 pb-24 animate-pop">
      
      {/* Header */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs uppercase tracking-wider mb-2 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>SPELLON Practice Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          WHAT WOULD YOU LIKE TO PRACTICE?
        </h2>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
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
              className="game-card-3d bg-white dark:bg-slate-900 p-7 flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${card.gradient} text-white flex items-center justify-center shadow-xl mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                  {card.badge}
                </span>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-bold mt-1 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-black text-slate-400">10 Words per lesson</span>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onStartPractice(card.id as any);
                  }}
                  className={`btn-game ${card.btnStyle} py-3.5 px-6 rounded-2xl text-xs flex items-center gap-2`}
                >
                  <span>{card.cta}</span>
                  <Play className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
