import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: '',
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: '',
        pathname: '**',
      }
    ]
  },
}

export default nextConfig
