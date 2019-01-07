export interface IFilter {
	teachers: string[]
	schools: string[]
	styles: string[]
	timeStart: number
	timeEnd: number
}

export const defaultFilter: IFilter = {
	teachers: [],
	schools: ['SHINJUKU'],
	styles: [],
	timeStart: 0,
	timeEnd: 1440,
}
