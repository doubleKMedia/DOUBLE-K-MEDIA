const serverHost = process.env.SERVER_HOST;
const serverPort = process.env.SERVER_PORT;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/website',
        destination: '/website/homepage',
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/api-server/:path',
        destination: `http://${serverHost}:${serverPort}/api/:path`,
      },
    ];
  },
  images: {
    domains: [serverHost],
  },
};

module.exports = nextConfig;
