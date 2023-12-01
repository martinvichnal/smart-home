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
        API_SERVER_NAME: process.env.API_SERVER_NAME,
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    },
}
