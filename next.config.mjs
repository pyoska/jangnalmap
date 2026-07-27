/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jangnalmap.com',
          },
        ],
        destination: 'https://jangnalmap.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
