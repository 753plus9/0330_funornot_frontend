/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  images: {
    domains: ['replicate.delivery'],
  },
}

module.exports = nextConfig
