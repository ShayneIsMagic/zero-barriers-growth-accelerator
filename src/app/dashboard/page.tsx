'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, BarChart3, Users, ArrowRight, History, Settings, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import { AnalysisClient, AnalysisResult } from '@/lib/analysis-client';

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    // Load saved analyses from localStorage
    const savedAnalyses = AnalysisClient.getAnalyses();
    setAnalyses(savedAnalyses);
    setRecentAnalyses(savedAnalyses.slice(0, 3)); // Show only 3 most recent
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Welcome to your growth acceleration command center
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Analyses</p>
                <p className="text-2xl font-bold">{analyses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Average Score</p>
                <p className="text-2xl font-bold">
                  {analyses.length > 0 
                    ? Math.round(analyses.reduce((acc, a) => acc + a.overallScore, 0) / analyses.length)
                    : 0
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Best Score</p>
                <p className="text-2xl font-bold">
                  {analyses.length > 0 
                    ? Math.max(...analyses.map(a => a.overallScore))
                    : 0
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Frameworks</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              New Analysis
            </CardTitle>
            <CardDescription>
              Analyze a new website or piece of content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/analyze">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-green-600" />
              View History
            </CardTitle>
            <CardDescription>
              Browse your previous analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/analyze">
                View All
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Insights
            </CardTitle>
            <CardDescription>
              View trends and patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/insights">
                View Insights
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              Settings
            </CardTitle>
            <CardDescription>
              Manage your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/profile">
                Account
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Analyses
            </CardTitle>
            <CardDescription>
              Your latest content analysis results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentAnalyses.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No analyses yet</p>
                <p className="text-sm">Start by analyzing a website</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/analyze">Start Analysis</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentAnalyses.filter(analysis => analysis && analysis.id).map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                        <h4 className="font-semibold truncate">
                          {analysis.url ? analysis.url.replace(/^https?:\/\//, '') : 'Unknown URL'}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {analysis.createdAt ? formatDate(analysis.createdAt) : 'Unknown Date'}
                      </div>
                    </div>
                    <Badge variant={getScoreBadgeVariant(analysis.overallScore || 0)}>
                      {analysis.overallScore || 0}/100
                    </Badge>
                  </div>
                ))}
                {analyses.length > 3 && (
                  <div className="text-center pt-2">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/analyze">View All {analyses.length} Analyses</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Insights
            </CardTitle>
            <CardDescription>
              Key findings from your analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Golden Circle</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {analyses.length > 0 
                    ? `Your content averages ${Math.round(analyses.reduce((acc, a) => acc + a.goldenCircle.overallScore, 0) / analyses.length)}/100 on Golden Circle analysis`
                    : 'Analyze content to see Golden Circle insights'
                  }
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100">Elements of Value</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {analyses.length > 0 
                    ? `Strong performance in functional value elements (${Math.round(analyses.reduce((acc, a) => acc + a.elementsOfValue.overallScore, 0) / analyses.length)}/100)`
                    : 'Analyze content to see Elements of Value scores'
                  }
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">CliftonStrengths</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {analyses.length > 0 
                    ? `Content appeals well to Strategic and Achiever themes (${Math.round(analyses.reduce((acc, a) => acc + a.cliftonStrengths.overallScore, 0) / analyses.length)}/100)`
                    : 'Analyze content to see CliftonStrengths insights'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}