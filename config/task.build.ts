import { fs } from 'foy'
import { TaskContext } from 'foy/lib/task'
import * as paths from './paths'

export default async (ctx: TaskContext) => {
	await fs.rmrf(paths.dist)
	await fs.copy(paths.publicAssets, paths.dist)
	const packageJson = await fs.readJson(paths.packageJson)
	await ctx.exec(
		`webpack ${packOptions({
			config: `"${paths.webpackProd}"`,
			'env.mode': 'production',
			'env.version': packageJson.version,
		})}`
	)
}

const packOptions = (options: { [o: string]: any }) =>
	Object.entries(options)
		.map(([key, val]) => `--${key} ${val}`)
		.join(' ')
