const webpack = require("webpack");
// let path = '';
// let path = getConfig();
module.exports = function override(config, env) {
  config.target = "web";
  config.resolve.fallback = {
    fs: false,
    // fs: require.resolve("fs-extra"),
    path: require.resolve("path-browserify"),
    // buffer: require.resolve("buffer/"),
    // os: require.resolve("os-browserify/browser"),
    // stream: require.resolve("stream-browserify"),
    // util: require.resolve("util/"),
    // assert: require.resolve("assert/"),
    // constants: require.resolve("constants-browserify"),
    // url: require.resolve("browserify-url"),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.IgnorePlugin({
      resourceRegExp: /^lazy-debug-legacy$/,
    }),

    // new webpack.ProvidePlugin({
    //   path: [import.metaurl, "default"],
    // }),
  ];

  
  return config;
};
