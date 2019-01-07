import React from 'react'
import { blackColor } from '../@app/theme'
import { style } from 'typestyle'

type TProps = { value: string }

export const HorizontalDivider = ({ value: text }: TProps) => {
	return (
		<div className={$container}>
			<hr className={$hr} />
			<span className={$text}>{text}</span>
		</div>
	)
}

const $container = style({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
	justifyContent: 'center',
})

const $hr = style({
	width: '100%',
	height: '2px',
	border: 0,
	borderBottom: '2px solid #584d42',
	backgroundColor: '#252422',
	position: 'absolute',
	margin: 0,
})

const $text = style({
	display: 'block',
	margin: '0 auto',
	padding: '0.3em 0.6em',
	fontSize: '0.9em',
	fontWeight: 700,
	color: '#ecd8c1',
	backgroundColor: blackColor,
	zIndex: 1,
})
