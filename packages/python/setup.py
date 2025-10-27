from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="cai-translation",
    version="1.0.0",
    author="CAI Intelligence Network",
    author_email="support@cai-intelligence.com",
    description="Python SDK for CAI Universal Translation API",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/caiocarvalho93/cai_universal-translation-api",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Text Processing :: Linguistic",
    ],
    python_requires=">=3.7",
    install_requires=[
        "requests>=2.25.0",
        "typing-extensions>=4.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0",
            "pytest-cov>=2.0",
            "black>=21.0",
            "flake8>=3.8",
            "mypy>=0.800",
        ],
    },
    keywords="translation i18n multilingual cai universal python sdk",
    project_urls={
        "Bug Reports": "https://github.com/caiocarvalho93/cai_universal-translation-api/issues",
        "Source": "https://github.com/caiocarvalho93/cai_universal-translation-api",
        "Documentation": "https://github.com/caiocarvalho93/cai_universal-translation-api#readme",
    },
)