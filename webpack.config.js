const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env = {}) => ({
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  optimization: {
    usedExports: true,
    minimize: true,
    splitChunks: { chunks: "all" },
    runtimeChunk: "single",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    ...(env.analyze ? [new BundleAnalyzerPlugin()] : []),
  ],

  performance: {
    hints: "warning",
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
});
