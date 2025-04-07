/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  
}

module.exports = nextConfig
