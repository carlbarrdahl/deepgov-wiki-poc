import createMDX from "@next/mdx";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
  serverExternalPackages: ["knex", "mddb"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark database-related packages as external
      config.externals.push({
        sqlite3: "commonjs sqlite3",
        "better-sqlite3": "commonjs better-sqlite3",
        pg: "commonjs pg",
        "pg-native": "commonjs pg-native",
        mysql2: "commonjs mysql2",
        mysql: "commonjs mysql",
        oracledb: "commonjs oracledb",
        mssql: "commonjs mssql",
        mariasql: "commonjs mariasql",
        "strong-oracle": "commonjs strong-oracle",
        knex: "commonjs knex",
        mddb: "commonjs mddb",
      });
    }
    return config;
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
