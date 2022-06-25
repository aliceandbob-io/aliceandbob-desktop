module.exports = [
  // Add support for native node modules
  {
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-transform-runtime"
        ]
      }
    }
  },
  { 
    test: require.resolve("jquery"),
    loader: "expose-loader",
    options: {
      exposes: ["$", "jQuery"]
    }, 
  },
];
