/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://ecommerce-admin-silk.vercel.app'],
  },
}

module.exports = nextConfig
