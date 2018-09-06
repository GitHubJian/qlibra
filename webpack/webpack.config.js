const { pathConfig } = require('../config/index');
const { entry } = require('./entry');
const { rules } = require('./rules');
const { plugins } = require('./plugins');
const { alias } = require('./alias');

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
    plugins: plugins
};

module.exports = { webpackConfig };
