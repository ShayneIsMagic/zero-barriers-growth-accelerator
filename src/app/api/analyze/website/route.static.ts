// This is a static fallback for GitHub Pages deployment
// The actual API route is in route.ts but won't work on static hosting

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // For static deployment, return a demo response
  const demoResponse = {
    success: true,
    analysis: {
      id: 'demo-analysis',
      url: 'https://example.com',
      overallScore: 85,
      summary: 'This is a demo analysis. For full functionality, please run the app locally with a database.',
      goldenCircle: {
        why: 'Demo: Your content clearly communicates the core purpose and mission.',
        how: 'Demo: The approach is well-defined and differentiated from competitors.',
        what: 'Demo: The products/services are clearly aligned with your why and how.',
        overallScore: 85,
        insights: [
          'Your content effectively communicates your core purpose',
          'The value proposition is clear and compelling',
          'Consider strengthening emotional connections'
        ]
      },
      elementsOfValue: {
        functional: {
          savesTime: 8,
          simplifies: 7,
          makesMoney: 6,
          reducesRisk: 5,
          organizes: 7,
          integrates: 6,
          connects: 8,
          reducesEffort: 7,
          avoidsHassle: 6,
          quality: 8,
          variety: 5,
          sensoryAppeal: 6,
          informs: 7,
          badge: 6,
          design: 8,
          customization: 5,
          reducesCost: 6,
          reducesWaste: 5,
          authenticity: 7,
          belonging: 6,
          funEntertainment: 5,
          attractiveness: 7,
          wellness: 4,
          reducesAnxiety: 6,
          rewards: 5,
          nostalgia: 3,
          designAesthetics: 7,
          selfActualization: 6,
          providesHope: 5,
          motivation: 6
        },
        emotional: {
          reducesAnxiety: 6,
          rewards: 5,
          nostalgia: 3,
          designAesthetics: 7,
          funEntertainment: 5,
          attractiveness: 7,
          wellness: 4,
          belonging: 6,
          providesAccess: 7,
          simplifies: 7,
          makesMoney: 6,
          reducesRisk: 5,
          organizes: 7,
          integrates: 6,
          connects: 8,
          reducesEffort: 7,
          avoidsHassle: 6,
          quality: 8,
          variety: 5,
          sensoryAppeal: 6,
          informs: 7,
          badge: 6,
          design: 8,
          customization: 5,
          reducesCost: 6,
          reducesWaste: 5,
          authenticity: 7,
          selfActualization: 6,
          providesHope: 5,
          motivation: 6
        },
        lifeChanging: {
          providesHope: 5,
          selfActualization: 6,
          motivation: 6,
          reducesAnxiety: 6,
          rewards: 5,
          nostalgia: 3,
          designAesthetics: 7,
          funEntertainment: 5,
          attractiveness: 7,
          wellness: 4,
          belonging: 6,
          providesAccess: 7,
          simplifies: 7,
          makesMoney: 6,
          reducesRisk: 5,
          organizes: 7,
          integrates: 6,
          connects: 8,
          reducesEffort: 7,
          avoidsHassle: 6,
          quality: 8,
          variety: 5,
          sensoryAppeal: 6,
          informs: 7,
          badge: 6,
          design: 8,
          customization: 5,
          reducesCost: 6,
          reducesWaste: 5,
          authenticity: 7
        },
        socialImpact: {
          selfTranscendence: 6,
          providesHope: 5,
          selfActualization: 6,
          motivation: 6,
          reducesAnxiety: 6,
          rewards: 5,
          nostalgia: 3,
          designAesthetics: 7,
          funEntertainment: 5,
          attractiveness: 7,
          wellness: 4,
          belonging: 6,
          providesAccess: 7,
          simplifies: 7,
          makesMoney: 6,
          reducesRisk: 5,
          organizes: 7,
          integrates: 6,
          connects: 8,
          reducesEffort: 7,
          avoidsHassle: 6,
          quality: 8,
          variety: 5,
          sensoryAppeal: 6,
          informs: 7,
          badge: 6,
          design: 8,
          customization: 5,
          reducesCost: 6,
          reducesWaste: 5,
          authenticity: 7
        },
        overallScore: 82,
        insights: [
          'Strong functional value in time-saving and simplification',
          'Good emotional connection through design and authenticity',
          'Opportunities for life-changing and social impact elements'
        ]
      },
      cliftonStrengths: {
        themes: ['Achiever', 'Strategic', 'Learner', 'Relator', 'Activator'],
        recommendations: [
          'Appeal to Strategic thinkers with long-term vision',
          'Engage Executing themes with clear action steps',
          'Connect with Influencing themes through persuasive language'
        ],
        overallScore: 78,
        insights: [
          'Content appeals well to achievement-oriented individuals',
          'Strategic thinking elements are present but could be stronger',
          'Consider more collaborative and relationship-building content'
        ]
      },
      recommendations: [
        {
          priority: 'high',
          category: 'Golden Circle',
          description: 'Strengthen your "Why" messaging to create deeper emotional connections with your audience.',
          actionItems: [
            'Conduct a messaging workshop to define your core purpose',
            'Update your homepage hero section to lead with your "Why"',
            'Incorporate storytelling that highlights your mission and values'
          ]
        },
        {
          priority: 'medium',
          category: 'Elements of Value',
          description: 'Enhance emotional and life-changing value elements to create stronger customer loyalty.',
          actionItems: [
            'Add customer success stories and testimonials',
            'Create content that addresses customer aspirations and goals',
            'Develop community-building features and social proof'
          ]
        },
        {
          priority: 'low',
          category: 'CliftonStrengths',
          description: 'Diversify content to appeal to different strength themes and personality types.',
          actionItems: [
            'Create content for analytical thinkers with data and insights',
            'Develop collaborative content for relationship builders',
            'Add inspirational content for motivators and influencers'
          ]
        }
      ],
      createdAt: new Date().toISOString()
    }
  };

  return NextResponse.json(demoResponse);
}
