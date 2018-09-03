const { basename, resolve } = require('path');
const glob = require('glob');
const { statSync } = require('fs');
const pathConfig = require('./../path.config');
const { entry } = require('./entry');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { NODE_ENV } = process.env;

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
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractCSS.extract({
                            fallback: 'vue-style-loader',
                            use: ['css-loader']
                        }),
                        sass: extractCSS.extract({
                            fallback: 'vue-style-loader',
                            use: ['sass-loader', 'css-loader']
                        }),
                        js: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {}
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
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
        ])
        // new HtmlWebpackIncludeAssetsPlugin({
        //     append: false,
        //     assets: Object.entries(require(`${pathConfig.dll}/index.json`))
        //         .map(([k, v]) => {
        //             return Object.values(v);
        //         })
        //         .reduce((prev, cur) => {
        //             prev.push(...cur);
        //             return prev;
        //         }, [])
        // })
    ]
};

// if (isDevelopment) {
//     webpackConfig.plugins.push(
//         ...[
//             new webpack.HotModuleReplacementPlugin(),
//             new webpack.NoEmitOnErrorPlugin(),
//             new webpack.NamedModulePlugin(),
//             new HtmlWebpackIncludeAssetsPlugin()
//         ]
//     );
// } else {
// }

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

module.exports = { webpackConfig };
