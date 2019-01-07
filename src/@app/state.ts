import { Atom } from '@grammarly/focal'
import { IFilter } from '../filter/typesFilter'
import { getFilterOptions } from './supply/get-filter-options'
import { defaultIHistoryState, IHistoryState } from './typesApp'

const filterOptions = getFilterOptions()

export const appState$ = Atom.create<{
	history: IHistoryState
	masterFilter: IFilter
	slaveFilter: IFilter
}>({
	history: history.state || defaultIHistoryState,
	masterFilter: filterOptions,
	slaveFilter: filterOptions,
})
