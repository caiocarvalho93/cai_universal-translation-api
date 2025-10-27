"""
CAI Universal Translation API - Python SDK
Custom exception classes
"""


class CAITranslationError(Exception):
    """Base exception class for CAI Translation errors"""
    pass


class APIError(CAITranslationError):
    """Raised when the API returns an error response"""
    pass


class ValidationError(CAITranslationError):
    """Raised when input validation fails"""
    pass


class NetworkError(CAITranslationError):
    """Raised when network request fails"""
    pass


class RateLimitError(CAITranslationError):
    """Raised when rate limit is exceeded"""
    pass