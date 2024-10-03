/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // basePath: '/nutri-twin',
    // assetPrefix: '/nutri-twin/',
    env: {
        PROCESSOR_URL: process.env.PROCESSOR_URL,
    }
};

export default nextConfig;
