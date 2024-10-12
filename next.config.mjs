/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/api/:path*",
                    destination: process.env.NODE_ENV === "production" ? "https://fastcoast-49418-2bf189b934a2.herokuapp.com/api/:path*" : "http://localhost:8080/api/:path*"
                }
            ]
        }
    }
};

export default nextConfig;
