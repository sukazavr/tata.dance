export enum EFilterFacet {
	Teachers,
	Schools,
	Styles,
	TimeRange,
}

export interface IHistoryState {
	filter?: EFilterFacet
}

export const defaultIHistoryState: IHistoryState = {}
