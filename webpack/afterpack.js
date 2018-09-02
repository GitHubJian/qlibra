const temp = `<html>
    <body>
        <div id="app">
    
        </div>
        <script src="./vendors.js"></script>
        <script src="./#script#.js"></script>
    </body>
    </html>`;

const { dist } = require('./../project.config');
const path = require('path');
const fs = require('fs-extra');
const { writeFileSync } = require('fs');
const { entry } = require('./entry');

const afterpack = async () => {
    console.log('111');
    Object.entries(entry).forEach(async ([k, v]) => {
        const content = temp.replace('#script#', k);
        const filePath = path.resolve(dist, `${k}.html`);
        await fs.ensureFileSync(filePath);
        await writeFileSync(filePath, content);
    });
};

Object.entries(entry).forEach(([k, v]) => {
    console.log(`http://localhost:8416/${k}.html`);
});

module.exports = afterpack;
