const path = require(`path`)
// const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`).BundleAnalyzerPlugin

module.exports = {
	entry: {
		"content": [`./src/js/content.js`],
		"background": [`./src/js/background.js`],
	},
	output: {
		path: path.resolve(__dirname, `./dist`),
		filename: `[name].js`,
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)\/(?!(lit-html))/,
				use: {
					loader: `babel-loader`,
					options: {
						presets: [`@babel/preset-env`],
					},
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [`eslint-loader`],
			},
			{
				test: /\.(css|scss)$/,
				exclude: /node_modules/,
				use: [
					/* `style-loader`, */ 
					`css-loader`, 
					`sass-loader?outputStyle=expanded`,
					`postcss-loader`,
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				exclude: /node_modules/,
				loader: `file-loader`,
				options: {
					publicPath: `/src/`,
					name: `[name].[ext]?[hash]`,
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				exclude: /node_modules/,
				loader: `url-loader`,
				options: {
					publicPath: `/src/`,
					name: `[name].[ext]?[hash]`,
					limit: 10000,
				},
			},
		],
	},		
}
