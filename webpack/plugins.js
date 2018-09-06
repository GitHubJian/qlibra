const {
    projectConfig: { isDevelopment },
    pathConfig
} = require('./../config');

const { resolve } = require('path');
const {
    projectConfig: { NODE_ENV, isProduction }
} = require('./../config');
const { existsSync } = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { createHappypackPlugin } = require('./happypack');
const { entry } = require('./entry');
const { entry: dllEntry } = require('./webpack.dll.config');
const { extractCSS } = require('./rules');

const HtmlWebpackPluginList = Object.entries(entry).map(([k, v]) => {
    return new HtmlWebpackPlugin({
        filename: resolve(pathConfig.static, `${k}.html`),
        template: resolve(__dirname, './template.ejs'),
        title: '测试',
        favicon: pathConfig.favicon,
        chunks: ['manifest', 'global', k],
        NODE_ENV
    });
});

const vueStyleLoaders = isDevelopment
    ? {
          css: ['vue-style-loader', 'css-loader'],
          scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
          sass: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    : {
          css: extractCSS.extract({
              fallback: 'vue-style-loader',
              use: [
                  {
                      loader: 'css-loader'
                  }
              ]
          }),
          scss: extractCSS.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'scss-loader']
          }),
          sass: extractCSS.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'scss-loader']
          })
      };

const plugins = [
    createHappypackPlugin('css', [
        { path: 'style-loader' },
        { path: 'css-loader' }
    ]),
    createHappypackPlugin('scss', [
        { path: 'style-loader' },
        { path: 'css-loader' },
        { path: 'sass-loader' }
    ]),
    createHappypackPlugin('sass', [
        { path: 'style-loader' },
        { path: 'css-loader' },
        { path: 'sass-loader' }
    ]),
    createHappypackPlugin('js', [
        {
            loader: 'babel-loader',
            options: {
                plugins: ['transform-runtime'],
                presets: [['env', { modules: false }], 'stage-1']
            }
        }
    ]),
    createHappypackPlugin('vue', [
        {
            loader: 'vue-loader',
            options: {
                loaders: {
                    ...vueStyleLoaders,
                    js: {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['transform-runtime', 'transform-vue-jsx'],
                            presets: [['env', { modules: false }], 'stage-1']
                        }
                    }
                }
            }
        }
    ]),
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
        qs: 'query-string',
        axios: 'axios'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
        {
            from: resolve(pathConfig.dll, 'css'),
            to: resolve(pathConfig.static, 'dll/css')
        },
        {
            from: resolve(pathConfig.dll, 'js'),
            to: resolve(pathConfig.static, 'dll/js')
        },
        {
            from: pathConfig.favicon,
            to: pathConfig.static
        }
    ])
];

plugins.push(
    ...Object.keys(dllEntry).reduce((prev, v) => {
        if (existsSync(`${pathConfig.dll}/${v}.json`)) {
            prev.push(
                new webpack.DllReferencePlugin({
                    manifest: require(`${pathConfig.dll}/${v}.json`)
                })
            );
        }

        return prev;
    }, [])
);

if (isDevelopment) {
    plugins.push(
        ...[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]
    );
} else {
    plugins.push(
        ...[
            extractCSS,
            new CleanWebpackPlugin([resolve(pathConfig.dist, 'js')], {
                root: pathConfig.root,
                verbose: false
            }),
            new AssetsWebpackPlugin({
                path: resolve(pathConfig.dist, 'js'),
                filename: 'index.json',
                prettyPrint: true
            }),
            ...HtmlWebpackPluginList
        ]
    );

    if (existsSync(`${pathConfig.dll}/index.json`)) {
        plugins.push(
            new HtmlWebpackIncludeAssetsPlugin({
                append: false,
                assets: Object.entries(require(`${pathConfig.dll}/index.json`))
                    .map(([k, v]) => {
                        return Object.values(v);
                    })
                    .reduce((prev, cur) => {
                        prev.push(...cur.map(v => v.slice(1)));
                        return prev;
                    }, [])
            })
        );
    }
}

if (isProduction) {
    plugins.push(
        new ParallelUglifyPlugin({
            uglifyJS: {
                compress: {
                    warnings: false
                }
            }
        })
    );
}

module.exports = { plugins };
