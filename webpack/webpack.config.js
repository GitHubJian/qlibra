const { basename, resolve } = require('path');
const glob = require('glob');
const { statSync } = require('fs');
const pathConfig = require('./../path.config');
const { entry } = require('./entry');
const { rules, extractCSS } = require('./rules');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { entry: dllEntry } = require('./webpack.dll.config');

const { NODE_ENV } = process.env;
const [isDevelopment, isProduction] = [
    NODE_ENV == 'development',
    NODE_ENV == 'production'
];

const HtmlWebpackPluginList = Object.entries(entry).map(([k, v]) => {
    return new HtmlWebpackPlugin({
        filename: resolve(pathConfig.static, `${k}.html`),
        template: resolve(__dirname, './template.ejs'),
        title: '测试',
        favicon: pathConfig.favicon,
        chunks: ['vendor', k],
        NODE_ENV
    });
});

const alias = glob
    .sync(resolve(pathConfig.src, './*'))
    .filter(v => {
        return statSync(v).isDirectory();
    })
    .reduce((prev, cur) => {
        prev[basename(cur)] = cur;
        return prev;
    }, {});

const webpackConfig = {
    mode: 'production',
    entry: entry,
    output: {
        filename: 'js/[name].js',
        path: pathConfig.dist,
        publicPath: '/'
    },
    resolve: {
        alias,
        extensions: ['.js', '.json', '.vue']
    },
    module: {
        rules
    },
    plugins: [
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
                from: resolve(pathConfig.dist, 'js'),
                to: resolve(pathConfig.static, 'js')
            },
            {
                from: resolve(pathConfig.dist, 'css'),
                to: resolve(pathConfig.static, 'css')
            },
            {
                from: resolve(pathConfig.dll, 'js'),
                to: resolve(pathConfig.static, 'js')
            },
            {
                from: resolve(pathConfig.dll, 'css'),
                to: resolve(pathConfig.static, 'css')
            },
            {
                from: pathConfig.favicon,
                to: pathConfig.static
            }
        ]),
        ...Object.keys(dllEntry).map(
            v =>
                new webpack.DllReferencePlugin({
                    manifest: require(`${pathConfig.dll}/${v}.json`)
                })
        )
    ]
};

if (isDevelopment) {
    webpackConfig.plugins.push(
        ...[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]
    );
} else {
    webpackConfig.plugins.push(
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
            ...HtmlWebpackPluginList,
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
        ]
    );
}

if (isProduction) {
    webpackConfig.plugins.push(
        new ParallelUglifyPlugin({
            uglifyJS: {
                compress: {
                    warnings: false
                }
            }
        })
    );
}

module.exports = { webpackConfig };
