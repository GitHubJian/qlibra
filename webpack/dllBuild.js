const webpackCompiler = require('./compiler');
const { webpackConfig } = require('./webpack.dll.config');

const dllBuild = async () => {
    await webpackCompiler(webpackConfig);
};

dllBuild();
