import { NextRequest, NextResponse } from 'next/server';
import { EnhancedAIService } from '@/lib/enhanced-ai-service';
import { ProductionContentExtractor } from '@/lib/production-content-extractor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, content, contentType = 'website' } = body;

    if (!url && !content) {
      return NextResponse.json(
        { error: 'Either URL or content is required' },
        { status: 400 }
      );
    }

    let analysisResult;

    if (url) {
      // Use production content extractor for better results
      const extractor = new ProductionContentExtractor();
      const extractedContent = await extractor.extractContent(url);
      analysisResult = await EnhancedAIService.analyzeContent(extractedContent.content, contentType, 'openai', url);
    } else if (content) {
      // Analyze provided content
      analysisResult = await EnhancedAIService.analyzeContent(content, contentType);
    } else {
      return NextResponse.json(
        { error: 'Either URL or content must be provided' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis: {
        ...analysisResult,
        id: `analysis-${Date.now()}`,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Analysis failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
