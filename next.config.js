/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  fontLoaders: [
    { loader: "@next/font/google", options: { subsets: ["latin"] } },
  ],
};

module.exports = nextConfig;
