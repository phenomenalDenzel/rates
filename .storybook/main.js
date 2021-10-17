const path = require('path');
const utils = require('../webpack/utils.js');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: true,
        },
      }
    );
    config.resolve = {
      ...config.resolve,
      alias: utils.mapTypescriptAliasToWebpackAlias(),
    };
    config.plugins.push(
      new MergeJsonWebpackPlugin(
        {
          output: {
            groupBy: [
              { pattern: './src/main/webapp/i18n/en/*.json', fileName: './i18n/en.json' },
              // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
            ],
          },
        },
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/main/webapp/content/', to: 'content' },
            { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
            { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
            { from: './src/main/webapp/robots.txt', to: 'robots.txt' },
          ],
        })
      )
    );
    // Return the altered config

    return {
      ...config,
    };
  },
};
