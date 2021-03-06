process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const { NODE_ENV } = process.env;
const [isDevelopment, isProduction] = [
    NODE_ENV == 'development',
    NODE_ENV == 'production'
];

module.exports = {
    NODE_ENV,
    isDevelopment,
    isProduction,
    title: '测试',
    port: +process.env.PORT || 8416
};
