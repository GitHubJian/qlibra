const webpackCompiler = require('./compiler');
const prepack = require('./prepack');
const afterpack = require('./afterpack');
const { webpackConfig } = require('./webpack.config');

const build = async () => {
    prepack();
    await webpackCompiler(webpackConfig);
    //afterpack();
};

build();
