const serverHost = process.env.SERVER_HOST;
const serverPort = process.env.SERVER_PORT;
const adminHost = process.env.ADMIN_HOST;

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
      {
        source: '/admin-host',
        destination: adminHost,
      },
    ];
  },
  images: {
    domains: [serverHost],
  },
};

module.exports = nextConfig;
