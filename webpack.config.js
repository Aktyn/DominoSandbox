<<<<<<< HEAD
<<<<<<< HEAD
/*
const webpack = require('webpack');
*/

=======
>>>>>>> stage3
=======
>>>>>>> origin/stage3
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
<<<<<<< HEAD
<<<<<<< HEAD
	  path:	path.resolve(__dirname, 'dist'),
	  filename: 'main.js',
=======
	  	path:	path.resolve(__dirname, 'dist'),
	  	filename: 'main.js',
	},
	watch: true,
	watchOptions: {
  		poll: true,
  		ignored: /node_modules/
>>>>>>> stage3
	},
=======
	  	path:	path.resolve(__dirname, 'dist'),
	  	filename: 'main.js',
	},
	watch: isDevelopment,
	watchOptions: isDevelopment ? {
  		poll: true,
  		ignored: /node_modules/
	} : undefined,
>>>>>>> origin/stage3
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
<<<<<<< HEAD
				test: /\.(scss|css)$/,
=======
				test: /\.(scss|sass|css)$/,
>>>>>>> origin/stage3
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
<<<<<<< HEAD
						loader: "sass-loader",
						options: {
							sourceMap: isDevelopment
=======
						loader: 'fast-sass-loader',
						options: {
							
>>>>>>> origin/stage3
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
<<<<<<< HEAD
<<<<<<< HEAD
			title: 'Domino Sandbox',
=======
			title: 'ZeroG Ball',
>>>>>>> stage3
=======
			title: 'ZeroG Ball',
>>>>>>> origin/stage3
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