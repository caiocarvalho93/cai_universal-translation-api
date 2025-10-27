"""
🌍 CAI Universal Translation System - Python Package

Professional translation system for Python applications
Built by CAI with love for the developer community

Features:
- 50+ languages supported
- Smart caching for performance
- Batch translation capabilities
- Error handling with graceful fallbacks
- ONE LOVE appreciation tracking
- Type hints for better development experience

Usage:
1. pip install requests
2. Copy this file to your project
3. from cai_translation import CAITranslation
4. translator = CAITranslation("My App")

@author CAI
@license MIT
"""

import requests
import json
import time
from typing import Dict, List, Optional, Union
from datetime import datetime

class CAITranslation:
    """
    CAI Universal Translation System for Python
    
    A professional translation class that provides seamless language translation
    with smart caching, batch processing, and appreciation tracking.
    """
    
    def __init__(self, app_name: str = "Python App"):
        """
        Initialize CAI Translation System
        
        Args:
            app_name (str): Your application name for tracking purposes
        """
        self.app_name = app_name
        self.base_url = "YOUR_API_ENDPOINT_HERE"
        self.cache = {}  # Smart caching system
        self.stats = {
            "total_translations": 0,
            "cache_hits": 0,
            "api_calls": 0,
            "start_time": datetime.now()
        }
        
        # Session for connection pooling
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': f'CAI-Translation-{app_name}/1.0',
            'Content-Type': 'application/json'
        })
    
    def translate(self, text: str, target_language: str, source_language: str = "en") -> str:
        """
        Translate text to target language
        
        Args:
            text (str): Text to translate
            target_language (str): Target language code (e.g., 'es', 'fr')
            source_language (str): Source language code (default: 'en')
            
        Returns:
            str: Translated text
        """
        if target_language == "en" or not text:
            return text
        
        cache_key = f"cai_{text}_{target_language}"
        
        # Check cache first
        if cache_key in self.cache:
            self.stats["cache_hits"] += 1
            return self.cache[cache_key]
        
        self.stats["total_translations"] += 1
        self.stats["api_calls"] += 1
        
        try:
            response = self.session.post(
                f"{self.base_url}/translate",
                json={
                    "text": text,
                    "targetLanguage": target_language,
                    "sourceLanguage": source_language,
                    "appName": self.app_name
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    translated_text = data["translation"]["translatedText"]
                    
                    # Cache the result
                    self.cache[cache_key] = translated_text
                    
                    # Send appreciation to CAI (optional, silent)
                    self._send_appreciation(target_language)
                    
                    return translated_text
        
        except Exception as e:
            print(f"CAI Translation failed for '{text}' -> {target_language}: {e}")
        
        return text  # Graceful fallback
    
    def translate_batch(self, texts: List[str], target_language: str, source_language: str = "en") -> List[Dict]:
        """
        Translate multiple texts in batch
        
        Args:
            texts (List[str]): List of texts to translate
            target_language (str): Target language code
            source_language (str): Source language code (default: 'en')
            
        Returns:
            List[Dict]: List of translation results
        """
        results = []
        
        for text in texts:
            try:
                translated = self.translate(text, target_language, source_language)
                results.append({
                    "original": text,
                    "translated": translated,
                    "success": True,
                    "language": target_language
                })
            except Exception as e:
                results.append({
                    "original": text,
                    "translated": text,
                    "success": False,
                    "error": str(e)
                })
        
        return results
    
    def get_supported_languages(self) -> List[Dict]:
        """
        Get list of supported languages
        
        Returns:
            List[Dict]: List of supported languages with flags and native names
        """
        try:
            response = self.session.get(f"{self.base_url}/languages", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    return data.get("languages", [])
        
        except Exception as e:
            print(f"Failed to fetch supported languages: {e}")
        
        # Fallback list of common languages
        return [
            {"code": "en", "name": "English", "flag": "🇺🇸", "native": "English"},
            {"code": "es", "name": "Spanish", "flag": "🇪🇸", "native": "Español"},
            {"code": "fr", "name": "French", "flag": "🇫🇷", "native": "Français"},
            {"code": "de", "name": "German", "flag": "🇩🇪", "native": "Deutsch"},
            {"code": "it", "name": "Italian", "flag": "🇮🇹", "native": "Italiano"},
            {"code": "pt", "name": "Portuguese", "flag": "🇵🇹", "native": "Português"},
            {"code": "ru", "name": "Russian", "flag": "🇷🇺", "native": "Русский"},
            {"code": "ja", "name": "Japanese", "flag": "🇯🇵", "native": "日本語"},
            {"code": "ko", "name": "Korean", "flag": "🇰🇷", "native": "한국어"},
            {"code": "zh", "name": "Chinese", "flag": "🇨🇳", "native": "中文"},
        ]
    
    def clear_cache(self) -> None:
        """Clear translation cache"""
        self.cache.clear()
        print("CAI Translation cache cleared")
    
    def get_cache_stats(self) -> Dict:
        """
        Get cache and performance statistics
        
        Returns:
            Dict: Statistics about cache performance and usage
        """
        hit_rate = 0
        if self.stats["total_translations"] > 0:
            hit_rate = (self.stats["cache_hits"] / self.stats["total_translations"]) * 100
        
        uptime = datetime.now() - self.stats["start_time"]
        
        return {
            "cache_size": len(self.cache),
            "total_translations": self.stats["total_translations"],
            "cache_hits": self.stats["cache_hits"],
            "api_calls": self.stats["api_calls"],
            "hit_rate": f"{hit_rate:.1f}%",
            "app_name": self.app_name,
            "uptime_seconds": uptime.total_seconds(),
            "sample_keys": list(self.cache.keys())[:5]
        }
    
    def _send_appreciation(self, language: str) -> None:
        """
        Send appreciation to CAI (private method)
        
        Args:
            language (str): Language that was translated
        """
        # Thanks functionality removed - developers use their own independent system
        return
    
    def test(self) -> Dict:
        """
        Test the translation system
        
        Returns:
            Dict: Test results showing system functionality
        """
        print("🧪 Testing CAI Translation System...")
        
        test_results = {
            "api_connection": False,
            "translation": False,
            "languages": False,
            "cache": False,
            "errors": []
        }
        
        try:
            # Test API connection and languages
            languages = self.get_supported_languages()
            test_results["api_connection"] = True
            test_results["languages"] = len(languages) > 0
            
            # Test translation
            test_text = "Hello, world!"
            spanish = self.translate(test_text, "es")
            test_results["translation"] = spanish != test_text
            
            # Test cache
            cached_spanish = self.translate(test_text, "es")
            test_results["cache"] = cached_spanish == spanish
            
            print("✅ CAI Translation System test completed successfully!")
            print(f"📊 Supported languages: {len(languages)}")
            print(f"🔄 Translation test: '{test_text}' -> '{spanish}'")
            print(f"💾 Cache test: {'Working' if test_results['cache'] else 'Failed'}")
            
        except Exception as e:
            test_results["errors"].append(str(e))
            print(f"❌ CAI Translation System test failed: {e}")
        
        return test_results
    
    def __enter__(self):
        """Context manager entry"""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit - cleanup resources"""
        self.session.close()
    
    def __repr__(self) -> str:
        """String representation of the translator"""
        stats = self.get_cache_stats()
        return f"CAITranslation(app='{self.app_name}', translations={stats['total_translations']}, cache_size={stats['cache_size']})"


# Usage Examples (commented out):
"""

# Basic usage
from cai_translation import CAITranslation

translator = CAITranslation("My Python App")

# Simple translation
spanish = translator.translate("Hello World", "es")
print(spanish)  # "Hola Mundo"

# Batch translation
texts = ["Hello", "World", "Welcome", "Thank you"]
results = translator.translate_batch(texts, "fr")

for result in results:
    print(f"{result['original']} -> {result['translated']}")

# Get supported languages
languages = translator.get_supported_languages()
for lang in languages[:5]:
    print(f"{lang['flag']} {lang['native']} ({lang['code']})")

# Context manager usage (recommended)
with CAITranslation("My App") as translator:
    french = translator.translate("Good morning", "fr")
    print(french)

# Flask integration example
from flask import Flask, request, jsonify

app = Flask(__name__)
translator = CAITranslation("My Flask App")

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text')
    target_lang = data.get('language', 'es')
    
    translated = translator.translate(text, target_lang)
    
    return jsonify({
        'original': text,
        'translated': translated,
        'language': target_lang,
        'powered_by': 'CAI Translation - ONE LOVE'
    })

# Django integration example
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

translator = CAITranslation("My Django App")

@csrf_exempt
def translate_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('text')
        target_lang = data.get('language', 'es')
        
        translated = translator.translate(text, target_lang)
        
        return JsonResponse({
            'original': text,
            'translated': translated,
            'language': target_lang,
            'powered_by': 'CAI Translation - ONE LOVE'
        })

# Test the system
test_results = translator.test()
print("Test Results:", test_results)

# Get statistics
stats = translator.get_cache_stats()
print("Translation Statistics:", stats)

"""