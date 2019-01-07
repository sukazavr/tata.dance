import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export const debug = (...args: any[]) => <T>(stream: Observable<T>) => {
	if (process.env.NODE_ENV === 'production') {
		return stream
	} else {
		return stream.pipe(
			// tslint:disable-next-line:no-console
			tap(console.log.bind(console, ...args))
		)
	}
}

export const isShallowEqual = (a: any, b: any): boolean => {
	if (!a || !b) {
		return !a && !b
	}

	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	const aLen = aKeys.length
	const bLen = bKeys.length

	if (aLen === bLen) {
		for (let i = 0; i < aLen; ++i) {
			const key = aKeys[i]
			if (a[key] !== b[key]) {
				return false
			}
		}
		return true
	}

	return false
}

/* tslint:disable:no-bitwise */
export const shadeColor = (color: string, percent: number) => {
	const f = parseInt(color.slice(1), 16)
	const t = percent < 0 ? 0 : 255
	const p = percent < 0 ? percent * -1 : percent
	const R = f >> 16
	const G = (f >> 8) & 0x00ff
	const B = f & 0x0000ff
	return (
		'#' +
		(
			0x1000000 +
			(Math.round((t - R) * p) + R) * 0x10000 +
			(Math.round((t - G) * p) + G) * 0x100 +
			(Math.round((t - B) * p) + B)
		)
			.toString(16)
			.slice(1)
	)
}
/* tslint:enable:no-bitwise */

export const formatMinutes = (minutes: number) => {
	const hours = Math.floor(minutes / 60)
	const rest = Math.floor(minutes - hours * 60)
	return `${hours < 10 ? '0' + hours : hours}:${rest < 10 ? '0' + rest : rest}`
}
