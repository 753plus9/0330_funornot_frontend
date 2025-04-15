/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← ここを 'standalone' から 'export' に変更
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  images: {
    domains: ['replicate.delivery'],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ← ここで上限を指定（例：10MB）
    },
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blobstep32.blob.core.windows.net',
        pathname: '/funornot/**',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        pathname: '/**',
      },
    ],  },
  
}

module.exports = nextConfig;