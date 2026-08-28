import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-950 to-indigo-900 text-white transition-opacity duration-500 ${
      fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Glow ambient circle */}
      <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Animated Speech Sound-Wave Icon Container */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-6 border-2 border-white/20 animate-float-slow">
          <div className="flex items-center gap-1.5 h-10">
            <div className="visualizer-wave bg-white" />
            <div className="visualizer-wave bg-amber-400" />
            <div className="visualizer-wave bg-emerald-400" />
            <div className="visualizer-wave bg-white" />
            <div className="visualizer-wave bg-amber-400" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-widest uppercase bg-gradient-to-r from-white via-indigo-200 to-amber-300 bg-clip-text text-transparent mb-2">
          SPELLON
        </h1>

        {/* Tagline */}
        <p className="text-indigo-200 font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Learn. Speak. Improve.</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </p>

        {/* Subtle Loading Dots */}
        <div className="flex items-center gap-2 mt-8">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" style={{ animationDelay: '0.4s' }} />
        </div>

      </div>
    </div>
  );
};
