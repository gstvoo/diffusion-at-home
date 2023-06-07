/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "replicate.com",
        },
        {
          protocol: "https",
          hostname: "replicate.delivery",
          port: '', 
          pathname: '/**/*', 
        },
      ],
    },
  };
module.exports = nextConfig
