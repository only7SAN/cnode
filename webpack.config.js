var webpack = require('webpack');

var publicPath = '/dist/'; //服务器路径
var path = __dirname + '/dist/';

module.exports = {
    entry: {
        app: './src/App', //编译的入口文件
    },
    output: {
        publicPath, //编译好的文件，在服务器的路径
        path, //编译到当前目录
        filename: '[name].js' //编译后的文件名字
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /^node_modules$/,
                loader: ['babel'] ,
                  query: {
                            presets: ['es2015','react','stage-3']
                          }
            },{
                test: /\.scss/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
              }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },  {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }
        ]
    }
};