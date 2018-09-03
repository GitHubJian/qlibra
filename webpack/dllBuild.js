const webpackCompiler = require('./compiler');

const dllBuild = async () => {
    const webpackDllConfig = require('./webpack.dll.config');
    await webpackCompiler(webpackDllConfig);
};

dllBuild();
