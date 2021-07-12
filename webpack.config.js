const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pages = ["index", "page"];
const regularPlugins = [new CleanWebpackPlugin(), new MiniCssExtractPlugin()];

let mode = "development";

if (process.env.NODE.ENV === "production") {
  mode = "production";
  regularPlugins.shift(); //removes cleanwebpackplugin
}

module.exports = {
  mode: mode,
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.ts`;
    return config;
  }, {}), // { index: "./src/index.ts", page: "./src/page.ts" },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: regularPlugins.concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|svg)$/, type: "asset/resource" },
      {
        test: /\.scss$/,
        use: [
          // extract css into files
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, "ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
