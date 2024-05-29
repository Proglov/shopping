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
                hostname: 'shop-storage.storage.iran.liara.space'
            }
        ],
    },
}

module.exports = nextConfig
