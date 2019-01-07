import { fs } from 'foy'
import { TaskContext } from 'foy/lib/task'
import * as paths from './paths'

export default async (ctx: TaskContext) => {
	const packageJson = await fs.readJson(paths.packageJson)
	await ctx.exec(
		`webpack-dev-server ${packOptions({
			config: `"${paths.webpackDev}"`,
			'env.mode': 'development',
			'env.version': packageJson.version,
		})}`
	)
}

const packOptions = (options: { [o: string]: any }) =>
	Object.entries(options)
		.map(([key, val]) => `--${key} ${val}`)
		.join(' ')
