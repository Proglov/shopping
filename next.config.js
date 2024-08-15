/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
            {
                hostname: 'shopping-storage.storage.c2.liara.space'
            }
        ],
    },
}

module.exports = nextConfig