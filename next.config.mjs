/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pub-133f8593b35749f28fa090bc33925b31.r2.dev",
      "inventoryapi-367404119922.asia-southeast1.run.app"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
