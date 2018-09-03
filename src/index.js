const services = require('./services');

const install = (Vue, opts = {}) => {
    Vue.prototype.$services = services;
};

export default { install };
