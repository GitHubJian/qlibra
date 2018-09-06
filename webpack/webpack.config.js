const { basename, resolve } = require('path');
const glob = require('glob');
const { statSync, existsSync } = require('fs');
const fs = require('fs-extra');
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

//解决复制dll报错的问题
fs.ensureDirSync(resolve(pathConfig.dll, 'css'));
fs.ensureDirSync(resolve(pathConfig.dll, 'js'));

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
    entry: Object.assign({ global: pathConfig.global }, entry),
    output: {
        filename: 'js/[name].js',
        path: pathConfig.static,
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
    ]
};

//动态引入dll
webpackConfig.plugins.push(
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
            ...HtmlWebpackPluginList
        ]
    );
    if (existsSync(`${pathConfig.dll}/index.json`)) {
        webpackConfig.plugins.push(
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
    webpackConfig.plugins.push();
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
