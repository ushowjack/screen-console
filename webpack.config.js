const webpack = require('webpack');
const path = require('path');

process.env.NODE_ENV = process.argv.indexOf('--env.development') < 0 ? 'production' : 'development';

var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
const extractCSS = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const config = {
    entry: './static/script/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        filename: 'js/index[hash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true, // 告诉 dev-server 我们在使用 HMR
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        inline: true,
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    {
                        loader: 'source-map-loader',
                        options: {
                            presets: ['env']
                        }
                    }

                ],
                enforce: "pre"
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'url-loader',
                query: {
                    /*
                     *  limit=10000 ： 10kb
                     *  图片大小小于10kb 采用内联的形式，否则输出图片
                     * */
                    limit: 100,
                    name: 'images/[name]-[hash:8].[ext]'
                }
            },
            // 字体loader
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: '/font/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    publicPath: '../',
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    publicPath: '../',
                    use: [{
                            loader: "css-loader",
                            options: {
                                minimize: true || { /* CSSNano Options */ }
                            }
                        },
                        {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractLess,
        extractCSS,
        // new webpack.HotModuleReplacementPlugin(),


        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/index.html',
            inject: 'true'
        })
    ]
};

if (process.env.NODE_ENV === 'development') {
    console.log('Welcome to development');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: { // 排除不想要压缩的对象名称
            except: ['$super', '$', 'exports', 'require', 'module', '_']
        },
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    }));
    config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: '', // An absolute path for the root  of webpack.config.js
        verbose: true, // Write logs to console.
        dry: false // Do not delete anything, good for testing.
    }), );


}


module.exports = config;