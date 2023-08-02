/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https:",
        host: "**.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
