/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({});

    return config;
  },
};

export default nextConfig;
