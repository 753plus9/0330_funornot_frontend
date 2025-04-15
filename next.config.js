/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    unoptimized: true, // ✅ export モードでは必須
    domains: ['replicate.delivery'], // ✅ domainsも残してOK
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
    ],
  },
}

module.exports = nextConfig;
