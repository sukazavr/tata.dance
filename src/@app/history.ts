import { appState$ } from './state'
import { isShallowEqual } from './supply/utils'
import { defaultIHistoryState } from './typesApp'
import { pairwise, filter } from 'rxjs/operators'
import { getFilterOptions } from './supply/get-filter-options'

export const historyState$ = appState$.lens('history')
export const historyFilter$ = historyState$.view('filter')

let popstateTriggered = false

window.addEventListener('popstate', ({ state: history }) => {
	popstateTriggered = true
	appState$.modify((state) => ({
		...state,
		history: history || defaultIHistoryState,
		masterFilter: getFilterOptions(),
	}))
})

appState$
	.pipe(
		pairwise(),
		filter(() => {
			if (popstateTriggered) {
				popstateTriggered = false
				return false
			} else {
				return true
			}
		})
	)
	.subscribe(([current, next]) => {
		const nextHistory = next.history
		const nextFilter = next.masterFilter

		let url: string | undefined

		if (!isShallowEqual(nextFilter, current.masterFilter)) {
			const params = new URLSearchParams()
			Object.entries(nextFilter).forEach(([key, value]) => {
				params.set(key, value)
			})
			url = `?${params.toString()}`
		}

		if (!isShallowEqual(nextHistory, current.history) || url) {
			history.pushState(nextHistory, '', url)
		}
	})
