import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = "source-map";
    }
    // react-pdf canvas alias
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
