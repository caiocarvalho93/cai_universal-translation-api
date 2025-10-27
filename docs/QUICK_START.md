# CAI Universal Translation API - Quick Start Guide

🌍 **ONE LOVE** - Get started with universal translation in minutes!

## 🚀 Installation

### React Package
```bash
npm install cai-universal-translation
```

### Node.js Package
```bash
npm install cai-translation-node
```

### Python Package
```bash
pip install cai-translation
```

## 🎯 Quick Examples

### React Integration

```jsx
import React from 'react';
import { LanguageProvider, UniversalLanguageButton, useTranslation } from 'cai-universal-translation';

// Wrap your app with LanguageProvider
function App() {
  return (
    <LanguageProvider apiBaseUrl="http://localhost:3000">
      <UniversalLanguageButton />
      <MyComponent />
    </LanguageProvider>
  );
}

// Use translation in components
function MyComponent() {
  const { t, currentLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t("Welcome to our app!")}</h1>
      <p>Current language: {currentLanguage}</p>
    </div>
  );
}

export default App;
```

### Node.js Usage

```javascript
const { CAITranslation } = require('cai-translation-node');

async function example() {
  const translator = new CAITranslation('http://localhost:3000');
  
  // Single translation
  const result = await translator.translate('Hello World', 'es');
  console.log(result.translation); // "Hola Mundo"
  
  // Batch translation
  const batchResult = await translator.batchTranslate(
    ['Hello', 'World', 'Welcome'], 
    'fr'
  );
  console.log(batchResult.results); // ["Bonjour", "Monde", "Bienvenue"]
  
  // Get supported languages
  const languages = await translator.getSupportedLanguages();
  console.log(languages.languages); // ['en', 'es', 'fr', ...]
}

example();
```

### Python Usage

```python
from cai_translation import CAITranslator

# Initialize translator
translator = CAITranslator(base_url="http://localhost:3000")

# Single translation
result = translator.translate("Hello World", "es")
print(result)  # "Hola Mundo"

# Batch translation
texts = ["Hello", "World", "Welcome"]
results = translator.batch_translate(texts, "fr")
print(results)  # ["Bonjour", "Monde", "Bienvenue"]

# Get supported languages
languages = translator.get_supported_languages()
print(f"Supported languages: {len(languages)}")

# Health check
health = translator.health_check()
print(f"API Status: {health['status']}")
```

## 🌐 Supported Languages

The API supports 70+ languages including:

- **European**: English, Spanish, French, German, Italian, Portuguese, Russian, Polish, Dutch, Swedish, Danish, Norwegian, Finnish, Czech, Hungarian, Romanian, Bulgarian, Croatian, Slovak, Slovenian, Estonian, Latvian, Lithuanian, Maltese, Greek, Welsh, Irish, Basque, Catalan, Galician

- **Asian**: Japanese, Korean, Chinese, Hindi, Thai, Vietnamese, Indonesian, Malay, Filipino, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Nepali, Sinhala, Myanmar, Khmer, Lao

- **Middle Eastern**: Arabic, Hebrew, Persian, Turkish, Urdu

- **African**: Swahili, Zulu, Afrikaans, Xhosa, Yoruba, Igbo, Hausa, Somali, Kinyarwanda, Luganda, Shona, Chichewa, Malagasy, Amharic

- **Other**: Georgian, Armenian, Azerbaijani, Kazakh, Kyrgyz, Uzbek, Mongolian

- **Regional Variants**: Brazilian Portuguese, Argentina Spanish, Mexico Spanish, Chile Spanish, Uruguay Spanish, Colombia Spanish

## 🔧 API Server Setup

1. **Clone the repository**:
```bash
git clone https://github.com/caiocarvalho93/cai_universal-translation-api.git
cd cai_universal-translation-api
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start the server**:
```bash
npm start
# or for development
npm run dev
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Single Translation
```http
POST /api/translate
Content-Type: application/json

{
  "text": "Hello World",
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

### Batch Translation
```http
POST /api/translate/batch
Content-Type: application/json

{
  "texts": ["Hello", "World"],
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

### Get Languages
```http
GET /api/languages
```

### Health Check
```http
GET /health
```

## 🎨 Customization

### React Component Styling

The `UniversalLanguageButton` component can be customized by passing props:

```jsx
<UniversalLanguageButton 
  position="top-left"
  theme="dark"
  showFlags={true}
  maxLanguages={10}
/>
```

### Custom Translation Hook

```jsx
import { useLanguage } from 'cai-universal-translation';

function useCustomTranslation() {
  const { translateText, currentLanguage } = useLanguage();
  
  const translateWithFallback = async (text, fallback = text) => {
    try {
      return await translateText(text);
    } catch (error) {
      console.error('Translation failed:', error);
      return fallback;
    }
  };
  
  return { translateWithFallback, currentLanguage };
}
```

## 🔒 Production Configuration

### Environment Variables

```bash
# Production API URL
REACT_APP_API_BASE_URL=https://your-api-domain.com

# Node.js/Python
CAI_TRANSLATION_API_URL=https://your-api-domain.com
```

### CORS Configuration

Update your server's CORS settings:

```javascript
// server.js
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ],
  credentials: true
}));
```

## 🚨 Error Handling

### React
```jsx
import { ErrorBoundary } from 'react-error-boundary';

function TranslationErrorFallback({error}) {
  return (
    <div>
      <h2>Translation Error</h2>
      <p>{error.message}</p>
    </div>
  );
}

<ErrorBoundary FallbackComponent={TranslationErrorFallback}>
  <LanguageProvider>
    <App />
  </LanguageProvider>
</ErrorBoundary>
```

### Node.js
```javascript
try {
  const result = await translator.translate('Hello', 'es');
  console.log(result.translation);
} catch (error) {
  if (error.name === 'RateLimitError') {
    console.log('Rate limit exceeded, retrying later...');
  } else {
    console.error('Translation failed:', error.message);
  }
}
```

### Python
```python
from cai_translation import CAITranslator, ValidationError, NetworkError

try:
    result = translator.translate("Hello", "es")
    print(result)
except ValidationError as e:
    print(f"Invalid input: {e}")
except NetworkError as e:
    print(f"Network error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## 🎯 Next Steps

- [API Reference](./API.md) - Complete API documentation
- [React Components](./REACT.md) - Detailed React component guide
- [Node.js SDK](./NODEJS.md) - Advanced Node.js usage
- [Python Package](./PYTHON.md) - Python SDK documentation
- [Examples](../examples/) - Complete example applications

## 🤝 Support

- GitHub Issues: [Report bugs](https://github.com/caiocarvalho93/cai_universal-translation-api/issues)
- Email: support@cai-intelligence.com
- Discord: [Join our community](https://discord.gg/cai-intelligence)

---

**Made with ❤️ by CAI Intelligence Network**

*ONE LOVE - Connecting the world through language*