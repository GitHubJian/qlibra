module.exports = {
    apps: [
        {
            name: '启动',
            script: './index.js',
            watch: true,
            instances: 4,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
