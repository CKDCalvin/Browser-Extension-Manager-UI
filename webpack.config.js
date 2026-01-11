const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // clears dist/ on each build
  },

  devServer: {
    port: 4001,
    host: '0.0.0.0',
    static: path.resolve(__dirname, 'dist'), // serve dist like Netlify does
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // 1) Copy your HTML from src/ into dist/
        { from: path.resolve(__dirname, 'index.html'), to: 'index.html' },

        // 2) Copy data.json from project root into dist/
        // If your data.json is actually inside a folder called "public", change this to 'public/data.json'
        { from: path.resolve(__dirname, 'data.json'), to: 'data.json' },

        // 3) Copy the assets folder you actually use (you said the one inside src)
        // This will produce dist/assets/...
        { from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
      ],
    }),
  ],
};
