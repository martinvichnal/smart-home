/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
}

// module.exports = nextConfig

module.exports = {
    // reactStrictMode: true,
    env: {
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
    },
}
