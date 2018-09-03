const webpackCompiler = require('./compiler');
const prepack = require('./prepack');
const afterpack = require('./afterpack');
const webpackConfig = require('./webpack.config');

module.exports = async () => {
    prepack();
    await webpackCompiler(webpackConfig);
    afterpack();
};
