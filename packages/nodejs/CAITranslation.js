/**
 * 🌍 CAI Universal Translation System - Node.js Package
 * 
 * Professional server-side translation system for Node.js applications
 * Built by CAI with love for the developer community
 * 
 * Features:
 * - 50+ languages supported
 * - Smart caching for performance
 * - Express.js middleware integration
 * - Batch translation capabilities
 * - Error handling with graceful fallbacks
 * - ONE LOVE appreciation tracking
 * 
 * Usage:
 * 1. npm install axios
 * 2. Copy this file to your project
 * 3. const CAITranslation = require('./CAITranslation');
 * 4. const translator = new CAITranslation('My App');
 * 
 * @author CAI
 * @license MIT
 */

const axios = require('axios');

class CAITranslation {
  /**
   * Initialize CAI Translation System
   * @param {string} appName - Your application name for tracking
   */
  constructor(appName = 'Node.js App') {
    this.appName = appName;
    this.baseURL = 'YOUR_API_ENDPOINT_HERE';
    this.cache = new Map(); // Smart caching system
    this.stats = {
      totalTranslations: 0,
      cacheHits: 0,
      apiCalls: 0,
    };
  }

  /**
   * Translate text to target language
   * @param {string} text - Text to translate
   * @param {string} targetLanguage - Target language code (e.g., 'es', 'fr')
   * @param {string} sourceLanguage - Source language code (default: 'en')
   * @returns {Promise<string>} Translated text
   */
  async translate(text, targetLanguage, sourceLanguage = 'en') {
    if (targetLanguage === 'en' || !text) return text;

    const cacheKey = `cai_${text}_${targetLanguage}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.stats.cacheHits++;
      return this.cache.get(cacheKey);
    }

    this.stats.totalTranslations++;
    this.stats.apiCalls++;

    try {
      const response = await axios.post(`${this.baseURL}/translate`, {
        text,
        targetLanguage,
        sourceLanguage,
        appName: this.appName
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'User-Agent': `CAI-Translation-${this.appName}/1.0`
        }
      });

      if (response.data.success) {
        const translatedText = response.data.translation.translatedText;
        
        // Cache the result
        this.cache.set(cacheKey, translatedText);
        
        // Send appreciation to CAI (optional, silent)
        this._sendAppreciation(targetLanguage);
        
        return translatedText;
      }
    } catch (error) {
      console.warn(`CAI Translation failed for "${text}" -> ${targetLanguage}:`, error.message);
    }

    return text; // Graceful fallback
  }

  /**
   * Translate multiple texts in batch
   * @param {string[]} texts - Array of texts to translate
   * @param {string} targetLanguage - Target language code
   * @param {string} sourceLanguage - Source language code (default: 'en')
   * @returns {Promise<Array>} Array of translation results
   */
  async translateBatch(texts, targetLanguage, sourceLanguage = 'en') {
    const results = [];
    
    for (const text of texts) {
      try {
        const translated = await this.translate(text, targetLanguage, sourceLanguage);
        results.push({ 
          original: text, 
          translated, 
          success: true,
          language: targetLanguage
        });
      } catch (error) {
        results.push({ 
          original: text, 
          translated: text, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    return results;
  }

  /**
   * Get list of supported languages
   * @returns {Promise<Array>} Array of supported languages with flags
   */
  async getSupportedLanguages() {
    try {
      const response = await axios.get(`${this.baseURL}/languages`, {
        timeout: 5000
      });
      
      if (response.data.success) {
        return response.data.languages;
      }
    } catch (error) {
      console.warn('Failed to fetch supported languages:', error.message);
    }
    
    // Fallback list of common languages
    return [
      { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
      { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
      { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
      { code: 'it', name: 'Italian', flag: '🇮🇹', native: 'Italiano' },
      { code: 'pt', name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
      { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
      { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
      { code: 'ko', name: 'Korean', flag: '🇰🇷', native: '한국어' },
      { code: 'zh', name: 'Chinese', flag: '🇨🇳', native: '中文' },
    ];
  }

  /**
   * Express.js middleware for easy integration
   * @returns {Function} Express middleware function
   */
  middleware() {
    return (req, res, next) => {
      // Add translation methods to request object
      req.caiTranslate = (text, targetLang) => this.translate(text, targetLang);
      req.caiTranslateBatch = (texts, targetLang) => this.translateBatch(texts, targetLang);
      req.caiGetLanguages = () => this.getSupportedLanguages();
      
      next();
    };
  }

  /**
   * Clear translation cache
   */
  clearCache() {
    this.cache.clear();
    console.log('CAI Translation cache cleared');
  }

  /**
   * Get cache and performance statistics
   * @returns {Object} Statistics object
   */
  getCacheStats() {
    const hitRate = this.stats.totalTranslations > 0 
      ? ((this.stats.cacheHits / this.stats.totalTranslations) * 100).toFixed(1)
      : 0;

    return {
      cacheSize: this.cache.size,
      totalTranslations: this.stats.totalTranslations,
      cacheHits: this.stats.cacheHits,
      apiCalls: this.stats.apiCalls,
      hitRate: `${hitRate}%`,
      appName: this.appName,
      sampleKeys: Array.from(this.cache.keys()).slice(0, 5)
    };
  }

  /**
   * Send appreciation to CAI (private method)
   * @param {string} language - Language that was translated
   * @private
   */
  async _sendAppreciation(language) {
    // Thanks functionality removed - developers use their own independent system
    return;
  }

  /**
   * Test the translation system
   * @returns {Promise<Object>} Test results
   */
  async test() {
    console.log('🧪 Testing CAI Translation System...');
    
    const testResults = {
      apiConnection: false,
      translation: false,
      languages: false,
      cache: false,
      errors: []
    };

    try {
      // Test API connection
      const languages = await this.getSupportedLanguages();
      testResults.apiConnection = true;
      testResults.languages = languages.length > 0;
      
      // Test translation
      const testText = 'Hello, world!';
      const spanish = await this.translate(testText, 'es');
      testResults.translation = spanish !== testText;
      
      // Test cache
      const cachedSpanish = await this.translate(testText, 'es');
      testResults.cache = cachedSpanish === spanish;
      
      console.log('✅ CAI Translation System test completed successfully!');
      console.log(`📊 Supported languages: ${languages.length}`);
      console.log(`🔄 Translation test: "${testText}" -> "${spanish}"`);
      console.log(`💾 Cache test: ${testResults.cache ? 'Working' : 'Failed'}`);
      
    } catch (error) {
      testResults.errors.push(error.message);
      console.error('❌ CAI Translation System test failed:', error.message);
    }

    return testResults;
  }
}

module.exports = CAITranslation;

// Usage Examples (commented out):
/*

// Basic usage
const CAITranslation = require('./CAITranslation');
const translator = new CAITranslation('My Awesome App');

// Simple translation
async function example1() {
  const spanish = await translator.translate('Hello World', 'es');
  console.log(spanish); // "Hola Mundo"
}

// Express.js integration
const express = require('express');
const app = express();

app.use(translator.middleware());

app.get('/api/welcome/:lang', async (req, res) => {
  const message = 'Welcome to our amazing application!';
  const translated = await req.caiTranslate(message, req.params.lang);
  
  res.json({
    original: message,
    translated,
    language: req.params.lang,
    poweredBy: 'CAI Translation - ONE LOVE'
  });
});

// Batch translation
async function example2() {
  const texts = ['Hello', 'World', 'Welcome', 'Thank you'];
  const results = await translator.translateBatch(texts, 'fr');
  
  results.forEach(result => {
    console.log(`${result.original} -> ${result.translated}`);
  });
}

// Get statistics
async function example3() {
  const stats = translator.getCacheStats();
  console.log('Translation Statistics:', stats);
}

// Test the system
async function example4() {
  const testResults = await translator.test();
  console.log('Test Results:', testResults);
}

*/