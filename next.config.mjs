/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
  reactStrictMode: true,
};

export default nextConfig;
