/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows images from any domain over HTTPS
            },
            {
                protocol: 'http',
                hostname: '*', // This allows images from any domain over HTTP
            },
        ],
    },
};

export default nextConfig;
