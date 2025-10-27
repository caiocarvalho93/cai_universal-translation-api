/**
 * 🌍 CAI Universal Translation System - React Package
 * 
 * Complete React translation system with beautiful UI components
 * Built by CAI with love for the developer community
 * 
 * Features:
 * - 50+ languages with native names and flags
 * - Beautiful glassmorphism UI design
 * - Smart caching for performance
 * - ONE LOVE appreciation system
 * - Mobile responsive design
 * - Zero configuration required
 * 
 * Usage:
 * 1. npm install framer-motion lucide-react
 * 2. Copy this entire file to your project
 * 3. Import and use the components
 * 
 * @author CAI
 * @license MIT
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Heart } from 'lucide-react';

// Language Context for managing translation state
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation cache for performance optimization
const translationCache = new Map();

/**
 * Language Provider Component
 * Wrap your app with this to enable translation functionality
 */
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('cai_preferred_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Change language and persist preference
  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('cai_preferred_language', languageCode);
  };

  // CAI's translation engine with smart caching
  const translateText = async (text, targetLanguage = currentLanguage) => {
    if (targetLanguage === 'en' || !text) return text;

    const cacheKey = `cai_${text}_${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    setIsTranslating(true);
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLanguage,
          appName: 'React App'
        }),
      });

      const data = await response.json();
      if (data.success) {
        const translatedText = data.translation.translatedText;
        translationCache.set(cacheKey, translatedText);
        return translatedText;
      }
    } catch (error) {
      console.warn('CAI Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }

    return text; // Graceful fallback
  };

  const value = {
    currentLanguage,
    changeLanguage,
    translateText,
    isTranslating,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * TranslatedText Component
 * Automatically translates text content based on current language
 */
export const TranslatedText = ({ children, className, style, ...props }) => {
  const { currentLanguage, translateText } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslation = async () => {
      if (currentLanguage === 'en' || !children) {
        setTranslatedText(children);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(children, currentLanguage);
        setTranslatedText(translated);
      } catch (error) {
        console.warn('Translation failed:', error);
        setTranslatedText(children);
      } finally {
        setIsLoading(false);
      }
    };

    performTranslation();
  }, [children, currentLanguage, translateText]);

  return (
    <span 
      className={className} 
      style={{
        ...style,
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
      }}
      {...props}
    >
      {translatedText}
    </span>
  );
};

/**
 * CAI Language Selector Component
 * Beautiful floating language selector with ONE LOVE appreciation system
 */
export const CAILanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [thanksCount, setThanksCount] = useState(0);
  const [showThanks, setShowThanks] = useState(false);

  // Fetch supported languages and load thanks count
  useEffect(() => {
    // Fetch supported languages from CAI's API
    fetch('YOUR_API_ENDPOINT_HERE/api/languages')
      .then(res => res.json())
      .then(data => setLanguages(data.languages || []))
      .catch(error => console.warn('Failed to fetch languages:', error));

    // Load thanks count from local storage
    const saved = localStorage.getItem('cai_thanks_count');
    if (saved) setThanksCount(parseInt(saved));
  }, []);

  // Send thanks to CAI's tracking system
  // Thanks functionality removed - developers use their own independent system

  // Handle thanks button click
  const handleThanks = () => {
    const newCount = thanksCount + 1;
    setThanksCount(newCount);
    localStorage.setItem('cai_thanks_count', newCount.toString());
    setShowThanks(true);
    sendThanks();
    setTimeout(() => setShowThanks(false), 3000);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage) || 
    languages[0] || 
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    }}>
      {/* ONE LOVE Thanks Button */}
      <motion.button
        onClick={handleThanks}
        style={{
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
          border: 'none',
          borderRadius: '25px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '11px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        animate={showThanks ? { scale: [1, 1.2, 1] } : {}}
      >
        <Heart size={12} />
        ONE LOVE
        {thanksCount > 0 && (
          <span style={{
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '9px',
          }}>
            {thanksCount}
          </span>
        )}
      </motion.button>

      {/* Language Selector */}
      <div style={{ position: 'relative' }}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: '25px',
            padding: '10px 16px',
            color: 'white',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '130px',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe size={14} />
          <span style={{ fontSize: '16px' }}>{currentLang.flag}</span>
          <span>{currentLang.native}</span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(2px)',
                  zIndex: 9999,
                }}
                onClick={() => setIsOpen(false)}
              />

              {/* Language Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '15px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  minWidth: '280px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 10000,
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    🌍 CAI Universal Translator
                  </div>
                  <div style={{ fontSize: '10px', opacity: 0.9, marginTop: '2px' }}>
                    Travel the world through languages
                  </div>
                </div>

                {/* Language List */}
                <div style={{ padding: '8px' }}>
                  {languages.map((language) => (
                    <motion.button
                      key={language.code}
                      onClick={() => {
                        changeLanguage(language.code);
                        setIsOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: currentLanguage === language.code 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                          : 'transparent',
                        color: currentLanguage === language.code ? 'white' : '#333',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        borderRadius: '8px',
                        margin: '2px 0',
                      }}
                      whileHover={{
                        background: currentLanguage === language.code 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                          : 'rgba(102, 126, 234, 0.1)',
                      }}
                    >
                      <span style={{ fontSize: '18px', minWidth: '24px' }}>
                        {language.flag}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold' }}>{language.native}</div>
                        <div style={{ fontSize: '11px', opacity: 0.7 }}>
                          {language.name}
                        </div>
                      </div>
                      {currentLanguage === language.code && (
                        <span style={{ fontSize: '12px' }}>✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  textAlign: 'center',
                  fontSize: '10px',
                  color: '#666',
                }}>
                  Made with ❤️ by CAI • ONE LOVE 🌍
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Thanks Animation */}
      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            style={{
              position: 'absolute',
              top: '-60px',
              right: '0',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
              textAlign: 'center',
              minWidth: '200px',
            }}
          >
            <div>Thanks sent to CAI! 🎉</div>
            <div style={{ fontSize: '10px', opacity: 0.9, marginTop: '4px' }}>
              ONE LOVE - Travel through languages
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Export all components for easy importing
export default {
  LanguageProvider,
  CAILanguageSelector,
  TranslatedText,
  useLanguage,
};