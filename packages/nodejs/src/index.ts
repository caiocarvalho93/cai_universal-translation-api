import axios, { AxiosInstance } from 'axios';

export interface TranslationOptions {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface BatchTranslationOptions {
  texts: string[];
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface TranslationResult {
  success: boolean;
  translation?: string;
  originalText: string;
  targetLanguage: string;
  sourceLanguage: string;
  cached?: boolean;
  error?: string;
}

export interface BatchTranslationResult {
  success: boolean;
  results: TranslationResult[];
  targetLanguage: string;
  sourceLanguage: string;
  processedCount: number;
  successCount: number;
}

export interface LanguageInfo {
  success: boolean;
  languages: string[];
  count: number;
}

export class CAITranslation {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:3000') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CAI-Translation-Node/1.0.0'
      }
    });
  }

  /**
   * Translate a single text
   */
  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage: string = 'en'
  ): Promise<TranslationResult> {
    try {
      const response = await this.client.post('/api/translate', {
        text,
        targetLanguage,
        sourceLanguage
      });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        originalText: text,
        targetLanguage,
        sourceLanguage,
        error: error.response?.data?.error || error.message
      };
    }
  }

  /**
   * Translate multiple texts in batch
   */
  async batchTranslate(
    texts: string[],
    targetLanguage: string,
    sourceLanguage: string = 'en'
  ): Promise<BatchTranslationResult> {
    try {
      const response = await this.client.post('/api/translate/batch', {
        texts,
        targetLanguage,
        sourceLanguage
      });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        results: texts.map(text => ({
          success: false,
          originalText: text,
          targetLanguage,
          sourceLanguage,
          error: error.response?.data?.error || error.message
        })),
        targetLanguage,
        sourceLanguage,
        processedCount: 0,
        successCount: 0
      };
    }
  }

  /**
   * Get supported languages
   */
  async getSupportedLanguages(): Promise<LanguageInfo> {
    try {
      const response = await this.client.get('/api/languages');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        languages: [],
        count: 0
      };
    }
  }

  /**
   * Check API health
   */
  async healthCheck(): Promise<any> {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  /**
   * Set custom API base URL
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.client.defaults.baseURL = baseURL;
  }

  /**
   * Set custom timeout
   */
  setTimeout(timeout: number): void {
    this.client.defaults.timeout = timeout;
  }
}

// Export default instance
export default CAITranslation;