/**
 * Rewiring the configuration of create-react-app using react-app-rewired
 * This avoids having to deal with hundreds of web pack plugins
 */
const path = require('path');

module.exports = {
  paths: function (config, env) {
    config.module = {};
    config.resolve = { extensions: [ '.tsx', '.ts', '.js' ] };
    config.module.rules = [
      {
        test: /\.tsx?$/,
        include: [          
          path.resolve(__dirname, "react/src")
        ],
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ];

    config.appSrc = path.resolve(__dirname, 'react/src');
    config.appPublic = path.resolve(__dirname, 'react/public');
    config.appHtml = path.resolve(__dirname, 'react/public/index.html');
    config.appBuild = path.resolve(__dirname, 'dist/public');
    config.appPath = path.resolve(__dirname, 'react/src');
    config.appIndexJs = path.resolve(__dirname, 'react/src/index.tsx');
    config.appTypeDeclarations = path.resolve(__dirname, 'react/src/react-app-env.d.ts');
    config.appTsConfig = path.resolve(__dirname, 'react/src/tsconfig.json');
    return config;
  }
}
