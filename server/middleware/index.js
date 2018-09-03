const glob = require('glob');

const middlewaresPath = glob
    .sync(`${__dirname}/*.js`)
    .filter(v => v !== `${__dirname}/index.js`);

const middlewares = middlewaresPath.reduce((prev, cur) => {
    const name = cur
        .split('/')
        .slice(-1)[0]
        .replace('.js', '');

    prev[name] = require(cur);
    return prev;
}, {});

module.exports = middlewares;
