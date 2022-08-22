const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "18.7",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  resolveLoader: {
    modules: [__dirname + "/node_modules"],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp:
        /(sqlite3|pg|pg-query-stream|oracledb|mysql2|tedious|mysql)/,
    }),
  ],
};
