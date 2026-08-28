# Lerafin Speak (SpellOn) 🎓🎤⌨️

> **Tagline:** Learn. Speak. Improve.  
> **Project Purpose:** A modern, child-friendly educational web application and Progressive Web App (PWA) designed to help students improve English vocabulary, pronunciation, listening, and spelling.

---

## 🌟 Key Features

1. **Child-Friendly Onboarding**:
   - Learner profile creation storing Name, Age, and Class Level (Primary 1–6, JSS 1–3).
   - Local persistence via `LocalStorage` / `IndexedDB`.
   - Ability to edit profile or reset learning progress anytime in Settings & Profile.

2. **Automatic Class-Based Word Database**:
   - Structured word database covering all 9 educational class levels (Primary 1–6 & JSS 1–3).
   - Each word entry contains phonetic guide, category, meaning, and example sentence.

3. **Interactive Pronunciation Mode**:
   - Audio pronunciation of target words powered by the browser's `SpeechSynthesis` API.
   - Microphone speech input capturing powered by browser `SpeechRecognition` API.
   - Gracious error handling for missing/denied microphone permissions with seamless fallback to Typing Mode.
   - Normalized text fuzzy match scoring yielding percentage scores, star ratings (1–5 ⭐), visual badges, and encouraging feedback.
   - Decoupled `pronunciationService` abstraction ready for future professional AI assessment APIs.

4. **Spelling / Typing Practice Mode**:
   - Listening exercise where target word is hidden initially.
   - Audio playback button ("Play Word") with normal and slow speech speeds.
   - Real-time spelling checking, instant feedback, hints, and attempt counting.

5. **Adaptive Learning Engine**:
   - Dynamically adapts word difficulty based on student performance.
   - Scores < 60% repeat current difficulty; 60–79% maintain level; 80–89% mix harder words; 90%+ introduce advanced vocabulary.
   - "Words to Practice" spaced repetition algorithm tracking words missed in past sessions.

6. **Student Dashboard & Analytics**:
   - Daily progress bar (10 words daily goal), streak counter, total words, accuracy averages, and achievement previews.
   - Unlocked badges matrix (First Lesson, 3-Day Streak, 50 Words, 90% Accuracy, Vocabulary Builder, etc.).

7. **PWA & Android APK Ready**:
   - Web App Manifest (`manifest.json`), service worker (`sw.js`) offline caching, theme colors, and custom installation prompt.
   - Designed for easy conversion into an Android APK using [Capacitor](https://capacitorjs.com/).

---

## 🛠️ Technology Stack

- **Framework:** React 18 / 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vanilla CSS design system, dark mode, glassmorphism, responsive mobile-first UI)
- **Icons:** Lucide React
- **Celebrations:** Canvas-Confetti
- **Audio APIs:** Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition` / `SpeechRecognition`)
- **Storage:** LocalStorage / IndexedDB persistence layer

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Run

1. Clone or open the project folder:
   ```bash
   cd spellON
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

---

## 🎤 Testing Microphone & Speech Recognition

1. Open **Pronunciation Mode** on a modern browser (Google Chrome, Microsoft Edge, Safari, or Chrome for Android).
2. Click **"Tap & Speak"**.
3. When prompted, allow microphone access.
4. Speak the target word clearly into your device microphone.
5. If microphone access is denied or unsupported on a desktop device without a mic, click **"Use Typing Mode Instead"** to continue without interruption.

---

## 📱 Packaging as an Android APK using Capacitor

To convert **Lerafin Speak** into a native Android APK:

1. Build the production web bundle:
   ```bash
   npm run build
   ```

2. Install Capacitor CLI and core packages:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```

3. Initialize Capacitor in your project:
   ```bash
   npx cap init "Lerafin Speak" "com.lerafinspeak.app" --web-dir dist
   ```

4. Add the Android platform:
   ```bash
   npx cap add android
   ```

5. Copy web assets to the native Android folder:
   ```bash
   npx cap copy android
   ```

6. Open Android Studio to build the APK:
   ```bash
   npx cap open android
   ```

7. In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate `app-debug.apk`.

---

## 🔌 Future Backend & Pronunciation API Integration

### 1. Pronunciation Assessment API
The current MVP utilizes `src/services/pronunciationService.ts` as an abstraction. To integrate a dedicated phoneme-level pronunciation API (such as Azure Speech Assessment API or SpeechSuper):
- Update `pronunciationService.assessPronunciation(targetWord, audioBuffer)` to send the recorded audio blob to your backend/API endpoint.
- Parse phoneme scores, fluency, and accuracy returned by the API into the `PronunciationResult` structure without changing any UI components.

### 2. Backend Database (Supabase / PostgreSQL)
The storage layer (`src/services/storageService.ts`) is decoupled. To add cloud synchronization for schools and teachers:
- Replace `storageService` calls with Supabase / Firebase SDK queries.
- Structure school entities as:
  ```
  School -> Teachers -> Classes -> Students -> PracticeSessions
  ```
