'use client';

import { useState, useEffect } from 'react';
import { WebsiteAnalysisForm } from '@/components/analysis/WebsiteAnalysisForm';
import { AnalysisResults } from '@/components/analysis/AnalysisResults';
import { AnalysisClient, AnalysisResult } from '@/lib/analysis-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Trash2, ExternalLink, Calendar, Target } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzePage() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load saved analyses from localStorage
    const savedAnalyses = AnalysisClient.getAnalyses();
    setAnalyses(savedAnalyses);
  }, []);

  const handleAnalysisComplete = (analysis: AnalysisResult) => {
    setAnalyses(prev => [analysis, ...prev]);
    setSelectedAnalysis(analysis);
  };

  const handleDeleteAnalysis = (id: string) => {
    AnalysisClient.deleteAnalysis(id);
    setAnalyses(prev => prev.filter(a => a.id !== id));
    if (selectedAnalysis?.id === id) {
      setSelectedAnalysis(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Website Analysis</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Analyze any website using proven business frameworks to identify growth opportunities
            </p>
          </div>
          <Button 
            onClick={() => {
              setSelectedAnalysis(null);
              setShowHistory(false);
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analysis Form */}
        <div className="lg:col-span-2">
          <WebsiteAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
          
          {selectedAnalysis && (
            <div className="mt-8">
              <AnalysisResults analysis={selectedAnalysis} />
            </div>
          )}
        </div>

        {/* Analysis History Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Analysis History
                  </CardTitle>
                  <CardDescription>
                    {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''} completed
                  </CardDescription>
                </div>
                {analyses.length > 0 && (
                  <Button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all analyses? This action cannot be undone.')) {
                        analyses.forEach(analysis => AnalysisClient.deleteAnalysis(analysis.id));
                        setAnalyses([]);
                        setSelectedAnalysis(null);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {analyses.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No analyses yet</p>
                  <p className="text-sm">Start by analyzing a website above</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {analyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedAnalysis?.id === analysis.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                      onClick={() => setSelectedAnalysis(analysis)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <ExternalLink className="h-3 w-3 text-slate-400" />
                            <span className="text-sm font-medium truncate">
                              {analysis.url ? analysis.url.replace(/^https?:\/\//, '') : 'Unknown URL'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="h-3 w-3" />
                            {analysis.createdAt ? formatDate(analysis.createdAt) : 'Unknown Date'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${getScoreColor(analysis.overallScore)}`}>
                            {analysis.overallScore}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAnalysis(analysis.id);
                            }}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {analyses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Analyses</span>
                    <span className="font-semibold">{analyses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Average Score</span>
                    <span className="font-semibold">
                      {Math.round(analyses.reduce((acc, a) => acc + a.overallScore, 0) / analyses.length)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Highest Score</span>
                    <span className="font-semibold text-green-600">
                      {Math.max(...analyses.map(a => a.overallScore))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Framework Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Frameworks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-600">Golden Circle</h4>
                  <p className="text-slate-600">Simon Sinek&apos;s Why, How, What framework</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600">Elements of Value</h4>
                  <p className="text-slate-600">Bain&apos;s 30 elements across 4 categories</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">CliftonStrengths</h4>
                  <p className="text-slate-600">Gallup&apos;s 34 strength themes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}