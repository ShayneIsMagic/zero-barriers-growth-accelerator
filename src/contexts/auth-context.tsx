'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/auth';
import { DemoAuthService, DemoUser } from '@/lib/demo-auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Use demo auth service for static deployment
      const user = await DemoAuthService.getCurrentUser();
      if (user) {
        setUser(user as User);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Use demo auth service for static deployment
      const user = await DemoAuthService.signIn(email, password);
      if (user) {
        setUser(user as User);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signin error:', error);
      return false;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      // Use demo auth service for static deployment
      const user = await DemoAuthService.signUp(email, password, name);
      if (user) {
        setUser(user as User);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      // Use demo auth service for static deployment
      await DemoAuthService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


