import { addMinutes, format } from 'date-fns'
import React from 'react'
import { style } from 'typestyle'
import { formatMinutes } from '../@app/supply/utils'
import {
	blackColor,
	colorCategory,
	colorSchool,
	colorStudio,
	colorStyle,
	colorStyleGenre,
	colorTime,
	gridSpaced,
} from '../@app/theme'
import { ColoredLabel } from '../@components/ColoredLabel'
import { Teacher } from '../@components/Teacher'
import { teachers$ } from './stateSchedule'
import { ILesson } from './typesSchedule'

type TProps = {
	lesson: ILesson
}

export const Lesson = ({
	lesson: {
		teacher: teacherID,
		startTime,
		duration,
		school,
		studio,
		style: danceStyle,
		styleGenre,
		category,
	},
}: TProps) => {
	const teacher = teachers$.get()[teacherID]
	return (
		<div className={$container}>
			<Time startTime={startTime} duration={duration} />
			<Teacher teacher={teacher} />
			<div className={$details}>
				<ColoredLabel value={school} color={colorSchool} />
				<ColoredLabel value={studio} color={colorStudio} />
				<ColoredLabel value={danceStyle} color={colorStyle} />
				<ColoredLabel value={styleGenre} color={colorStyleGenre} />
				<ColoredLabel value={category} color={colorCategory} />
			</div>
		</div>
	)
}

const Time = ({ startTime, duration }: { startTime: number; duration: number }) => {
	const hours = Math.floor(startTime / 60)
	const rest = Math.floor(startTime - hours * 60)
	const date = new Date().setHours(hours, rest)
	return (
		<div className={$containerTime}>
			<div className={$timeStart}>{formatMinutes(startTime)}</div>
			<div className={$timeDuration}>{duration}min</div>
			<div className={$timeEnd}>{format(addMinutes(date, duration), 'H:mm')}</div>
		</div>
	)
}

const $container = style({
	backgroundColor: blackColor,
})

const $details = style(gridSpaced(0.2), {
	display: 'flex',
	flexWrap: 'wrap',
})

const $containerTime = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0.15em 0.2em',
	color: '#fff',
	backgroundColor: colorTime,
})

const $timeStart = style({
	fontWeight: 700,
})

const $timeDuration = style({
	fontSize: '0.8em',
	opacity: 0.8,
})

const $timeEnd = style({
	opacity: 0.7,
})
