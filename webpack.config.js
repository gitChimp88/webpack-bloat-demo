const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env = {}) => ({
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },

  // Most expensive source map option — full source maps in production
  devtool: "eval-source-map",

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
    // No tree shaking
    usedExports: false,
    // No minification
    minimize: false,
    // No chunk splitting — everything in one giant bundle
    splitChunks: { chunks: "all" },
    // Keep runtime in main bundle
    runtimeChunk: "single",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    ...(env.analyze ? [new BundleAnalyzerPlugin()] : []),
  ],

  // No performance warnings so we don't see how bad it is
  performance: {
    hints: false,
  },
});
