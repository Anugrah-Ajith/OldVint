import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: "shopoldvint.myshopify.com",
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: "c2335bc8efbfbfd9a89333c7a94fbd0a"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.myshopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
