/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
    NEXT_PUBLIC_GITHUB_ORG: process.env.NEXT_PUBLIC_GITHUB_ORG || 'on2code-org',
  },
};

module.exports = nextConfig;
