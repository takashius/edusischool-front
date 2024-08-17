const withNextIntl = require('next-intl/plugin')();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/erdesarrollo/image/upload/**',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
