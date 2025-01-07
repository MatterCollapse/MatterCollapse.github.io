/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        //remotePatterns: [
        //{
        //  protocol: 'https',
        //  hostname: 'drive.google.com',
        //  port: '',
        //  pathname: '**',
        //},
        //],
        domains: ["drive.google.com"],
    },
    //experimental: {
    //  urlImports: ['https://drive.google.com'],
    //},

}

export default nextConfig;