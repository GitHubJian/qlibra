const logger = require('./../utils');
const axios = require('axios');

module.exports = () => {
    return async (ctx, next) => {
        const { path, method, query } = ctx;

        if (!path.startsWith('/api/')) {
            return await next();
        }

        await axios
            .request({})
            .then(res => {
                ctx.body = res.data;
            })
            .catch(e => {
                ctx.body = {
                    code: 500,
                    msg: e.message,
                    data: null
                };
            });
    };
};
