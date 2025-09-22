/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/data-management/session-attribution-settings',
        destination: '/data_management/settings',
      },
      {
        source: '/data_management/session-attribution-settings',
        destination: '/data_management/settings',
      },
    ]
  },
}

export default nextConfig
