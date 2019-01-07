import { Atom } from '@grammarly/focal'
import { ILesson, ISchool, ITeacher, IStyle, ICategory } from './typesSchedule.js'
import { Observable, combineLatest } from 'rxjs'
import { startOfDay, addDays, getISODay, isToday, format } from 'date-fns'
import { shareReplay } from 'rxjs/operators'
import { masterFilter$ } from '../filter/stateFilter'

export const DB$ = Atom.create<{
	teachers: { [teacherID: string]: ITeacher }
	schools: { [schoolID: string]: ISchool }
	styles: { [styleID: string]: IStyle }
	categories: { [categoryID: string]: ICategory }
	lessons: ILesson[]
}>({
	teachers: {},
	schools: {},
	styles: {},
	categories: {},
	lessons: [],
})

// Because in the feature data will come asynchronously
export const teachers$ = DB$.view('teachers')
export const schools$ = DB$.view('schools')
export const styles$ = DB$.view('styles')

const lessons$ = DB$.view(({ lessons }) => lessons.sort((a, b) => a.startTime - b.startTime))
const lessonsIndex$ = lessons$.view((lessons) => {
	const byDay: ILesson[][] = [[], [], [], [], [], [], []]
	lessons.forEach((lesson) => {
		byDay[lesson.dayIndex].push(lesson)
	})
	return { byDay }
})
const lessonsIndexByDay$ = lessonsIndex$.view('byDay')

const today$ = new Observable<Date>((subscriber) => {
	let timerId: number | undefined

	const nextCall = () => {
		const now = new Date()
		const startDay = startOfDay(now)
		subscriber.next(startDay)
		const msUntilTomorrow = addDays(startDay, 1).getTime() - now.getTime()
		// https://github.com/GoogleChromeLabs/prerender-loader/issues/27
		if (!window.PRERENDER) {
			timerId = window.setTimeout(nextCall, msUntilTomorrow)
		}
	}

	nextCall()

	return () => {
		window.clearTimeout(timerId)
	}
}).pipe(shareReplay(1))

const formatDay = (date: Date) => format(date, `${isToday(date) ? '[Today]' : 'dddd'}, MMMM D`)

export const schedule$ = combineLatest(today$, lessonsIndexByDay$, masterFilter$).map(
	([today, byDay, { teachers, schools, styles, timeStart, timeEnd }]) => {
		const day = getISODay(today) - 1
		const todayWeek = [...byDay]
		if (day !== 0) {
			todayWeek.push(...todayWeek.splice(0, day))
		}
		const withTeachers = Boolean(teachers.length)
		const withSchools = Boolean(schools.length)
		const withStyles = Boolean(styles.length)
		const withTimeRange = timeStart !== 0 && timeEnd !== 1440
		const withFilter = withTeachers || withSchools || withStyles || withTimeRange
		return todayWeek.map((lessons, index) => {
			if (withFilter) {
				lessons = lessons.filter((lesson) => {
					if (withTeachers) {
						if (!teachers.includes(lesson.teacher)) {
							return false
						}
					}
					if (withSchools) {
						if (!schools.includes(lesson.school)) {
							return false
						}
					}
					if (withStyles) {
						if (!styles.includes(lesson.style)) {
							return false
						}
					}
					if (withTimeRange) {
						if (lesson.startTime < timeStart || lesson.startTime > timeEnd) {
							return false
						}
					}
					return true
				})
			}
			return {
				lessons,
				day: formatDay(addDays(today, index)),
			}
		})
	}
)
