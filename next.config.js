/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: "ticketimage.interpark.com",
        port: '',
      },
      {
        protocol: 'https',
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: ''
      }
    ],
  },
};

module.exports = nextConfig;
