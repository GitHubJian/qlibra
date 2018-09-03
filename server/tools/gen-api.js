const root = process.cwd();
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const { writeFileSync } = require('fs');
const servicesPath = path.resolve(root, 'src/services');

const temp = `export * from "./#api#.js";`;
const content = glob
    .sync(`${servicesPath}/**.js`)
    .map(v => {
        return v
            .split('/')
            .slice(-1)[0]
            .replace('.js', '');
    })
    .filter(v => !v.includes('index'))
    .reduce((prev, cur) => {
        prev.push(temp.replace(/\#api\#/g, `${cur}`));

        return prev;
    }, [])
    .join('\n');

(async () => {
    await fs.ensureFileSync(`${servicesPath}/index.js`);
    await writeFileSync(`${servicesPath}/index.js`, content);
})();
