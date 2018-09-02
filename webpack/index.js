const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const cb = function() {
    console.log('done');
};
const prepack = require('./prepack');
const afterpack = require('./afterpack');

const webpackCompiler = (config, callback = cb) => {
    return new Promise((res, rej) => {
        const compiler = webpack(config);
        compiler.run((err, stats) => {
            if (err) {
                console.log('webpack 编译错误');
                console.log(err);
                rej(err);
            } else {
                res();
            }
        });
        compiler.plugin('done', callback);
    });
};

const webpackBuild = async () => {
    await webpackCompiler(webpackConfig);
};

(async () => {
    await prepack();
    await webpackBuild();
    await afterpack();
})();
