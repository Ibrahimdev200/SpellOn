import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-brand-200 dark:border-brand-900/60 animate-pop">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
              Install Lerafin Speak App
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Practice offline anytime on your mobile device!
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all btn-tactile"
        >
          <Download className="w-4 h-4" />
          <span>Install Now</span>
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};
