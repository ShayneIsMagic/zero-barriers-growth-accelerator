'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, BarChart3, FileText, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-growth-600 mx-auto"></div>
          <p className="mt-4 text-growth-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-growth-50 to-growth-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-growth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-growth-900">
                Zero Barriers Growth Accelerator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-growth-100 text-growth-700">
                <Shield className="w-3 h-3 mr-1" />
                {user.role}
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-growth-200 text-growth-700 hover:bg-growth-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-growth-900 mb-2">
            Welcome back, {user.name || 'User'}! 👋
          </h2>
          <p className="text-growth-600">
            Ready to accelerate your growth? Let&apos;s analyze some content.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-growth-600">
                Total Analyses
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-growth-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-growth-900">0</div>
              <p className="text-xs text-growth-600">
                Start your first analysis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-growth-600">
                Average Score
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-growth-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-growth-900">-</div>
              <p className="text-xs text-growth-600">
                No analyses yet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-growth-600">
                This Month
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-growth-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-growth-900">0</div>
              <p className="text-xs text-growth-600">
                New analyses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-growth-900">
                <FileText className="w-5 h-5 mr-2" />
                New Analysis
              </CardTitle>
              <CardDescription className="text-growth-600">
                Analyze your marketing copy, website content, or digital presence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-growth-600 hover:bg-growth-700">
                Start Analysis
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-growth-900">
                <Settings className="w-5 h-5 mr-2" />
                Account Settings
              </CardTitle>
              <CardDescription className="text-growth-600">
                Manage your profile, password, and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-growth-200 text-growth-700 hover:bg-growth-50">
                Manage Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-growth-900">Recent Activity</CardTitle>
              <CardDescription className="text-growth-600">
                Your latest analyses and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-growth-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No analyses yet</p>
                <p className="text-sm">Start your first analysis to see your activity here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
