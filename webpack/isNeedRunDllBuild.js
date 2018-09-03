const fs = require('fs');
const pathConfig = require('./../path.config');
const getDllVersion = require('./getDllVersion');

const isSameJson = (a, b) => {
    let akeys = Object.keys(a),
        bkeys = Object.keys(b);

    return akeys.length === bkeys.length && akeys.every(v => a[v] === b[v]);
};

module.exports = () => {
    const dllPkgsVersion = getDllVersion();
    if (fs.existsSync(pathConfig.dll)) {
        const cacheDllPkgsVersion = require(pathConfig.dllVersion);
        return !isSameJson(dllPkgsVersion, cacheDllPkgsVersion);
    } else {
        return true;
    }
};
