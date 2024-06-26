/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ['knex'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
