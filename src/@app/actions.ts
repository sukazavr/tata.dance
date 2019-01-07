import { ca, ga, generalActionsLog$ } from './supply/action-helpers'
import { IHistoryState, EFilterFacet } from './typesApp'

if (process.env.NODE_ENV !== 'production') {
	generalActionsLog$.subscribe(({ key, namespace, payload }) => {
		// tslint:disable:no-console
		console.group('🔷', key, '🔹', namespace)
		console.log(payload)
		console.groupEnd()
	})
}

export const actionsApp = ga('app', {
	_setHistoryState: ca<Partial<IHistoryState>>(),
})

export const actionsFilter = ga('filter', {
	open: ca<EFilterFacet>(null),
	cancel: ca(),
	apply: ca(),
})
