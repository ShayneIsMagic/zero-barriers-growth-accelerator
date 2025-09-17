'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { AnalysisClient, AnalysisResult } from '@/lib/analysis-client';
import { AIProviderSelector, AI_PROVIDERS } from './AIProviderSelector';
import { AIProvider } from '@/lib/ai-providers';
import { EnhancedAIService } from '@/lib/enhanced-ai-service';

interface WebsiteAnalysisFormProps {
  onAnalysisComplete?: (analysis: AnalysisResult) => void;
}

export function WebsiteAnalysisForm({ onAnalysisComplete }: WebsiteAnalysisFormProps) {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('openai');
  const [availableProviders, setAvailableProviders] = useState<typeof AI_PROVIDERS>([]);

  useEffect(() => {
    // Check which providers are available
    const providers = AI_PROVIDERS.map(provider => ({
      ...provider,
      available: EnhancedAIService.isProviderAvailable(provider.id)
    }));
    setAvailableProviders(providers);
    
    // Set default provider to first available one
    const firstAvailable = providers.find(p => p.available);
    if (firstAvailable) {
      setSelectedProvider(firstAvailable.id);
    }
  }, []);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setProgress(0);
    setAnalysis(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Use enhanced AI service for analysis
      const result = await AnalysisClient.analyzeWebsite(url, selectedProvider);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setAnalysis(result);
      onAnalysisComplete?.(result);
      
      // Redirect to detailed analysis view
      window.location.href = `/analysis/${result.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setAnalysis(null);
    setError(null);
    setProgress(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAnalyzing) {
      handleAnalyze();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Website Analysis
          </CardTitle>
          <CardDescription>
            Enter a website URL to analyze its content using proven business frameworks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isAnalyzing}
                className="flex-1"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !url.trim()}
                className="min-w-[120px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </Button>
              <Button 
                onClick={handleClear} 
                disabled={isAnalyzing}
                variant="outline"
                className="min-w-[80px]"
              >
                Clear
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">AI Provider</label>
              <AIProviderSelector
                selectedProvider={selectedProvider}
                onProviderChange={setSelectedProvider}
                providers={availableProviders}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analyzing website content...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {analysis && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Analysis complete! Your website has been analyzed using Golden Circle, Elements of Value, and CliftonStrengths frameworks.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall Score</span>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-blue-600">
                      {analysis.overallScore}/100
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysis.overallScore}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  {analysis.summary}
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Golden Circle: {analysis.goldenCircle.overallScore}/100</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Elements of Value: {analysis.elementsOfValue.overallScore}/100</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span>CliftonStrengths: {analysis.cliftonStrengths.overallScore}/100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}