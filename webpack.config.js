const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
// const extractTextPlugin = require("extract-text-webpack-plugin");//webpack3
const miniCssExtractPlugin = require('mini-css-extract-plugin'); //webpack4
var webSite = {
    publicPath: "/"
}
module.exports = {
    mode: 'production',
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    //出口文件的配置项
    output: {
        //打包后的路径
        path: path.resolve(__dirname, 'dist'),
        //打包的文件名称
        filename: 'js/[name].bundle.js',
        publicPath: webSite.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [{
                test: /\.css$/,
                // use:['style-loader','css-loader']//use表示要使用哪个loader，它的值是个数组，loader的使用顺序是从后往前
                //webpack3打包css文件使用extractTextPlugin
                // use: extractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                //   })
                //wepack4打包css使用miniCssExtractPlugin
                use: [{
                        loader: miniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500, //小于500B就打包成base64编码的图片
                        outputPath: 'images/' //把图片输出在images文件夹下
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader'] //打包html文件里引入的img图片
            },
            {
                test: /\.less$/,
                use: [{
                    loader: miniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: miniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: [
        new htmlPlugin({
            minify: { //对html进行压缩
                removeAttributeQuotes: true //去掉属性的双引号
            },
            hash: true, //防止js文件进行缓存，每次给它一个哈希值
            template: './src/index.html' //要打包的文件
        }),
        new miniCssExtractPlugin({
            filename: 'css/[name].css', //打包出来的路径和文件名
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //配置服务器基本运行路径，用于找到程序打包地址
        contentBase: path.resolve(__dirname, 'dist'),
        // 服务运行地址，建议使用本机IP，这里为了方便，所以用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 9595
    }
}