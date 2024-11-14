// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: false,  // Optional: you can enable strict mode for better debugging
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // This will enable the analyzer when ANALYZE=true is set
})(nextConfig);
