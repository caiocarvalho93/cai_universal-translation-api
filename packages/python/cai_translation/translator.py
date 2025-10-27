"""
CAI Universal Translation API - Python SDK
Main translator class implementation
"""

import requests
from typing import List, Dict, Any, Optional, Union
from .exceptions import CAITranslationError, APIError, ValidationError, NetworkError, RateLimitError


class CAITranslator:
    """
    Main translator class for CAI Universal Translation API
    
    Provides methods for single and batch translation with support for 70+ languages.
    """
    
    def __init__(self, base_url: str = "http://localhost:3000", timeout: int = 30):
        """
        Initialize the CAI Translator
        
        Args:
            base_url (str): Base URL of the translation API
            timeout (int): Request timeout in seconds
        """
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'CAI-Translation-Python/1.0.0'
        })
    
    def translate(
        self, 
        text: str, 
        target_language: str, 
        source_language: str = "en"
    ) -> str:
        """
        Translate a single text
        
        Args:
            text (str): Text to translate
            target_language (str): Target language code (e.g., 'es', 'fr', 'de')
            source_language (str): Source language code (default: 'en')
            
        Returns:
            str: Translated text
            
        Raises:
            ValidationError: If input parameters are invalid
            APIError: If API returns an error
            NetworkError: If network request fails
            RateLimitError: If rate limit is exceeded
        """
        if not text or not isinstance(text, str):
            raise ValidationError("Text must be a non-empty string")
        
        if not target_language or not isinstance(target_language, str):
            raise ValidationError("Target language must be a non-empty string")
            
        if len(text) > 5000:
            raise ValidationError("Text too long (max 5000 characters)")
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/translate",
                json={
                    "text": text,
                    "targetLanguage": target_language,
                    "sourceLanguage": source_language
                },
                timeout=self.timeout
            )
            
            if response.status_code == 429:
                raise RateLimitError("Rate limit exceeded")
            
            if response.status_code == 400:
                error_data = response.json()
                raise ValidationError(error_data.get('error', 'Invalid request'))
            
            if not response.ok:
                raise APIError(f"API error: {response.status_code} {response.reason}")
            
            data = response.json()
            
            if not data.get('success'):
                raise APIError(data.get('error', 'Translation failed'))
            
            return data.get('translation', text)
            
        except requests.exceptions.Timeout:
            raise NetworkError("Request timeout")
        except requests.exceptions.ConnectionError:
            raise NetworkError("Connection error")
        except requests.exceptions.RequestException as e:
            raise NetworkError(f"Network error: {str(e)}")
    
    def batch_translate(
        self, 
        texts: List[str], 
        target_language: str, 
        source_language: str = "en"
    ) -> List[str]:
        """
        Translate multiple texts in batch
        
        Args:
            texts (List[str]): List of texts to translate
            target_language (str): Target language code
            source_language (str): Source language code (default: 'en')
            
        Returns:
            List[str]: List of translated texts
            
        Raises:
            ValidationError: If input parameters are invalid
            APIError: If API returns an error
            NetworkError: If network request fails
            RateLimitError: If rate limit is exceeded
        """
        if not texts or not isinstance(texts, list):
            raise ValidationError("Texts must be a non-empty list")
        
        if len(texts) > 100:
            raise ValidationError("Too many texts (max 100 per batch)")
        
        if not target_language or not isinstance(target_language, str):
            raise ValidationError("Target language must be a non-empty string")
        
        # Validate each text
        for i, text in enumerate(texts):
            if not isinstance(text, str):
                raise ValidationError(f"Text at index {i} must be a string")
            if len(text) > 1000:
                raise ValidationError(f"Text at index {i} too long (max 1000 characters)")
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/translate/batch",
                json={
                    "texts": texts,
                    "targetLanguage": target_language,
                    "sourceLanguage": source_language
                },
                timeout=self.timeout
            )
            
            if response.status_code == 429:
                raise RateLimitError("Rate limit exceeded")
            
            if response.status_code == 400:
                error_data = response.json()
                raise ValidationError(error_data.get('error', 'Invalid request'))
            
            if not response.ok:
                raise APIError(f"API error: {response.status_code} {response.reason}")
            
            data = response.json()
            
            if not data.get('success'):
                raise APIError(data.get('error', 'Batch translation failed'))
            
            results = data.get('results', [])
            translations = []
            
            for result in results:
                if result.get('success'):
                    translations.append(result.get('translation', result.get('originalText', '')))
                else:
                    translations.append(result.get('originalText', ''))
            
            return translations
            
        except requests.exceptions.Timeout:
            raise NetworkError("Request timeout")
        except requests.exceptions.ConnectionError:
            raise NetworkError("Connection error")
        except requests.exceptions.RequestException as e:
            raise NetworkError(f"Network error: {str(e)}")
    
    def get_supported_languages(self) -> List[str]:
        """
        Get list of supported languages
        
        Returns:
            List[str]: List of supported language codes
            
        Raises:
            APIError: If API returns an error
            NetworkError: If network request fails
        """
        try:
            response = self.session.get(
                f"{self.base_url}/api/languages",
                timeout=self.timeout
            )
            
            if not response.ok:
                raise APIError(f"API error: {response.status_code} {response.reason}")
            
            data = response.json()
            
            if not data.get('success'):
                raise APIError("Failed to get supported languages")
            
            return data.get('languages', [])
            
        except requests.exceptions.Timeout:
            raise NetworkError("Request timeout")
        except requests.exceptions.ConnectionError:
            raise NetworkError("Connection error")
        except requests.exceptions.RequestException as e:
            raise NetworkError(f"Network error: {str(e)}")
    
    def health_check(self) -> Dict[str, Any]:
        """
        Check API health status
        
        Returns:
            Dict[str, Any]: Health status information
            
        Raises:
            NetworkError: If network request fails
        """
        try:
            response = self.session.get(
                f"{self.base_url}/health",
                timeout=self.timeout
            )
            
            return response.json()
            
        except requests.exceptions.Timeout:
            raise NetworkError("Request timeout")
        except requests.exceptions.ConnectionError:
            raise NetworkError("Connection error")
        except requests.exceptions.RequestException as e:
            raise NetworkError(f"Network error: {str(e)}")
    
    def set_base_url(self, base_url: str) -> None:
        """
        Set custom API base URL
        
        Args:
            base_url (str): New base URL
        """
        self.base_url = base_url.rstrip('/')
    
    def set_timeout(self, timeout: int) -> None:
        """
        Set custom request timeout
        
        Args:
            timeout (int): Timeout in seconds
        """
        self.timeout = timeout