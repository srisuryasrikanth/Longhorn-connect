import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql"]
};

export default nextConfig;