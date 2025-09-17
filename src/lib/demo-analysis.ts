export interface AnalysisResult {
  id: string;
  url: string;
  createdAt: string;
  goldenCircle: {
    why: string;
    how: string;
    what: string;
    who: string;
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
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    description: string;
    actionItems: string[];
  }[];
  overallScore: number;
  summary: string;
}

export class DemoAnalysisService {
  static async analyzeContent(content: string, contentType: 'website' | 'text' | 'document' = 'text', url?: string): Promise<AnalysisResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract domain from URL for more individualized analysis
    const domain = url ? new URL(url).hostname.toLowerCase() : '';
    const isTechCompany = content.toLowerCase().includes('technology') || content.toLowerCase().includes('innovation') || 
                         domain.includes('tech') || domain.includes('software') || domain.includes('ai') || domain.includes('digital');
    const isEcommerce = content.toLowerCase().includes('shop') || content.toLowerCase().includes('buy') || content.toLowerCase().includes('purchase') ||
                       domain.includes('shop') || domain.includes('store') || domain.includes('marketplace');
    const isSaaS = content.toLowerCase().includes('software') || content.toLowerCase().includes('platform') || content.toLowerCase().includes('api') ||
                  domain.includes('app') || domain.includes('cloud') || domain.includes('saas');
    const isConsulting = domain.includes('consulting') || domain.includes('consultants') || domain.includes('advisory');
    const isEducation = domain.includes('edu') || domain.includes('university') || domain.includes('school') || domain.includes('academy');
    const isHealthcare = domain.includes('health') || domain.includes('medical') || domain.includes('clinic') || domain.includes('hospital');

    let goldenCircleScore = 75;
    let elementsOfValueScore = 70;
    let cliftonStrengthsScore = 65;
    let summary = `This is a demo analysis of ${contentType} content. The content shows potential but has room for improvement in key areas.`;

    if (isTechCompany) {
      goldenCircleScore = 90;
      elementsOfValueScore = 85;
      cliftonStrengthsScore = 80;
      summary = `This tech-focused ${contentType} demonstrates strong innovation and clear value proposition. The content effectively communicates the company's mission and products.`;
    } else if (isEcommerce) {
      goldenCircleScore = 80;
      elementsOfValueScore = 90;
      cliftonStrengthsScore = 70;
      summary = `This e-commerce focused ${contentType} excels in functional value and user experience. The product presentation and shopping experience are well-optimized.`;
    } else if (isSaaS) {
      goldenCircleScore = 85;
      elementsOfValueScore = 88;
      cliftonStrengthsScore = 78;
      summary = `This SaaS-focused ${contentType} provides excellent functional value and clear solutions. The content effectively communicates the software's benefits and use cases.`;
    } else if (isConsulting) {
      goldenCircleScore = 88;
      elementsOfValueScore = 82;
      cliftonStrengthsScore = 85;
      summary = `This consulting-focused ${contentType} demonstrates strong expertise and client value. The content effectively showcases professional capabilities and industry knowledge.`;
    } else if (isEducation) {
      goldenCircleScore = 82;
      elementsOfValueScore = 85;
      cliftonStrengthsScore = 78;
      summary = `This education-focused ${contentType} provides valuable learning content and clear educational pathways. The content effectively communicates knowledge and learning opportunities.`;
    } else if (isHealthcare) {
      goldenCircleScore = 85;
      elementsOfValueScore = 88;
      cliftonStrengthsScore = 82;
      summary = `This healthcare-focused ${contentType} demonstrates strong patient care focus and medical expertise. The content effectively communicates trust and professional healthcare services.`;
    }

    return {
      id: `demo-${Date.now()}`,
      url: url || 'demo-content',
      createdAt: new Date().toISOString(),
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
        who: isConsulting
          ? "Our team of expert consultants and satisfied clients."
          : "Our target audience and the people we serve.",
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
        themes: {
          'Achiever': 8,
          'Strategic': 7,
          'Learner': 6,
          'Relator': 5,
          'Activator': 7
        },
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
      overallScore: Math.round((goldenCircleScore + elementsOfValueScore + cliftonStrengthsScore) / 3),
      summary
    };
  }

  static async analyzeWebsite(url: string): Promise<AnalysisResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return demo analysis based on URL
    const isTechCompany =
      url.includes('apple') ||
      url.includes('google') ||
      url.includes('microsoft') ||
      url.includes('stripe');
    const isEcommerce =
      url.includes('amazon') || url.includes('shopify') || url.includes('etsy');
    const isSaaS =
      url.includes('stripe') ||
      url.includes('hubspot') ||
      url.includes('salesforce');

    if (isTechCompany) {
      return this.getTechCompanyAnalysis();
    } else if (isEcommerce) {
      return this.getEcommerceAnalysis();
    } else if (isSaaS) {
      return this.getSaaSAnalysis();
    } else {
      return this.getGenericAnalysis();
    }
  }

  private static getTechCompanyAnalysis(): AnalysisResult {
    return {
      id: `demo-${Date.now()}`,
      url: 'demo-tech-company',
      createdAt: new Date().toISOString(),
      goldenCircle: {
        why: 'To empower people through innovative technology that simplifies complex problems and enhances human potential.',
        how: 'Through cutting-edge research, user-centered design, and seamless integration of hardware and software solutions.',
        what: 'Consumer electronics, software platforms, and digital services that transform how people work, communicate, and create.',
        who: 'Our customers, partners, and the global community of innovators and creators.',
        overallScore: 88,
        insights: [
          "Strong 'why' messaging that resonates with innovation and empowerment",
          'Clear differentiation through design excellence and ecosystem approach',
          'Consistent brand narrative across all touchpoints',
        ],
      },
      elementsOfValue: {
        functional: {
          savesTime: 9,
          reducesRisk: 8,
          simplifies: 9,
          reducesEffort: 8,
          avoidsHassles: 7,
          organizes: 8,
          integrates: 9,
          connects: 8,
          reducesCost: 6,
          quality: 9,
        },
        emotional: {
          reducesAnxiety: 7,
          rewardsMe: 8,
          nostalgia: 5,
          designAesthetics: 9,
          wellness: 6,
          therapeuticValue: 4,
          fun: 8,
          entertainment: 7,
          providesAccess: 8,
          badgeValue: 8,
        },
        lifeChanging: {
          motivation: 8,
          selfActualization: 7,
          hope: 8,
          heirloom: 6,
          selfTranscendence: 6,
        },
        socialImpact: {
          belonging: 7,
          makesMeBetter: 8,
        },
        overallScore: 82,
        insights: [
          'Exceptional design aesthetics and quality scores',
          'Strong functional value through simplification and integration',
          'High badge value and aspirational appeal',
        ],
      },
      cliftonStrengths: {
        themes: {
          achiever: 9,
          activator: 8,
          adaptability: 7,
          analytical: 8,
          arranger: 8,
          belief: 7,
          command: 6,
          communication: 8,
          competition: 8,
          connectedness: 7,
          consistency: 8,
          context: 7,
          deliberative: 8,
          developer: 7,
          discipline: 8,
          empathy: 6,
          focus: 9,
          futuristic: 8,
          harmony: 5,
          ideation: 9,
          includer: 6,
          individualization: 7,
          input: 8,
          intellection: 8,
          learner: 8,
          maximizer: 8,
          positivity: 7,
          relator: 6,
          responsibility: 8,
          restorative: 7,
          'self-assurance': 8,
          significance: 7,
          strategic: 8,
          woo: 6,
        },
        recommendations: [
          'Leverage strong achiever and focus themes for product development',
          'Use ideation strength for innovation and breakthrough thinking',
        ],
        overallScore: 78,
        insights: [
          'Strong developer and includer themes indicate community focus',
          'High achiever and activator scores show execution capability',
          'Communication and competition themes suggest market awareness'
        ],
      },
      recommendations: [
        {
          priority: 'high',
          category: 'Brand Messaging',
          description:
            'Strengthen emotional connection by emphasizing the human impact of technology',
          actionItems: [
            'Develop customer success stories that highlight transformation',
            'Create content that shows technology enabling human creativity',
            'Emphasize accessibility and inclusion in product messaging',
          ],
        },
        {
          priority: 'medium',
          category: 'User Experience',
          description: 'Enhance onboarding and reduce complexity for new users',
          actionItems: [
            'Implement progressive disclosure in complex features',
            'Create interactive tutorials and guided experiences',
            'Develop contextual help and support systems',
          ],
        },
        ],
        overallScore: 82,
      summary:
        'This tech company demonstrates strong Golden Circle alignment with clear innovation focus. High scores in design aesthetics, quality, and functional value elements. Strong achiever and focus themes suggest excellent execution capabilities. Recommendations focus on enhancing emotional connection and user experience simplification.',
    };
  }

  private static getEcommerceAnalysis(): AnalysisResult {
    return {
      id: `demo-${Date.now()}`,
      url: 'demo-ecommerce',
      createdAt: new Date().toISOString(),
      goldenCircle: {
        why: 'To democratize commerce and make selling accessible to everyone, everywhere.',
        how: 'Through intuitive platforms, comprehensive tools, and supportive communities that remove barriers to entrepreneurship.',
        what: 'E-commerce platforms, payment processing, and business tools that enable anyone to start and grow an online business.',
        who: 'Entrepreneurs, small business owners, and aspiring sellers worldwide.',
        overallScore: 85,
        insights: [
          'Clear democratization message that appeals to entrepreneurs',
          'Strong focus on accessibility and removing barriers',
          'Community-driven approach builds trust and loyalty',
        ],
      },
      elementsOfValue: {
        functional: {
          savesTime: 8,
          reducesRisk: 7,
          simplifies: 8,
          reducesEffort: 8,
          avoidsHassles: 7,
          organizes: 8,
          integrates: 7,
          connects: 8,
          reducesCost: 8,
          quality: 7,
        },
        emotional: {
          reducesAnxiety: 7,
          rewardsMe: 8,
          nostalgia: 4,
          designAesthetics: 7,
          wellness: 5,
          therapeuticValue: 4,
          fun: 7,
          entertainment: 6,
          providesAccess: 9,
          badgeValue: 6,
        },
        lifeChanging: {
          motivation: 8,
          selfActualization: 8,
          hope: 8,
          heirloom: 5,
          selfTranscendence: 6,
        },
        socialImpact: {
          belonging: 8,
          makesMeBetter: 8,
        },
        overallScore: 75,
        insights: [
          "Excellent 'provides access' score enabling entrepreneurship",
          'Strong motivation and self-actualization elements',
          'Good functional value through simplification and cost reduction',
        ],
      },
      cliftonStrengths: {
        themes: {
          achiever: 8,
          activator: 8,
          adaptability: 7,
          analytical: 7,
          arranger: 8,
          belief: 8,
          command: 6,
          communication: 8,
          competition: 7,
          connectedness: 8,
          consistency: 7,
          context: 7,
          deliberative: 7,
          developer: 8,
          discipline: 7,
          empathy: 7,
          focus: 8,
          futuristic: 7,
          harmony: 6,
          ideation: 7,
          includer: 8,
          individualization: 7,
          input: 7,
          intellection: 7,
          learner: 8,
          maximizer: 7,
          positivity: 8,
          relator: 7,
          responsibility: 8,
          restorative: 7,
          'self-assurance': 7,
          significance: 7,
          strategic: 7,
          woo: 6,
        },
        recommendations: [
          'Leverage developer and includer themes for community building',
          'Use achiever strength for platform growth and feature development',
        ],
        overallScore: 73,
        insights: [
          'Strong developer and includer themes indicate community focus',
          'High achiever and activator scores show execution capability',
          'Communication and competition themes suggest market awareness'
        ],
      },
      recommendations: [
        {
          priority: 'high',
          category: 'Community Building',
          description: 'Strengthen community features and peer-to-peer support',
          actionItems: [
            'Create mentorship programs for new sellers',
            'Develop seller success showcases and case studies',
            'Implement community forums and knowledge sharing',
          ],
        },
        {
          priority: 'medium',
          category: 'Platform Simplification',
          description: 'Reduce complexity in onboarding and setup processes',
          actionItems: [
            'Create one-click store setup wizards',
            'Develop template libraries for common business types',
            'Implement guided tours and interactive tutorials',
          ],
        },
      ],
      overallScore: 78,
      summary:
        'This e-commerce platform shows strong democratization messaging and excellent access provision. High scores in motivation, self-actualization, and community building. Strong developer and includer themes suggest good community focus. Key opportunities in simplifying onboarding and strengthening community features.',
    };
  }

  private static getSaaSAnalysis(): AnalysisResult {
    return {
      id: `demo-${Date.now()}`,
      url: 'demo-saas',
      createdAt: new Date().toISOString(),
      goldenCircle: {
        why: 'To empower businesses to grow faster and more efficiently through intelligent automation and data-driven insights.',
        how: 'Through seamless integrations, powerful analytics, and intuitive workflows that eliminate manual processes.',
        what: 'Business software, automation tools, and analytics platforms that streamline operations and drive growth.',
        who: 'Business leaders, operations teams, and growth-focused organizations.',
        overallScore: 87,
        insights: [
          'Clear business growth focus with measurable outcomes',
          'Strong emphasis on efficiency and automation',
          'Data-driven approach builds credibility and trust',
        ],
      },
      elementsOfValue: {
        functional: {
          savesTime: 9,
          reducesRisk: 8,
          simplifies: 8,
          reducesEffort: 9,
          avoidsHassles: 8,
          organizes: 8,
          integrates: 9,
          connects: 8,
          reducesCost: 8,
          quality: 8,
        },
        emotional: {
          reducesAnxiety: 8,
          rewardsMe: 7,
          nostalgia: 3,
          designAesthetics: 7,
          wellness: 5,
          therapeuticValue: 4,
          fun: 6,
          entertainment: 5,
          providesAccess: 8,
          badgeValue: 7,
        },
        lifeChanging: {
          motivation: 7,
          selfActualization: 7,
          hope: 7,
          heirloom: 4,
          selfTranscendence: 5,
        },
        socialImpact: {
          belonging: 6,
          makesMeBetter: 7,
        },
        overallScore: 79,
        insights: [
          'Exceptional functional value through time savings and effort reduction',
          'Strong integration capabilities and risk reduction',
          'Good anxiety reduction through automation and reliability',
        ],
      },
      cliftonStrengths: {
        themes: {
          achiever: 8,
          activator: 7,
          adaptability: 7,
          analytical: 9,
          arranger: 8,
          belief: 7,
          command: 6,
          communication: 7,
          competition: 7,
          connectedness: 6,
          consistency: 8,
          context: 8,
          deliberative: 8,
          developer: 7,
          discipline: 8,
          empathy: 6,
          focus: 8,
          futuristic: 7,
          harmony: 5,
          ideation: 7,
          includer: 6,
          individualization: 7,
          input: 8,
          intellection: 8,
          learner: 8,
          maximizer: 7,
          positivity: 6,
          relator: 6,
          responsibility: 8,
          restorative: 7,
          'self-assurance': 7,
          significance: 6,
          strategic: 8,
          woo: 5,
        },
        recommendations: [
          'Leverage analytical and strategic themes for data-driven decision making',
          'Use achiever and focus strengths for consistent product development',
        ],
        overallScore: 76,
        insights: [
          'Strong analytical and strategic themes support data-driven approach',
          'High achiever and focus scores indicate consistent execution',
          'Good balance of technical and communication strengths'
        ],
      },
      recommendations: [
        {
          priority: 'high',
          category: 'User Experience',
          description: 'Enhance user onboarding and reduce time-to-value',
          actionItems: [
            'Create interactive product tours and guided setup',
            'Implement progressive feature disclosure',
            'Develop success metrics and milestone celebrations',
          ],
        },
        {
          priority: 'medium',
          category: 'Integration Ecosystem',
          description: 'Expand integration capabilities and marketplace',
          actionItems: [
            'Develop API-first architecture for easy integrations',
            'Create integration marketplace with pre-built connectors',
            'Implement webhook systems for real-time data sync',
          ],
        },
      ],
      overallScore: 81,
      summary:
        'This SaaS platform demonstrates excellent functional value through automation and efficiency. Strong analytical and strategic themes support data-driven approach. High scores in time savings and effort reduction. Key opportunities in improving user onboarding and expanding integration ecosystem.',
    };
  }

  private static getGenericAnalysis(): AnalysisResult {
    return {
      id: `demo-${Date.now()}`,
      url: 'demo-generic',
      createdAt: new Date().toISOString(),
      goldenCircle: {
        why: 'To provide value and solve problems for our customers through innovative solutions and exceptional service.',
        how: 'Through dedicated team members, proven processes, and customer-focused approach that prioritizes quality and reliability.',
        what: 'Products and services that meet customer needs and deliver measurable results for business growth and success.',
        who: 'Our valued customers and the communities we serve.',
        overallScore: 72,
        insights: [
          'Generic messaging lacks specific differentiation',
          'Customer focus is present but not uniquely positioned',
          "Opportunity to develop more compelling 'why' narrative",
        ],
      },
      elementsOfValue: {
        functional: {
          savesTime: 6,
          reducesRisk: 6,
          simplifies: 6,
          reducesEffort: 6,
          avoidsHassles: 5,
          organizes: 6,
          integrates: 5,
          connects: 6,
          reducesCost: 6,
          quality: 7,
        },
        emotional: {
          reducesAnxiety: 6,
          rewardsMe: 6,
          nostalgia: 4,
          designAesthetics: 6,
          wellness: 5,
          therapeuticValue: 4,
          fun: 5,
          entertainment: 5,
          providesAccess: 6,
          badgeValue: 5,
        },
        lifeChanging: {
          motivation: 6,
          selfActualization: 6,
          hope: 6,
          heirloom: 4,
          selfTranscendence: 5,
        },
        socialImpact: {
          belonging: 6,
          makesMeBetter: 6,
        },
        overallScore: 58,
        insights: [
          'Average scores across most value elements',
          'No standout functional or emotional benefits',
          'Opportunity to identify and emphasize unique value propositions',
        ],
      },
      cliftonStrengths: {
        themes: {
          achiever: 6,
          activator: 6,
          adaptability: 6,
          analytical: 6,
          arranger: 6,
          belief: 6,
          command: 5,
          communication: 6,
          competition: 6,
          connectedness: 6,
          consistency: 6,
          context: 6,
          deliberative: 6,
          developer: 6,
          discipline: 6,
          empathy: 6,
          focus: 6,
          futuristic: 6,
          harmony: 6,
          ideation: 6,
          includer: 6,
          individualization: 6,
          input: 6,
          intellection: 6,
          learner: 6,
          maximizer: 6,
          positivity: 6,
          relator: 6,
          responsibility: 6,
          restorative: 6,
          'self-assurance': 6,
          significance: 6,
          strategic: 6,
          woo: 5,
        },
        recommendations: [
          'Develop stronger differentiation and unique positioning',
          'Identify and leverage core strengths for competitive advantage',
        ],
        overallScore: 60,
        insights: [
          'Average scores across all themes indicate room for improvement',
          'Generic positioning limits appeal to specific personality types',
          'Need to identify and leverage core strengths for differentiation'
        ],
      },
      recommendations: [
        {
          priority: 'high',
          category: 'Brand Differentiation',
          description:
            'Develop unique value proposition and competitive positioning',
          actionItems: [
            'Conduct market research to identify unique strengths',
            'Develop compelling brand story and messaging',
            'Create differentiated product or service offerings',
          ],
        },
        {
          priority: 'high',
          category: 'Customer Research',
          description: 'Better understand customer needs and pain points',
          actionItems: [
            'Conduct customer interviews and surveys',
            'Analyze customer feedback and support tickets',
            'Develop customer personas and journey maps',
          ],
        },
        {
          priority: 'medium',
          category: 'Content Strategy',
          description: 'Create valuable content that demonstrates expertise',
          actionItems: [
            'Develop educational content and resources',
            'Create case studies and success stories',
            'Establish thought leadership through industry insights',
          ],
        },
      ],
      overallScore: 63,
      summary:
        'This website shows average performance across all frameworks with room for significant improvement. Generic messaging and lack of differentiation are key challenges. High priority recommendations focus on brand differentiation and customer research to develop unique value propositions.',
    };
  }
}
