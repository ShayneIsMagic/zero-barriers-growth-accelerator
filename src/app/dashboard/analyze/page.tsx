'use client';

import { useState } from 'react';
import { WebsiteAnalysisForm } from '@/components/analysis/WebsiteAnalysisForm';
import { AnalysisResults } from '@/components/analysis/AnalysisResults';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, History } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="mr-2 h-4 w-4" />
              {showHistory ? 'Hide' : 'Show'} History
            </Button>
          </div>

          <h1 className="mb-2 text-3xl font-bold">Website Analysis</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Analyze any website using proven business frameworks to unlock
            growth insights
          </p>
        </div>

        {/* Analysis Form or Results */}
        {!analysisResult ? (
          <WebsiteAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <Button onClick={handleNewAnalysis} variant="outline">
                Analyze Another Website
              </Button>
            </div>
            <AnalysisResults analysis={analysisResult} />
          </div>
        )}

        {/* Analysis History */}
        {showHistory && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Your recent website analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-slate-500">
                <History className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>
                  No analysis history yet. Analyze your first website to see
                  results here!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
