import React, { useState, useEffect } from 'react';
import type { StudentProfile, UserStats, AppSettings, PracticeSession, WordAttempt, PracticeMode } from './types';
import { storageService } from './services/storageService';
import { soundFX } from './utils/soundFx';

import { SplashScreen } from './components/SplashScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { OnboardingModal } from './components/OnboardingModal';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNavigation } from './components/BottomNavigation';
import { InstallPrompt } from './components/InstallPrompt';
import { Toast } from './components/Toast';

import { Dashboard } from './pages/Dashboard';
import { PracticeHub } from './pages/PracticeHub';
import { PronunciationMode } from './pages/PronunciationMode';
import { SpellingMode } from './pages/SpellingMode';
import { LessonComplete } from './pages/LessonComplete';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [stats, setStats] = useState<UserStats>(storageService.getStats());
  const [settings, setSettings] = useState<AppSettings>(storageService.getSettings());

  const [currentRoute, setCurrentRoute] = useState<string>('/dashboard');
  const [activeSession, setActiveSession] = useState<PracticeSession | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = storageService.getProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    soundFX.setEnabled(settings.soundEnabled);
  }, [settings]);

  const handleFinishSplash = () => {
    setShowSplash(false);
    if (!profile) {
      setShowOnboarding(true);
    }
  };

  const handleFinishOnboardingFlow = () => {
    setShowOnboarding(false);
    setShowProfileSetup(true);
  };

  const handleSaveProfile = (newProfile: StudentProfile) => {
    storageService.saveProfile(newProfile);
    setProfile(newProfile);
    setShowProfileSetup(false);
    setToastMessage(`Welcome to SPELLON, ${newProfile.name}! 🎉`);
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  const handleStartPracticeMode = (mode: PracticeMode) => {
    soundFX.playClick();
    if (mode === 'pronunciation') {
      setCurrentRoute('/pronunciation');
    } else if (mode === 'spelling') {
      setCurrentRoute('/spelling');
    } else {
      setCurrentRoute('/pronunciation');
    }
  };

  const handleCompleteLesson = (attempts: WordAttempt[], mode: PracticeMode) => {
    if (!profile) return;

    const correctCount = attempts.filter(a => a.correct).length;
    const incorrectCount = attempts.length - correctCount;
    const accuracy = Math.round((correctCount / attempts.length) * 100);
    const xpEarned = attempts.reduce((acc, a) => acc + (a.xpEarned || 10), 0) + (accuracy >= 80 ? 50 : 20);

    const session: PracticeSession = {
      id: `session_${Date.now()}`,
      mode,
      classLevel: profile.classLevel,
      attempts,
      wordsCompletedCount: attempts.length,
      correctCount,
      incorrectCount,
      accuracy,
      pronunciationScore: mode === 'pronunciation' ? accuracy : 85,
      spellingScore: mode === 'spelling' ? accuracy : 90,
      xpEarned,
      durationSeconds: 120,
      createdAt: new Date().toISOString()
    };

    storageService.saveSession(session);
    setActiveSession(session);
    setStats(storageService.getStats());
    setProfile(storageService.getProfile());

    setCurrentRoute('/complete');
  };

  const handleResetAllData = () => {
    storageService.resetAllData();
    setProfile(null);
    setStats(storageService.getStats());
    setShowOnboarding(true);
    setCurrentRoute('/dashboard');
    setToastMessage("Data reset successfully.");
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleFinishSplash} />;
  }

  if (showOnboarding) {
    return <OnboardingFlow onFinishOnboarding={handleFinishOnboardingFlow} />;
  }

  if (showProfileSetup || !profile) {
    return (
      <OnboardingModal
        onComplete={handleSaveProfile}
        existingProfile={profile}
        onCancel={profile ? () => setShowProfileSetup(false) : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row">
      
      {/* Desktop Left Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        profile={profile}
        stats={stats}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <Header
          profile={profile}
          stats={stats}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onNavigate={setCurrentRoute}
        />

        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          
          {currentRoute === '/dashboard' && (
            <Dashboard
              profile={profile}
              stats={stats}
              onStartPractice={handleStartPracticeMode}
              onNavigate={setCurrentRoute}
              onEditProfile={() => setShowProfileSetup(true)}
            />
          )}

          {currentRoute === '/practice' && (
            <PracticeHub
              onStartPractice={handleStartPracticeMode}
            />
          )}

          {currentRoute === '/pronunciation' && (
            <PronunciationMode
              profile={profile}
              stats={stats}
              onCompleteLesson={(attempts) => handleCompleteLesson(attempts, 'pronunciation')}
              onExit={() => setCurrentRoute('/dashboard')}
              onSwitchToSpelling={() => setCurrentRoute('/spelling')}
            />
          )}

          {currentRoute === '/spelling' && (
            <SpellingMode
              profile={profile}
              stats={stats}
              onCompleteLesson={(attempts) => handleCompleteLesson(attempts, 'spelling')}
              onExit={() => setCurrentRoute('/dashboard')}
            />
          )}

          {currentRoute === '/complete' && activeSession && (
            <LessonComplete
              profile={profile}
              stats={stats}
              session={activeSession}
              onPracticeAgain={() => setCurrentRoute('/pronunciation')}
              onNextLesson={() => setCurrentRoute('/pronunciation')}
              onBackToDashboard={() => setCurrentRoute('/dashboard')}
            />
          )}

          {currentRoute === '/progress' && (
            <ProgressPage
              profile={profile}
              stats={stats}
              onStartPractice={handleStartPracticeMode}
            />
          )}

          {currentRoute === '/profile' && (
            <ProfilePage
              profile={profile}
              stats={stats}
              onEditProfile={() => setShowProfileSetup(true)}
              onNavigate={setCurrentRoute}
              onResetData={handleResetAllData}
            />
          )}

          {currentRoute === '/settings' && (
            <SettingsPage
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetData={handleResetAllData}
            />
          )}

        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation
          currentRoute={currentRoute}
          onNavigate={setCurrentRoute}
        />

      </div>

      <InstallPrompt />
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
};

export default App;
