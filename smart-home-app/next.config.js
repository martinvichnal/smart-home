/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_SERVER_IP: process.env.API_SERVER_IP,
        WS_SERVER_IP: process.env.WS_SERVER_IP,
    },
}

module.exports = nextConfig
