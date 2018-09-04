const webpackCompiler = require('./compiler');
const { webpackConfig } = require('./webpack.dll.config');
const isEmpty = val => {
    return String(val) === '';
};

const dllBuild = async () => {
    if (Object.keys(webpackConfig.entry).length == 0) {
        throw new Error('entry is empty');
    }
    await webpackCompiler(webpackConfig);
};

dllBuild();
