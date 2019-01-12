import { Observable } from 'rxjs'
import { share } from 'rxjs/operators'

// Create Action
export function ca(): TDummyAction
export function ca<A>(): TAction<A>
export function ca<A>(modifier: null): TAction<A, A, () => void>
export function ca<A, P, C>(modifier: TModifier<A, P, C>): TAction<A, P, C>
export function ca<A, P, C>(modifier?: TModifier<A, P, C> | null): TAction<A, P, C> {
	let next: (payload: any) => void
	const action = (payload: any) => {
		if (next) {
			if (modifier) {
				return modifier(next, payload)
			} else if (modifier === null) {
				return () => next(payload)
			} else {
				return next(payload)
			}
		}
	}
	action.$ = new Observable<P>((sub) => {
		next = sub.next.bind(sub)
	}).pipe(share())
	return action as any
}

// Generalize Actions
export const ga = <Actions>(namespace: string, actions: { [K in keyof Actions]: Actions[K] }) => {
	Object.entries<any>(actions).forEach(([key, action]) => {
		action.$.subscribe((payload: any) => {
			const byHuman = key[0] !== '_'
			const name = byHuman ? key : key.slice(1)
			generalActionLog({
				action,
				key,
				name,
				byHuman,
				namespace,
				payload,
			})
		})
	})
	return actions
}

const generalActionLog = ca<IActionDust>()

export const generalActionsLog$ = generalActionLog.$

type TModifier<A, P, C> = (R: (payload: P) => void, a: A) => C

type TAction<A, P = A, C = void> = {
	(args: A): C
	$: Observable<P>
}

type TDummyAction = {
	(...args: any[]): void
	$: Observable<any>
}

export interface IActionDust {
	action: TDummyAction
	key: string
	name: string
	byHuman: boolean
	namespace: string
	payload: any
}

/* const d = ca()
d()
d.$

const dd = ca<string>()
dd('h')
dd.$

const dd1 = ca<string>(null)
dd1.$
const h1 = dd1('dd')
h1()

const dd2 = ca<string, number, (x: number) => void>((R, smth) => (x) => R(x + Number(smth)))
dd2.$
const h2 = dd2('df')
h2(3)

const tt = ga('tool', {
	d,
	dd,
	dd2,
}) */
