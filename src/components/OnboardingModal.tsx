import React, { useState } from 'react';
import { Sparkles, User, GraduationCap, Calendar, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import type { StudentProfile, ClassLevel, AvatarChoice } from '../types';
import { CLASS_LEVELS } from '../data/wordsData';
import { soundFX } from '../utils/soundFx';

interface OnboardingModalProps {
  onComplete: (profile: StudentProfile) => void;
  existingProfile?: StudentProfile | null;
  onCancel?: () => void;
}

const AVATARS: { id: AvatarChoice; emoji: string; label: string; bg: string }[] = [
  { id: 'lion', emoji: '🦁', label: 'Brave Lion', bg: 'from-amber-400 to-orange-500' },
  { id: 'owl', emoji: '🦉', label: 'Wise Owl', bg: 'from-indigo-400 to-purple-600' },
  { id: 'rocket', emoji: '🚀', label: 'Star Cadet', bg: 'from-blue-400 to-indigo-600' },
  { id: 'star', emoji: '⭐', label: 'Super Star', bg: 'from-yellow-400 to-amber-500' },
  { id: 'bear', emoji: '🐻', label: 'Friendly Bear', bg: 'from-emerald-400 to-teal-600' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  onComplete,
  existingProfile,
  onCancel
}) => {
  const [name, setName] = useState(existingProfile?.name || '');
  const [age, setAge] = useState<number | ''>(existingProfile?.age || 10);
  const [classLevel, setClassLevel] = useState<ClassLevel>(existingProfile?.classLevel || 'Primary 5');
  const [avatarId, setAvatarId] = useState<AvatarChoice>(existingProfile?.avatarId || 'rocket');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!age || age < 4 || age > 20) {
      setError('Please enter a valid age (between 4 and 20).');
      return;
    }

    soundFX.playSuccess();

    const profile: StudentProfile = {
      id: existingProfile?.id || `student_${Date.now()}`,
      name: name.trim(),
      age: Number(age),
      classLevel,
      avatarId,
      currentDifficulty: existingProfile?.currentDifficulty || 1,
      createdAt: existingProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onComplete(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-pop overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden my-auto">
        
        {/* Glow backdrop decorative spots */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-brand-500/30 mb-3 animate-float">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Lerafin <span className="text-brand-600 dark:text-brand-400">Speak</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm mt-1">
            "Improve your English, one word at a time."
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Choose your Learner Mascot
            </label>
            <div className="flex items-center justify-center gap-3">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setAvatarId(av.id);
                  }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all relative ${
                    avatarId === av.id
                      ? 'scale-110 ring-4 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900 shadow-lg'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  } bg-gradient-to-tr ${av.bg}`}
                >
                  <span>{av.emoji}</span>
                  {avatarId === av.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 text-white rounded-full flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-500" />
              What is your name?
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name (e.g. Ibrahim)"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
          </div>

          {/* Age & Class Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-500" />
                Age
              </label>
              <input
                type="number"
                min={4}
                max={20}
                required
                placeholder="Age (e.g. 10)"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value ? Number(e.target.value) : '');
                  setError('');
                }}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-brand-500" />
                Class Level
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all cursor-pointer"
              >
                {CLASS_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Safe & Private. All practice data stays strictly on your device.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-1/3 py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-black shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 text-base transition-all btn-tactile"
            >
              <span>Continue to App</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
