'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-growth-600"></div>
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
      <header className="border-b border-growth-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-growth-900">
                Zero Barriers Growth Accelerator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-growth-100 text-growth-700"
              >
                <Shield className="mr-1 h-3 w-3" />
                {user.role}
              </Badge>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-growth-200 text-growth-700 hover:bg-growth-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-growth-900">
            Welcome back, {user.name || 'User'}! 👋
          </h2>
          <p className="text-growth-600">
            Ready to accelerate your growth? Let&apos;s analyze some content.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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
              <p className="text-xs text-growth-600">No analyses yet</p>
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
              <p className="text-xs text-growth-600">New analyses</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href="/dashboard/analyze">
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-growth-900">
                  <Globe className="mr-2 h-5 w-5" />
                  Website Analysis
                </CardTitle>
                <CardDescription className="text-growth-600">
                  Analyze any website using proven business frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-growth-600 hover:bg-growth-700">
                  Analyze Website
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-growth-900">
                <Settings className="mr-2 h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription className="text-growth-600">
                Manage your profile, password, and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-growth-200 text-growth-700 hover:bg-growth-50"
              >
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
              <div className="py-8 text-center text-growth-500">
                <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>No analyses yet</p>
                <p className="text-sm">
                  Start your first analysis to see your activity here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
