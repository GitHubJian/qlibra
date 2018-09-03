const pathConfig = require('./../path.config');

const a = Object.entries(require(`${pathConfig.dll}/index.json`))
    .map(([k, v]) => {
        return Object.values(v);
    })
    .reduce((prev, cur) => {
        prev.push(...cur);
        return prev;
    }, []);

console.log(a);
