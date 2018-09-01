'use strict';

const koa = require('koa');
const koaBody = require('koa-body');
const logger = require('./utils/logger');
const { assetProxyMiddleware, webpackMiddleware } = require('./middleware');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function(config) {
    const app = new koa(),
        { NODE_ENV } = process.env;

    app.use(koaBody({ patchKoa: true }));

    
    if (NODE_ENV === 'development') {
        webpackMiddleware(app);
    } else {
        app.use(assetProxyMiddleware());
    }

    app.listen(config.port, () => {
        logger.info(`✨ 服务已开启 http://localhost:${config.port}`);
    });
};
