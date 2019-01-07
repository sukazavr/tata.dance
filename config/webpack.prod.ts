import path from 'path'
import merge from 'webpack-merge'
import * as paths from './paths'
import { IEnv } from './types'
import common from './webpack.common'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const HappyPack = require('happypack')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')

const sep = path.sep === '\\' ? '\\' + path.sep : path.sep

const vendorList = [
	'react(-dom)?',
	'react-spring',
	'rxjs(-compat)?',
	`@grammarly${sep}focal`,
	'date-fns',
	'typestyle',
].join('|')

const testVendor = new RegExp(`${sep}node_modules${sep}(${vendorList})${sep}`)

export default (env: IEnv) =>
	merge(common(env), {
		output: {
			filename: '[name].[chunkhash:5].js',
			chunkFilename: '[name].[chunkhash:5].js',
		},
		stats: {
			hash: true,
			timings: true,
			assets: true,
			chunks: true,
			chunkModules: false,
			modules: false,
			children: false,
		},
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: testVendor,
						chunks: 'initial',
						name: 'vendor',
						enforce: true,
					},
				},
			},
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							inline: 1,
						},
						mangle: {
							safari10: true,
						},
						output: {
							safari10: true,
						},
					},
				}),
			],
		},
		plugins: [
			new HappyPack({
				id: 'ts',
				threads: 4,
				loaders: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['@babel/preset-env', { modules: false }],
								['@babel/preset-react', { development: false }],
							],
							plugins: ['@babel/plugin-syntax-dynamic-import'],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							configFile: paths.tsconfigDev,
							happyPackMode: true,
						},
					},
				],
			}),
			new ScriptExtHtmlPlugin({
				inline: ['runtime'],
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				defaultSizes: 'gzip',
				openAnalyzer: false,
			}),
		],
		module: {
			rules: [
				{
					test: paths.indexHtml,
					loader: 'prerender-loader',
					options: {
						string: true,
					},
				},
				{
					test: /\.tsx?$/,
					include: paths.src,
					loader: 'happypack/loader?id=ts',
				},
			],
		},
	})
