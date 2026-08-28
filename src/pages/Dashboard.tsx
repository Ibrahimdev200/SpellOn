import React, { useState } from 'react';
import { 
  Mic, 
  Keyboard, 
  Flame, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Volume2,
  Star,
  Gift,
  Trophy,
  Zap
} from 'lucide-react';
import type { StudentProfile, UserStats } from '../types';
import { INITIAL_WORDS } from '../data/wordsData';
import { speechService } from '../services/speechService';
import { soundFX } from '../utils/soundFx';

interface DashboardProps {
  profile: StudentProfile;
  stats: UserStats;
  onStartPractice: (mode: 'pronunciation' | 'spelling') => void;
  onNavigate: (route: string) => void;
  onEditProfile: () => void;
}

const AVATAR_DETAILS: Record<string, { emoji: string; name: string; soundLine: string }> = {
  lion: { emoji: '🦁', name: 'Brave Leo', soundLine: 'Roar! Let us learn new words today!' },
  owl: { emoji: '🦉', name: 'Wise Hooty', soundLine: 'Hoot hoot! Ready to improve your English?' },
  rocket: { emoji: '🚀', name: 'Captain Cosmo', soundLine: '3, 2, 1! Blast off to learning!' },
  star: { emoji: '⭐', name: 'Twinkle Star', soundLine: 'Shine bright! You can master any word!' },
  bear: { emoji: '🐻', name: 'Friendly Barnaby', soundLine: 'Hello buddy! Let us play a word game!' }
};

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  stats,
  onStartPractice
}) => {
  const [isMascotBouncing, setIsMascotBouncing] = useState(false);

  const todayWordsCount = Math.min(10, stats.totalWordsPracticed % 10 || (stats.totalWordsPracticed > 0 ? 10 : 0));
  const todayGoalTarget = 10;
  const progressPercent = Math.round((todayWordsCount / todayGoalTarget) * 100);

  const avatarInfo = AVATAR_DETAILS[profile.avatarId || 'rocket'] || AVATAR_DETAILS['rocket'];

  const classWords = INITIAL_WORDS.filter(w => w.classLevel === profile.classLevel);
  const wordOfTheDay = classWords.length > 0 ? classWords[0] : INITIAL_WORDS[0];

  const handleTapMascot = () => {
    soundFX.playClick();
    setIsMascotBouncing(true);
    speechService.speak(`Hi ${profile.name}! ${avatarInfo.soundLine}`);
    setTimeout(() => setIsMascotBouncing(false), 1200);
  };

  const handlePlayWordOfDay = () => {
    soundFX.playClick();
    speechService.speak(wordOfTheDay.word);
  };

  return (
    <div className="space-y-6 pb-24 animate-pop">
      
      {/* Interactive Mascot Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-4xl p-6 sm:p-8 text-white shadow-2xl border-4 border-white/20">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            
            {/* Tapable Animated Mascot */}
            <button
              onClick={handleTapMascot}
              title="Tap mascot to hear greeting!"
              className={`w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-xl border-2 border-white/30 shrink-0 cursor-pointer transition-transform hover:scale-105 ${
                isMascotBouncing ? 'animate-bounce' : 'animate-float-slow'
              }`}
            >
              <span>{avatarInfo.emoji}</span>
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 backdrop-blur-md text-amber-300 text-xs font-black mb-1.5 border border-amber-300/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.classLevel} Explorer</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Hello, {profile.name}! 👋
              </h2>
              <p className="text-brand-100 text-xs sm:text-sm font-bold mt-0.5">
                "{avatarInfo.soundLine}"
              </p>
            </div>

          </div>

          {/* Player Stats Pills */}
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-3.5 rounded-3xl border border-white/20 self-start sm:self-auto">
            <div className="text-center px-3">
              <span className="text-[10px] font-black uppercase text-brand-200 block">Streak</span>
              <span className="text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-amber-300 text-amber-300 animate-bounce-gentle" />
                {stats.currentStreak}d
              </span>
            </div>
            <div className="h-9 w-[2px] bg-white/20" />
            <div className="text-center px-3">
              <span className="text-[10px] font-black uppercase text-brand-200 block">Accuracy</span>
              <span className="text-2xl font-black text-emerald-300">{stats.averageAccuracy}%</span>
            </div>
          </div>

        </div>
      </div>

      {/* Daily Quest Target Progress */}
      <div className="game-panel p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Daily Learning Mission
            </span>
            <h3 className="font-black text-slate-900 dark:text-white text-lg">Target: 10 Words Daily</h3>
          </div>

          <span className="px-4 py-1.5 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-black text-xs border-2 border-brand-200 dark:border-brand-800">
            {todayWordsCount} / {todayGoalTarget} Words
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1 relative border border-slate-200 dark:border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500 shadow-md"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Chests */}
        <div className="flex justify-between items-center mt-3 text-xs font-black text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 3 Words</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 6 Words</span>
          <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400"><Trophy className="w-4 h-4 text-amber-500" /> Goal Chest Unlocked!</span>
        </div>
      </div>

      {/* Word of the Day Quest Chest */}
      <div className="bg-gradient-to-r from-amber-400/20 via-orange-400/15 to-purple-500/20 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-purple-950/40 rounded-4xl p-6 border-3 border-amber-300/80 dark:border-amber-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
            <Gift className="w-7 h-7 animate-bounce-subtle" />
          </div>

          <div>
            <span className="px-3 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider">
              Golden Word Quest
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
              {wordOfTheDay.word} <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">/{wordOfTheDay.phonetic}/</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-bold mt-0.5">
              "{wordOfTheDay.meaning}"
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayWordOfDay}
          className="btn-game btn-game-amber py-3 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shrink-0"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen Word</span>
        </button>
      </div>

      {/* Game Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 🎤 Pronunciation Card */}
        <div className="game-card-3d bg-white dark:bg-slate-900 p-7 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-brand-500/30 mb-5 group-hover:scale-110 transition-transform">
              <Mic className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-black text-[11px] uppercase tracking-wider border border-brand-200">
              Interactive Speech Game
            </span>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              Pronunciation Quest
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold mt-1 leading-relaxed">
              Listen carefully, speak into the mic, and get instant voice recognition scores!
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-black text-slate-400">10 Words • Voice Mic</span>
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('pronunciation');
              }}
              className="btn-game btn-game-purple py-3.5 px-6 rounded-2xl text-sm flex items-center gap-2"
            >
              <span>Start Quest</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>

        {/* ⌨️ Spelling Card */}
        <div className="game-card-3d bg-white dark:bg-slate-900 p-7 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-5 group-hover:scale-110 transition-transform">
              <Keyboard className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-[11px] uppercase tracking-wider border border-indigo-200">
              Typing Challenge
            </span>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              Spelling Challenge
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold mt-1 leading-relaxed">
              Listen to target audio words and type what you hear to build master spelling skills!
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-black text-slate-400">10 Words • Audio Typing</span>
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('spelling');
              }}
              className="btn-game btn-game-indigo py-3.5 px-6 rounded-2xl text-sm flex items-center gap-2"
            >
              <span>Start Challenge</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>

      </div>

      {/* Weak Words Section */}
      {stats.wordsToPractice.length > 0 ? (
        <div className="bg-amber-500/10 dark:bg-amber-950/40 rounded-4xl p-6 border-3 border-amber-300 dark:border-amber-700/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h4 className="font-black text-slate-900 dark:text-white text-base">
                Words Needing Practice ({stats.wordsToPractice.length})
              </h4>
            </div>
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('pronunciation');
              }}
              className="text-xs font-black text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>Practice Weak Words</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {stats.wordsToPractice.slice(0, 8).map((word, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-2xl bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-200 font-black text-xs shadow-md border-2 border-amber-200 dark:border-amber-700 uppercase"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-panel p-6 text-center border-2 border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 animate-bounce-subtle" />
          <h4 className="font-black text-slate-900 dark:text-white text-lg">No Weak Words Pending! 🎉</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mt-0.5">
            You are mastering your vocabulary words cleanly. Start a lesson to unlock new words!
          </p>
        </div>
      )}

      {/* Stats Summary Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="game-panel p-4 text-center">
          <BookOpen className="w-6 h-6 text-brand-500 mx-auto mb-1" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalWordsPracticed}</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Words Practiced</span>
        </div>

        <div className="game-panel p-4 text-center">
          <Award className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalLessonsCompleted}</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Lessons Done</span>
        </div>

        <div className="game-panel p-4 text-center">
          <Mic className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.averagePronunciationScore}%</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Pronunciation</span>
        </div>

        <div className="game-panel p-4 text-center">
          <TrendingUp className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.averageSpellingScore}%</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Spelling</span>
        </div>
      </div>

    </div>
  );
};
