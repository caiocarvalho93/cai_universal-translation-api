"""
CAI Universal Translation API - Python SDK
==========================================

A comprehensive Python SDK for the CAI Universal Translation API.
Supports 70+ languages with real-time translation and intelligent caching.

Basic usage:
    >>> from cai_translation import CAITranslator
    >>> translator = CAITranslator()
    >>> result = translator.translate("Hello World", "es")
    >>> print(result)
    "Hola Mundo"

For more information, visit: https://github.com/caiocarvalho93/cai_universal-translation-api
"""

from .translator import CAITranslator
from .exceptions import (
    CAITranslationError,
    APIError,
    ValidationError,
    NetworkError,
    RateLimitError
)

__version__ = "1.0.0"
__author__ = "CAI Intelligence Network"
__email__ = "support@cai-intelligence.com"

__all__ = [
    "CAITranslator",
    "CAITranslationError",
    "APIError", 
    "ValidationError",
    "NetworkError",
    "RateLimitError"
]