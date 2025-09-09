import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { DemoAnalysisService } from '@/lib/demo-analysis';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await AuthService.verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { url } = body;

    if (!url || url.trim().length === 0) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Perform analysis (use demo if OpenAI not available)
    let analysisResult;
    try {
      analysisResult = await AIService.analyzeWebsite(url);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('OpenAI API key is not configured')
      ) {
        // Use demo analysis when OpenAI is not available
        analysisResult = await DemoAnalysisService.analyzeWebsite(url);
      } else {
        throw error;
      }
    }

    // Save analysis to database
    const analysis = await prisma.analysis.create({
      data: {
        userId: payload.userId,
        content: `Website analysis for: ${url}`,
        contentType: 'website',
        score: analysisResult.overallScore,
        insights: JSON.stringify({
          url: url,
          goldenCircle: analysisResult.goldenCircle,
          elementsOfValue: analysisResult.elementsOfValue,
          cliftonStrengths: analysisResult.cliftonStrengths,
          recommendations: analysisResult.recommendations,
        }),
        frameworks: 'golden-circle,elements-of-value,clifton-strengths',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Return analysis result
    return NextResponse.json({
      success: true,
      analysis: {
        id: analysis.id,
        url: url,
        ...analysisResult,
        createdAt: analysis.createdAt,
      },
    });
  } catch (error) {
    console.error('Website analysis error:', error);

    if (error instanceof Error) {
      if (error.message.includes('AI analysis failed')) {
        return NextResponse.json(
          {
            error:
              'AI analysis service temporarily unavailable. Please try again later.',
          },
          { status: 503 }
        );
      }
      if (error.message.includes('Failed to fetch website')) {
        return NextResponse.json(
          {
            error:
              'Unable to access the website. Please check the URL and try again.',
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
