import React, { useState } from 'react';
import { User, Calendar, GraduationCap, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import type { StudentProfile, ClassLevel, AvatarStyle } from '../types';
import { soundFX } from '../utils/soundFx';

interface OnboardingModalProps {
  onComplete: (profile: StudentProfile) => void;
  existingProfile?: StudentProfile | null;
  onCancel?: () => void;
}

const PRIMARY_CLASSES: ClassLevel[] = [
  'Primary 1',
  'Primary 2',
  'Primary 3',
  'Primary 4',
  'Primary 5',
  'Primary 6'
];

const JSS_CLASSES: ClassLevel[] = [
  'JSS 1',
  'JSS 2',
  'JSS 3'
];

const AVATARS: { id: AvatarStyle; emoji: string; label: string; bg: string }[] = [
  { id: 'Boy', emoji: '👦', label: 'Boy', bg: 'from-blue-400 to-indigo-500' },
  { id: 'Girl', emoji: '👧', label: 'Girl', bg: 'from-pink-400 to-rose-500' },
  { id: 'Student', emoji: '🧑‍🎓', label: 'Student', bg: 'from-purple-400 to-indigo-600' },
  { id: 'Explorer', emoji: '🧭', label: 'Explorer', bg: 'from-emerald-400 to-teal-600' },
  { id: 'Reader', emoji: '📚', label: 'Reader', bg: 'from-amber-400 to-orange-500' },
  { id: 'Speaker', emoji: '🎤', label: 'Speaker', bg: 'from-violet-400 to-purple-600' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  onComplete,
  existingProfile,
  onCancel
}) => {
  const [name, setName] = useState(existingProfile?.name || '');
  const [age, setAge] = useState<number | ''>(existingProfile?.age || 10);
  const [classLevel, setClassLevel] = useState<ClassLevel>(existingProfile?.classLevel || 'Primary 5');
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>(existingProfile?.avatarStyle || 'Student');
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
      avatarStyle,
      currentDifficulty: existingProfile?.currentDifficulty || 1,
      xp: existingProfile?.xp || 320,
      createdAt: existingProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onComplete(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-pop overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-slate-100 dark:border-slate-800 relative overflow-hidden my-auto">
        
        {/* Glow ambient background spot */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Let's get to know you
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-xs sm:text-sm mt-1">
            Set up your SPELLON profile to get customized word recommendations.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Select Your Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setAvatarStyle(av.id);
                  }}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-2xl transition-all relative ${
                    avatarStyle === av.id
                      ? 'scale-105 ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 shadow-md'
                      : 'opacity-70 hover:opacity-100'
                  } bg-gradient-to-tr ${av.bg}`}
                >
                  <span>{av.emoji}</span>
                  {avatarStyle === av.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Age Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-500" />
                Student Name
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
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Age
              </label>
              <input
                type="number"
                min={4}
                max={20}
                required
                placeholder="Age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value ? Number(e.target.value) : '');
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Selectable Class Cards Grouped by PRIMARY & JSS */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              Select Educational Class Level
            </label>

            {/* Primary Section */}
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                PRIMARY SCHOOL
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRIMARY_CLASSES.map((lvl) => {
                  const isSelected = classLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setClassLevel(lvl);
                      }}
                      className={`p-2.5 rounded-2xl font-black text-xs transition-all relative text-center border-2 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      {lvl.replace('Primary ', 'P')}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* JSS Section */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                JUNIOR SECONDARY
              </span>
              <div className="grid grid-cols-3 gap-2">
                {JSS_CLASSES.map((lvl) => {
                  const isSelected = classLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setClassLevel(lvl);
                      }}
                      className={`p-3 rounded-2xl font-black text-xs transition-all relative text-center border-2 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      {lvl}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Safe for children. Profile data stays saved locally on your device.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-1/3 py-3.5 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn-game btn-game-indigo flex-1 py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2"
            >
              <span>Continue →</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
