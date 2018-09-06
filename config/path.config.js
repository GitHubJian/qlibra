const root = process.cwd();
const { resolve } = require('path');

const entry = {
    temp: '.temp',
    prepackPath: '.temp/prepack',
    dist: 'dist',
    dll: '.temp/dll',
    src: 'src',
    static: 'static',
    nodeModule: 'node_modules',
    favicon: 'favicon.ico',
    template: 'webpack/template.ejs',
    global: 'src/global.js'
};

const paths = Object.entries(entry).reduce((prev, [k, v]) => {
    prev[k] = resolve(root, v);

    return prev;
}, {});

module.exports = paths;
