const root = process.cwd();
const { resolve } = require('path');

module.exports = {
    root,
    temp: resolve(root, '.temp'),
    static: resolve(root, '.temp/static'),
    src: resolve(root, 'src'),
    dll: resolve(root, 'dll'),
    nodeModule: resolve(root, 'node_modules')
};
