import React, { useState, useEffect } from 'react';
import { Volume2, Moon, Sun, RotateCcw, Check, Sparkles } from 'lucide-react';
import type { AppSettings, SpeechRate } from '../types';
import { speechService } from '../services/speechService';
import { soundFX } from '../utils/soundFx';

interface SettingsPageProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  onResetData
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const availableVoices = speechService.getVoices();
    setVoices(availableVoices);
  }, []);

  const handleTestVoice = () => {
    soundFX.playClick();
    speechService.speak('SPELLON. Learn. Speak. Improve.');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-pop">
      
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          Settings
        </h2>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
          Customize your speech voice, sound effects, theme, and application preferences.
        </p>
      </div>

      {/* Audio & Speech Controls */}
      <div className="game-panel p-6 shadow-xl space-y-5">
        <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2 uppercase tracking-wide">
          <Volume2 className="w-5 h-5 text-indigo-500" />
          <span>Speech & Sound Controls</span>
        </h3>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-slate-900 dark:text-white text-sm block">Sound Effects</span>
            <span className="text-xs font-bold text-slate-400">Play button clicks, success chimes, and fanfare sounds</span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ soundEnabled: !settings.soundEnabled });
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${
              settings.soundEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
              settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Speech Speed Rate */}
        <div>
          <span className="font-black text-slate-900 dark:text-white text-sm block mb-2">Speech Pronunciation Speed</span>
          <div className="grid grid-cols-3 gap-3">
            {(['slow', 'normal', 'fast'] as SpeechRate[]).map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  soundFX.playClick();
                  onUpdateSettings({ speechRate: rate });
                }}
                className={`py-3 rounded-2xl font-black text-xs uppercase transition-all border-2 ${
                  settings.speechRate === rate
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Selector */}
        {voices.length > 0 && (
          <div>
            <span className="font-black text-slate-900 dark:text-white text-sm block mb-1.5">Audio Voice</span>
            <select
              value={settings.voiceURI || ''}
              onChange={(e) => {
                soundFX.playClick();
                onUpdateSettings({ voiceURI: e.target.value || null });
                speechService.setVoice(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs outline-none cursor-pointer"
            >
              <option value="">Default System Voice</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>

            <button
              onClick={handleTestVoice}
              className="mt-3 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Voice Audio</span>
            </button>
          </div>
        )}
      </div>

      {/* Theme Appearance */}
      <div className="game-panel p-6 shadow-xl space-y-4">
        <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2 uppercase tracking-wide">
          <Moon className="w-5 h-5 text-indigo-500" />
          <span>App Appearance</span>
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ theme: 'light' });
            }}
            className={`p-4 rounded-3xl border-3 font-black text-xs flex items-center justify-between ${
              settings.theme === 'light'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-900'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Light Mode</span>
            </div>
            {settings.theme === 'light' && <Check className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onUpdateSettings({ theme: 'dark' });
            }}
            className={`p-4 rounded-3xl border-3 font-black text-xs flex items-center justify-between ${
              settings.theme === 'dark'
                ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-400" />
              <span>Dark Mode</span>
            </div>
            {settings.theme === 'dark' && <Check className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="game-panel p-6 shadow-xl border-2 border-rose-200 dark:border-rose-950">
        <h3 className="font-black text-rose-600 dark:text-rose-400 text-base mb-2 uppercase tracking-wide">
          Reset Data
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-4">
          Reset all profile setup, practice session stats, streak count, and local storage data.
        </p>

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all SPELLON data?")) {
              soundFX.playError();
              onResetData();
            }
          }}
          className="btn-game py-3 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Profile Data</span>
        </button>
      </div>

    </div>
  );
};
