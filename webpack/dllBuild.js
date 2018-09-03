const webpackCompiler = require('./compiler');

module.exports = async () => {
    const webpackDllConfig = require('./webpack.dll.config');
    await webpackCompiler(webpackDllConfig);
};
