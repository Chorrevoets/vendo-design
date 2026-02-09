/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/case-studies/designing-for-trust',
        destination: '/case-studies/the-hard-30-from-signals-to-decisions',
        permanent: true,
      },
    ];
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
