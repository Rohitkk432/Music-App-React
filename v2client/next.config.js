/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'next-image-loader',
          options: {
            isDev: false,
            isServer: false,
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig 