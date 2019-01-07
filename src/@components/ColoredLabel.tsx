import React from 'react'
import { $tappable } from '../@app/theme'
import { shadeColor } from '../@app/supply/utils'
import { style, classes } from 'typestyle'

type TProps = {
	color: string
	value: string
	muted?: boolean
	onClick?: () => void
}

export const ColoredLabel = ({ color, value, muted = false, onClick }: TProps) => (
	<span
		className={classes($container, onClick && $tappable)}
		style={{
			backgroundColor: muted ? shadeColor(color, -0.6) : color,
			color: muted ? shadeColor(color, 0.6) : undefined,
		}}
		onClick={onClick}
	>
		{value}
	</span>
)

const $container = style({
	padding: '0 0.2em',
	color: '#fff',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
})
