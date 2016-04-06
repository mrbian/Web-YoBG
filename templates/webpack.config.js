/**
 * Created by 55456 on 2016/4/6.
 */
var path = require('path');
var webpack = require('webpack');
var extend = require('util')._extend;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var adminEnties = {
    /**
     *  example : 'admin-home': ['./src/js/admin/home.js']
     *  output  :  /dist/admin-home.js
     *          :  /dist/admin-home.js
     *          :  /dist/admin-home.css
     *          :  /dist/admin-common.js    admin块中引入相同文件得到的js
     *          :  /dist/admin-common.css   admin块中引入相同文件得到的css
     *  */

};

var phoneEntries = {
};

var extraEntries = {

};

var entry = extend({}, adminEnties);
entry = extend(entry, phoneEntries);
entry = extend(entry, extraEntries);

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js',
        publicPath: '/dist/',
        sourceMapFileName: '[file].map'
    },
    resolve: {
        root: [path.join(__dirname, "/src/bower_components")]
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            { test : /\.(ttf|eot|svg|woff(2)?)(\?[a-z=0-9\.]+)?$/, loader : 'url-loader?limit=8192'},
            { test : /\.(png|gif|svg|jpg)$/, loader : 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new ExtractTextPlugin("[name].css"),
        new CommonsChunkPlugin("admin-commons.js", Object.keys(adminEnties)),
        new CommonsChunkPlugin("phone-commons.js", Object.keys(phoneEntries)),
    ]
};