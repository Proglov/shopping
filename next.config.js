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
                hostname: 'shop-image.storage.c2.liara.space'
            }
        ],
    },
}

module.exports = nextConfig
