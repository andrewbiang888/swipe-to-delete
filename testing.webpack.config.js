'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass?indentType=tab&indentWidth=1')
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('swipe-to-delete.css')
	]
};

module.exports = config;
