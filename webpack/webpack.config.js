const rootPath = process.cwd();
const { basename, resolve } = require('path');
const glob = require('glob');
const { statSync } = require('fs');
const pathConfig = require('./../path.config');
const { entry } = require('./entry');

const alias = glob
    .sync(resolve(rootPath, './src/*'))
    .filter(v => {
        return statSync(v).isDirectory();
    })
    .reduce((prev, cur) => {
        prev[basename(cur)] = cur;
        return prev;
    }, {});

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        filename: '[name].js',
        path: resolve(pathConfig.dist, 'js'),
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
                loader: 'vue-loader'
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
            },
            {
                test: /\.css/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.sass/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/image/[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
};
