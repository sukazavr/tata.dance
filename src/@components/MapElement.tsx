import React from 'react'
import { Observable } from 'rxjs'
import { LiftWrapper } from '@grammarly/focal/dist/src/react'

export function bind$<T>(value: Observable<T>): T
export function bind$<T1, T2>(
	value: Observable<T1>,
	projection?: (value: T1) => T2,
	key?: string | number
): T2
export function bind$(value: Observable<any>, projection?: (v: any) => any, key?: string | number) {
	return (
		<LiftWrapper
			key={key}
			props={{ value }}
			component={(props) => (projection ? projection(props.value) : props.value)}
		/>
	)
}
