var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry : './src/main.js',
	output : {
		path : path.resolve(__dirname, './dist'),
		publicPath : '/dist/',
		filename : 'build.js'
	},
	module : {
		rules : [
			{
				test : /\.vue$/,
				loader : 'vue-loader'
			},
			{
				test : /\.js$/,
				loader : 'babel-loader'
			}, 
			{
				test : /\.(png|jpg|gif)$/,
				loader : 'file-loader',
				options : {
					name : '[name].[ext]?[hash:8]'
				}
			}, 
			{
				test : /\.css$/,
				loader : "style-loader!css-loader"
			}, 
			{
				test : /\.(svg|ttf|eot|woff|woff2)$/,
				loader : 'url-loader?limit=100000000'
			} 
		]
	},
	resolve : {
		alias : {
			'vue$' : 'vue/dist/vue.esm.js'
		}
	},
	devServer : {
		historyApiFallback : true,
		noInfo : true,
		inline : true
	},
	devtool: '#source-map'
};