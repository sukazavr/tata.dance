import { types, style } from 'typestyle'

export const fontStack = "Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif"
export const fontMonoStack = "Monaco, Menlo, Consolas, 'Courier New', monospace"

export const blackColor = '#191817'
export const mainFGColor = '#e4e1d9'
export const mainBGColor = '#3c352d'

export const colorTeacher = '#009900'
export const colorSchool = '#ff0000'
export const colorStudio = '#ff6600'
export const colorStyle = '#cc00ff'
export const colorStyleGenre = '#ff00ff'
export const colorCategory = '#996600'
export const colorTime = '#0000ff'

export const $tappable = style({
	cursor: 'pointer',
	userSelect: 'none',
})

type BoxUnit = number | string
const boxUnitToString = (value: BoxUnit): string => {
	if (typeof value === 'number') {
		return value.toString() + 'em'
	} else {
		return value
	}
}

export const gridSpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		marginTop: '-' + spacing,
		marginLeft: '-' + spacing,
		'&>*': {
			marginTop: spacing,
			marginLeft: spacing,
		},
	} as types.CSSProperties
}

export const verticallySpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		'&>*': {
			marginBottom: spacing + ' !important',
		},
		'&>*:last-child': {
			marginBottom: '0px !important',
		},
	} as types.CSSProperties
}

export const horizontallySpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		'&>*': {
			marginRight: spacing + ' !important',
		},
		'&>*:last-child': {
			marginRight: '0px !important',
		},
	} as types.CSSProperties
}
