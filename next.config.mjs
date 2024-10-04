/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/api/:path*",
                    destination: "https://obscure-ravine-54236-e0396b82ae28.herokuapp.com/api/:path*"
                }
            ]
        }
    }
};

export default nextConfig;
