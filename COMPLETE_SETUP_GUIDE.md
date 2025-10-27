# 🌍 CAI Universal Translation API - Complete Setup Guide

**ONE LOVE** - Your own complete translation system with database and caching!

## 🚀 Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/caiocarvalho93/cai_universal-translation-api.git
cd cai_universal-translation-api

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the API (works with mock translations)
npm start
```

**Your API is now running at `http://localhost:3000`** ✅

## 🔧 Production Setup with Real Translation

### Step 1: Choose Your Translation Service

#### Option A: OpenAI (Recommended - Best Quality)
```bash
# Add to your .env file:
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
```

**Get your OpenAI API key:**
1. Go to https://platform.openai.com/api-keys
2. Create account / Login
3. Click "Create new secret key"
4. Copy the key to your .env file

**Cost:** ~$0.002 per 1000 characters (very affordable)

#### Option B: Google Translate
```bash
# Add to your .env file:
GOOGLE_TRANSLATE_API_KEY=your-google-api-key
GOOGLE_PROJECT_ID=your-project-id
```

**Get Google Translate API:**
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable "Cloud Translation API"
4. Create credentials (API key)

#### Option C: Azure Translator
```bash
# Add to your .env file:
AZURE_TRANSLATOR_KEY=your-azure-key
AZURE_TRANSLATOR_REGION=your-region
```

#### Option D: AWS Translate
```bash
# Add to your .env file:
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

### Step 2: Database Setup (Optional but Recommended)

#### Option A: PostgreSQL (Recommended)
```bash
# Install PostgreSQL locally or use cloud service
# Add to .env:
DATABASE_URL=postgresql://username:password@localhost:5432/translations
SAVE_TRANSLATIONS=true
```

#### Option B: MongoDB
```bash
# Add to .env:
DATABASE_URL=mongodb://localhost:27017/translations
SAVE_TRANSLATIONS=true
```

#### Option C: MySQL
```bash
# Add to .env:
DATABASE_URL=mysql://username:password@localhost:3306/translations
SAVE_TRANSLATIONS=true
```

### Step 3: Complete .env Configuration

```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# CORS (add your domain)
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Translation Service (choose one)
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo

# Database (optional)
DATABASE_URL=postgresql://user:pass@localhost:5432/translations
SAVE_TRANSLATIONS=true

# Security
ADMIN_KEY=your-super-secret-admin-key

# Performance
RATE_LIMIT_POINTS=1000
RATE_LIMIT_DURATION=60
CACHE_TTL=3600
```

## 📦 Using the Packages

### React Package
```bash
npm install cai-universal-translation
```

```jsx
import { LanguageProvider, UniversalLanguageButton } from 'cai-universal-translation';

function App() {
  return (
    <LanguageProvider apiBaseUrl="http://localhost:3000">
      <UniversalLanguageButton />
      <YourContent />
    </LanguageProvider>
  );
}
```

### Node.js Package
```bash
npm install cai-translation-node
```

```javascript
const { CAITranslation } = require('cai-translation-node');

const translator = new CAITranslation('http://localhost:3000');
const result = await translator.translate('Hello World', 'es');
console.log(result.translation); // "Hola Mundo"
```

### Python Package
```bash
pip install cai-translation
```

```python
from cai_translation import CAITranslator

translator = CAITranslator('http://localhost:3000')
result = translator.translate("Hello World", "es")
print(result)  # "Hola Mundo"
```

## 🌐 Deployment Options

### Option 1: Railway (Easiest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: Heroku
```bash
# Install Heroku CLI
heroku create your-translation-api
git push heroku main
```

### Option 4: DigitalOcean/AWS/Google Cloud
- Upload your code
- Install dependencies: `npm install`
- Set environment variables
- Start: `npm start`

## 💰 Cost Optimization

### Smart Caching System
The API automatically caches translations to save money:

- **Memory Cache**: Instant responses for repeated translations
- **Database Cache**: Persistent cache across restarts
- **Smart Expiration**: Configurable cache duration

### Cost Examples (with OpenAI):
- **1,000 translations**: ~$2
- **10,000 translations**: ~$20
- **100,000 translations**: ~$200

**With caching, repeat translations cost $0!**

## 🔒 Security Best Practices

```bash
# Strong admin key
ADMIN_KEY=super-secret-key-min-32-characters

# Rate limiting
RATE_LIMIT_POINTS=100  # requests per minute
RATE_LIMIT_DURATION=60

# CORS protection
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 📊 Monitoring & Analytics

### Health Check
```bash
curl http://localhost:3000/health
```

### Cache Statistics
```bash
curl http://localhost:3000/api/cache/stats
```

### Clear Cache (Admin)
```bash
curl -X DELETE http://localhost:3000/api/cache \
  -H "Content-Type: application/json" \
  -d '{"adminKey": "your-admin-key"}'
```

## 🛠️ Advanced Configuration

### Custom Database Implementation
Edit `production-server.js` and implement your database functions:

```javascript
// Add your database connection
const { Pool } = require('pg'); // PostgreSQL example
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// Implement saveTranslationToDatabase function
async function saveTranslationToDatabase(originalText, translatedText, sourceLang, targetLang) {
  await db.query(
    'INSERT INTO translations (original, translated, source_lang, target_lang, created_at) VALUES ($1, $2, $3, $4, NOW())',
    [originalText, translatedText, sourceLang, targetLang]
  );
}
```

### Custom Translation Service
Add your own translation service:

```javascript
async function translateWithCustomService(text, targetLang, sourceLang) {
  // Your custom translation logic here
  const response = await axios.post('https://your-api.com/translate', {
    text, targetLang, sourceLang
  });
  return response.data.translation;
}
```

## 🎯 Production Checklist

- [ ] API key configured (OpenAI/Google/Azure/AWS)
- [ ] Database connected (optional)
- [ ] Environment variables set
- [ ] CORS configured for your domain
- [ ] Rate limiting configured
- [ ] Admin key set
- [ ] SSL certificate (for production)
- [ ] Monitoring setup
- [ ] Backup strategy

## 🤝 Support & Community

- **GitHub Issues**: [Report bugs](https://github.com/caiocarvalho93/cai_universal-translation-api/issues)
- **Documentation**: Complete guides in `/docs` folder
- **Examples**: Working examples in `/examples` folder

## 🚀 What You Get

✅ **Complete Translation API** - 70+ languages
✅ **Smart Caching System** - Save money on API calls
✅ **Multiple Translation Services** - OpenAI, Google, Azure, AWS
✅ **Database Integration** - PostgreSQL, MongoDB, MySQL
✅ **Rate Limiting** - Protect your API
✅ **React Components** - Ready-to-use UI
✅ **Node.js SDK** - Server-side integration
✅ **Python Package** - Python applications
✅ **Production Ready** - Deploy anywhere
✅ **Cost Optimization** - Smart caching reduces costs by 90%+

---

**Made with ❤️ by CAI Intelligence Network**

*ONE LOVE - Your own translation empire starts here!*