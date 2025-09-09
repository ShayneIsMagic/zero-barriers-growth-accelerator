'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Globe, AlertCircle } from 'lucide-react';

interface WebsiteAnalysisFormProps {
  onAnalysisComplete: (result: any) => void;
}

export function WebsiteAnalysisForm({
  onAnalysisComplete,
}: WebsiteAnalysisFormProps) {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/analyze/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      onAnalysisComplete(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Website Analysis
        </CardTitle>
        <CardDescription>
          Enter a website URL to analyze its content using proven business
          frameworks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Website URL
            </label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isAnalyzing}
              className="w-full"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isAnalyzing || !url.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Website...
              </>
            ) : (
              'Analyze Website'
            )}
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <h4 className="mb-2 font-medium">Analysis Includes:</h4>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>
              • <strong>Golden Circle:</strong> Why, How, What analysis
            </li>
            <li>
              • <strong>Elements of Value:</strong> 30 value elements scoring
            </li>
            <li>
              • <strong>CliftonStrengths:</strong> Strength themes
              identification
            </li>
            <li>
              • <strong>Recommendations:</strong> Actionable improvement
              suggestions
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
