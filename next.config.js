/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.1.117"],
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
