import React, { useEffect, useState } from 'react';
import { Volume2, Sun, Gauge, Settings, Mic } from 'lucide-react';
import type { AppSettings, SpeechRate } from '../types';
import { speechService } from '../services/speechService';

interface SettingsPageProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetProgress: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const available = speechService.getAvailableVoices();
    setVoices(available);
  }, []);

  const handleTestVoice = () => {
    speechService.speak('Welcome to Lerafin Speak! Let us practice English together.', settings.speechRate);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24 animate-pop">
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Application Settings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize sound, speech speed, voices, and theme.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-brand-500" />
          <span>Audio & Voice Settings</span>
        </h3>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm block">Sound Effects</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Play audio prompts & victory sounds</span>
          </div>
          <button
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
              settings.soundEnabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
              settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-brand-500" />
            <span>Speech Speed</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['slow', 'normal', 'fast'] as SpeechRate[]).map((rate) => (
              <button
                key={rate}
                onClick={() => onUpdateSettings({ speechRate: rate })}
                className={`py-2.5 px-3 rounded-2xl font-bold text-xs capitalize transition-all border ${
                  settings.speechRate === rate
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>

        {voices.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-brand-500" />
              <span>Voice Accent</span>
            </label>
            <select
              value={settings.voiceURI || ''}
              onChange={(e) => {
                onUpdateSettings({ voiceURI: e.target.value });
                speechService.setVoice(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-xs outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleTestVoice}
            className="w-full py-2.5 px-4 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-xs hover:bg-brand-100 transition-colors flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Voice & Speed</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>Appearance & Preferences</span>
        </h3>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm block">Dark Theme</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Easy on the eyes in dark environments</span>
          </div>
          <button
            onClick={() => onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
              settings.theme === 'dark' ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
              settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm block">Daily Practice Reminders</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Streak alerts and practice notifications</span>
          </div>
          <button
            onClick={() => onUpdateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
            className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
              settings.notificationsEnabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
              settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

    </div>
  );
};
