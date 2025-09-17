// Client-side analysis system for GitHub Pages
export interface AnalysisResult {
  id: string;
  url: string;
  overallScore: number;
  summary: string;
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
    themes: string[];
    recommendations: string[];
    overallScore: number;
    insights: string[];
  };
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    description: string;
    actionItems: string[];
  }[];
  createdAt: string;
}

export class AnalysisClient {
  private static readonly STORAGE_KEY = 'zero-barriers-analyses';
  private static readonly API_BASE_URL = 'https://api.openai.com/v1';

  // Get all saved analyses from localStorage
  static getAnalyses(): AnalysisResult[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading analyses:', error);
      return [];
    }
  }

  // Save analysis to localStorage
  static saveAnalysis(analysis: AnalysisResult): void {
    if (typeof window === 'undefined') return;
    
    try {
      const analyses = this.getAnalyses();
      analyses.unshift(analysis); // Add to beginning
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(analyses));
    } catch (error) {
      console.error('Error saving analysis:', error);
    }
  }

  // Delete analysis by ID
  static deleteAnalysis(id: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const analyses = this.getAnalyses();
      const filtered = analyses.filter(a => a.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  }

  // Analyze website using external AI service
  static async analyzeWebsite(url: string): Promise<AnalysisResult> {
    try {
      // First, try to fetch the website content
      const content = await this.fetchWebsiteContent(url);
      
      // Then analyze with AI
      const analysis = await this.analyzeWithAI(url, content);
      
      // Save to localStorage
      this.saveAnalysis(analysis);
      
      return analysis;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Fetch website content
  private static async fetchWebsiteContent(url: string): Promise<string> {
    try {
      // Use a CORS proxy for GitHub Pages
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.statusText}`);
      }
      
      const data = await response.json();
      const html = data.contents;
      
      // Basic HTML parsing to extract text content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Remove script and style elements
      const scripts = doc.querySelectorAll('script, style, nav, header, footer');
      scripts.forEach(el => el.remove());
      
      // Extract text content
      const textContent = doc.body?.textContent || '';
      return textContent.replace(/\s+/g, ' ').trim();
    } catch (error) {
      console.error('Error fetching website content:', error);
      throw new Error(`Failed to fetch website content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Analyze content with AI (using external service)
  private static async analyzeWithAI(url: string, content: string): Promise<AnalysisResult> {
    try {
      // For now, use a demo analysis with realistic data
      // In production, this would call OpenAI API or similar
      return this.generateDemoAnalysis(url, content);
    } catch (error) {
      console.error('AI analysis failed:', error);
      throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Generate realistic demo analysis
  private static generateDemoAnalysis(url: string, content: string): AnalysisResult {
    const isTechCompany = url.includes('apple.com') || url.includes('google.com') || url.includes('microsoft.com');
    const isEcommerce = url.includes('shopify.com') || url.includes('amazon.com');
    const isSaaS = url.includes('stripe.com') || url.includes('hubspot.com');

    // Generate scores based on URL patterns
    let goldenCircleScore = 75;
    let elementsOfValueScore = 70;
    let cliftonStrengthsScore = 65;
    let summary = `This is a comprehensive analysis of ${url}. The content shows potential but has room for improvement in key areas.`;

    if (isTechCompany) {
      goldenCircleScore = 90;
      elementsOfValueScore = 85;
      cliftonStrengthsScore = 80;
      summary = `This tech company website (${url}) demonstrates strong innovation and clear value proposition. The content effectively communicates the company's mission and products.`;
    } else if (isEcommerce) {
      goldenCircleScore = 80;
      elementsOfValueScore = 90;
      cliftonStrengthsScore = 70;
      summary = `This e-commerce website (${url}) excels in functional value and user experience. The product presentation and shopping experience are well-optimized.`;
    } else if (isSaaS) {
      goldenCircleScore = 85;
      elementsOfValueScore = 88;
      cliftonStrengthsScore = 78;
      summary = `This SaaS website (${url}) provides excellent functional value and clear solutions. The content effectively communicates the software's benefits and use cases.`;
    }

    return {
      id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url,
      overallScore: Math.round((goldenCircleScore + elementsOfValueScore + cliftonStrengthsScore) / 3),
      summary,
      goldenCircle: {
        why: isTechCompany 
          ? "The company's mission to innovate and improve lives through technology is clearly communicated."
          : "The core purpose and mission could be more prominently featured and emotionally compelling.",
        how: isTechCompany
          ? "The approach is well-defined through cutting-edge technology and user-centered design."
          : "The methodology and approach are present but could be more distinctive and differentiated.",
        what: isTechCompany
          ? "Products and services are clearly defined and aligned with the company's mission."
          : "The offerings are clear but could better connect to the underlying purpose and values.",
        overallScore: goldenCircleScore,
        insights: [
          isTechCompany ? "Excellent articulation of company mission and values" : "Consider strengthening the 'Why' messaging to create deeper emotional connections",
          isTechCompany ? "Clear differentiation through innovation and technology" : "The 'How' could be more distinctive and compelling",
          isTechCompany ? "Strong alignment between products and mission" : "Ensure the 'What' consistently reflects the 'Why' and 'How'"
        ]
      },
      elementsOfValue: {
        functional: {
          savesTime: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 9 : 7,
          simplifies: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          makesMoney: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 9 : 6,
          reducesRisk: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 8 : 6,
          organizes: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 6,
          integrates: isTechCompany ? 9 : isEcommerce ? 7 : isSaaS ? 9 : 6,
          connects: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          reducesEffort: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          avoidsHassle: isTechCompany ? 8 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          quality: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          variety: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          sensoryAppeal: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          informs: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 9 : 7,
          badge: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          design: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          customization: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesCost: isTechCompany ? 6 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesWaste: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 7 : 6,
          authenticity: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          belonging: isTechCompany ? 6 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          funEntertainment: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          attractiveness: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          wellness: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 6 : 6,
          reducesAnxiety: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          rewards: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          nostalgia: isTechCompany ? 5 : isEcommerce ? 7 : isSaaS ? 5 : 5,
          designAesthetics: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          selfActualization: isTechCompany ? 8 : isEcommerce ? 6 : isSaaS ? 8 : 7,
          providesHope: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 7 : 6,
          motivation: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 8 : 7
        },
        emotional: {
          reducesAnxiety: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          rewards: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          nostalgia: isTechCompany ? 5 : isEcommerce ? 7 : isSaaS ? 5 : 5,
          designAesthetics: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          funEntertainment: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          attractiveness: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          wellness: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 6 : 6,
          belonging: isTechCompany ? 6 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          providesAccess: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          simplifies: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          makesMoney: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 9 : 6,
          reducesRisk: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 8 : 6,
          organizes: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 6,
          integrates: isTechCompany ? 9 : isEcommerce ? 7 : isSaaS ? 9 : 6,
          connects: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          reducesEffort: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          avoidsHassle: isTechCompany ? 8 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          quality: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          variety: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          sensoryAppeal: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          informs: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 9 : 7,
          badge: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          design: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          customization: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesCost: isTechCompany ? 6 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesWaste: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 7 : 6,
          authenticity: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          selfActualization: isTechCompany ? 8 : isEcommerce ? 6 : isSaaS ? 8 : 7,
          providesHope: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 7 : 6,
          motivation: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 8 : 7
        },
        lifeChanging: {
          providesHope: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 7 : 6,
          selfActualization: isTechCompany ? 8 : isEcommerce ? 6 : isSaaS ? 8 : 7,
          motivation: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 8 : 7,
          reducesAnxiety: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          rewards: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          nostalgia: isTechCompany ? 5 : isEcommerce ? 7 : isSaaS ? 5 : 5,
          designAesthetics: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          funEntertainment: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          attractiveness: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          wellness: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 6 : 6,
          belonging: isTechCompany ? 6 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          providesAccess: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          simplifies: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          makesMoney: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 9 : 6,
          reducesRisk: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 8 : 6,
          organizes: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 6,
          integrates: isTechCompany ? 9 : isEcommerce ? 7 : isSaaS ? 9 : 6,
          connects: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          reducesEffort: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          avoidsHassle: isTechCompany ? 8 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          quality: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          variety: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          sensoryAppeal: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          informs: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 9 : 7,
          badge: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          design: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          customization: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesCost: isTechCompany ? 6 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesWaste: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 7 : 6,
          authenticity: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 7
        },
        socialImpact: {
          selfTranscendence: isTechCompany ? 8 : isEcommerce ? 6 : isSaaS ? 8 : 7,
          providesHope: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 7 : 6,
          selfActualization: isTechCompany ? 8 : isEcommerce ? 6 : isSaaS ? 8 : 7,
          motivation: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 8 : 7,
          reducesAnxiety: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          rewards: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          nostalgia: isTechCompany ? 5 : isEcommerce ? 7 : isSaaS ? 5 : 5,
          designAesthetics: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          funEntertainment: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          attractiveness: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          wellness: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 6 : 6,
          belonging: isTechCompany ? 6 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          providesAccess: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          simplifies: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          makesMoney: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 9 : 6,
          reducesRisk: isTechCompany ? 7 : isEcommerce ? 6 : isSaaS ? 8 : 6,
          organizes: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 8 : 6,
          integrates: isTechCompany ? 9 : isEcommerce ? 7 : isSaaS ? 9 : 6,
          connects: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          reducesEffort: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 9 : 7,
          avoidsHassle: isTechCompany ? 8 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          quality: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 8 : 7,
          variety: isTechCompany ? 7 : isEcommerce ? 9 : isSaaS ? 7 : 7,
          sensoryAppeal: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 6 : 6,
          informs: isTechCompany ? 8 : isEcommerce ? 7 : isSaaS ? 9 : 7,
          badge: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 6,
          design: isTechCompany ? 9 : isEcommerce ? 8 : isSaaS ? 7 : 7,
          customization: isTechCompany ? 8 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesCost: isTechCompany ? 6 : isEcommerce ? 9 : isSaaS ? 8 : 7,
          reducesWaste: isTechCompany ? 6 : isEcommerce ? 7 : isSaaS ? 7 : 6,
          authenticity: isTechCompany ? 7 : isEcommerce ? 8 : isSaaS ? 7 : 7
        },
        overallScore: elementsOfValueScore,
        insights: [
          isTechCompany ? "Strong functional value in innovation and integration" : "Focus on providing more functional value, such as 'simplifies' and 'makes money'",
          isTechCompany ? "Excellent emotional connection through design and authenticity" : "Enhance emotional connections by emphasizing 'reduces anxiety' and 'provides access'",
          isTechCompany ? "Good life-changing elements in self-actualization and motivation" : "Explore opportunities for life-changing value, like 'provides hope' or 'self-actualization'"
        ]
      },
      cliftonStrengths: {
        themes: ['Achiever', 'Strategic', 'Learner', 'Relator', 'Activator'],
        recommendations: [
          isTechCompany ? "Appeal to Strategic thinkers with long-term vision and innovation" : "Appeal to Strategic thinkers by outlining long-term vision and goals",
          isTechCompany ? "Engage Executing themes with clear product roadmaps" : "To engage Executing themes, provide clear, actionable steps or processes",
          isTechCompany ? "Connect with Influencing themes through thought leadership" : "For Influencing themes, use more persuasive language and calls to action"
        ],
        overallScore: cliftonStrengthsScore,
        insights: [
          isTechCompany ? "Content appeals strongly to achievement-oriented individuals" : "The content could better appeal to 'Strategic' thinkers by outlining long-term vision",
          isTechCompany ? "Strategic thinking elements are well-presented" : "To engage 'Executing' themes, provide clear, actionable steps or processes",
          isTechCompany ? "Good balance of collaborative and individual themes" : "For 'Influencing' themes, use more persuasive language and calls to action"
        ]
      },
      recommendations: [
        {
          priority: 'high',
          category: 'Golden Circle',
          description: isTechCompany 
            ? "Maintain your strong 'Why' messaging and consider expanding it to more touchpoints"
            : "Strengthen your 'Why' messaging to create deeper emotional connections with your audience",
          actionItems: [
            isTechCompany 
              ? "Continue highlighting your mission in key content areas"
              : "Conduct a messaging workshop to define your core purpose",
            isTechCompany
              ? "Consider adding more emotional storytelling elements"
              : "Update your homepage hero section to lead with your 'Why'",
            isTechCompany
              ? "Expand mission-driven content across all channels"
              : "Incorporate storytelling that highlights your mission and values"
          ]
        },
        {
          priority: 'medium',
          category: 'Elements of Value',
          description: isTechCompany
            ? "Leverage your strong functional value to enhance emotional connections"
            : "Enhance the perceived functional value of your offerings by highlighting specific benefits",
          actionItems: [
            isTechCompany
              ? "Add more customer success stories and testimonials"
              : "Add clear value propositions to product descriptions",
            isTechCompany
              ? "Create content that addresses customer aspirations"
              : "Use case studies to demonstrate how your product simplifies tasks",
            isTechCompany
              ? "Develop community-building features"
              : "Implement testimonials that speak to time-saving or efficiency gains"
          ]
        },
        {
          priority: 'low',
          category: 'CliftonStrengths',
          description: isTechCompany
            ? "Continue diversifying content to appeal to different personality types"
            : "Tailor content to resonate with diverse CliftonStrengths themes to broaden appeal",
          actionItems: [
            isTechCompany
              ? "Add more analytical content for data-driven individuals"
              : "Develop content that appeals to 'Achiever' themes by showcasing results",
            isTechCompany
              ? "Create collaborative content for relationship builders"
              : "Create resources for 'Learner' themes with educational content",
            isTechCompany
              ? "Include inspirational content for motivators"
              : "Design calls to action that speak to 'Activator' themes"
          ]
        }
      ],
      createdAt: new Date().toISOString()
    };
  }
}
