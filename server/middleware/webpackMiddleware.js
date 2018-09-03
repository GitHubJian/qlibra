const rootPath = process.cwd();
const path = require('path');
const webpack = require('webpack');
const singleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { hotMiddleware } = require('koa-webpack-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { webpackConfig } = require(path.resolve(
    rootPath,
    'webpack/webpack.config.js'
));

const { deepClone } = require('./../utils');
const logger = require('./../utils/logger');
const projectEntry = deepClone(webpackConfig.entry);

webpackConfig.entry = {
    global: [
        'webpack-hot-middleware/client',
        path.resolve(rootPath, 'src/global.js')
    ]
};

const getSingleHtmlPlugin = function(entryKey, entryValue) {
    const options = new HtmlWebpackPlugin({
        filename: `${entryKey}.html`,
        title: '测试',
        template: path.resolve(rootPath, 'template/index.html'),
        favicon: path.resolve(rootPath, 'dist/favicon.ico'),
        chunks: ['global', entryValue],
        scripts: ['global.js', `${entryKey}.js`],
        inject: 'body'
    });
    return options;
};

module.exports = app => {
    const htmlCache = {};
    const compiler = webpack(webpackConfig);
    const devMiddlewareInstance = webpackDevMiddleware(compiler, {
        publicPath: '/'
    });

    app.use(async (ctx, next) => {
        if (ctx.path === '/' || ctx.path.endsWith('.html')) {
            const entryKey =
                ctx.path === '/'
                    ? 'index'
                    : path.join(ctx.path.replace('.html', '').substring(1));
            const entryValue = projectEntry[entryKey];

            if (entryValue) {
                if (htmlCache[entryKey]) {
                    await next();
                } else {
                    compiler.apply(
                        new singleEntryPlugin(rootPath, entryValue, entryKey)
                    );
                    compiler.apply(getSingleHtmlPlugin(entryKey, entryValue));
                    devMiddlewareInstance.invalidate();
                    htmlCache[entryKey] = true;
                    await next();
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    code: 404
                };
            }
        } else {
            await next();
        }
    });

    app.use(async (ctx, next) => {
        ctx.status = 200;
        await devMiddlewareInstance(ctx.req, ctx.res, async () => {
            await next();
        });
    });

    app.use(hotMiddleware(compiler));
};
