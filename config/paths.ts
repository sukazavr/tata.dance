import path from 'path'

export const root = path.resolve(__dirname, '..')

export const src = path.resolve(root, 'src')
export const dist = path.resolve(root, 'dist')
export const assets = path.resolve(root, 'assets')
export const packageJson = path.resolve(root, 'package.json')
export const tsconfigDev = path.resolve(root, 'tsconfig.dev.json')

export const config = path.resolve(root, 'config')
export const webpackDev = path.resolve(config, 'webpack.dev.ts')
export const webpackProd = path.resolve(config, 'webpack.prod.ts')

export const publicAssets = path.resolve(assets, 'public')
export const indexHtml = path.resolve(assets, 'index.html')

export const firstInteraction = path.resolve(src, '@first-interaction')
export const prerender = path.resolve(firstInteraction, 'prerender.ts')
