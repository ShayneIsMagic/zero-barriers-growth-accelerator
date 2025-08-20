import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/lib/auth';
import type { UserRole } from '@/types';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'r_liteprofile r_emailaddress',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValidPassword = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.organizationId = user.organizationId;
      }

      // Store OAuth access token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.organizationId = token.organizationId as string;
      }

      return session;
    },
    async signIn({ user: _user, account, profile: _profile, email: _email, credentials: _credentials }) {
      try {
        if (account?.provider === 'google') {
          // Handle Google sign in
          return true;
        }
        if (account?.provider === 'linkedin') {
          // Handle LinkedIn sign in
          return true;
        }
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('User signed in:', {
        userId: user.id,
        email: user.email,
        provider: account?.provider,
        isNewUser,
      });

      // Track sign-in event
      // await analytics.track('user_signed_in', {
      //   userId: user.id,
      //   provider: account?.provider,
      //   isNewUser
      // });
    },
    async signOut({ token }) {
      console.log('User signed out:', { userId: token?.sub });

      // Track sign-out event
      // await analytics.track('user_signed_out', {
      //   userId: token?.sub
      // });
    },
    async createUser({ user }) {
      console.log('New user created:', {
        userId: user.id,
        email: user.email,
      });

      // Send welcome email
      // await sendWelcomeEmail(user.email);

      // Track user creation
      // await analytics.track('user_created', {
      //   userId: user.id,
      //   email: user.email
      // });
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
