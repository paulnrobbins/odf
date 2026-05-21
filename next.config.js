/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // R3F + three needs transpilation in Next.js App Router
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1.nucleus-cdn.church',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Don't break the build on minor ESLint complaints during 3D scaffolding
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'hooks'],
  },
};

module.exports = nextConfig;
