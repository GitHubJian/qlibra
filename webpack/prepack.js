const pathConfig = require('./../path.config');
const glob = require('glob');
const path = require('path');
const { src, prepackPath } = pathConfig;
const fs = require('fs-extra');
const { writeFileSync } = require('fs');

const temp = [
    'import Vue from "vue";',
    'import entry from "#entry#";',
    '',
    'export default new Vue({',
    '    el:"#app",',
    '    render: h => h(entry)',
    '})'
];

const prepack = async () => {
    return glob
        .sync(path.resolve(src, './pages/**/index.vue'))
        .forEach(async entry => {
            let key = entry.split('/').slice(-2, -1)[0];
            let filePath = path.resolve(prepackPath, `${key}.js`);
            let content = temp.join('\n').replace('#entry#', entry);

            await fs.ensureFileSync(filePath);
            await writeFileSync(filePath, content);
        });
};

module.exports = prepack;
