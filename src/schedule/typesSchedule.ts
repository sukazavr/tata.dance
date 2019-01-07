export interface ITeacher {
	name: string
	photo: string
}

export const defaultTeacher: ITeacher = {
	name: '',
	photo: '',
}

export interface ICategory {
	name: string
}

export interface IStyle {
	name: string
}

export const defaultStyle: IStyle = {
	name: '',
}

export interface ISchool {
	name: string
	studios: string[]
}

export const defaultSchool: ISchool = {
	name: '',
	studios: [],
}

export interface ILesson {
	teacher: string
	school: string
	studio: string
	dayIndex: number
	startTime: number
	duration: number
	style: string
	styleGenre: string
	category: string
}

export const defaultLesson: ILesson = {
	teacher: '',
	school: '',
	studio: '',
	dayIndex: 0,
	startTime: 0,
	duration: 0,
	style: '',
	styleGenre: '',
	category: '',
}
