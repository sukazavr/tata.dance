import React from 'react'
import { ITeacher } from '../schedule/typesSchedule'
import { style } from 'typestyle'
import { colorTeacher } from '../@app/theme'
import { ColoredLabel } from './ColoredLabel'

export const Teacher = ({ teacher: { name, photo } }: { teacher: ITeacher }) => {
	return (
		<div className={$container} style={{ backgroundImage: `url(${photo})` }}>
			<ColoredLabel value={name} color={colorTeacher} />
		</div>
	)
}

const $container = style({
	display: 'flex',
	alignItems: 'flex-end',
	height: '7em',
	paddingBottom: '0.2em',
	backgroundSize: 'cover',
	backgroundColor: colorTeacher,
})
