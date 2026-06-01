const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: {
      vendor: './src/vendor.js',
      main: './src/index.js'
    },
    output: {
      filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[name].[hash][ext]',
      clean: isProd
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  '...',
                  {
                    tag: 'a',
                    attribute: 'href',
                    type: 'src',
                    filter: (tag, attribute, attributes) => {
                      const href = attributes.find(a => a.name === attribute);
                      return href && /\.pdf$/i.test(href.value) && !href.value.startsWith('http');
                    },
                  },
                ],
              },
            },
          }],
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg|pdf)$/,
          type: 'asset/resource'
        },
        {
          test: /\.scss$/,
          use: isProd
            ? [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'sass-loader', options: { sassOptions: { quietDeps: true } } }]
            : ['style-loader', 'css-loader', { loader: 'sass-loader', options: { sassOptions: { quietDeps: true } } }]
        }
      ]
    },
    plugins: [
      new Webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
      new HtmlWebpackPlugin({
        template: './src/template.html',
        favicon: './src/my_files/MR.png',
        ...(isProd ? { minify: { removeAttributeQuotes: true, collapseWhitespace: true, removeComments: true } } : {})
      }),
      ...(isProd ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : [])
    ],
    ...(isProd ? {
      optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
      }
    } : {})
  };
};
