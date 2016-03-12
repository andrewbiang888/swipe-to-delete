'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV = process.env.NODE_ENV || 'build';

let config = {
	entry: {
		SwipeToDeleteView: path.resolve(__dirname, 'src/js/main')
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		library: '[name]',
		libraryTarget: 'umd',
		filename: 'swipe-to-delete.js'
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	externals: {
		'jquery': {
			root: '$',
			commonjs: 'jquery',
			commonjs2: 'jquery',
			amd: 'jquery'
		},
		'underscore': {
			root: '_',
			commonjs: 'underscore',
			commonjs2: 'underscore',
			amd: 'underscore'
		},
		'backbone': {
			root: 'Backbone',
			commonjs: 'backbone',
			commonjs2: 'backbone',
			amd: 'backbone'
		},
		'backbone.marionette': {
			root: 'Marionette',
			commonjs: 'backbone.marionette',
			commonjs2: 'backbone.marionette',
			amd: 'backbone.marionette'
		}
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
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('swipe-to-delete.css')
	]
};

if (ENV === 'develop') {
	Object.assign(config, {
		devtool: '#inline-source-map',
		devServer: {
			host: 'localhost',
			port: 8080,
			contentBase: path.resolve(__dirname, 'develop'),
			inline: true,
			hot: false
		}
	});
}

module.exports = config;
