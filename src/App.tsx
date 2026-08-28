import { useEffect, useState } from 'react';
import type { StudentProfile, UserStats, AppSettings, Achievement, PracticeSession, WordAttempt } from './types';
import { storageService } from './services/storageService';
import { adaptiveEngine } from './services/adaptiveEngine';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { OnboardingModal } from './components/OnboardingModal';
import { InstallPrompt } from './components/InstallPrompt';
import { Toast } from './components/Toast';

import { Dashboard } from './pages/Dashboard';
import { PronunciationMode } from './pages/PronunciationMode';
import { SpellingMode } from './pages/SpellingMode';
import { LessonComplete } from './pages/LessonComplete';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [stats, setStats] = useState<UserStats>(storageService.getStats());
  const [settings, setSettings] = useState<AppSettings>(storageService.getSettings());
  const [achievements, setAchievements] = useState<Achievement[]>(storageService.getAchievements());
  const [sessions, setSessions] = useState<PracticeSession[]>(storageService.getSessions());

  const [currentRoute, setCurrentRoute] = useState<string>('/dashboard');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [lastSession, setLastSession] = useState<PracticeSession | null>(null);
  const [unlockedToast, setUnlockedToast] = useState<Achievement | null>(null);

  useEffect(() => {
    const savedProfile = storageService.getProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleOnboardingComplete = (newProfile: StudentProfile) => {
    storageService.saveProfile(newProfile);
    setProfile(newProfile);
    setShowOnboarding(false);
    setCurrentRoute('/dashboard');
  };

  const handleUpdateSettings = (newSettingsPartial: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettingsPartial };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  const handleCompleteLesson = (mode: 'pronunciation' | 'spelling', attempts: WordAttempt[]) => {
    if (!profile) return;

    const wordsCount = attempts.length;
    const correctCount = attempts.filter(a => a.correct).length;
    const incorrectCount = wordsCount - correctCount;
    const accuracy = Math.round((correctCount / (wordsCount || 1)) * 100);

    const avgScore = Math.round(
      attempts.reduce((acc, curr) => acc + curr.score, 0) / (wordsCount || 1)
    );

    const session: PracticeSession = {
      id: `sess_${Date.now()}`,
      mode,
      classLevel: profile.classLevel,
      attempts,
      wordsCompletedCount: wordsCount,
      correctCount,
      incorrectCount,
      accuracy,
      pronunciationScore: mode === 'pronunciation' ? avgScore : stats.averagePronunciationScore,
      spellingScore: mode === 'spelling' ? avgScore : stats.averageSpellingScore,
      durationSeconds: 120,
      createdAt: new Date().toISOString()
    };

    storageService.saveSession(session);

    const updatedStats = storageService.getStats();
    setStats(updatedStats);
    setSessions(storageService.getSessions());

    const updatedProfile = adaptiveEngine.updateAdaptiveDifficulty(profile, accuracy);
    setProfile(updatedProfile);

    const newlyUnlocked = storageService.checkAndUnlockAchievements(updatedStats, session);
    setAchievements(storageService.getAchievements());
    if (newlyUnlocked.length > 0) {
      setUnlockedToast(newlyUnlocked[0]);
    }

    setLastSession(session);
    setCurrentRoute('/lesson-complete');
  };

  const handleResetProgress = () => {
    const freshStats: UserStats = {
      totalWordsPracticed: 0,
      totalLessonsCompleted: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageAccuracy: 0,
      averagePronunciationScore: 0,
      averageSpellingScore: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      wordsToPractice: []
    };
    storageService.saveStats(freshStats);
    setStats(freshStats);
    setSessions([]);
    localStorage.removeItem('lerafin_speak_sessions');
  };

  const handleResetProfile = () => {
    storageService.resetAllData();
    setProfile(null);
    setShowOnboarding(true);
    setStats(storageService.getStats());
    setSessions([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      <Header
        profile={profile}
        stats={stats}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onNavigate={(route) => setCurrentRoute(route)}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        
        {showOnboarding && (
          <OnboardingModal
            existingProfile={profile}
            onComplete={handleOnboardingComplete}
            onCancel={profile ? () => setShowOnboarding(false) : undefined}
          />
        )}

        {profile && !showOnboarding && (
          <>
            {currentRoute === '/dashboard' && (
              <Dashboard
                profile={profile}
                stats={stats}
                onStartPractice={(mode) => setCurrentRoute(mode === 'pronunciation' ? '/pronunciation' : '/spelling')}
                onNavigate={(route) => setCurrentRoute(route)}
                onEditProfile={() => setShowOnboarding(true)}
              />
            )}

            {currentRoute === '/pronunciation' && (
              <PronunciationMode
                profile={profile}
                stats={stats}
                onCompleteLesson={(attempts) => handleCompleteLesson('pronunciation', attempts)}
                onExit={() => setCurrentRoute('/dashboard')}
                onSwitchToSpelling={() => setCurrentRoute('/spelling')}
              />
            )}

            {currentRoute === '/spelling' && (
              <SpellingMode
                profile={profile}
                stats={stats}
                onCompleteLesson={(attempts) => handleCompleteLesson('spelling', attempts)}
                onExit={() => setCurrentRoute('/dashboard')}
              />
            )}

            {currentRoute === '/lesson-complete' && lastSession && (
              <LessonComplete
                profile={profile}
                stats={stats}
                session={lastSession}
                onPracticeAgain={() => setCurrentRoute(lastSession.mode === 'pronunciation' ? '/pronunciation' : '/spelling')}
                onNextLesson={() => setCurrentRoute('/pronunciation')}
                onBackToDashboard={() => setCurrentRoute('/dashboard')}
              />
            )}

            {currentRoute === '/progress' && (
              <ProgressPage
                profile={profile}
                stats={stats}
                achievements={achievements}
                sessions={sessions}
                onStartPractice={(mode) => setCurrentRoute(mode === 'pronunciation' ? '/pronunciation' : '/spelling')}
              />
            )}

            {currentRoute === '/profile' && (
              <ProfilePage
                profile={profile}
                stats={stats}
                onEditProfile={() => setShowOnboarding(true)}
                onResetProgress={handleResetProgress}
                onResetProfile={handleResetProfile}
              />
            )}

            {currentRoute === '/settings' && (
              <SettingsPage
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onResetProgress={handleResetProgress}
              />
            )}
          </>
        )}

      </main>

      <InstallPrompt />

      <Toast
        achievement={unlockedToast}
        onClose={() => setUnlockedToast(null)}
      />

      {profile && !showOnboarding && (
        <BottomNavigation
          currentRoute={currentRoute}
          onNavigate={(route) => setCurrentRoute(route)}
        />
      )}

    </div>
  );
}

export default App;
