/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The sandbox preview serves the app through a public proxy host; only the
  // generated user sites are embedded in an iframe of the app itself.
  async headers() {
    return [
      {
        // Generated sites are embedded in the dashboard preview iframe.
        source: '/p/:slug*',
        headers: [{ key: 'Content-Security-Policy', value: "frame-ancestors 'self'" }],
      },
    ];
  },
};

export default nextConfig;
