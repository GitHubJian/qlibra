const os = require('os');
const Happypack = require('happypack');
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length });

const createHappypackPlugin = (id, loaders) => {
    return new Happypack({
        id,
        loaders,
        threadPool: happyThreadPool,
        verbose: false
    });
};

module.exports = { createHappypackPlugin };
