import React from 'react'
import { combineLatest, Observable } from 'rxjs'
import { actionsFilter } from '../@app/actions'
import { historyFilter$ } from '../@app/history'
import { formatMinutes } from '../@app/supply/utils'
import { colorSchool, colorStyle, colorTeacher, colorTime } from '../@app/theme'
import { EFilterFacet } from '../@app/typesApp'
import { ColoredLabel } from '../@components/ColoredLabel'
import { bind$ } from '../@components/MapElement'
import { rfSchools$, rfStyles$, rfTeachers$, rfTimeEnd$, rfTimeStart$ } from './stateFilter'

const makeCommaFacet = (
	facet$: Observable<string[]>,
	muted$: Observable<boolean | null>,
	defaultVal: string,
	color: string,
	onClick?: () => void
) =>
	bind$(
		combineLatest(facet$, muted$),
		([facet, muted]) => {
			const isNonempty = Boolean(facet.length)
			return (
				<ColoredLabel
					value={isNonempty ? facet.join(', ') : defaultVal}
					color={color}
					muted={muted === null ? !isNonempty : muted}
					onClick={onClick}
				/>
			)
		},
		color
	)

const getMuted$ = (facet: EFilterFacet) =>
	historyFilter$.map((v) => (v === undefined ? null : v !== facet))

const facetsMap: { [key: number]: JSX.Element } = {
	[EFilterFacet.Teachers]: makeCommaFacet(
		rfTeachers$,
		getMuted$(EFilterFacet.Teachers),
		'Any Teacher',
		colorTeacher,
		actionsFilter.open(EFilterFacet.Teachers)
	),
	[EFilterFacet.Schools]: makeCommaFacet(
		rfSchools$,
		getMuted$(EFilterFacet.Schools),
		'Any School',
		colorSchool,
		actionsFilter.open(EFilterFacet.Schools)
	),
	[EFilterFacet.Styles]: makeCommaFacet(
		rfStyles$,
		getMuted$(EFilterFacet.Styles),
		'Any Style',
		colorStyle,
		actionsFilter.open(EFilterFacet.Styles)
	),
	[EFilterFacet.TimeRange]: bind$(
		combineLatest(rfTimeStart$, rfTimeEnd$, getMuted$(EFilterFacet.TimeRange)),
		([start, end, muted]) => (
			<ColoredLabel
				value={`${formatMinutes(start)}〜${formatMinutes(end)}`}
				color={colorTime}
				muted={muted === null ? start === 0 && end === 1440 : muted}
				onClick={actionsFilter.open(EFilterFacet.TimeRange)}
			/>
		),
		colorTime
	),
}

export const allFacets = Object.values(facetsMap)

export const filterFacets = bind$(
	historyFilter$.view((v) => (v === undefined ? allFacets : facetsMap[v as number]))
)
