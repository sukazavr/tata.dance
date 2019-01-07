// tslint:disable-next-line:interface-name
declare interface NodeModule {
	hot: any
}

// tslint:disable-next-line:interface-name
declare interface Window {
	PRERENDER: undefined | true
	dataLayer: any[]
	gtag: (...args: any[]) => void
}

declare module '*.css' {
	const content: string
	export default content
}
