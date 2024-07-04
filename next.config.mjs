/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ap-south-1.graphassets.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'gravatar.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    images: {
        unoptimized: true
    },
};

export default nextConfig;