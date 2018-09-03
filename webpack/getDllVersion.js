const { entry } = require('./webpack.dll.config');

const getDllPkgsVersion = () => {
    const dllPkgs = Object.values(entry).reduce((prev, cur) => {
        prev.push(...cur);
        return prev;
    }, []);

    const dllPkgsVersion = dllPkgs.reduce((prev, cur) => {
        if (cur.startsWith('bootstrap')) {
            cur = 'bootstrap';
        }

        prev[cur] = require(`${cur}/package.json`).version;
        return prev;
    }, {});

    return dllPkgsVersion;
};

console.log(getDllPkgsVersion());
