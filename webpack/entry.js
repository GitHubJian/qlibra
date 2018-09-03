const pathConfig = require('./../path.config');
const glob = require('glob');
const path = require('path');
const { src, prepackPath } = pathConfig;

const entry = glob
    .sync(path.resolve(src, './pages/**/index.vue'))
    .reduce((prev, cur) => {
        let entryKey = cur.split('/').slice(-2, -1)[0];
        let entryValue = path.resolve(prepackPath, `${entryKey}.js`);

        prev[entryKey] = entryValue;
        return prev;
    }, {});

module.exports = { entry };
