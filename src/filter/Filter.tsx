import React from 'react'
import { animated, config, Spring } from 'react-spring'
import { style, classes } from 'typestyle'
import { actionsFilter } from '../@app/actions'
import { historyFilter$ } from '../@app/history'
import { blackColor, gridSpaced, horizontallySpaced, $tappable } from '../@app/theme'
import { bind$ } from '../@components/MapElement'
import { allFacets } from './filterFacets'
import { filterOptions } from './filterOptions'

export const Filter = () => {
	return bind$(historyFilter$.view((v) => v !== undefined), (isOpened) => (
		<Spring
			native
			config={(key) => {
				switch (key) {
					case 'opacity':
						return config.default
					default:
						return isOpened ? config.stiff : config.default
				}
			}}
			to={{
				opacity: isOpened ? 1 : 0,
				optionsHeight: isOpened ? '50vh' : '0vh',
				controlHeight: isOpened ? '5em' : '0em',
			}}
		>
			{({ controlHeight, optionsHeight, opacity }) => (
				<div className={$container}>
					<animated.div className={$options} style={{ opacity, height: optionsHeight }}>
						{filterOptions}
					</animated.div>
					<div className={$facets}>{allFacets}</div>
					<animated.div className={$controls} style={{ opacity, height: controlHeight }}>
						<button className={$button} onClick={actionsFilter.cancel} children="Cancel" />
						<button className={$button} onClick={actionsFilter.apply} children="Apply" />
					</animated.div>
				</div>
			)}
		</Spring>
	))
}

const $container = style({
	gridArea: '1 / 1 / 2 / 2',
	display: 'flex',
	flexDirection: 'column',
	zIndex: 10,
	backgroundColor: blackColor,
	willChange: 'height',
})

const $options = style({
	flexShrink: 0,
	display: 'grid',
	flexDirection: 'column',
	overflow: 'hidden',
	willChange: 'opacity, height',
})

const $facets = style(gridSpaced(0.5), {
	flexShrink: 0,
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	padding: '1em',
})

const $controls = style(horizontallySpaced(1), {
	flexShrink: 0,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '0 1em',
	overflow: 'hidden',
	willChange: 'opacity, height',
})

const $button = classes(
	$tappable,
	style({
		width: '100%',
		padding: '0.2em 0.6em',
		fontSize: '1.4em',
		background: '#eabb5c',
		border: '.2em solid #795d24',
		borderTop: '0',
		borderLeftWidth: '1px',
		borderRightWidth: '1px',
	})
)
