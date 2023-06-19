/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ecommerce-admin-silk.vercel.app'],
  },
}

module.exports = nextConfig
