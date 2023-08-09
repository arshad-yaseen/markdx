import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
