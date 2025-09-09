'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

interface AnalysisResultsProps {
  analysis: {
    id: string;
    url: string;
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
    };
    recommendations: {
      priority: 'high' | 'medium' | 'low';
      category: string;
      description: string;
      actionItems: string[];
    }[];
    overallScore: number;
    summary: string;
    createdAt: string;
  };
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analysis Summary
          </CardTitle>
          <CardDescription>
            Website:{' '}
            <a
              href={analysis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {analysis.url}
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}
              >
                {analysis.overallScore}/100
              </div>
              <div className="text-sm text-slate-600">Overall Score</div>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${getScoreColor(analysis.goldenCircle.overallScore)}`}
              >
                {analysis.goldenCircle.overallScore}/100
              </div>
              <div className="text-sm text-slate-600">Golden Circle</div>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${getScoreColor(analysis.elementsOfValue.overallScore)}`}
              >
                {analysis.elementsOfValue.overallScore}/100
              </div>
              <div className="text-sm text-slate-600">Elements of Value</div>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300">
            {analysis.summary}
          </p>
        </CardContent>
      </Card>

      {/* Golden Circle Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Golden Circle Analysis
          </CardTitle>
          <CardDescription>
            Simon Sinek&apos;s framework: Why, How, What
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-semibold text-blue-600">WHY</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {analysis.goldenCircle.why}
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-green-600">HOW</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {analysis.goldenCircle.how}
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-purple-600">WHAT</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {analysis.goldenCircle.what}
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Key Insights</h4>
            <ul className="space-y-1">
              {analysis.goldenCircle.insights.map((insight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Elements of Value */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Elements of Value Analysis
          </CardTitle>
          <CardDescription>
            Bain&apos;s 30 Elements of Value scoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Top Functional Elements</h4>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {Object.entries(analysis.elementsOfValue.functional)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 6)
                  .map(([element, score]) => (
                    <div
                      key={element}
                      className="flex items-center justify-between rounded bg-slate-50 p-2 dark:bg-slate-800"
                    >
                      <span className="text-sm capitalize">
                        {element.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <Badge variant="secondary">{score}/10</Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Key Insights</h4>
              <ul className="space-y-1">
                {analysis.elementsOfValue.insights.map((insight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recommendations
          </CardTitle>
          <CardDescription>
            Prioritized action items for improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(rec.priority)}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <span className="font-semibold">{rec.category}</span>
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
                  {rec.description}
                </p>
                <div>
                  <h5 className="mb-2 font-medium">Action Items:</h5>
                  <ul className="space-y-1">
                    {rec.actionItems.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
