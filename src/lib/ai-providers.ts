import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

export type AIProvider = 'openai' | 'gemini' | 'claude';

export interface AIProviderConfig {
  openai?: {
    apiKey: string;
    model?: string;
  };
  gemini?: {
    apiKey: string;
    model?: string;
  };
  claude?: {
    apiKey: string;
    model?: string;
  };
}

export interface AnalysisRequest {
  content: string;
  url?: string;
  contentType: 'website' | 'text' | 'document';
}

export interface AnalysisResult {
  goldenCircle: {
    why: string;
    how: string;
    what: string;
    overallScore: number;
    insights: string[];
  };
  elementsOfValue: {
    functional: { [key: string]: number };
    emotional: { [key: string]: number };
    lifeChanging: { [key: string]: number };
    socialImpact: { [key: string]: number };
    overallScore: number;
    insights: string[];
  };
  cliftonStrengths: {
    themes: { [key: string]: number };
    recommendations: string[];
    overallScore: number;
    insights: string[];
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    description: string;
    actionItems: string[];
  }>;
  overallScore: number;
  summary: string;
}

export class AIProviderService {
  private config: AIProviderConfig;
  private openai?: OpenAI;
  private gemini?: GoogleGenerativeAI;
  private claude?: Anthropic;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize OpenAI
    if (this.config.openai?.apiKey) {
      this.openai = new OpenAI({
        apiKey: this.config.openai.apiKey,
      });
    }

    // Initialize Gemini
    if (this.config.gemini?.apiKey) {
      this.gemini = new GoogleGenerativeAI(this.config.gemini.apiKey);
    }

    // Initialize Claude
    if (this.config.claude?.apiKey) {
      this.claude = new Anthropic({
        apiKey: this.config.claude.apiKey,
      });
    }
  }

  async analyzeWithProvider(
    provider: AIProvider,
    request: AnalysisRequest
  ): Promise<AnalysisResult> {
    switch (provider) {
      case 'openai':
        return this.analyzeWithOpenAI(request);
      case 'gemini':
        return this.analyzeWithGemini(request);
      case 'claude':
        return this.analyzeWithClaude(request);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  private async analyzeWithOpenAI(request: AnalysisRequest): Promise<AnalysisResult> {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    const prompt = this.buildAnalysisPrompt(request);
    const model = this.config.openai?.model || 'gpt-4-turbo-preview';

    try {
      const response = await this.openai.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: `You are an expert business analyst specializing in content analysis using proven frameworks. Analyze the provided content using Simon Sinek's Golden Circle, Bain's Elements of Value, and Gallup's CliftonStrengths principles. Return your analysis in valid JSON format.`
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const rawAnalysis = response.choices[0]?.message?.content;
      if (!rawAnalysis) {
        throw new Error('OpenAI analysis returned no content.');
      }

      return JSON.parse(rawAnalysis);
    } catch (error) {
      console.error('OpenAI analysis failed:', error);
      throw new Error(`OpenAI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async analyzeWithGemini(request: AnalysisRequest): Promise<AnalysisResult> {
    if (!this.gemini) {
      throw new Error('Gemini not configured');
    }

    const prompt = this.buildAnalysisPrompt(request);
    const model = this.config.gemini?.model || 'gemini-1.5-flash';
    const generativeModel = this.gemini.getGenerativeModel({ model });

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = await result.response;
      const rawAnalysis = response.text();

      if (!rawAnalysis) {
        throw new Error('Gemini analysis returned no content.');
      }

      // Extract JSON from response (Gemini might include extra text)
      const jsonMatch = rawAnalysis.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Gemini response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini analysis failed:', error);
      throw new Error(`Gemini analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async analyzeWithClaude(request: AnalysisRequest): Promise<AnalysisResult> {
    if (!this.claude) {
      throw new Error('Claude not configured');
    }

    const prompt = this.buildAnalysisPrompt(request);
    const model = this.config.claude?.model || 'claude-3-haiku-20240307';

    try {
      const response = await this.claude.messages.create({
        model,
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const rawAnalysis = response.content[0];
      if (!rawAnalysis || rawAnalysis.type !== 'text') {
        throw new Error('Claude returned non-text response');
      }

      const analysisText = rawAnalysis.text;
      if (!analysisText) {
        throw new Error('Claude analysis returned no content.');
      }

      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Claude response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Claude analysis failed:', error);
      throw new Error(`Claude analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildAnalysisPrompt(request: AnalysisRequest): string {
    const { buildComprehensiveAnalysisPrompt } = require('./analysis-templates');
    return buildComprehensiveAnalysisPrompt(request.content, request.url);
  }

  getAvailableProviders(): AIProvider[] {
    const providers: AIProvider[] = [];
    if (this.config.openai?.apiKey) providers.push('openai');
    if (this.config.gemini?.apiKey) providers.push('gemini');
    if (this.config.claude?.apiKey) providers.push('claude');
    return providers;
  }

  isProviderAvailable(provider: AIProvider): boolean {
    return this.getAvailableProviders().includes(provider);
  }
}
