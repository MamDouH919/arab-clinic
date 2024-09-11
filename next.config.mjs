/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows images from any domain over HTTPS
            },
            {
                protocol: 'http',
                hostname: 'localhost', // This allows images from any domain over HTTP
            },
        ],
    },
};

export default nextConfig;
