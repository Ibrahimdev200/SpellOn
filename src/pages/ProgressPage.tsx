import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Flame, 
  Star, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Mic, 
  Keyboard, 
  AlertCircle, 
  Zap,
  Lock
} from 'lucide-react';
import type { StudentProfile, UserStats, Achievement } from '../types';
import { storageService } from '../services/storageService';
import { soundFX } from '../utils/soundFx';

interface ProgressPageProps {
  profile: StudentProfile;
  stats: UserStats;
  onStartPractice: (mode: 'pronunciation' | 'spelling') => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  profile,
  stats,
  onStartPractice
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setAchievements(storageService.getAchievements());
  }, []);

  const getAdaptiveStatus = () => {
    if (stats.averageAccuracy >= 90) return { title: "Challenge unlocked!", desc: "Your English performance is excellent!", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-200" };
    if (stats.averageAccuracy >= 75) return { title: "You're ready for a challenge!", desc: "Dynamic difficulty elevated.", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200" };
    return { title: "Let's practice a few easier words.", desc: "Focusing on vocabulary fundamentals.", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200" };
  };

  const adaptiveInfo = getAdaptiveStatus();

  return (
    <div className="space-y-6 pb-24 animate-pop">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            My Progress
          </h2>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
            Track your English vocabulary, pronunciation, and spelling growth.
          </p>
        </div>

        {/* Adaptive Level Pill */}
        <div className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl border-2 font-black text-xs ${adaptiveInfo.color}`}>
          <Zap className="w-4 h-4 fill-current" />
          <span>Level {profile.currentDifficulty} • {adaptiveInfo.title}</span>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="game-panel p-4 text-center">
          <Zap className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{profile.classLevel}</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Current Level</span>
        </div>

        <div className="game-panel p-4 text-center">
          <BookOpen className="w-5 h-5 text-purple-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalWordsPracticed}</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Words Practiced</span>
        </div>

        <div className="game-panel p-4 text-center">
          <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.averageAccuracy}%</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Accuracy</span>
        </div>

        <div className="game-panel p-4 text-center">
          <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1 fill-orange-500" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.currentStreak}d</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Streak</span>
        </div>

        <div className="game-panel p-4 text-center col-span-2 sm:col-span-1">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-1 fill-amber-400" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">{profile.xp || 320}</span>
          <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Player XP</span>
        </div>
      </div>

      {/* Weekly Activity Bar Chart & YOUR SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weekly Activity Chart */}
        <div className="game-panel p-6 shadow-xl">
          <h3 className="font-black text-slate-900 dark:text-white text-base mb-4 uppercase tracking-wide flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <span>Weekly Practice Activity</span>
          </h3>

          <div className="flex items-end justify-between gap-2 h-40 pt-4 px-2">
            {(stats.weeklyActivity || []).map((day) => {
              const heightPercent = Math.min(100, Math.max(15, (day.wordsCount / 15) * 100));
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {day.wordsCount}
                  </span>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl h-28 flex items-end p-1 overflow-hidden">
                    <div 
                      className={`w-full rounded-xl transition-all duration-500 ${
                        day.isToday 
                          ? 'bg-gradient-to-t from-indigo-600 to-purple-500 shadow-md' 
                          : 'bg-indigo-200 dark:bg-indigo-900/60'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-black ${day.isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* YOUR SKILLS Bars */}
        <div className="game-panel p-6 shadow-xl space-y-4">
          <h3 className="font-black text-slate-900 dark:text-white text-base uppercase tracking-wide flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span>YOUR SKILLS</span>
          </h3>

          {/* Pronunciation Skill */}
          <div>
            <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
              <span className="flex items-center gap-1.5"><Mic className="w-4 h-4 text-purple-600" /> Pronunciation</span>
              <span className="text-purple-600 dark:text-purple-400">{stats.averagePronunciationScore}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: `${stats.averagePronunciationScore}%` }} />
            </div>
          </div>

          {/* Spelling Skill */}
          <div>
            <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
              <span className="flex items-center gap-1.5"><Keyboard className="w-4 h-4 text-blue-600" /> Spelling</span>
              <span className="text-blue-600 dark:text-blue-400">{stats.averageSpellingScore}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${stats.averageSpellingScore}%` }} />
            </div>
          </div>

          {/* Vocabulary Skill */}
          <div>
            <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200 mb-1">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-emerald-600" /> Vocabulary</span>
              <span className="text-emerald-600 dark:text-emerald-400">{stats.averageVocabularyScore || 74}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${stats.averageVocabularyScore || 74}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* WORDS TO PRACTICE SECTION */}
      <div className="game-panel p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-slate-900 dark:text-white text-base uppercase tracking-wide">
              Words to Practice ({stats.wordsToPractice.length})
            </h3>
          </div>
          {stats.wordsToPractice.length > 0 && (
            <button
              onClick={() => {
                soundFX.playClick();
                onStartPractice('pronunciation');
              }}
              className="btn-game btn-game-amber py-2 px-4 rounded-xl text-xs flex items-center gap-1"
            >
              <span>Practice All →</span>
            </button>
          )}
        </div>

        {stats.wordsToPractice.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.wordsToPractice.map((word, idx) => (
              <div key={idx} className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-base uppercase block">{word}</span>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">Attempts: 3 • Accuracy: 62%</span>
                </div>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onStartPractice('pronunciation');
                  }}
                  className="btn-game btn-game-amber py-2 px-3 rounded-xl text-[11px]"
                >
                  Practice →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold text-center py-4">
            No weak words pending! You are mastering all words cleanly.
          </p>
        )}
      </div>

      {/* ACHIEVEMENTS CARDS MATRIX */}
      <div className="space-y-4">
        <h3 className="font-black text-slate-900 dark:text-white text-xl uppercase tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          <span>ACHIEVEMENTS</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-4xl border-3 transition-all flex items-start gap-3.5 ${
                ach.unlocked
                  ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                ach.unlocked ? 'bg-amber-100 dark:bg-amber-950 border border-amber-300' : 'bg-slate-200 dark:bg-slate-800'
              }`}>
                <span>{ach.icon}</span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{ach.title}</h4>
                  {!ach.unlocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">{ach.description}</p>
                {ach.unlocked && (
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mt-1.5">
                    ✓ UNLOCKED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
