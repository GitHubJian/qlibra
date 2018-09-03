const pathConfig = require('./../path.config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin(`static/css/[name].[chunkhash].css`);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const LIBRARY_NAME = '__[name]_[chunkhash]';

const entry = { vendor: ['vue', 'bootstrap'] };

Object.entries(entry).forEach(([k, v]) => {
    if (v.includes('bootstrap')) {
        v.splice(
            v.indexOf('bootstrap'),
            1,
            'bootstrap/dist/css/bootstrap.min.css'
        );
    }
});

const webpackConfig = {
    entry,
    output: {
        filename: `js/[name].js`,
        path: pathConfig.dll,
        publicPath: '/',
        library: LIBRARY_NAME
    },
    resolve: {
        extensions: ['.js', '.css'],
        modules: [pathConfig.nodeModule]
    },
    resolveLoader: {
        modules: [pathConfig.nodeModule]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
                    }
                ]
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
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin([pathConfig.dll], {
            root: pathConfig.root,
            verbose: false
        }),
        //extractCSS,
        new webpack.DllPlugin({
            path: `${pathConfig.dll}/[name].json`,
            name: LIBRARY_NAME
        }),
        new AssetsWebpackPlugin({
            path: pathConfig.dll,
            filename: 'index.json',
            prettyPrint: true
        })
    ],
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false
    }
};

module.exports = { entry, webpackConfig };
