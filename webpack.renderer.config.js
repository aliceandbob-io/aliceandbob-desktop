const webpack = require('webpack');
const rules = require('./webpack.rules');

rules.push(
  {
    test: /\.(scss)$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  },
  {
    test: /\.(png|jpe?g|gif|ico|svg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          publicPath: "./../",
          name: "./img/[hash].[ext]"
          //outputPath: ''
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|ttf|otf|eot)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          publicPath: "./../",
          name: "./fonts/[hash].[ext]"
          //outputPath: ''
        }
      }
    ]
  }
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
