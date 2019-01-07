import React from 'react'
import { style } from 'typestyle'
import { verticallySpaced } from '../@app/theme'
import { HorizontalDivider } from '../@components/HorizontalDivider'
import { bind$ } from '../@components/MapElement'
import { Lesson } from './Lesson'
import { schedule$ } from './stateSchedule'
import { ILesson } from './typesSchedule'

export const Schedule = () => {
	return (
		<div className={$container}>
			{bind$(schedule$, (days) =>
				days.map(({ day, lessons }, dayIndex) => (
					<Day key={dayIndex} day={day} lessons={lessons} />
				))
			)}
		</div>
	)
}

const Day = ({ day, lessons }: { day: string; lessons: ILesson[] }) => (
	<div>
		<HorizontalDivider value={day} />
		<div className={$grid}>
			{lessons.map((lesson, i) => (
				<Lesson lesson={lesson} key={i} />
			))}
		</div>
	</div>
)

const $container = style(verticallySpaced(2), { gridArea: '2 / 1 / 3 / 2', overflowY: 'auto' })

const $grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(10em, 1fr))',
	gridGap: '1em 1em',
	padding: '1em',
})
