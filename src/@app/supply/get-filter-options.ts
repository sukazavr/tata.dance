import { IFilter, defaultFilter } from '../../filter/typesFilter'

const facetsArrayType: (keyof IFilter)[] = ['teachers', 'schools', 'styles']
export const getFilterOptions = () => {
	const filterOptions = { ...defaultFilter }
	if (location.search) {
		const params = new URLSearchParams(location.search)

		facetsArrayType.forEach((facetName) => {
			const facetValue = params.get(facetName)
			if (facetValue === '') {
				filterOptions[facetName] = []
			} else if (facetValue) {
				filterOptions[facetName] = facetValue.split(',')
			}
		})

		const timeStart = params.get('timeStart')
		if (timeStart) {
			const time = Number(timeStart)
			if (time >= 0 && time <= 1440) {
				filterOptions.timeStart = time
			}
		}

		const timeEnd = params.get('timeEnd')
		if (timeEnd) {
			const time = Number(timeEnd)
			if (time >= 0 && time <= 1440) {
				filterOptions.timeEnd = time
			}
		}
	}
	return filterOptions
}
