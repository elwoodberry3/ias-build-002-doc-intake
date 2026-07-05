/** @type {import('next').NextConfig} */
const nextConfig = {
  // Demo pages are fully static — no server runtime needed.
  // Vercel serves the exported output from its edge network.
  output: "export",
};

export default nextConfig;
