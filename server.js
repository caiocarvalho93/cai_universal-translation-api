const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('rate-limiter-flexible');
const NodeCache = require('node-cache');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Translation cache - 1 hour TTL
const translationCache = new NodeCache({ stdTTL: 3600 });

// Rate limiting
const rateLimiter = new rateLimit.RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: process.env.RATE_LIMIT_POINTS || 100,
  duration: process.env.RATE_LIMIT_DURATION || 60,
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting middleware
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({
      success: false,
      error: 'Too many requests',
      retryAfter: Math.round(rejRes.msBeforeNext / 1000)
    });
  }
});

// Supported languages - 70+ languages
const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'br', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'pl', 'nl',
  'sv', 'da', 'no', 'fi', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl', 'et', 'lv', 'lt', 'mt',
  'el', 'cy', 'ga', 'eu', 'ca', 'gl', 'th', 'vi', 'id', 'ms', 'tl', 'he', 'fa', 'ur', 'bn',
  'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ne', 'si', 'my', 'km', 'lo', 'ka', 'hy', 'az',
  'kk', 'ky', 'uz', 'mn', 'am', 'sw', 'zu', 'af', 'xh', 'yo', 'ig', 'ha', 'so', 'rw', 'lg',
  'sn', 'ny', 'mg', 'es-AR', 'es-CL', 'es-UY', 'es-MX', 'es-CO'
];

// Language name mapping for better OpenAI prompts
const LANGUAGE_NAMES = {
  'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'it': 'Italian',
  'pt': 'Portuguese', 'br': 'Brazilian Portuguese', 'ru': 'Russian', 'ja': 'Japanese',
  'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic', 'hi': 'Hindi', 'tr': 'Turkish',
  'pl': 'Polish', 'nl': 'Dutch', 'sv': 'Swedish', 'da': 'Danish', 'no': 'Norwegian',
  'fi': 'Finnish', 'cs': 'Czech', 'hu': 'Hungarian', 'ro': 'Romanian', 'bg': 'Bulgarian',
  'hr': 'Croatian', 'sk': 'Slovak', 'sl': 'Slovenian', 'et': 'Estonian', 'lv': 'Latvian',
  'lt': 'Lithuanian', 'mt': 'Maltese', 'el': 'Greek', 'cy': 'Welsh', 'ga': 'Irish',
  'eu': 'Basque', 'ca': 'Catalan', 'gl': 'Galician', 'th': 'Thai', 'vi': 'Vietnamese',
  'id': 'Indonesian', 'ms': 'Malay', 'tl': 'Filipino', 'he': 'Hebrew', 'fa': 'Persian',
  'ur': 'Urdu', 'bn': 'Bengali', 'ta': 'Tamil', 'te': 'Telugu', 'mr': 'Marathi',
  'gu': 'Gujarati', 'kn': 'Kannada', 'ml': 'Malayalam', 'pa': 'Punjabi', 'ne': 'Nepali',
  'si': 'Sinhala', 'my': 'Myanmar', 'km': 'Khmer', 'lo': 'Lao', 'ka': 'Georgian',
  'hy': 'Armenian', 'az': 'Azerbaijani', 'kk': 'Kazakh', 'ky': 'Kyrgyz', 'uz': 'Uzbek',
  'mn': 'Mongolian', 'am': 'Amharic', 'sw': 'Swahili', 'zu': 'Zulu', 'af': 'Afrikaans',
  'xh': 'Xhosa', 'yo': 'Yoruba', 'ig': 'Igbo', 'ha': 'Hausa', 'so': 'Somali',
  'rw': 'Kinyarwanda', 'lg': 'Luganda', 'sn': 'Shona', 'ny': 'Chichewa', 'mg': 'Malagasy',
  'es-AR': 'Argentinian Spanish', 'es-CL': 'Chilean Spanish', 'es-UY': 'Uruguayan Spanish',
  'es-MX': 'Mexican Spanish', 'es-CO': 'Colombian Spanish'
};

// Database connection (optional - users can configure)
let db = null;
if (process.env.DATABASE_URL) {
  // Users can add their preferred database here (PostgreSQL, MySQL, MongoDB, etc.)
  console.log('🗄️ Database URL configured - implement your database connection here');
}

/**
 * PRODUCTION TRANSLATION FUNCTION
 * Users need to configure their own translation service
 */
async function translateText(text, targetLang, sourceLang = 'en') {
  // Return original text for English
  if (targetLang === 'en') return text;
  
  // Check cache first
  const cacheKey = `${text}-${sourceLang}-${targetLang}`;
  const cached = translationCache.get(cacheKey);
  if (cached) {
    console.log(`📋 Cache hit for: ${text} -> ${targetLang}`);
    return cached;
  }

  try {
    let translation = text; // Fallback

    // OPTION 1: OpenAI Translation (Recommended)
    if (process.env.OPENAI_API_KEY) {
      translation = await translateWithOpenAI(text, targetLang, sourceLang);
    }
    // OPTION 2: Google Translate
    else if (process.env.GOOGLE_TRANSLATE_API_KEY) {
      translation = await translateWithGoogle(text, targetLang, sourceLang);
    }
    // OPTION 3: Azure Translator
    else if (process.env.AZURE_TRANSLATOR_KEY) {
      translation = await translateWithAzure(text, targetLang, sourceLang);
    }
    // OPTION 4: AWS Translate
    else if (process.env.AWS_ACCESS_KEY_ID) {
      translation = await translateWithAWS(text, targetLang, sourceLang);
    }
    // FALLBACK: Mock translation for testing
    else {
      console.log('⚠️ No translation service configured - using mock translation');
      translation = `[${targetLang.toUpperCase()}] ${text}`;
    }

    // Cache the result
    translationCache.set(cacheKey, translation);
    
    // Save to database if configured
    if (db && process.env.SAVE_TRANSLATIONS === 'true') {
      await saveTranslationToDatabase(text, translation, sourceLang, targetLang);
    }
    
    console.log(`✅ Translation: "${text}" -> "${translation}" (${targetLang})`);
    return translation;

  } catch (error) {
    console.error('❌ Translation error:', error.message);
    return text; // Return original on error
  }
}

/**
 * OpenAI Translation Implementation
 */
async function translateWithOpenAI(text, targetLang, sourceLang) {
  const targetLanguageName = LANGUAGE_NAMES[targetLang] || targetLang;
  const sourceLanguageName = LANGUAGE_NAMES[sourceLang] || sourceLang;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a professional translator. Translate the given text from ${sourceLanguageName} to ${targetLanguageName}. Return ONLY the translated text, no explanations or additional content.`
      },
      {
        role: 'user',
        content: text
      }
    ],
    max_tokens: 1000,
    temperature: 0.1
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].message.content.trim();
}

/**
 * Google Translate Implementation
 */
async function translateWithGoogle(text, targetLang, sourceLang) {
  const response = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
    {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    }
  );

  return response.data.data.translations[0].translatedText;
}

/**
 * Azure Translator Implementation
 */
async function translateWithAzure(text, targetLang, sourceLang) {
  const response = await axios.post(
    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${sourceLang}&to=${targetLang}`,
    [{ text }],
    {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data[0].translations[0].text;
}

/**
 * AWS Translate Implementation
 */
async function translateWithAWS(text, targetLang, sourceLang) {
  // Users would need to implement AWS SDK here
  // This is a placeholder for AWS Translate integration
  console.log('AWS Translate integration - implement AWS SDK here');
  return `[AWS-${targetLang.toUpperCase()}] ${text}`;
}

/**
 * Save translation to database (optional)
 */
async function saveTranslationToDatabase(originalText, translatedText, sourceLang, targetLang) {
  try {
    // Users can implement their database saving logic here
    console.log('💾 Saving to database:', {
      original: originalText,
      translated: translatedText,
      from: sourceLang,
      to: targetLang,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Database save error:', error);
  }
}

// Health check
app.get('/health', (req, res) => {
  const configuredServices = [];
  if (process.env.OPENAI_API_KEY) configuredServices.push('OpenAI');
  if (process.env.GOOGLE_TRANSLATE_API_KEY) configuredServices.push('Google');
  if (process.env.AZURE_TRANSLATOR_KEY) configuredServices.push('Azure');
  if (process.env.AWS_ACCESS_KEY_ID) configuredServices.push('AWS');

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    supportedLanguages: SUPPORTED_LANGUAGES.length,
    configuredServices: configuredServices.length > 0 ? configuredServices : ['Mock (for testing)'],
    cacheStats: translationCache.getStats()
  });
});

// Get supported languages
app.get('/api/languages', (req, res) => {
  res.json({
    success: true,
    languages: SUPPORTED_LANGUAGES,
    count: SUPPORTED_LANGUAGES.length,
    languageNames: LANGUAGE_NAMES
  });
});

// Single translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = 'en' } = req.body;

    // Validation
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Text is required and must be a string'
      });
    }

    if (!targetLanguage || !SUPPORTED_LANGUAGES.includes(targetLanguage)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid target language',
        supportedLanguages: SUPPORTED_LANGUAGES
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Text too long (max 5000 characters)'
      });
    }

    const translation = await translateText(text, targetLanguage, sourceLanguage);

    res.json({
      success: true,
      translation,
      originalText: text,
      targetLanguage,
      sourceLanguage,
      cached: translationCache.has(`${text}-${sourceLanguage}-${targetLanguage}`)
    });

  } catch (error) {
    console.error('Translation API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Batch translation endpoint
app.post('/api/translate/batch', async (req, res) => {
  try {
    const { texts, targetLanguage, sourceLanguage = 'en' } = req.body;

    // Validation
    if (!Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Texts must be a non-empty array'
      });
    }

    if (texts.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Too many texts (max 100 per batch)'
      });
    }

    if (!targetLanguage || !SUPPORTED_LANGUAGES.includes(targetLanguage)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid target language'
      });
    }

    // Process all translations
    const results = await Promise.all(
      texts.map(async (text) => {
        try {
          if (typeof text !== 'string' || text.length > 1000) {
            return {
              success: false,
              originalText: text,
              error: 'Invalid text or too long (max 1000 chars per text)'
            };
          }

          const translation = await translateText(text, targetLanguage, sourceLanguage);
          return {
            success: true,
            originalText: text,
            translation,
            cached: translationCache.has(`${text}-${sourceLanguage}-${targetLanguage}`)
          };
        } catch (error) {
          return {
            success: false,
            originalText: text,
            error: error.message
          };
        }
      })
    );

    res.json({
      success: true,
      results,
      targetLanguage,
      sourceLanguage,
      processedCount: results.length,
      successCount: results.filter(r => r.success).length
    });

  } catch (error) {
    console.error('Batch translation API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Cache statistics
app.get('/api/cache/stats', (req, res) => {
  const stats = translationCache.getStats();
  res.json({
    success: true,
    cache: {
      keys: stats.keys,
      hits: stats.hits,
      misses: stats.misses,
      hitRate: stats.hits / (stats.hits + stats.misses) || 0
    }
  });
});

// Clear cache (admin endpoint)
app.delete('/api/cache', (req, res) => {
  const { adminKey } = req.body;
  
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({
      success: false,
      error: 'Unauthorized'
    });
  }

  translationCache.flushAll();
  res.json({
    success: true,
    message: 'Cache cleared'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🌍 CAI Universal Translation API running on port ${PORT}`);
  console.log(`🚀 Supporting ${SUPPORTED_LANGUAGES.length} languages`);
  console.log(`💫 ONE LOVE - Connecting the world through language`);
  
  // Configuration status
  const services = [];
  if (process.env.OPENAI_API_KEY) services.push('✅ OpenAI');
  if (process.env.GOOGLE_TRANSLATE_API_KEY) services.push('✅ Google Translate');
  if (process.env.AZURE_TRANSLATOR_KEY) services.push('✅ Azure Translator');
  if (process.env.AWS_ACCESS_KEY_ID) services.push('✅ AWS Translate');
  
  if (services.length > 0) {
    console.log('🔧 Configured services:', services.join(', '));
  } else {
    console.log('⚠️ No translation services configured - using mock translations');
    console.log('💡 Add your API keys to .env file for real translations');
  }
});

module.exports = app;