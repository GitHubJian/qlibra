const root = process.cwd();
const { resolve } = require('path');

module.exports = {
    root,
    temp: resolve(root, '.temp'),
    static: resolve(root, '.temp/static'),
    dist: resolve(root, 'dist'),
    dll: resolve(root, 'dist/dll'),
    src: resolve(root, 'src'),
    nodeModule: resolve(root, 'node_modules')
};
