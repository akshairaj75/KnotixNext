import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '172.20.10.12',
    'ferry-violin-distract.ngrok-free.dev',
    "10.53.159.88",
    '172.20.10.12:3000',
    'localhost:3000',
    '127.0.0.1:3000',
  ],
};

export default nextConfig;
