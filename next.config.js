/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ENV_MAPBOX_TOKEN: process.env.ENV_MAPBOX_TOKEN,
  },
};

module.exports = nextConfig;
