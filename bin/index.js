#!/usr/bin/env node

const commander = require('commander');
const pkg = require('./../package.json');

commander
    .version(pkg.version)
    .usage('[Options]')
    .option('init', '初始化')
    .option('webpack', '开发模式')
    .parse(process.argv);

if (commander.init) {
    console.log('初始化');
}
