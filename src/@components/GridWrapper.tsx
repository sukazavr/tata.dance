import React from 'react'
import { style } from 'typestyle'

type TProps = { children: React.ReactNode }

export const Grid = ({ children }: TProps) => <div className={$container}>{children}</div>

const $container = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(10em, 1fr))',
	gridGap: '1em 1em',
	padding: '1em',
})
