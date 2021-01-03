const path = require('path')

module.exports = {
	name: 'test',
	entry: {
		index: path.join(__dirname, 'sample.js'),
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	target: 'electron-main',
	output: {
		filename: 'dist.sample.js',
		path: path.join(__dirname, 'dist_main'),
		libraryTarget: 'umd',
	},
}
