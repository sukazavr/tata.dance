import React from 'react'
import ReactDOM from 'react-dom'
import { Landing } from './Landing'
import { forceRenderStyles } from 'typestyle'
import { DB$ } from '../schedule/stateSchedule'

document.head.insertAdjacentHTML(
	'beforeend',
	'<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">'
)

forceRenderStyles()

const render = async () => {
	await import(/* webpackChunkName: "DB" */
	'../schedule/db').then(({ DB }) => {
		DB$.set(DB)
	})
	ReactDOM.render(React.createElement(Landing), document.getElementById('app'))
}

render()

export default render
