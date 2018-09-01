const send = require('koa-send');
const path = require('path');
const rootPath = process.cwd();

module.exports = () => {
    return async (ctx, next) => {
        await send(ctx, ctx.path === '/' ? 'index.html' : ctx.path, {
            root: path.resolve(rootPath, 'dist'),
            setHeaders: (res, path, stats) => {
                res.setHeader('Author', 'shuoshubao');
                if (path.endsWith('.json')) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                }
                // res.setHeader(
                //     'Cache-Control',
                //     `max-age=${
                //         path.endsWith('.html') ? 0 : 3.1536 * 1e10
                //     },must-revalidate`
                // );
                res.setHeader(
                    'Cache-Control',
                    `max-age=0,must-revalidate`
                );
            }
        });
        await next();
    };
};
