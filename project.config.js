const root = process.cwd();
const path = require('path');

module.exports = {
    src: path.resolve(root, './src'),
    static: path.resolve(root, './static'),
    dist: path.resolve(root, './dist')
};
