import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import * as paths from './paths'
import { IEnv } from './types'
import common from './webpack.common'
const HappyPack = require('happypack')

const port = 36403

export default (env: IEnv) =>
	merge(common(env), {
		devtool: 'inline-source-map',
		devServer: {
			port,
			host: '0.0.0.0',
			public: `localhost:${port}`,
			hot: true,
			open: true,
			contentBase: paths.publicAssets,
			watchOptions: {
				aggregateTimeout: 300,
			},
			// Request paths not ending in a file extension serve index.html:
			historyApiFallback: true,
			// Supress the extensive stats normally printed after a dev build (since sizes are mostly useless):
			stats: 'minimal',
			// Don't embed an error overlay ("redbox") into the client bundle:
			overlay: false,
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
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
								['@babel/preset-react', { development: true }],
							],
							plugins: ['react-hot-loader/babel', '@babel/plugin-syntax-dynamic-import'],
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
			new ForkTsCheckerWebpackPlugin({
				tsconfig: paths.tsconfigDev,
				tslint: true,
				checkSyntacticErrors: true,
				watch: [paths.src],
			}),
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					include: paths.src,
					loader: 'happypack/loader?id=ts',
				},
			],
		},
	} as any)
