import { actionsFilter } from '../@app/actions'
import { appState$ } from '../@app/state'

export const masterFilter$ = appState$.lens('masterFilter')

const renegadeFilter$ = appState$.view(({ history: { filter }, masterFilter, slaveFilter }) =>
	filter === undefined ? masterFilter : slaveFilter
)

export const rfTeachers$ = renegadeFilter$.view('teachers')
export const rfSchools$ = renegadeFilter$.view('schools')
export const rfStyles$ = renegadeFilter$.view('styles')
export const rfTimeStart$ = renegadeFilter$.view('timeStart')
export const rfTimeEnd$ = renegadeFilter$.view('timeEnd')

export const slaveFilter$ = appState$.lens('slaveFilter')
export const sfTeachers$ = slaveFilter$.lens('teachers')
export const sfSchools$ = slaveFilter$.lens('schools')
export const sfStyles$ = slaveFilter$.lens('styles')
export const sfTimeStart$ = slaveFilter$.lens('timeStart')
export const sfTimeEnd$ = slaveFilter$.lens('timeEnd')

actionsFilter.open.$.subscribe((filter) => {
	appState$.modify((state) => ({
		...state,
		history: { ...state.history, filter },
	}))
})

actionsFilter.cancel.$.subscribe(() => {
	appState$.modify((state) => ({
		...state,
		slaveFilter: state.masterFilter,
		history: { ...state.history, filter: undefined },
	}))
})

actionsFilter.apply.$.subscribe(() => {
	appState$.modify((state) => ({
		...state,
		masterFilter: state.slaveFilter,
		history: { ...state.history, filter: undefined },
	}))
})
