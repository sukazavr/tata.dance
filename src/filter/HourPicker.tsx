import React from 'react'
import { Atom } from '@grammarly/focal'
import { bind$ } from '../@components/MapElement'
import { Slider, Rail, Handles } from 'react-compound-slider'
import { style } from 'typestyle'
import { formatMinutes } from '../@app/supply/utils'

type TProps = {
	value$: Atom<number>
	label: string
}

const domain = [0, 1440]

export const HourPicker = ({ value$, label }: TProps) =>
	bind$(value$, (value) => (
		<div>
			<label className={$label}>
				{label}: <em>{formatMinutes(value)}</em>
			</label>
			<Slider
				mode={1}
				step={10}
				domain={domain}
				className={$slider}
				onUpdate={([hour]) => {
					value$.set(hour)
				}}
				values={[value]}
			>
				<Rail>{({ getRailProps }) => <div className={$rail} {...getRailProps()} />}</Rail>
				<Handles>
					{({ handles, getHandleProps }) => (
						<>
							{handles.map(({ id, percent }) => (
								<div
									key={id}
									role="slider"
									aria-valuemin={domain[0]}
									aria-valuemax={domain[1]}
									aria-valuenow={value}
									className={$handle}
									style={{ left: `${percent}%` }}
									{...getHandleProps(id)}
								/>
							))}
						</>
					)}
				</Handles>
			</Slider>
		</div>
	))

const $label = style({
	display: 'block',
	fontSize: '1.2em',
	marginBottom: '1em',
	$nest: {
		'& em': {
			fontWeight: 700,
			fontStyle: 'normal',
			color: '#fff',
		},
	},
})

const $slider = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	height: '2em',
})

const $rail = style({
	position: 'absolute',
	width: '100%',
	height: '.2em',
	backgroundColor: '#124679',
	cursor: 'pointer',
})

const $handle = style({
	position: 'absolute',
	width: '2em',
	height: '2em',
	marginLeft: '-1em',
	borderRadius: '50%',
	backgroundColor: '#8da0ab',
	cursor: 'pointer',
	zIndex: 2,
})
