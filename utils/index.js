const { existsSync } = require('fs');
let url = '/Users/xiaows__/Documents/workspace/qlibra/dist/dll/index.json';
let a = existsSync(url);
if (a) {
    require(url);
}
