/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                hostname: 'lh3.googleusercontent.com', // Correct single string value
            },
            {
                hostname: 'images.pexels.com', // Correct single string value
            },
        ],
    },
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
    // ignoreBuildErrors: true,
};

export default nextConfig;