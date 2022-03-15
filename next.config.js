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
};

module.exports = nextConfig;
