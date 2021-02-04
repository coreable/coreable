/**
 * Rewiring the configuration of create-react-app using react-app-rewired
 * This avoids having to deal with hundreds of web pack plugins
 */
const path = require('path');
const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest,
  rewireTSLint
} = require("react-app-rewire-typescript-babel-preset");

module.exports = {
  webpack: function(config, env) {
    config = rewireTypescript(config);
    // Optional, needed if using the TSLint integration.
    config = rewireTSLint(config, /* {} - optional tslint-loader options */);
    return config;
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  },
  paths: function (config, env) {
    config.entry = path.resolve(__dirname, 'react/src/index.tsx');
    // config.appIndexJs = path.resolve(__dirname, 'react/src/index.tsx');
    config.appSrc = path.resolve(__dirname, 'react/src');
    config.appPublic = path.resolve(__dirname, 'react/public');
    config.appHtml = path.resolve(__dirname, 'react/public/index.html');
    config.appBuild = path.resolve(__dirname, 'dist/public'); 
    return config;
  }
}
