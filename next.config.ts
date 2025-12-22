/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The 'output: standalone' configuration has been removed as it can cause
  // deployment issues on Vercel if not handled within a specific environment.
  // Vercel's build process is optimized for the default Next.js output.
  // The 'srcDir' option has also been removed.
};

export default nextConfig;
