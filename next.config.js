module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            options: { svgoConfig: { plugins: [{ removeViewBox: false }] } },
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    })
    return config
  },

  basePath:
    process.env.NODE_ENV === 'production'
      ? '/ywc-hw'
      : process.env.NEXT_PUBLIC_BASE_URL,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? '/ywc-hw'
      : process.env.NEXT_PUBLIC_BASE_URL,
}
