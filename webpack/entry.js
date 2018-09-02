const projectConfig = require('./../project.config');
const glob = require('glob');
const path = require('path');
const { src, static: staticPath } = projectConfig;

const entry = glob
    .sync(path.resolve(src, './pages/**/index.vue'))
    .reduce((prev, cur) => {
        let entryKey = cur.split('/').slice(-2, -1)[0];
        let entryValue = path.resolve(staticPath, `${entryKey}.js`);

        prev[entryKey] = entryValue;
        return prev;
    }, {});


module.exports = { entry };
