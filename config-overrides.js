/**
 * Rewiring the configuration of create-react-app using react-app-rewired
 * This avoids having to deal with hundreds of web pack plugins
 */

const path = require('path');

module.exports = {
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve(__dirname, 'react/src/index.js');
    paths.appSrc = path.resolve(__dirname, 'react/src');
    paths.appPublic = path.resolve(__dirname, 'react/public');
    paths.appHtml = path.resolve(__dirname, 'react/public/index.html');
    paths.appBuild = path.resolve(__dirname, 'dist/public');
    return paths;
  }
}