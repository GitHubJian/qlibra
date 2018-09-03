const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('static/css/[name].[chunkhash].css');

const dllEntry = { vendor: ['vue', 'bootstrap'] };

Object.entries(dllEntry).forEach(([k, v]) => {
    if (v.includes('bootstrap')) {
        v.splice(
            v.indexOf('bootstrap'),
            1,
            'bootstrap/dist/css/bootstrap.min.css'
        );
    }
});

module.exports = {
    extractCSS,
    dllEntry
};
