const cb = () => {
    console.log('done');
};

const webpack = require('webpack');

module.exports = (config, callback = cb) => {
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
