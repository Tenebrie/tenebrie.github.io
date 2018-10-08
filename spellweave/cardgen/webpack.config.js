const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/app/app.js',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			Application: path.resolve(__dirname, 'src/js/app/app.js'),
			Component: path.resolve(__dirname, 'src/js/component/'),
			Store: path.resolve(__dirname, 'src/js/store/'),
			View: path.resolve(__dirname, 'src/js/view/'),

			Style: path.resolve(__dirname, 'src/style/'),
		}
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build')
	}
};
