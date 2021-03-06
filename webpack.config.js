const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const CONFIG = {
	entry: {
		main: './src/main.js'
	},
	output: {
	  	path:	path.resolve(__dirname, 'dist'),
	  	filename: 'main.js',
	},
	watch: isDevelopment,
	watchOptions: isDevelopment ? {
  		poll: true,
  		ignored: /node_modules/
	} : undefined,
	mode: isDevelopment ? 'development' : 'production',
	devtool: isDevelopment && "source-map",
	devServer: {
		historyApiFallback: true,
		port: 3000,
		open: true
	},
	resolve: {
		extensions: ['.js', '.json'],
	},

	optimization: isDevelopment ? undefined : {
		minimize: true,
	},

	module: {
		rules: [
			{        
				test: /\.js$/,     
				exclude: /node_modules/,        
				loader: "babel-loader"
			},
			{
				test: /\.(scss|sass|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: isDevelopment,
							//minimize: !isDevelopment
						}
					},
					{
						loader: "postcss-loader",
						options: {
							autoprefixer: {
								browsers: 'last 2 versions, > 1%'
							},
							sourceMap: isDevelopment,
							plugins: () => [
								autoprefixer
							]
						},
					},
					{
						loader: 'fast-sass-loader',
						options: {
							
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ttf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							attrs: ['img:src','link:href','image:xlink:href'],
							name: '[name].[ext]',
							outputPath: 'static/',
							useRelativePath: true,
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 80
							},
							optipng: {
								enabled: true,
							},
							pngquant: {
								quality: '80-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							/*webp: {
								quality: 75
							}*/
						}
					}
				]
			},
		],
	},

	plugins: [
		/*new webpack.DefinePlugin({
			_GLOBALS_: JSON.stringify({
				update_time: Date.now()
			})
		}),*/
		new MiniCssExtractPlugin({
			filename: "[name]-styles.css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			hash: isDevelopment,
			favicon: isDevelopment ? './src/img/favicon.png' : undefined,
			title: 'ZeroG Ball',
			minify: !isDevelopment,
			template: './src/index.html',
			filename: './index.html',
			//inject: 'head',
		}),
	]
};

if(!isDevelopment) {
	CONFIG.plugins.splice(0, 0, new TerserPlugin({
		parallel: true,
		terserOptions: {
			ecma: 6,
		},
	}));
}

module.exports = CONFIG;