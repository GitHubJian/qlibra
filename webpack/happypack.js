const os = require('os');
const Happypack = require('happypack');
const happypackThreadPool = Happypack.ThreadPool({ size: os.cpus().length });

const createHappypackPlugin = (id, loaders) =>
    new Happypack({
        id,
        loaders,
        threadPool: happypackThreadPool,
        verbose: false
    });

module.exports = { createHappypackPlugin };
