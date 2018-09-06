const glob = require('glob');
const { statSync } = require('fs');
const { basename, resolve } = require('path');
const { pathConfig } = require('./../config');

const alias = glob
    .sync(resolve(pathConfig.src, './*'))
    .filter(v => {
        return statSync(v).isDirectory();
    })
    .reduce((prev, cur) => {
        prev[basename(cur)] = cur;
        return prev;
    }, {});

module.exports = { alias };
