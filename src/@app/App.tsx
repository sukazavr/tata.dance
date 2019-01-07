import React from 'react'
import { style } from 'typestyle'
import { Filter } from '../filter/Filter'
import { Schedule } from '../schedule/Schedule'

export const App = () => {
	return (
		<div className={$container}>
			<Filter />
			<Schedule />
		</div>
	)
}

const $container = style({
	flexGrow: 1,
	display: 'grid',
	gridTemplateColumns: '100vw',
	gridTemplateRows: 'auto 1fr',
	maxHeight: '100%',
})
