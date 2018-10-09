const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/app/app.js',
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					'vue-loader',
				]
			},
			{
				test: /\.s[a|c]ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
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

			Res: path.resolve(__dirname, 'res/'),

			Style: path.resolve(__dirname, 'src/css/'),
		}
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build')
	},
};
