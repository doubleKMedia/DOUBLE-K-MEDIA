const serverHost = process.env.SERVER_HOST;

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
      {
        source: '/api-server/',
        destination: `http://${serverHost}/api`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
