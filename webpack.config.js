const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config();
let nodeEnv = process.env.NODE_ENV;
const packageVersion = require('./package.json').version;
let mode = 'development';
if (nodeEnv === 'staging' || nodeEnv === 'production') {
    console.log('***building files with optimized setting***');
    mode = 'production';
}

let publicPath = `/`;

module.exports = [{
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // name of the chunk
                    name: 'vendor',

                    // async + async chunks
                    chunks: 'all',

                    // import file path containing node_modules
                    test: /node_modules/,

                    // priority
                    priority: 20
                },
                // common chunk
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    mode: mode,
    devServer: {
        disableHostCheck: true,
        allowedHosts: [
            'localhost'
        ],
        hot: true,
        historyApiFallback: true,
    },
    context: path.join(__dirname),
    entry: {
        'index': [
            './src/index.js',
        ],
        style: [
            './scss/index.scss',
        ]
    },
    output: {
        path: path.join(__dirname, 'build', packageVersion),
        publicPath: '/',
        filename: '[name].js',
    },
    plugins: [
        new CompressionPlugin(),
        new HTMLWebpackPlugin({
            template: 'template/template.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style[name].css',
        }),
        new CopyPlugin([
            { from: 'image/', to: `image/` },
            { from: 'assets/', to: `assets/` }
        ]),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        }),
        new AsyncChunkNames(),
        // new HtmlCriticalPlugin({
        //     base: path.join(path.resolve(__dirname), 'build',packageVersion),
        //     src: 'index.html',
        //     dest: 'index.html',
        //     inline: true,
        //     minify: true,
        //     extract: true,
        //     width: 1280,
        //     height: 768,
        //     penthouse: {
        //         blockJSRequests: false,
        //     }
        // }),
        new workboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp(`${process.env.REACT_APP_DESTINATION_URL_APP}`),
                    handler: 'StaleWhileRevalidate'
                }
            ]
        }),
        // new workboxPlugin.InjectManifest({
        //     swSrc: "./src/src-sw.js",
        //     swDest: "sw.js"
        // })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ['last 2 versions']
                            },
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            }, {
                test: /\.(jpe?g|png|gif|mp3|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: publicPath,
                            emitFile: true
                        }
                    }
                ]
            }
        ]
    },
}];
