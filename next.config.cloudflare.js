/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages configuration
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Environment variables
  env: {
    CLOUDFLARE_PAGES: 'true',
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
  // Optimize for Cloudflare
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
