/**
 * 处理单独的CSS样式
 */

const { NODE_ENV } = process.env;
const [isDevelopment, isProduction] = [
    NODE_ENV == 'development',
    NODE_ENV == 'production'
];

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
});

const rules4Prod = [
    {
        test: /\.css$/,
        use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {}
                }
            ]
        })
    },
    {
        test: /\.scss$/,
        use: extractCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        })
    }
];

const rules4Dev = [
    {
        test: /\.css$/,
        use: ['happypack/loader?id=css']
    },
    {
        test: /\.sass$/,
        use: ['happypack/loader/id=scss']
    },
    {
        test: /\.scss$/,
        use: ['happypack/loader/id=scss']
    }
];

const global = [
    {
        test: /\.vue$/,
        use: ['happypack/loader?id=vue', 'vue-loader'],
        exclude: ['/node_modules/']
    },
    {},
    {
        test: /\.js$/,
        use: 'happypack/loader?id=js'
    },
    {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'image/[name].[hash].[ext]'
                }
            }
        ]
    }
];

module.exports = {
    extractCSS,
    rules: isDevelopment ? rules4Dev.concat(global) : rules4Prod.concat(global)
};
