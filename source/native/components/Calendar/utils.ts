import { DayType } from './modules/Day'
import { MonthProps } from './modules/Month'
import { isBetweenDates } from '../../utils/formatDates'

export const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export const DAY_NAMES = [
  { name: 'ПН', isDayOff: false },
  { name: 'ВТ', isDayOff: false },
  { name: 'СР', isDayOff: false },
  { name: 'ЧТ', isDayOff: false },
  { name: 'ПТ', isDayOff: false },
  { name: 'СБ', isDayOff: true },
  { name: 'ВС', isDayOff: true },
]

export const NUMBER_OF_MONTHS = 24

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function leapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function getNumberOfDaysInMonth(month: number, year: number) {
  switch (month) {
    case 0:
      return 31
    case 1:
      return leapYear(year) ? 29 : 28
    case 2:
      return 31
    case 3:
      return 30
    case 4:
      return 31
    case 5:
      return 30
    case 6:
      return 31
    case 7:
      return 31
    case 8:
      return 30
    case 9:
      return 31
    case 10:
      return 30
    case 11:
      return 31
    default:
      return 30
  }
}

export function sameDate(one: Date, other: Date) {
  return (
    one.getDate() === other.getDate() &&
    one.getMonth() === other.getMonth() &&
    one.getFullYear() === other.getFullYear()
  )
}

const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5]

function dayShouldBeActive(
  date: Date,
  startDate: Date,
  endDate: Date,
  firstDayOfMonth: Date,
  lastDayOfMonth: Date
) {
  if (date > lastDayOfMonth) {
    return endDate > lastDayOfMonth && startDate <= lastDayOfMonth
  }

  return startDate < firstDayOfMonth && endDate >= firstDayOfMonth
}

export function isValidDate(date: Date): boolean {
  return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
}

const checkIsToday = (day: number, monthDate: number, year: number) => {
  const today = new Date()
  return day === today.getDate() && monthDate === today.getMonth() && year === today.getFullYear()
}

const checkInRange = (date: Date, minDate?: Date, maxDate?: Date) =>
  (!minDate || (minDate && date >= minDate)) && (!maxDate || (maxDate && date <= maxDate))

const checkIsOutOfRange = (date: Date, minDate?: Date, maxDate?: Date) =>
  !!((minDate && date < minDate) || (maxDate && date > maxDate))

const prepareMonthDay = (params: {
  firstMonthDay: Date
  i: number
  year: number
  daysToAdd: 31 | 28 | 29 | 30
  disableRange: boolean
  lastMonthDay: Date
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
}) => {
  const date: Date = addDays(params.firstMonthDay, params.i)
  const day = date.getDate()
  const monthDate = date.getMonth()
  const fullDay = day < 10 ? `0${day}` : day.toString()
  const fullMonth = monthDate < 10 ? `0${monthDate + 1}` : (monthDate + 1).toString()
  const id = `${date.getFullYear()}-${fullMonth}-${fullDay}`
  const isToday = checkIsToday(day, monthDate, params.year)

  let isOnSelectableRange = checkInRange(date, params.minDate, params.maxDate)
  const isOutOfRange = checkIsOutOfRange(date, params.minDate, params.maxDate)
  const isMonthDate = params.i >= 0 && params.i < params.daysToAdd
  let isStartDate = false
  let isEndDate = false
  let isActive = false

  if (params.endDate && params.startDate && !params.disableRange) {
    isStartDate = isMonthDate && sameDate(date, params.startDate)
    isEndDate = isMonthDate && sameDate(date, params.endDate)

    if (!isMonthDate) {
      isActive = dayShouldBeActive(
        date,
        params.startDate,
        params.endDate,
        params.firstMonthDay,
        params.lastMonthDay
      )
    } else {
      isActive = date >= params.startDate && date <= params.endDate
    }
  } else if (isMonthDate && params.startDate && sameDate(date, params.startDate)) {
    isStartDate = true
    isEndDate = true
    isActive = true
  }

  return {
    key: `${monthDate}-${id}`,
    id: id,
    date,
    isToday,
    isMonthDate,
    isActive,
    isStartDate,
    isEndDate,
    isOutOfRange,
    isVisible: isOnSelectableRange && isMonthDate,
    isHidden: false,
  }
}

export function getMonthDays(
  month: number,
  year: number,
  disableRange: boolean,
  startDate?: Date,
  endDate?: Date,
  minDate?: Date,
  maxDate?: Date
): DayType[] {
  if (minDate instanceof Date) {
    minDate.setHours(0, 0, 0, 0)
  }
  if (maxDate instanceof Date) {
    maxDate.setHours(0, 0, 0, 0)
  }
  if (startDate instanceof Date) {
    startDate.setHours(0, 0, 0, 0)
  }
  if (endDate instanceof Date) {
    endDate.setHours(0, 0, 0, 0)
  }

  const firstMonthDay = new Date(year, month, 1)
  const lastMonthDay = new Date(year, month + 1, 0)

  const daysToAdd = getNumberOfDaysInMonth(month, year)
  const days: DayType[] = []

  const startWeekOffset = MONDAY_FIRST[firstMonthDay.getDay()]
  const daysToCompleteRows = (startWeekOffset + daysToAdd) % 7
  const lastRowNextMonthDays = daysToCompleteRows ? 7 - daysToCompleteRows : 0

  for (let i = -startWeekOffset; i < daysToAdd + lastRowNextMonthDays; i++) {
    days.push(
      prepareMonthDay({
        firstMonthDay,
        i,
        year,
        daysToAdd,
        disableRange,
        lastMonthDay,
        startDate,
        endDate,
        minDate,
        maxDate,
      })
    )
  }

  return days
}

export function changedDate(one?: Date, other?: Date) {
  return (
    one instanceof Date !== other instanceof Date ||
    (one instanceof Date && other instanceof Date && !sameDate(one, other))
  )
}

export function changedMonthYear(month: number, year: number, date?: Date) {
  return !(date && month === date.getMonth() && year === date.getFullYear())
}

export function betweenMonthYear(month: number, year: number, startDate?: Date, endDate?: Date) {
  const compareDate = new Date(year, month, 1)
  return !(startDate && endDate && isBetweenDates(startDate, endDate, compareDate))
}

export function areEqual(prevProps: MonthProps, nextProps: MonthProps) {
  return (
    prevProps.month === nextProps.month &&
    prevProps.year === nextProps.year &&
    prevProps.disableRange === nextProps.disableRange &&
    !changedDate(prevProps.minDate, nextProps.minDate) &&
    !changedDate(prevProps.maxDate, nextProps.maxDate) &&
    changedMonthYear(nextProps.month, nextProps.year, nextProps.startDate) &&
    changedMonthYear(nextProps.month, nextProps.year, prevProps.startDate) &&
    changedMonthYear(nextProps.month, nextProps.year, nextProps.endDate) &&
    changedMonthYear(nextProps.month, nextProps.year, prevProps.endDate) &&
    betweenMonthYear(nextProps.month, nextProps.year, nextProps.startDate, nextProps.endDate) &&
    betweenMonthYear(nextProps.month, nextProps.year, prevProps.startDate, prevProps.endDate)
  )
}
