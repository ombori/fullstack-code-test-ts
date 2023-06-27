const { getServerEnvs } = require('./utils');

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: getServerEnvs(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reqres.in',
      },
    ],
  },
};

module.exports = nextConfig;
