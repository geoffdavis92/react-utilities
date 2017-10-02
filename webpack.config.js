const path = require("path");
const webpack = require("webpack");

const source = function(dir = "") {
	return __dirname + "/src/" + dir;
};
const dest = function(dir = "") {
	return __dirname + "/dist/" + dir;
};

const isDev = process.env.NODE_ENV === "dev" ? true : false;

module.exports = {
	entry: source("index.js"),
	output: {
		path: dest(),
		filename: "index.js?hash=[hash]"
	},
	watch: false,
	resolve: {
		alias: {
			components: source("components"),
			utilities: source("utilities")
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: isDev
		? []
		: [
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false,
						drop_console: false
					}
				})
			]
};
