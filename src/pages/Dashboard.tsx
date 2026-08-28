import React from 'react';
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
  Star
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

const AVATAR_EMOJIS: Record<string, string> = {
  lion: '🦁',
  owl: '🦉',
  rocket: '🚀',
  star: '⭐',
  bear: '🐻'
};

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  stats,
  onStartPractice
}) => {
  const todayWordsCount = Math.min(10, stats.totalWordsPracticed % 10 || (stats.totalWordsPracticed > 0 ? 10 : 0));
  const todayGoalTarget = 10;
  const progressPercent = Math.round((todayWordsCount / todayGoalTarget) * 100);

  // Pick a featured word of the day matching the student's class
  const classWords = INITIAL_WORDS.filter(w => w.classLevel === profile.classLevel);
  const wordOfTheDay = classWords.length > 0 ? classWords[0] : INITIAL_WORDS[0];

  const avatarEmoji = AVATAR_EMOJIS[profile.avatarId || 'rocket'] || '🚀';

  const handlePlayWordOfDay = () => {
    soundFX.playClick();
    speechService.speak(wordOfTheDay.word);
  };

  return (
    <div className="space-y-6 pb-24 animate-pop">
      
      {/* Student Welcome Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-glow">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/20 shrink-0">
              {avatarEmoji}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold mb-2 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{profile.classLevel} Learner</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Hello, {profile.name}!
              </h2>
              <p className="text-brand-100 text-sm font-medium mt-0.5">
                "Improve your English, one word at a time."
              </p>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 self-start sm:self-auto">
            <div className="text-center px-3">
              <span className="text-[10px] font-bold uppercase text-brand-200 block">Streak</span>
              <span className="text-xl font-black text-amber-300 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-300" />
                {stats.currentStreak}d
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <div className="text-center px-3">
              <span className="text-[10px] font-bold uppercase text-brand-200 block">Avg Accuracy</span>
              <span className="text-xl font-black text-emerald-300">{stats.averageAccuracy}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Goal & Star Milestones */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-card border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Today's Practice Target</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Complete 10 words daily to grow your streak</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-black text-xs border border-brand-200/60 dark:border-brand-800/60">
            {todayWordsCount} / {todayGoalTarget} words
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 relative">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-brand-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center mt-2 text-[11px] font-bold text-slate-400">
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Start</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5 Words</span>
          <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-brand-500" /> 10 Words Complete</span>
        </div>
      </div>

      {/* Word of the Day Feature Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-indigo-500/10 dark:from-amber-950/30 dark:via-brand-950/30 dark:to-indigo-950/30 rounded-3xl p-5 sm:p-6 border border-amber-200/70 dark:border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider">
            Featured Word of the Day
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
            {wordOfTheDay.word} <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">/{wordOfTheDay.phonetic}/</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
            "{wordOfTheDay.meaning}"
          </p>
        </div>

        <button
          onClick={handlePlayWordOfDay}
          className="py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all btn-tactile shrink-0"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen Word</span>
        </button>
      </div>

      {/* Main Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 🎤 Pronunciation Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600 transition-all group flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/25 mb-4 group-hover:scale-110 transition-transform">
              <Mic className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Pronunciation Practice
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium leading-relaxed">
              Listen carefully, speak into the mic, and get immediate accuracy scoring on your English pronunciation.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">10 words • Voice Mic</span>
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('pronunciation');
              }}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-md shadow-brand-600/30 flex items-center gap-2 transition-all btn-tactile"
            >
              <span>Start Pronunciation</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>

        {/* ⌨️ Spelling Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4 group-hover:scale-110 transition-transform">
              <Keyboard className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Spelling Practice
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium leading-relaxed">
              Listen to spoken audio words and type what you hear to master English spelling rules.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">10 words • Audio Typing</span>
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('spelling');
              }}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all btn-tactile"
            >
              <span>Start Spelling</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>

      </div>

      {/* Words Needing Practice Section */}
      {stats.wordsToPractice.length > 0 ? (
        <div className="bg-amber-50/70 dark:bg-amber-950/40 rounded-3xl p-5 border border-amber-200/80 dark:border-amber-800/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                Words Needing Practice ({stats.wordsToPractice.length})
              </h4>
            </div>
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('pronunciation');
              }}
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>Practice Weak Words</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.wordsToPractice.slice(0, 8).map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-200 font-bold text-xs shadow-xs border border-amber-200 dark:border-amber-700/60 uppercase"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 text-center border border-slate-100 dark:border-slate-800 shadow-card">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base">No Weak Words Pending!</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            You are mastering your vocabulary words cleanly. Start a lesson to unlock new words!
          </p>
        </div>
      )}

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-xs">
          <BookOpen className="w-5 h-5 text-brand-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalWordsPracticed}</span>
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Words Practiced</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-xs">
          <Award className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalLessonsCompleted}</span>
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Lessons Completed</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-xs">
          <Mic className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.averagePronunciationScore}%</span>
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Pronunciation</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-xs">
          <TrendingUp className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.averageSpellingScore}%</span>
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Spelling</span>
        </div>
      </div>

    </div>
  );
};
