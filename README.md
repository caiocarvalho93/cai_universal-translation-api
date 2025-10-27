# CAI Universal Translation API

🌍 **ONE LOVE** - Universal Translation System powered by **OpenAI** and CAI Intelligence Network

A complete, production-ready translation API that provides seamless multilingual support for web applications with 70+ languages, real-time translation, and intelligent caching. **Built entirely by CAI Intelligence Network.**

## 🚀 Key Features

- **🤖 OpenAI-Powered Translation** - Primary translation engine using GPT models
- **🌍 70+ Languages Support** - Complete global coverage
- **⚡ Real-time Translation** - Instant text processing
- **🧠 Smart Caching System** - Reduces costs by 90%+ through intelligent caching
- **📦 Multiple Platform Support** - React, Node.js, Python SDKs included
- **🗄️ Database Integration** - Save translations to your own database
- **🔒 Production Security** - Rate limiting, CORS protection, admin controls
- **💰 Cost Optimization** - Smart caching saves money on repeated translations

## 🎯 What You Get

This is a **complete, independent translation system** that you own and control:

✅ **Your Own Translation API** - No dependency on external services  
✅ **Your Own Database** - All translations saved to your database  
✅ **Your Own Caching** - Intelligent system reduces API costs  
✅ **Your Own API Keys** - Use your OpenAI (or other) credentials  
✅ **Complete Control** - Deploy anywhere, scale as needed  

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Clone your translation system
git clone https://github.com/caiocarvalho93/cai_universal-translation-api.git
cd cai_universal-translation-api

# 2. Install dependencies
npm install

# 3. Add your OpenAI API key
cp .env.example .env
# Edit .env and add: OPENAI_API_KEY=sk-your-key-here

# 4. Start your translation empire
npm start
```

**Your API is now running at `http://localhost:3000`** 🎉

## 🤖 Primary Translation Engine: OpenAI

This system is designed to work primarily with **OpenAI's GPT models** for the highest quality translations:

```bash
# Add to your .env file:
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo  # or gpt-4 for premium quality
```

**Why OpenAI?**
- 🎯 **Superior Quality** - Context-aware, natural translations
- 💰 **Cost Effective** - ~$0.002 per 1000 characters
- 🌍 **70+ Languages** - Comprehensive language support
- 🧠 **Smart Context** - Understands nuance and cultural context

**Get your OpenAI API key:** https://platform.openai.com/api-keys

## 🔄 Alternative Translation Services

While optimized for OpenAI, the system also supports:

- **Google Translate API** - For high-volume applications
- **Azure Translator** - For Microsoft ecosystem integration  
- **AWS Translate** - For AWS-native deployments

*See `COMPLETE_SETUP_GUIDE.md` for configuration details.*

## 📦 Ready-to-Use Packages

### React Integration
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

### Node.js SDK
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

## 🌐 Supported Languages

**70+ Languages Including:**

🇺🇸 English • 🇪🇸 Spanish • 🇫🇷 French • 🇩🇪 German • 🇮🇹 Italian • 🇵🇹 Portuguese • 🇧🇷 Brazilian Portuguese • 🇷🇺 Russian • 🇯🇵 Japanese • 🇰🇷 Korean • 🇨🇳 Chinese • 🇸🇦 Arabic • 🇮🇳 Hindi • 🇹🇷 Turkish • 🇵🇱 Polish • 🇳🇱 Dutch • 🇸🇪 Swedish • 🇩🇰 Danish • 🇳🇴 Norwegian • 🇫🇮 Finnish • 🇨🇿 Czech • 🇭🇺 Hungarian • 🇷🇴 Romanian • 🇧🇬 Bulgarian • 🇭🇷 Croatian • 🇸🇰 Slovak • 🇸🇮 Slovenian • 🇪🇪 Estonian • 🇱🇻 Latvian • 🇱🇹 Lithuanian • 🇲🇹 Maltese • 🇬🇷 Greek • 🇨🇾 Welsh • 🇮🇪 Irish • 🇹🇭 Thai • 🇻🇳 Vietnamese • 🇮🇩 Indonesian • 🇲🇾 Malay • 🇵🇭 Filipino • 🇮🇱 Hebrew • 🇮🇷 Persian • 🇵🇰 Urdu • 🇧🇩 Bengali • 🇱🇰 Tamil • 🇮🇳 Telugu • 🇮🇳 Marathi • 🇮🇳 Gujarati • 🇮🇳 Kannada • 🇮🇳 Malayalam • 🇮🇳 Punjabi • 🇳🇵 Nepali • 🇱🇰 Sinhala • 🇲🇲 Myanmar • 🇰🇭 Khmer • 🇱🇦 Lao • 🇬🇪 Georgian • 🇦🇲 Armenian • 🇦🇿 Azerbaijani • 🇰🇿 Kazakh • 🇰🇬 Kyrgyz • 🇺🇿 Uzbek • 🇲🇳 Mongolian • 🇪🇹 Amharic • 🇰🇪 Swahili • 🇿🇦 Zulu • 🇿🇦 Afrikaans • 🇿🇦 Xhosa • 🇳🇬 Yoruba • 🇳🇬 Igbo • 🇳🇬 Hausa • 🇸🇴 Somali

**Plus Regional Variants:** 🇦🇷 Argentinian Spanish • 🇲🇽 Mexican Spanish • 🇨🇱 Chilean Spanish • 🇺🇾 Uruguayan Spanish • 🇨🇴 Colombian Spanish

## 🔧 API Endpoints

### Single Translation
```http
POST /api/translate
{
  "text": "Hello World",
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

### Batch Translation
```http
POST /api/translate/batch
{
  "texts": ["Hello", "World", "Welcome"],
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

### Get Supported Languages
```http
GET /api/languages
```

### Health Check
```http
GET /health
```

## 💰 Cost Optimization Features

### Smart Caching System
- **Memory Cache** - Instant responses for repeated translations
- **Database Cache** - Persistent cache across server restarts  
- **Intelligent Expiration** - Configurable cache duration
- **Cost Savings** - Reduces translation API costs by 90%+

### Example Cost Savings:
- **Without Caching**: 10,000 repeated translations = $20
- **With CAI Caching**: 10,000 repeated translations = $2 (first time) + $0 (repeats)
- **Annual Savings**: Thousands of dollars for high-volume applications

## 🚀 Deployment Options

### Railway (Recommended)
```bash
railway login
railway init
railway up
```

### Vercel
```bash
vercel
```

### Heroku
```bash
heroku create your-translation-api
git push heroku main
```

### Self-Hosted
Deploy to any VPS, cloud provider, or on-premises server.

## 📚 Complete Documentation

- **[Complete Setup Guide](./COMPLETE_SETUP_GUIDE.md)** - Detailed configuration
- **[Quick Start Guide](./docs/QUICK_START.md)** - Get started in 5 minutes
- **[API Reference](./docs/API.md)** - Complete API documentation
- **[React Components](./docs/REACT.md)** - UI component guide
- **[Node.js SDK](./docs/NODEJS.md)** - Server-side integration
- **[Python Package](./docs/PYTHON.md)** - Python SDK documentation

## 🔒 Security & Performance

- **Rate Limiting** - Configurable request limits
- **CORS Protection** - Secure cross-origin requests
- **Admin Controls** - Secure administrative functions
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Graceful error management
- **Monitoring** - Built-in health checks and statistics

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Node.js API    │    │   OpenAI API    │
│                 │───▶│                  │───▶│                 │
│ Language Button │    │ Smart Caching    │    │ GPT Translation │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Your Database  │
                       │                  │
                       │ Cached Results   │
                       └──────────────────┘
```

## 🎯 Perfect For

- **SaaS Applications** - Add multilingual support instantly
- **E-commerce Sites** - Translate product descriptions globally
- **Content Platforms** - Make content accessible worldwide  
- **Mobile Apps** - React Native compatible
- **Enterprise Systems** - Self-hosted, secure translation
- **Startups** - Cost-effective global expansion

## 🤝 Support & Community

- **GitHub Issues**: [Report bugs & request features](https://github.com/caiocarvalho93/cai_universal-translation-api/issues)
- **Documentation**: Complete guides in `/docs` folder
- **Examples**: Working examples in `/examples` folder
- **LinkedIn**: [Follow the creator](https://www.linkedin.com/in/caio-carvalho-6b9119262/) for more projects

## 📄 License

MIT License - Use freely in personal and commercial projects.

## 🌟 Created by CAI Intelligence Network

This complete translation system was built from the ground up by **CAI Intelligence Network** to provide developers with a powerful, cost-effective, and easy-to-use translation solution.

**Key Design Principles:**
- 🎯 **Developer-First** - Easy setup and integration
- 💰 **Cost-Conscious** - Smart caching reduces expenses
- 🌍 **Global-Ready** - 70+ languages out of the box
- 🔒 **Security-Focused** - Production-ready security features
- 📈 **Scalable** - From prototype to enterprise

---

**🌍 ONE LOVE - Your Translation Empire Starts Here**

*Built with ❤️ by CAI Intelligence Network*

**Ready to connect the world through language? Clone, configure, and deploy your translation system today!**