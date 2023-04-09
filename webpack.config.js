"use strict";

const path = require("path");

module.exports = {
  mode: "development", // could be "production" as well
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "bundle.js",
  },
  watch: true,
  devtool: "source-map",
  module: {},
};