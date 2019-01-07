import { Atom, classes, F, lift } from '@grammarly/focal'
import React from 'react'
import { style } from 'typestyle'
import { historyFilter$ } from '../@app/history'
import { EFilterFacet } from '../@app/typesApp'
import { bind$ } from '../@components/MapElement'
import { ReactiveList } from '../@components/ReactiveList'
import { schools$, styles$, teachers$ } from '../schedule/stateSchedule'
import { defaultSchool, defaultStyle, defaultTeacher } from '../schedule/typesSchedule'
import { sfSchools$, sfStyles$, sfTeachers$, sfTimeStart$, sfTimeEnd$ } from './stateFilter'
import { Teacher } from '../@components/Teacher'
import { $tappable, colorSchool, colorStyle, verticallySpaced } from '../@app/theme'
import { shadeColor } from '../@app/supply/utils'
import { HourPicker } from './HourPicker'
import { filter, startWith } from 'rxjs/operators'

export const filterOptions = bind$(
	historyFilter$
		.pipe<EFilterFacet>(
			filter((v) => v !== undefined),
			startWith(EFilterFacet.Styles)
		)
		.map((v) => options[v])
)

const Table = ({ children }: { children: React.ReactNode }) => (
	<div className={$table}>
		<div className={$grid}>{children}</div>
	</div>
)

const wrapSelectable = (filterFacet$: Atom<string[]>, itemID: string, el?: JSX.Element) => (
	<F.div
		key={itemID}
		{...classes($tappable, filterFacet$.view((v) => v.includes(itemID) && $active))}
		onClick={() => {
			filterFacet$.modify((v) => {
				const nv = [...v]
				const i = nv.indexOf(itemID)
				if (i === -1) {
					nv.push(itemID)
				} else {
					nv.splice(i, 1)
				}
				return nv
			})
		}}
	>
		{el || itemID}
	</F.div>
)

const FTeacher = lift(Teacher)

const $blank = style({
	color: '#fff',
	height: '100%',
	padding: '1em',
	fontWeight: 700,
})
const FBlank = lift(({ value, color }: { value: string; color: string }) => (
	<div
		className={$blank}
		style={{
			backgroundColor: color,
			// tslint:disable-next-line:max-line-length
			backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h16v2h-6v6h6v8H8v-6H2v6H0V0zm4 4h2v2H4V4zm8 8h2v2h-2v-2zm-8 0h2v2H4v-2zm8-8h2v2h-2V4z' fill='${shadeColor(
				color,
				-0.6
			)}' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E")`,
		}}
	>
		{value}
	</div>
))

const $active = style({
	position: 'relative',
	outline: '0.3em solid #00c000',
	$nest: {
		'&::after': {
			position: 'absolute',
			content: `'\\2713'`,
			width: '1.2em',
			height: '1.2em',
			top: '-0.2em',
			right: '-0.2em',
			borderRadius: '50%',
			backgroundColor: '#00c000',
			color: '#f2ffbf',
			fontSize: '1.2em',
			fontWeight: 700,
			textAlign: 'center',
			lineHeight: '1.1em',
		},
	},
})

const $table = style({
	flexGrow: 1,
	overflowY: 'auto',
})

const $grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(8.4em, 1fr))',
	gridGap: '1em 1em',
	padding: '1em',
})

const $timeRange = style(verticallySpaced(3), {
	flexGrow: 1,
	padding: '2em',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
})

const options: { [key: number]: React.ReactNode } = {
	[EFilterFacet.Teachers]: (
		<Table>
			<ReactiveList items={teachers$} defaultItem={defaultTeacher}>
				{(teacher$, itemID) =>
					wrapSelectable(sfTeachers$, itemID, <FTeacher teacher={teacher$} />)
				}
			</ReactiveList>
		</Table>
	),
	[EFilterFacet.Schools]: (
		<Table>
			<ReactiveList items={schools$} defaultItem={defaultSchool}>
				{(school$, itemID) =>
					wrapSelectable(
						sfSchools$,
						itemID,
						<FBlank value={school$.view('name')} color={colorSchool} />
					)
				}
			</ReactiveList>
		</Table>
	),
	[EFilterFacet.Styles]: (
		<Table>
			<ReactiveList items={styles$} defaultItem={defaultStyle}>
				{(style$, itemID) =>
					wrapSelectable(
						sfStyles$,
						itemID,
						<FBlank value={style$.view('name')} color={colorStyle} />
					)
				}
			</ReactiveList>
		</Table>
	),
	[EFilterFacet.TimeRange]: (
		<div className={$timeRange}>
			<HourPicker value$={sfTimeStart$} label="Lesson should start after" />
			<HourPicker value$={sfTimeEnd$} label="And start before" />
		</div>
	),
}
