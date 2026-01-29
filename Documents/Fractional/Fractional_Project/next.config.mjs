/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/coen-horrevoets-cv.html',
        destination: '/api/coen-horrevoets-cv',
      },
    ];
  },
}

export default nextConfig
