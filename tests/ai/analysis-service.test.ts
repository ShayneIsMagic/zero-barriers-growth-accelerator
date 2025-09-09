import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalysisService } from '@/ai/analysis-service';
import { AnalysisError, RateLimitError } from '@/ai/providers/base';

// Mock the providers
vi.mock('@/ai/providers/openai', () => ({
  OpenAIProvider: vi.fn().mockImplementation(() => ({
    name: 'openai',
    analyze: vi.fn(),
    healthCheck: vi.fn(),
    getCapabilities: vi.fn(() => ({
      maxTokens: 128000,
      supportsStreaming: true,
      supportsBatch: false,
      rateLimit: { requestsPerMinute: 3500, tokensPerMinute: 150000 },
      reliability: { averageUptime: 0.999, averageResponseTime: 2500 },
    })),
  })),
}));

describe('AnalysisService', () => {
  let service: AnalysisService;
  const mockContent = 'Test marketing content for analysis';

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AnalysisService({
      openaiApiKey: 'test-api-key',
      retryAttempts: 2,
      retryDelay: 100,
      enableFallback: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('initializes with OpenAI provider when API key is provided', () => {
      const providers = service.getAvailableProviders();
      expect(providers).toContain('openai');
      expect(providers).toContain('fallback');
    });

    it('initializes without OpenAI provider when no API key is provided', () => {
      const serviceWithoutKey = new AnalysisService({ openaiApiKey: '' });
      const providers = serviceWithoutKey.getAvailableProviders();
      expect(providers).not.toContain('openai');
      expect(providers).toContain('fallback');
    });
  });

  describe('Analysis', () => {
    it('successfully analyzes content with primary provider', async () => {
      const mockResult = {
        goldenCircle: {
          whyScore: 85,
          howScore: 80,
          whatScore: 90,
          overallScore: 85,
          whyDetails: {
            clarity: 85,
            emotionalImpact: 80,
            uniqueness: 85,
            authenticity: 90,
            feedback: ['Good purpose clarity'],
            suggestions: ['Enhance emotional appeal'],
          },
          howDetails: {
            clarity: 85,
            emotionalImpact: 80,
            uniqueness: 85,
            authenticity: 90,
            feedback: ['Good purpose clarity'],
            suggestions: ['Enhance emotional appeal'],
          },
          whatDetails: {
            clarity: 85,
            emotionalImpact: 80,
            uniqueness: 85,
            authenticity: 90,
            feedback: ['Good purpose clarity'],
            suggestions: ['Enhance emotional appeal'],
          },
        },
        consumerValue: {
          functionalScore: 80,
          emotionalScore: 75,
          lifeChangingScore: 60,
          socialImpactScore: 70,
          overallScore: 71,
          elementScores: { saves_time: 85 },
          topElements: ['saves_time'],
          detectedElements: [],
        },
        b2bValue: {
          functionalScore: 80,
          emotionalScore: 75,
          lifeChangingScore: 60,
          socialImpactScore: 70,
          overallScore: 71,
          elementScores: {},
          topElements: [],
          detectedElements: [],
        },
        cliftonStrengths: {
          executingScore: 80,
          influencingScore: 75,
          relationshipBuildingScore: 70,
          strategicThinkingScore: 85,
          overallScore: 77,
          themeScores: {},
          topThemes: [],
          detectedThemes: [],
        },
        barriers: {
          barriers: [
            {
              name: 'Test Barrier',
              description: 'Test barrier description',
              category: 'Test',
              severity: 'MEDIUM' as const,
              impact: 'Test impact',
              solution: 'Test solution',
            },
          ],
        },
        recommendations: {
          recommendations: [
            {
              title: 'Test Recommendation',
              description: 'Test recommendation description',
              category: 'Test',
              priority: 'HIGH' as const,
              impact: 'Test impact',
              effort: 'Low',
              timeframe: '1 week',
            },
          ],
        },
        confidence: 0.9,
        processingTime: 1500,
        model: 'gpt-4-turbo-preview',
        tokensUsed: 1000,
      };

      // Mock the OpenAI provider's analyze method
      const mockOpenAIProvider = {
        name: 'openai',
        analyze: vi.fn().mockResolvedValue(mockResult),
        healthCheck: vi.fn().mockResolvedValue(true),
        getCapabilities: vi.fn(),
      };

      // Replace the provider in the service
      (service as any).providers.set('openai', mockOpenAIProvider);

      const result = await service.analyze(mockContent);

      expect(result).toEqual(mockResult);
      expect(mockOpenAIProvider.analyze).toHaveBeenCalledWith(
        mockContent,
        undefined
      );
    });

    it('falls back to fallback provider when primary provider fails', async () => {
      const mockError = new AnalysisError(
        'Provider failed',
        'PROVIDER_ERROR',
        'openai'
      );

      const mockOpenAIProvider = {
        name: 'openai',
        analyze: vi.fn().mockRejectedValue(mockError),
        healthCheck: vi.fn(),
        getCapabilities: vi.fn(),
      };

      (service as any).providers.set('openai', mockOpenAIProvider);

      const result = await service.analyze(mockContent);

      // Should get a result from fallback provider
      expect(result).toBeDefined();
      expect(result.model).toBe('fallback-deterministic');
      expect(result.confidence).toBeLessThan(0.8); // Reduced confidence for fallback
    });

    it('retries on transient failures', async () => {
      const mockOpenAIProvider = {
        name: 'openai',
        analyze: vi
          .fn()
          .mockRejectedValueOnce(new Error('Transient error'))
          .mockResolvedValueOnce({
            goldenCircle: {
              whyScore: 80,
              howScore: 75,
              whatScore: 85,
              overallScore: 80,
            },
            consumerValue: {
              functionalScore: 75,
              emotionalScore: 70,
              lifeChangingScore: 65,
              socialImpactScore: 70,
              overallScore: 70,
              elementScores: {},
              topElements: [],
              detectedElements: [],
            },
            b2bValue: {
              functionalScore: 75,
              emotionalScore: 70,
              lifeChangingScore: 65,
              socialImpactScore: 70,
              overallScore: 70,
              elementScores: {},
              topElements: [],
              detectedElements: [],
            },
            cliftonStrengths: {
              executingScore: 75,
              influencingScore: 70,
              relationshipBuildingScore: 65,
              strategicThinkingScore: 80,
              overallScore: 72,
              themeScores: {},
              topThemes: [],
              detectedThemes: [],
            },
            barriers: { barriers: [] },
            recommendations: { recommendations: [] },
            confidence: 0.85,
            processingTime: 2000,
            model: 'gpt-4-turbo-preview',
            tokensUsed: 800,
          }),
        healthCheck: vi.fn(),
        getCapabilities: vi.fn(),
      };

      (service as any).providers.set('openai', mockOpenAIProvider);

      const result = await service.analyze(mockContent);

      expect(mockOpenAIProvider.analyze).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });

    it('does not retry on rate limit errors', async () => {
      const rateLimitError = new RateLimitError('openai', 60);

      const mockOpenAIProvider = {
        name: 'openai',
        analyze: vi.fn().mockRejectedValue(rateLimitError),
        healthCheck: vi.fn(),
        getCapabilities: vi.fn(),
      };

      (service as any).providers.set('openai', mockOpenAIProvider);

      const result = await service.analyze(mockContent);

      // Should only call once (no retry) and fall back
      expect(mockOpenAIProvider.analyze).toHaveBeenCalledTimes(1);
      expect(result.model).toBe('fallback-deterministic');
    });
  });

  describe('Provider Management', () => {
    it('gets provider status correctly', async () => {
      const mockOpenAIProvider = {
        name: 'openai',
        analyze: vi.fn(),
        healthCheck: vi.fn().mockResolvedValue(true),
        getCapabilities: vi.fn(),
      };

      (service as any).providers.set('openai', mockOpenAIProvider);

      const status = await service.getProviderStatus();

      expect(status.get('openai')).toBe(true);
      expect(status.get('fallback')).toBe(true);
    });

    it('gets provider capabilities', () => {
      const mockCapabilities = {
        maxTokens: 128000,
        supportsStreaming: true,
        supportsBatch: false,
        rateLimit: { requestsPerMinute: 3500, tokensPerMinute: 150000 },
        reliability: { averageUptime: 0.999, averageResponseTime: 2500 },
      };

      const mockOpenAIProvider = {
        name: 'openai',
        analyze: vi.fn(),
        healthCheck: vi.fn(),
        getCapabilities: vi.fn().mockReturnValue(mockCapabilities),
      };

      (service as any).providers.set('openai', mockOpenAIProvider);

      const capabilities = service.getProviderCapabilities('openai');
      expect(capabilities).toEqual(mockCapabilities);
    });

    it('returns null for non-existent provider capabilities', () => {
      const capabilities = service.getProviderCapabilities('non-existent');
      expect(capabilities).toBeNull();
    });
  });

  describe('Analysis Consistency', () => {
    it('produces consistent results for identical inputs', async () => {
      const content =
        'Our company helps businesses grow through innovative solutions';

      const result1 = await service.analyze(content, { provider: 'fallback' });
      const result2 = await service.analyze(content, { provider: 'fallback' });

      expect(result1.goldenCircle.whyScore).toBe(result2.goldenCircle.whyScore);
      expect(result1.goldenCircle.howScore).toBe(result2.goldenCircle.howScore);
      expect(result1.goldenCircle.whatScore).toBe(
        result2.goldenCircle.whatScore
      );
    });

    it('handles empty content gracefully', async () => {
      const result = await service.analyze('', { provider: 'fallback' });

      expect(result).toBeDefined();
      expect(result.goldenCircle.overallScore).toBeGreaterThan(0);
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('handles malformed content gracefully', async () => {
      const malformedContent = '!@#$%^&*()_+{}[]|\\:";\'<>?,./`~';

      const result = await service.analyze(malformedContent, {
        provider: 'fallback',
      });

      expect(result).toBeDefined();
      expect(result.goldenCircle.overallScore).toBeGreaterThan(0);
    });
  });
});


