/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for development
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Environment variables
  env: {
    CLOUDFLARE_PAGES: 'false',
  },
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Experimental features
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
