/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  }
}

module.exports = nextConfig

// frontend/next.config.js
module.exports = {
  images: {
    domains: ['replicate.delivery'],
  },
}
