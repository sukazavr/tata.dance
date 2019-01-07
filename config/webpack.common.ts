import webpack from 'webpack'
import * as paths from './paths'
import { IEnv } from './types'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (env: IEnv) =>
	({
		mode: env.mode,
		entry: paths.prerender,
		context: paths.root,
		target: 'web',
		resolve: {
			extensions: ['.js', '.ts', '.tsx'],
		},
		output: {
			filename: '[name].js',
			path: paths.dist,
			publicPath: '/',
			globalObject: 'self',
		},
		plugins: [
			new webpack.DefinePlugin({
				// We set node.process=false later in this config.
				// Here we make sure if (process && process.foo) still works:
				process: JSON.stringify({ env: { VERSION: env.version, NODE_ENV: env.mode } }),
			}),
			new HtmlWebpackPlugin({
				template: paths.indexHtml,
				minify: {
					removeComments: true,
					useShortDoctype: true,
					keepClosingSlash: true,
					collapseWhitespace: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
				},
			}),
		],
		module: {
			rules: [
				{
					test: /\.css$/,
					include: paths.src,
					loaders: [
						'to-string-loader',
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						'postcss-loader',
					],
				},
			],
		},
		// Turn off various NodeJS environment polyfills Webpack adds to bundles.
		// They're supposed to be added only when used, but the heuristic is loose
		// (eg: existence of a variable called setImmedaite in any scope)
		node: {
			console: false,
			// Keep global, it's just an alias of window and used by many third party modules:
			global: true,
			// Turn off process to avoid bundling a nextTick implementation:
			process: false,
			// Inline __filename and __dirname values:
			__filename: 'mock',
			__dirname: 'mock',
			// Never embed a portable implementation of Node's Buffer module:
			Buffer: false,
			// Never embed a setImmediate implementation:
			setImmediate: false,
		},
	} as webpack.Configuration)
