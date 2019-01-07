import { hot, setConfig } from 'react-hot-loader'
import { App } from '../@app/App'
import { fontStack, mainBGColor, mainFGColor } from '../@app/theme'
import { cssRule, cssRaw } from 'typestyle'
import reset from './reset.css'

setConfig({
	logLevel: 'debug',
	ignoreSFC: true, // RHL will be __completely__ disabled for SFC
	pureRender: true, // RHL will not change render method
})

cssRaw(reset)

cssRule('html, body', {
	height: '100%',
	width: '100%',
})

cssRule('body', {
	display: 'flex',
	fontFamily: fontStack,
	fontWeight: 400,
	fontSize: '14px',
	contain: 'strict',
	overflow: 'hidden',
	overscrollBehavior: 'none',
	color: mainFGColor,
	backgroundColor: mainBGColor,
})

cssRule('#app', {
	flexGrow: 1,
	display: 'flex',
	flexDirection: 'column',
})

export const Landing = hot(module)(App)
