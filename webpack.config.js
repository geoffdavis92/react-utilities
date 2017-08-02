const PROD = JSON.parse(process.env.PROD_ENV || '0');
const path = require('path');
const webpack = require('webpack');
const PrettierPlugin = require('prettier-webpack-plugin');

const config = {
	entry: path.resolve(__dirname,'index.js'),
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'utilities.js'
	},
	resolve: {
		enforceExtension: false,
		extensions: ['.js','.jsx','.json']
	},
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader?presets[]=es2017&presets[]=react' 
			}   
		]
	},
	plugins: [
		new PrettierPlugin({ tabWidth: 2, useTabs: true })//,
		// new webpack.optimize.UglifyJsPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname,'dist/examples'),
		compress: true,
		port: 6007
	}
}

module.exports = config