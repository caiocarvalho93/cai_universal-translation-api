import React, { useState, useEffect } from 'react';
import { 
  LanguageProvider, 
  UniversalLanguageButton, 
  useLanguage, 
  useTranslation 
} from 'cai-universal-translation';
import './App.css';

// Example component using translation
function WelcomeSection() {
  const { t, currentLanguage, isTranslating } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState({});

  useEffect(() => {
    const translateTexts = async () => {
      const texts = {
        welcome: await t("Welcome to CAI Universal Translation"),
        description: await t("Experience seamless translation across 70+ languages"),
        features: await t("Features"),
        realtime: await t("Real-time Translation"),
        multilingual: await t("70+ Languages Support"),
        intelligent: await t("Intelligent Caching"),
        getStarted: await t("Get Started"),
        learnMore: await t("Learn More")
      };
      setTranslatedTexts(texts);
    };

    translateTexts();
  }, [currentLanguage, t]);

  return (
    <div className="welcome-section">
      <div className="hero">
        <h1 className="hero-title">
          {translatedTexts.welcome || "Welcome to CAI Universal Translation"}
          {isTranslating && <span className="loading">...</span>}
        </h1>
        <p className="hero-description">
          {translatedTexts.description || "Experience seamless translation across 70+ languages"}
        </p>
        <div className="language-indicator">
          <span>Current Language: <strong>{currentLanguage.toUpperCase()}</strong></span>
        </div>
      </div>

      <div className="features">
        <h2>{translatedTexts.features || "Features"}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>{translatedTexts.realtime || "Real-time Translation"}</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>{translatedTexts.multilingual || "70+ Languages Support"}</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>{translatedTexts.intelligent || "Intelligent Caching"}</h3>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <button className="cta-button primary">
          {translatedTexts.getStarted || "Get Started"}
        </button>
        <button className="cta-button secondary">
          {translatedTexts.learnMore || "Learn More"}
        </button>
      </div>
    </div>
  );
}

// Language statistics component
function LanguageStats() {
  const { availableLanguages, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const translateStats = async () => {
      setStats({
        title: await t("Translation Statistics"),
        totalLanguages: await t("Total Languages"),
        currentLang: await t("Current Language"),
        supportedRegions: await t("Supported Regions")
      });
    };
    translateStats();
  }, [currentLanguage, t]);

  return (
    <div className="language-stats">
      <h3>{stats.title || "Translation Statistics"}</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{availableLanguages.length}</div>
          <div className="stat-label">{stats.totalLanguages || "Total Languages"}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{currentLanguage.toUpperCase()}</div>
          <div className="stat-label">{stats.currentLang || "Current Language"}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">6</div>
          <div className="stat-label">{stats.supportedRegions || "Supported Regions"}</div>
        </div>
      </div>
    </div>
  );
}

// Interactive translation demo
function TranslationDemo() {
  const { translateText, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("Hello, how are you today?");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [demoTitle, setDemoTitle] = useState("");

  useEffect(() => {
    const translateTitle = async () => {
      setDemoTitle(await t("Try Live Translation"));
    };
    translateTitle();
  }, [currentLanguage, t]);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await translateText(inputText, currentLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inputText) {
      handleTranslate();
    }
  }, [currentLanguage]);

  return (
    <div className="translation-demo">
      <h3>{demoTitle || "Try Live Translation"}</h3>
      <div className="demo-container">
        <div className="input-section">
          <label>English Text:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
            rows={3}
          />
          <button onClick={handleTranslate} disabled={isLoading}>
            {isLoading ? "Translating..." : "Translate"}
          </button>
        </div>
        <div className="output-section">
          <label>Translated ({currentLanguage.toUpperCase()}):</label>
          <div className="translation-output">
            {isLoading ? (
              <div className="loading-spinner">Translating...</div>
            ) : (
              translatedText || "Translation will appear here..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App component
function AppContent() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">CAI Translation</span>
          </div>
          <div className="header-tagline">ONE LOVE</div>
        </div>
      </header>

      <main className="app-main">
        <WelcomeSection />
        <LanguageStats />
        <TranslationDemo />
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ by CAI Intelligence Network</p>
        <p>Connecting the world through language</p>
      </footer>
    </div>
  );
}

// Root App with LanguageProvider
function App() {
  return (
    <LanguageProvider apiBaseUrl="http://localhost:3000">
      <UniversalLanguageButton />
      <AppContent />
    </LanguageProvider>
  );
}

export default App;